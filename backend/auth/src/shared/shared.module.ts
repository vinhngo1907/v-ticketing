import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports:[
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET_JWT
        })
    ],
    providers:[]
})
export class SharedModule {}
