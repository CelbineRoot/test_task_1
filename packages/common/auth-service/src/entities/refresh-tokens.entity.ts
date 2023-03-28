import {Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";

@Index(['userId', 'created_at'])
@Index(['userId', 'updated_at'])
@Index(['userId', 'token'])
@Entity('refresh_tokens')
export class RefreshTokensEntity {
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

    @Index()
    @Column({
        type: 'varchar',
        nullable: false,
    })
    token!: string;

    @Index()
    @UpdateDateColumn()
    updated_at!: Date;

    @Index()
    @CreateDateColumn()
    created_at!: Date;
}