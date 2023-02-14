import { Get } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { GetAuthenticatedUserID } from 'src/commons/decorators/get-user-id-decorator';
import { UserDTO } from 'src/commons/dto/user.dto';
import { JwtAuthGaurd } from 'src/commons/guards/auth-guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @Get(':id')
    @UseGuards(JwtAuthGaurd)
    getUser(@Param('id') id:string,@Req() req){
        return this.userService.getUserById(id);
    }

    @Get()
    @UseGuards(JwtAuthGaurd)
    getAllUsers(){
        return this.userService.getAllUsers();
    }

    @Delete(':id')
    @UseGuards(JwtAuthGaurd)
    deleteUser(@Param('id') id:string,@GetAuthenticatedUserID() userId:string){
        if(id!==userId){
            throw new ForbiddenException('you can only delete your acount')
        }
        return this.userService.deleteUser(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGaurd)
    updateUser(@Param('id') id:string,@Body() userData:UserDTO,@GetAuthenticatedUserID() userId:string){
        if(id!==userId){
            throw new ForbiddenException('you can only update your acount')
        }
        return this.userService.updateUser(id,userData);
    }
}
