import { Entity, Column, ObjectIdColumn, ObjectID, Generated } from 'typeorm';

@Entity()
export class Role {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @Generated('uuid')
  role_uuid: string;

  @Column()
  role_number: number;

  @Column({ type: 'timestamptz', default: new Date() })
  create_at: Date;

  @Column({ type: 'timestamptz', default: new Date() })
  update_at: Date;
}
