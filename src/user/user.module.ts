import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { UserSchema } from '../commons/models/user.model';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'User',schema:UserSchema}]),AuthModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
