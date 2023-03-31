import { Controller, Get, Post, Delete, Put, Patch, Body, Query, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { map, of, switchMap } from 'rxjs';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService
    ) { }
    @Get()
    all(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('page') order_by: string = 'desc',
    ) {
        // this.client.emit('hello','Hello from RabbitMQ')
        // return this.productService.all();
        return (this.productService.all(page, limit, order_by)).pipe(
            switchMap(data => {
                return of({
                    msg: 'Successfully',
                    data: data
                })
            })
        )
    }

    @Post()
    async create(@Body('title') title: string, @Body('image') image: string) {
        // const product = await this.productService.create({ title, image })
        // this.client.emit('product_created', product)
        return (await this.productService.create({ title, image })).pipe(
            map(data => {
                return of({
                    msg: "Created product in successfully",
                    data: data
                });
            })
        );
    }
    @Put('/:id')
    async update(
        @Param('id') id: number,
        @Body('title') title: string, @Body('image') image: string) {
        // const product = await this.productService.create({ title, image })
        // this.client.emit('product_created', product)
        return (await this.productService.update(id, { title, image })).pipe(
            map(data => {
                return of({
                    msg: "Updated product in successfully",
                    data: data
                });
            })
        );
    }
    @Delete('/:id')
    async delete(@Param('id') id: number) {
        // const product = await this.productService.create({ title, image })
        // this.client.emit('product_created', product)
        return (await this.productService.delete(id)).pipe(
            map(data => {
                return of({
                    msg: "Deleted product in successfully",
                    data: data
                });
            })
        );
    }
}
