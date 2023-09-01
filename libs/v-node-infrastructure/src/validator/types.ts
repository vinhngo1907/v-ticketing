import { Request } from 'express';

export interface ValidateClassType<T> {
  new (...args: any[]): T;
}

export type ValidBodyRequest<
  ValidateClass,
  IRequest extends Request = Request
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = IRequest extends Request<infer P, infer BRes, infer _BReq, infer Q>
  ? Request<P, BRes, ValidateClass, Q>
  : never;
