import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserCreateDto } from './models/user-create.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { HasPermission } from 'src/permission/has-permission.decorator';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor) // Model/DTOs
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // @Get()
  // async all(): Promise<User[]> {
  //     return await this.userService.all();
  // }
  @HasPermission('users') // view_users ; PermissionGuard
  @Get()
  async all(@Query('page') page: number = 1): Promise<User[]> {
    return await this.userService.paginate(page, ['role']); // load the role of the user
  }

  @HasPermission('users')
  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('1234', 12); // the DTO requires it, but not important in this case.

    return await this.userService.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password,
      role: { id: body.role_id }, // foreign key entity has to be specified in this object format
    });
  }

  @HasPermission('users')
  @Get(':id')
  async get(@Param('id') id: number) {
    return await this.userService.findOne({ id }, ['role']);
  }

  @HasPermission('users')
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    const { role_id, ...data } = body;
    await this.userService.update(id, { ...data, role: { id: role_id } });
    return await this.userService.findOne({ id });
  }

  @HasPermission('users')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }

  //TODO: endpoint response empty??? use winston logger ; @Put only works when you add a param placeholder
  // @Put('info/:id')
  @HasPermission('users')
  @Post('info')
  async updateInfo(@Req() request: Request, @Body() body: UserUpdateDto) {
    // to update logged in user info
    const id = await this.authService.userId(request);
    await this.userService.update(id, body);
    return await this.userService.findOne({ id });
  }

  @HasPermission('users')
  @Post('password')
  async updatePassword(
    @Req() request: Request,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }

    const id = await this.authService.userId(request);
    const hashed = await bcrypt.hash(password, 12);
    await this.userService.update(id, {
      password: hashed,
    });

    return this.userService.findOne({ id });
  }
}
