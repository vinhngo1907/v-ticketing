import { Controller, Inject, UseGuards, Get, Post, UsePipes, Body, Param, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService,
        // @Inject('CLIENT_SERVICE') private readonly client: ClientProxy
        // @Inject('PRODUCT_SERVICE') private readonly client1: ClientProxy
    ) { }
    @Get()
    // @UseGuards(new AuthGuard())
    showAllUsers() { }

    @Post('/register')
    @UsePipes()
    async register(
        @Body() ResponseBody: UserDTO
    ) {
        try {
            const user = await this.userService.register(ResponseBody);
            return user;
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    @Post('/login')
    @UsePipes()
    async login(@Body() ResponseBody: UserDTO) {
        try {
            const user = await this.userService.login(ResponseBody);
            return user;
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    @Put('/update/:id')
    @UsePipes()
    async update(
        @Param('id') id: number,
        @Body() ResponseBody: UserDTO){
        try{
            const updatedUser = await this.userService.update(Number(id), ResponseBody);
            return updatedUser;
        }catch(err: any){
            console.log(err);
            throw err;
        }
    }
}
