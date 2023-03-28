import {Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";

@Index(['userId', 'created_at'])
@Index(['userId', 'updated_at'])
@Entity('wallet')
export class WalletEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Index()
    @Column({
        type: 'uuid',
        unique: true,
        nullable: false,
        name: 'user_id'
    })
    userId!: string;

    @Column({
        type: 'integer',
        nullable: false,
        default: 0
    })
    balance!: number;

    @Index()
    @UpdateDateColumn()
    updated_at!: Date;

    @Index()
    @CreateDateColumn()
    created_at!: Date;
}