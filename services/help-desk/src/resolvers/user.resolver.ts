import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { UserEntity } from "../entities/user.entity"
import { error } from "console";

@InputType()
export class CreateUserInput {
  @Field()
  userName?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field()
  phoneNumber?: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  phoneNumber?: string;
}

@Resolver() 
export class UserResolver {
  
  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]>{
    const user  = await UserEntity.find()
    return user
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Arg("data") data: CreateUserInput
  ):Promise<UserEntity> {
    const user = UserEntity.create(data as UserEntity)
    await user.save()
    return user
  }

  @Mutation(() => UserEntity)
  async userUpdate(
    @Arg("id") id: string,
    @Arg("data") data: UpdateUserInput
  ):Promise<UserEntity |  null>{
    const user = await UserEntity.findOne({ where: {id} });
    if(!user){
      throw new Error("user are not found")
    }
    Object.assign(user, data)
    await user.save()
    return user
  }

  @Mutation(() =>  Boolean)
  async deleteUser(
    @Arg("id") id: string
  ): Promise<boolean>{
    const user = await UserEntity.findOne({where: {id} })
    if(!user){
      throw new Error("user are not found")
    }
    await user.remove();
    return true
  }
}
