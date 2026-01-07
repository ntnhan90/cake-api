import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { FaqCateEntity } from "../entities/faq-cate.entity";

@Injectable()
export class FaqCateRepository extends Repository<FaqCateEntity> {
    constructor(private readonly dataSource: DataSource){
        super(FaqCateEntity, dataSource.createEntityManager());
    }
    
}