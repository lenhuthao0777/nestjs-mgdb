import { Column, Entity, ObjectIdColumn, ObjectID, Generated } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id?: ObjectID;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone!: string;

  @Column()
  password: string;

  @Column()
  role_id: string;

  @Column({ type: 'timestamptz', default: new Date() })
  create_at?: Date;

  @Column({ type: 'timestamptz', default: new Date() })
  update_at?: Date;
}
