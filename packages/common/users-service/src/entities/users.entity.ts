import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Index(['email', 'created_at'])
@Index(['email', 'updated_at'])
@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Index()
    @Column({
        type: 'varchar',
        unique: true
    })
    email!: string;

    @Column({
        type: 'varchar'
    })
    password!: string;

    @Column({
        type: 'boolean',
        default: false
    })
    suspended!: boolean;

    @Index()
    @UpdateDateColumn()
    created_at!: Date;

    @Index()
    @CreateDateColumn()
    updated_at!: Date;
}