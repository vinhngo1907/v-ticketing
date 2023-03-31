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
        });

        this.consumer = this.kafkaClient.consumer({
            groupId: 'admin-microservice'
        });

        this.producer = this.kafkaClient.producer();
    }

    async CheckAndCreateTopic(topic: string) {
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

    async SendMessage(topic: string, message: string) {
        await this.CheckAndCreateTopic(topic);
        await this.producer.connect();
        const sent = await this.producer.send({
            topic,
            messages: [
                { value: JSON.stringify(message) }
            ]
        });
        await this.producer.disconnect();
        return sent;
    }

    async GetUser(groupId: string | undefined = undefined) {
        if (groupId) {
            return this.kafkaClient.consumer({
                groupId: groupId
            });
        }
        return this.consumer;
    }
}
