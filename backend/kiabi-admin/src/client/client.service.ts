import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, of } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { ClientDTO } from './client.dto';

@Injectable()
export class ClientService {
    constructor(
        private databaseService: DatabaseService
    ) { }

    all(
        page: number = 1, limit: number = 10, order_by: string = 'asc'
    ) {
        try {
            if (Number(limit) < 0 || Number(page) < 1) {
                throw new HttpException('Limit or page is invalid', HttpStatus.BAD_REQUEST);
            }
            return from(this.databaseService.client.findMany({
                where: {},
                take: (Number(limit)),
                skip: (Number(page) - 1) * Number(limit),
                orderBy: {
                    id: order_by === 'desc' ? 'desc' : 'asc',
                },
            }))

        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    async create(data: ClientDTO) {
        try {
            const newClient = await this.databaseService.client.create({
                data: {
                    ...data
                }
            })
            return of({
                client: newClient
            })
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    async getSingleClient(id: number) {
        try {
            const client = this.databaseService.client.findUnique({
                where: { id: Number(id) }
            });
            if (!client) {
                throw new HttpException('This client does not exist', HttpStatus.BAD_REQUEST);
            }
            return of({
                client: client
            })
        } catch (err: any) {
            console.log(err);
            throw err;
        }
    }

    async update(id: number, data: Partial<ClientDTO>) {
        const updatedClient = await this.databaseService.client.update({
            where: { id: Number(id) },
            data: { ...data }
        });
        if (!updatedClient) {
            throw new HttpException('This client does not exist', HttpStatus.BAD_REQUEST);
        }
        return of({
            client: updatedClient
        })
    }

    async delete(id: number): Promise<any> {
        const deletedClient = await this.databaseService.client.delete({ where: { id: Number(id) } });
        if (!deletedClient) {
            throw new HttpException('This client does not exist', HttpStatus.BAD_REQUEST);
        }
        return of({
            client: deletedClient
        })
    }
}
