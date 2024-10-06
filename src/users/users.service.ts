import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { QueryAgeDto, QueryAgeParams } from './dto/query.age.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    // await this.userModel.deleteMany()
    const count = await this.userModel.countDocuments();

    // if (count === 0) {
    //   const insertDate = [];
    //   for (let i = 0; i < 30000; i++) {
    //     insertDate.push({
    //       name: faker.person.firstName(),
    //       email: faker.internet.email(),
    //       age: faker.number.int({ min: 10, max: 80 }),
    //     });
    //   }
    //   await this.userModel.insertMany(insertDate)
    // }

    console.log(count, 'count');
  }

  findAll(query) {
    let { page, take } = query;
    take = take > 100 ? 100 : take;
    console.log(page, take);
    return this.userModel
      .find()
      .skip((page - 1) * take)
      .limit(take);
  }

  findByQuery() {
    return this.userModel.find({ name: { $regex: /sh/i } });
  }

  async getAllUsersCount() {
    const allUsers = await this.userModel.countDocuments();
    return { AllUsers: allUsers };
  }

  async getUsersByAge(queryAge: QueryAgeParams) {
    let { age, take, page, ageFrom, ageTo } = queryAge;
    take = take > 50 ? 50 : take;

    if (age) {
      return this.userModel
        .find({ age: age })
        .skip((page - 1) * take)
        .limit(take);
    }
    return this.userModel
      .find({ age: { $gt: ageFrom, $lt: ageTo } })
      .skip((page - 1) * take)
      .limit(take);
  }

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userModel.findById(id);
    if (!user) throw new NotFoundException();
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    return updatedUser;
  }

  async remove(id: string) {
    const user = this.userModel.findById(id);
    if (!user) throw new NotFoundException();
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return deletedUser;
  }
}
