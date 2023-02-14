import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from 'src/commons/dto/user.dto';
import { IUser } from '../commons/models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private UserModel:Model<IUser>){}

    async getUserById(userId:string){
        let user =  await this.UserModel.findById(userId);
        console.log(user);
        return user
    }

    async getAllUsers(){
        return await this.UserModel.find();
    }

    async deleteUser(userId:string){
        return await this.UserModel.findByIdAndDelete(userId);
    }

    async updateUser(userId:string,userData:UserDTO){
        
        return await this.UserModel.findByIdAndUpdate(userId,userData,{new:true});
    }
}
