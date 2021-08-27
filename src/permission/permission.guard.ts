import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/role/models/role.entity';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import { Permission } from './models/permission.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const access = this.reflector.get<string>('access', context.getHandler());
    console.log({ access });

    if (!access) {
      // when access is undefined ; no @HasPermission(string) is set
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const id = await this.authService.userId(request);
    const user: User = await this.userService.findOne({ id }, ['role']);
    // console.log({user});
    const role: Role = await this.roleService.findOne({ id: user.role.id }, [
      'permissions',
    ]);
    // console.log({role});
    // return true;

    if (request.method === 'GET') {
      // view_ / edit_
      return role.permissions.some(
        (permission: Permission) =>
          permission.name === `view_${access}` ||
          permission.name === `edit_${access}`,
      );
    } else if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
      //TODO: handle DELETE request...
      return role.permissions.some(
        (permission: Permission) => permission.name === `edit_${access}`,
      ); // edit_
    }
  }
}
