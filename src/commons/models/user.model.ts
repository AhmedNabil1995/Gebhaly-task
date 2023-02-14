import * as mongoose from 'mongoose';
import { Role } from '../enums/role.enum';

export const UserSchema = new mongoose.Schema({

  email:{type:String,required:true,unique:true},
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String},
  address:{type:String},
  role:{type:String,enum:Role,default:Role.User}
});

export interface IUser extends mongoose.Document {
  id:string;
  email:string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address:string;
  role:Role
}
