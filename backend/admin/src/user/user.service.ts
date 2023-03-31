import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { from } from 'rxjs';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class UserService implements OnModuleInit{
    private loggerService:Logger
    constructor(
        private datbaseService: DatabaseService,
        private kafkaService: KafkaService
    ) { 
        this.loggerService = new Logger();
    }

    async onModuleInit() {
        try {
            // ----------------- listening on topic update status exchange qoc --------------- //
          
        } catch (err) {
            this.loggerService.error("An error while init the module exchange", err);
        }
    }
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
