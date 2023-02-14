import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import {Reflector} from '@nestjs/core'
import { Observable } from "rxjs";
import { Role } from "../enums/role.enum";

@Injectable()
export class AdminGaurd implements CanActivate {

    constructor(private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let role = this.reflector.getAllAndOverride<Role>('role',[context.getClass(),context.getHandler()])
        
        let {user} =  context.switchToHttp().getRequest();

        return user.role === role
    }

}