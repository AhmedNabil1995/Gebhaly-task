import { Injectable } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy} from 'passport-jwt';
import {config} from '../../config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.jwt.secret,
        })
    }

    async validate(payload:any){
        return {email:payload.email,userId:payload.sub,role:payload.role}
    }
}