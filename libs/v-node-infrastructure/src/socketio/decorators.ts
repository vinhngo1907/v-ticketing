import { META_DATA, SocketClass } from './class';

export function SocketEvent(event: string) {
    return (target: object, _: string, descriptor: PropertyDescriptor): void => {
        const originalMethod = descriptor.value;

        const wrapFn = function (this: unknown, ...args: unknown[]) {
            const result = originalMethod.apply(this, args);
            return result;
        };

        const { constructor } = target;
        // eslint-disable-next-line no-prototype-builtins
        if (SocketClass.isPrototypeOf(constructor)) {
            const socketEvents =
                Reflect.getOwnMetadata(META_DATA.SocketEvent, target) || {};
            let eventCallbacks = socketEvents[event];
            if (!eventCallbacks) {
                eventCallbacks = [];
                socketEvents[event] = [wrapFn];
            }

            eventCallbacks.push(wrapFn);
            Reflect.defineMetadata(META_DATA.SocketEvent, socketEvents, target);
        }
    };
}