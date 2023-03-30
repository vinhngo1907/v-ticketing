import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { from } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        private datbaseService: DatabaseService
    ) { }
    showAllUser(
        page: number = 1,
        limit: number = 10,
        status: string = undefined,
        order_by: string = 'desc'
    ) {
        try {
            const filderObj = { status: status };
            const obj = Object.keys(filderObj).length >= 1 ? { ...filderObj } : {}
            return from(this.datbaseService.user.findMany({
                where: obj,
                take: Number(limit),
                skip: (Number(page) - 1) * Number(limit),
                orderBy: {
                    id: order_by === 'desc' ? 'desc' : 'asc',
                },
            }));
        } catch (err: any) {
            throw err;
        }
    }
}
