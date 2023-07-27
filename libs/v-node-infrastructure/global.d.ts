declare global {
    interface IPrototype {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prototype: any;
    }

    interface IObject extends Record<string | symbol | number, unknown> { }

    type TypedMethodDecorator = <T extends Function>(
        target: object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ) => TypedPropertyDescriptor<T> | void;
}

export { };
