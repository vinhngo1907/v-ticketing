import { Injectable } from '@nestjs/common';
import {Producer, Consumer, Kafka} from 'kafkajs';
require('dotenv').config();

@Injectable()
export class KafkaService {
    private kafkaClient: Kafka;
    private consumer: Consumer;
    private producer: Producer;
    constructor(){
        this.kafkaClient = new Kafka({
            clientId: 'auth-microservice',
            brokers:[process.env.HOST_KAFKA],
            sasl: {
                mechanism: process.env.MECHANISM,
                username: process.env.USERNAME_KAFKA,
                password: process.env.PASSWORD_KAFKA,
            }as any
        })
    }
    async CheckAndCreateTopic(topic: string){
        const admin = this.kafkaClient.admin();
        await admin.connect();
        const listTopic = await admin.listTopics();
        if (!listTopic.includes(topic)) {
            await admin.createTopics({
                topics: [{ topic: topic }]
            });
        }
        await admin.disconnect();
    }
}
