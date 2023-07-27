import { getConnection, getConnectionManager, ObjectType } from 'typeorm';

/**
 * @deprecated
 */

export const getLazyCustomRepository = <R extends object>(
    repository: ObjectType<R>,
    connectionName: 'default'
): R => {
    const manager = getConnectionManager();
    let lazyRepo: R;
    if (manager.connections.length) {
        lazyRepo = manager.get(connectionName)?.getCustomRepository(repository);
    }

    return new Proxy<R>({} as R, {
        get(_, prop) {
            if (!lazyRepo) {
                lazyRepo = getConnection().getCustomRepository(repository);
            }

            return (lazyRepo as IObject)[prop];
        },
    });
}