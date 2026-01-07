import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { FaqsEntity } from "../entities/faq.entity";

@Injectable()
export class FaqsRepository extends Repository<FaqsEntity> {
    constructor(private readonly dataSource: DataSource){
        super(FaqsEntity, dataSource.createEntityManager());
    }
    
}