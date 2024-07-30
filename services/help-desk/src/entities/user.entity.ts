import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column({name: "user_name"})
  userName?: string
  
  @Field()
  @Column()
  email?:  string

  @Field()
  @Column()
  password?: string

  @Field()
  @Column({name: "phone_Number"})
  phoneNumber?: string

  @Field()
  @CreateDateColumn({
    type: 'time with time zone'
  })
  createdAt?: Date

  @Field()
  @CreateDateColumn({
    type: "time with time zone"
  })
  updatedAt?: Date
}
