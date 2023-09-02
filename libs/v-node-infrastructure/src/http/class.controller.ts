import { BaseClass } from '../class';
import { NextFunction, Request, Response, Router } from 'express';
import { join } from 'path';

import { HttpHandleMethod } from './method.http';

export type HttpControllerMethodHander = <
    IRequest extends Request,
    IResponse extends Response,
    INext extends NextFunction
>(
    request: IRequest,
    response: IResponse,
    next: INext
) => Promise<unknown>;

export type HttpHandlerSubject = {
    method: HttpHandleMethod;
    path: string;
    handler: HttpControllerMethodHander;
    propertyName: string;
};

export type ControllerMiddlewareSubject = Pick<HttpHandlerSubject, 'handler'> &
    Partial<Pick<HttpHandlerSubject, 'path' | 'method'>>;

export const META_DATA = {
    /**
     * @description Metadata has type HttpHandlerSubject[]
     */
    HttpHandler: 'HttpHandler',
    /**
     * @description Metadata has type HttpControllerMethodHander
     */
    PropertyMiddleware: 'PropertyMiddleware',
    /**
     * @description Metadata has type ControllerMiddlewareSubject
     */
    ControllerMiddleware: 'ControllerMiddleware',
    /**
     * @description Metadata has type string
     */
    DefaultPath: 'DefaultPath',
};

export class HttpController extends BaseClass {
    constructor(router: Router) {
        super();
        const defaultPath: string =
            Reflect.getMetadata(META_DATA.DefaultPath, this) || '';

        const setupControllerMiddlewares = (router: Router) => {
            const middlewares: HttpControllerMethodHander[] =
                Reflect.getMetadata(META_DATA.ControllerMiddleware, this) || [];

            for (let index = 0; index < middlewares.length; index++) {
                const middleware = middlewares[index];

                router.all(defaultPath, middleware.bind(this));
            }
        };

        const setupHttpHandlers = (router: Router) => {
            const httpHandlers: HttpHandlerSubject[] =
                Reflect.getMetadata(META_DATA.HttpHandler, this) || [];

            for (let index = 0; index < httpHandlers.length; index++) {
                const { method, path, handler, propertyName } = httpHandlers[index];

                const wrapErrorHandling = async (
                    req: Request,
                    res: Response,
                    next: NextFunction
                ) => {
                    try {
                        return await handler.call(this, req, res, next);
                    } catch (error) {
                        next(error);
                    }
                };

                const joinedPath = join(defaultPath, path);

                const middlewares =
                    Reflect.getMetadata(
                        META_DATA.PropertyMiddleware,
                        this[propertyName as keyof this]
                    ) || [];

                router[method]?.(joinedPath, middlewares, wrapErrorHandling.bind(this));
            }
        };

        setupControllerMiddlewares(router);
        setupHttpHandlers(router);
    }
}