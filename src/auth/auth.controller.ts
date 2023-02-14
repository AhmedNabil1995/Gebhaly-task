import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import passport = require('passport');
import { AuthService } from './auth.service';
import { UserDTO } from '../commons/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    async register(@Body() userdto:UserDTO){
        return this.authService.register(userdto)
    }

    @Post('login')
    async login(@Body('email') email:string,@Body('password') passport:string){
        return this.authService.login(email,passport);
    }
}
