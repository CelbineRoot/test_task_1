import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Index(['userId', 'created_at'])
@Index(['userId', 'updated_at'])
@Entity('dice')
export class DiceEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'integer',
        unique: true
    })
    amount!: number;

    @Column({
        type: 'boolean'
    })
    win!: boolean;

    @Index()
    @Column({
        type: 'uuid',
        unique: true,
        nullable: false,
        name: 'user_id'
    })
    userId!: string;

    @Index()
    @UpdateDateColumn()
    created_at!: Date;

    @Index()
    @CreateDateColumn()
    updated_at!: Date;
}