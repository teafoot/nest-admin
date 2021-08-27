import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  // async all(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }

  async paginate(page: number = 1, relations: string[]): Promise<any> {
    const {data, meta} = await super.paginate(page, relations);

    return {
      data: data.map(user => {
        const { password, ...otherData } = user; // remove the password (optional because @UseInterceptors(ClassSerializerInterceptor) already takes care of it)
        return otherData;
      }),
      meta
    };

    // const take = 4;
    // const [users, total] = await this.userRepository.findAndCount({
        // take,
        // skip: (page - 1) * take
    // });

    // return {
        // data: users.map(user => {
          // const { password, ...otherData } = user; // remove the password (optional because @UseInterceptors(ClassSerializerInterceptor) already takes care of it)
          // return otherData;
        // }),
        // meta: {
            // total,
            // page,
            // last_page: Math.ceil(total / take)
        // }
    // };
  }

  // async create(data): Promise<User> {
  //   return await this.userRepository.save(data);
  // }

  // async findOne(condition): Promise<User> {
  //   return await this.userRepository.findOne(condition);
  // }

  // async update(id: number, data: any): Promise<any> {
  //   return await this.userRepository.update(id, data);
  // }

  // async delete(id: number): Promise<any> {
  //   return await this.userRepository.delete(id);
  // }
}
