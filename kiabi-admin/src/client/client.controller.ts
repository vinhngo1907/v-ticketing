import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { of, switchMap, pipe, map } from 'rxjs';
import { ClientDTO } from './client.dto';

@Controller('client')
export class ClientController {
    constructor(
        private clientService: ClientService
    ) { }

    @Get()
    all(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('order_by') order_by: string = 'asc'
    ) {
        try {
            return (this.clientService.all(page, limit, order_by)).pipe(
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

    @Post('add')
    async create(
        @Body() ResponseBody: ClientDTO
    ) {
        try {
            return (await this.clientService.create(ResponseBody)).pipe(
                map(data => {
                    return {
                        data: data,
                        msg: 'Create buy transaction successfully',
                    }
                })
            )
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    @Get('/:id')
    async getSingleClient(
        @Param() id: number
    ) {
        try {
            return (await this.clientService.getSingleClient(id)).pipe(
                map(data => {
                    return of({
                        data: data,
                        msg: "Successfully"
                    })
                })
            )
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    @Put('edit/:id')
    async update(
        @Param('id') id: number,
        @Body() responseBody: ClientDTO
    ) {
        try {
            return (await this.clientService.update(id, responseBody)).pipe(
                map(data => {
                    return of({
                        data: data,
                        msg: 'Updated client in successfully'
                    })
                })
            )
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    @Delete(':id')
    async delete(
        @Param('id') id: number
    ) {
        try {
            return (await this.clientService.delete(id)).pipe(
                map(data => {
                    return of({
                        data: data,
                        msg: 'Deleted client in successfully'
                    })
                })
            )
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }
}
