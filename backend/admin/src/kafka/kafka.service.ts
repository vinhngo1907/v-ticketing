import { Injectable } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';

@Injectable()
export class KafkaService {
    private kafkaClient: Kafka;
    private producer: Producer;
    private consumer: Consumer;
    constructor() {
        this.kafkaClient = new Kafka({
            clientId: 'admin-microservice',
            brokers: [process.env.HOST_KAFKA],
            sasl: {
                mechanism: process.env.MECHANISM,
                username: process.env.USERNAME_KAFKA,
                password: process.env.PASSWORD_KAFKA,
            } as any
        })
    }

    async CheckAndCreateTopic(topic: string) {

    }

    async SendMessage(topic: string, message: string) {

    }

    async GetUser(){
        
    }
}
