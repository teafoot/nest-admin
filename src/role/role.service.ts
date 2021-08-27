import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { Repository } from 'typeorm';
import { Role } from './models/role.entity';

@Injectable()
export class RoleService extends AbstractService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }

  // async all(): Promise<Role[]> {
  //   return await this.roleRepository.find();
  // }

  // async create(data): Promise<Role> {
  //   return await this.roleRepository.save(data);
  // }

  // async findOne(condition): Promise<Role> {
  //   return await this.roleRepository.findOne(condition, {relations: ['permissions']}); // load the permissions of that role
  // }

  // async update(id: number, data: any): Promise<any> {
  //   return await this.roleRepository.update(id, data);
  // }

  // async delete(id: number): Promise<any> {
  //   return await this.roleRepository.delete(id);
  // }
}
