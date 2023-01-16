import { Column, Entity, ObjectIdColumn, ObjectID, Unique } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column()
  role: number;
}
