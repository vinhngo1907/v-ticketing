import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // console.log(request);
        if (!request.headers.authorization) {
            console.log("not autorized man");
            return false
        }

        request.user = await this.validateToken(request.headers.authorization)
        // console.log(request.user)
        return true;
    }
    async validateToken(auth: String) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('invalid token', HttpStatus.FORBIDDEN);
        }

        const token = auth.split(' ')[1];
        try {
            const decoded = await jwt.verify(token, process.env.SERECT_JWT);
            return decoded;
        } catch (err) {
            throw new HttpException(err.message || err.name, HttpStatus.FORBIDDEN)
        }
    }
}