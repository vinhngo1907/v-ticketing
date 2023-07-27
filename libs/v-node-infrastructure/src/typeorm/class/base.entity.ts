import {
    Entity, BaseEntity as CoreBaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn
} from "typeorm";

@Entity()
export abstract class BaseEntity extends CoreBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 
