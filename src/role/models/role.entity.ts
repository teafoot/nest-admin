import { Permission } from 'src/permission/models/permission.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // role has many permissions
  // permission belongs to many roles
  @ManyToMany(() => Permission, {cascade: true})
  @JoinTable({
      name: 'role_permissions',
      joinColumn: {name: 'role_id', referencedColumnName: 'id'},
      inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'}
  }) 
  permissions: Permission[];
}
