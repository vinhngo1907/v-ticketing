import { Controller, Get, Inject, Query, UseGuards, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { pipe, switchMap, of } from 'rxjs';
import { AuthGuard } from 'src/shared/auth.guard';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { DatabaseService } from 'src/database/database.service';
import { HttpService } from '@nestjs/axios';
import { KafkaService } from 'src/kafka/kafka.service';
import { Logger } from 'kafkajs';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,
        // @Inject('CLIENT_SERVICE') private readonly client: ClientProxy
    ) { }
    
    @Get()
    @UseGuards(new AuthGuard())
    showAllUser(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('status') status: string = undefined,
        @Query('order_by') order_by: string = 'desc',
    ) {
        try {
            return (this.userService.showAllUser(page, limit, status, order_by)).pipe(
                switchMap(data => {
                    return of({
                        msg: "Successfully",
                        data: data
                    })
                })
            )
        } catch (err: any) {
            throw err;
        }
    }
}
