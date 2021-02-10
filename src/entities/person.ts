import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export enum GenderTypes {
  Male = 'male',
  Female = 'Female',
}

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  surname: string;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ type: 'enum', enum: GenderTypes, nullable: true })
  gender?: GenderTypes;

  @Column({ type: 'date', nullable: true })
  birthday?: Date;

  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Column({ type: 'varchar' })
  email: string;

  @ManyToMany(type => Person)
  @JoinTable()
  public contacts: Person[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  modified: Date;
}
