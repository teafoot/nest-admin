import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    // UserModule,
    forwardRef(() => UserModule), // avoids circular dependency: UserModule imports AuthModule, AuthModule imports UserModule
    // JwtModule.register({
    //   secret: 'secret123',
    //   signOptions: {expiresIn: '1d'}
    // })
    CommonModule // jwt
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
