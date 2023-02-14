import { BadRequestException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/commons/models/user.model';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../commons/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly UserModel:Model<IUser>,
    private jwtService:JwtService) {}
 

    async register(userData:UserDTO){

        const {email,password,firstName,lastName,address,phone} = userData;

        if(!this.isValidEmail(email)) throw new BadRequestException('You have entered invalid email');

        let user = await this.UserModel.findOne({email});

        if(user) throw new ConflictException('email is already exist');

        let salt = await bcrypt.genSalt();

        let hashedPass = bcrypt.hashSync(password,salt);
        const newUser = new this.UserModel({firstName,lastName,address,phone,email,password:hashedPass});
        return await newUser.save();
    }

    async login(email:string,password:string){
        let user = await this.UserModel.findOne({email});
        if(!user) throw new NotFoundException('email is wrong');

        let ismatch =  bcrypt.compareSync(password,user.password);

        if(!ismatch) throw new BadRequestException('password not correct');

        let token =  this.jwtService.sign({sub:user._id,email:user.email,role:user.role});

        return {token}

    }


    isValidEmail(email: string) {
        if (email) {
          const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(email);
        } else
          return false;
      }
}
