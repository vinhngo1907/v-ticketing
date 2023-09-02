import { ClassConstructor, plainToClass } from 'class-transformer';

export class Mapper<I> {
    _t: I;

    static toClass<Cl>(
        this: ClassConstructor<Cl>,
        plain: Cl extends Mapper<infer I> ? I : never
    ): Cl {
        return plainToClass(this, plain);
    }
}