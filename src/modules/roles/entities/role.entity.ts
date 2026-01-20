import { AbstractEntity } from '@/database/entities/abstract.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,JoinTable, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { PermissionEntity } from 'src/modules/permission/entities/permission.entity';

@Entity('roles')
export class RoleEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "text", nullable: true }) // Example with nullable option
    description: string | null;

    @Column({default:0})
    is_default:number

    // Role - Permission (N-N)
    @ManyToMany(() => PermissionEntity, permissions => permissions.roles)
    @JoinTable({
        name: 'role_permissions',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    })
    permissions: PermissionEntity[];

    @ManyToMany(() => UserEntity, (users) => users.roles)
    users: UserEntity[];
}