import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HasPermission } from 'src/permission/has-permission.decorator';
import { Role } from './models/role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @HasPermission('roles')
  @Get()
  async all(): Promise<Role[]> {
    return await this.roleService.all();
  }

  @HasPermission('roles')
  @Post() // creates record in tables: roles, role_permissions
  async create(
    @Body('name') name: string,
    @Body('permissions') ids: number[],
  ): Promise<Role> {
    return await this.roleService.create({
      name,
      permissions: ids.map((id) => ({ id })),
    });
  }

  @HasPermission('roles')
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.roleService.findOne({ id }, ['permissions']);
  }

  @HasPermission('roles')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('permissions') ids: number[],
  ) {
    await this.roleService.update(id, { name });
    // add permissions to the role
    const role = await this.roleService.findOne({ id });
    return await this.roleService.create({
      ...role,
      permissions: ids.map((id) => ({ id })),
    });
  }

  @HasPermission('roles')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.roleService.delete(id);
  }
}
