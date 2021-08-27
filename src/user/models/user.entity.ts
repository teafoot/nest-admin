// import { Exclude } from "class-transformer";
// import { Role } from "src/role/models/role.entity";
// import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// @Entity('users')
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   first_name: string;

//   @Column()
//   last_name: string;

//   @Column({ unique: true })
//   email: string;

//   @Column()
//   @Exclude() // @UseInterceptors(ClassSerializerInterceptor)
//   password: string;

//   //

//   @ManyToOne(() => Role) // a role has many users
//   @JoinColumn({ name: 'role_id' })
//   role: Role;

////EntityColumnNotFound: No entity column "role.id" was found. when accessing the UserController@updateInfo endpoint
//   @Column({ name: 'role_id', nullable: true, default: 1 }) // add column explicitly to get the forein key id when finding a user
//   role_id: number;
// }


import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from 'src/role/models/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  //

  @ManyToOne(() => Role) // a role has many users
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
