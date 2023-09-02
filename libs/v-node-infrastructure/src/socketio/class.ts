import { BaseClass } from '../class';
import { Namespace, Server } from 'socket.io';

export const META_DATA = {
    SocketEvent: 'SocketEvent',
} as const;

export class SocketClass extends BaseClass {
    io: Server | Namespace;
    constructor(socketServerOrNamespace: Server | Namespace) {
        super();
        this.io = socketServerOrNamespace;

        const socketEvents = Reflect.getMetadata(META_DATA.SocketEvent, this) || {};
        socketServerOrNamespace.on('connection', socket => {
            for (const event in socketEvents) {
                if (Object.prototype.hasOwnProperty.call(socketEvents, event)) {
                    const callbacks = socketEvents[event];
                    socket.on(event, (...payload) => {
                        for (let index = 0; index < callbacks.length; index++) {
                            const callback = callbacks[index].bind(this);
                            callback(socket, ...payload);
                        }
                    });
                }
            }
        });
    }
}