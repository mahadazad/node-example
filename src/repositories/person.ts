import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import * as yup from 'yup';

import { GenderTypes, Person } from '../entities/person';

export interface CreateAndSavePayload {
  id?: number;
  name?: string;
  surname?: string;
  age?: number;
  gender?: GenderTypes;
  birthday?: string;
  contacts?: number[];
  phone?: string;
  email?: string;
}

@Service()
@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
  async createAndSave(data: CreateAndSavePayload) {
    this.validate(data);
    const { contacts, ...personData } = data;

    const contactPeople = (await Promise.all((contacts
      ? contacts.map(id => this.findOne(id))
      : []) as any)) as Person[];

    const person = await this.save({
      ...personData,
      contacts: contactPeople,
    });

    return person;
  }

  private validate(data: CreateAndSavePayload) {
    this.validateRequiedFields(data);

    const schema = yup.object().shape({
      age: yup.number(),
      email: yup.string().email(),
      gender: yup.string().oneOf(['male', 'female']),
      birthday: yup.date(),
    });

    schema.validateSync(data);
  }

  private validateRequiedFields(data: CreateAndSavePayload) {
    ['name', 'surname', 'email'].forEach(field => {
      if (
        (data.id &&
          typeof data[field as keyof CreateAndSavePayload] !== 'undefined' &&
          !data[field as keyof CreateAndSavePayload]) ||
        (!data.id && !data[field as keyof CreateAndSavePayload])
      ) {
        throw new Error(`Missing required field "${field}".`);
      }
    });
  }
}
