import { AbstractEntity } from '@/database/entities/abstract.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,JoinTable} from "typeorm";

@Entity('roles')
export class RoleEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;
    
    @Column()
    name: string;

    @Column("text",{nullable:true}) // Explicitly defining the type as "text"
    permissions: string;

    @Column({ type: "text", nullable: true }) // Example with nullable option
    description: string | null;

    @Column({default:0})
    is_default:number

    @ManyToMany(() => UserEntity, (users) => users.roles)
    users: UserEntity[];
}