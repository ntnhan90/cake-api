import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column,DeleteDateColumn} from "typeorm";


@Entity('media_files')
export class MediaFileEntity extends AbstractEntity{
    constructor(data?: Partial<MediaFileEntity>){
        super();
        Object.assign(this, data)
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id:string

    @Column()
    name:string

    @Column({nullable:true})
    alt:string

    @Column({default:0})
    folder_id:number

    @Column()
    mime_type:string

    @Column()
    size:number

    @Column()
    url:string

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        default: null,
    }) 
    deletedAt: Date;
}
