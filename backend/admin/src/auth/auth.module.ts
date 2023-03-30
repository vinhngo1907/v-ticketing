require('dotenv').config();
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.SERECT_JWT,
        }),
    ],
    providers: [JwtStrategy],
})
export class AuthModule { }
