import { Controller, Inject, UseGuards, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,
        // @Inject('CLIENT_SERVICE') private readonly client: ClientProxy
        // @Inject('PRODUCT_SERVICE') private readonly client1: ClientProxy
    ) { }
    @Get()
    // @UseGuards(new AuthGuard())
    showAllUsers() {}
}
