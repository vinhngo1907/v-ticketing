import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { from, of } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
    private loggerService: Logger
    constructor(
        private databaseService: DatabaseService
    ) {
        this.loggerService = new Logger()
    }

    all(page: number = 1, limit: number = 10, order_by: string = 'desc') {
        if (Number(limit) < 0 || Number(page) < 1) {
            throw new HttpException(
                'Limit or page is invalid',
                HttpStatus.BAD_REQUEST,
            );
        }
        return from(this.databaseService.product.findMany({
            where: {},
            take: Number(limit),
            skip: (Number(page) - 1) * Number(limit),
            orderBy: {
                id: order_by === 'desc' ? 'desc' : 'asc',
            },
        }))
    }

    async create(data: {
        title: string, image: string
    }) {
        const newProduct = await this.databaseService.product.create({
            data: { ...data, likes: 0 }
        });
        return of({
            product: newProduct
        })
    }

    async get(id: number) {
        try {
            const product = await this.databaseService.product.findUnique({ where: { id: Number(id) } });
            if (!product) {
                throw new HttpException('This product does not exist!',HttpStatus.BAD_REQUEST);
            }
            return of({
                product
            })
        } catch (err: any) {
            console.log(err);
            throw err
        }
    }

    async update(id: number, data): Promise<any> {
        try {
            const updatedProduct = await this.databaseService.product.update({
                where: {
                    id: Number(id)
                },
                data: {
                    ...data
                }
            });
            if (!updatedProduct) {
                throw new HttpException('This product does not exist!', HttpStatus.BAD_REQUEST);
            }
            return of({
                product: updatedProduct
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async delete(id: number): Promise<any> {
        try {
            const deletedProduct = await this.databaseService.product.delete({ where: { id: Number(id) } });
            if (!deletedProduct) {
                throw new HttpException('This product does not exist!', HttpStatus.BAD_REQUEST);
            }
            return of({
                product: deletedProduct
            })
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}
