import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { pipe, switchMap, of } from 'rxjs';
import { AuthGuard } from 'src/shared/auth.guard';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

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
