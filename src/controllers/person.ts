import { Request, response, Response } from 'express';
import { Container, Inject, Service } from 'typedi';
import { getCustomRepository } from 'typeorm';

import { PersonRepository, CreateAndSavePayload } from '../repositories/person';

@Service()
export class PersonController {
  personRepo: PersonRepository;

  constructor() {
    this.personRepo = getCustomRepository(PersonRepository);
  }

  async create(req: Request, res: Response) {
    await this.save({ ...req.body, id: req.body.id }, res);
  }

  async modify(req: Request, res: Response) {
    await this.save({ ...req.body, id: +req.params.id }, res);
  }

  private async save(data: CreateAndSavePayload, res: Response) {
    try {
      res.json(await this.personRepo.createAndSave(data));
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async getPerson(req: Request, res: Response) {
    const person = await this.personRepo.findOne({
      where: { id: +req.params.id },
      relations: ['contacts'],
    });

    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: 'Person not found!' });
    }
  }

  async listAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 5;

    const skip = (page - 1) * perPage;

    const [data, total] = await this.personRepo.findAndCount({
      skip,
      take: perPage,
      relations: ['contacts'],
    });

    res.json({ data, page, totalPages: Math.ceil(total / perPage), perPage, total });
  }

  async delete(req: Request, res: Response) {
    res.json({ success: !!(await (await this.personRepo.delete(req.params.id)).affected) });
  }
}
