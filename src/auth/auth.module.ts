import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from 'src/commons/models/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import {config} from '../config';
@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.register({secret:config.jwt.secret,signOptions:{expiresIn:config.jwt.expires}}),
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule {}
