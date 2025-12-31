import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,DeleteDateColumn} from "typeorm";


@Entity('media_folders')
export class MediaFolderEntity extends AbstractEntity{
    constructor(data?: Partial<MediaFolderEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id:number

    @Column({nullable:true})
    name:string

    @Column({nullable:true})
    slug:string

    @Column({default:0})
    parent_id:number

    @Column()
    path: string;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        default: null,
    }) 
    deletedAt: Date;
}
