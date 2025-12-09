import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { TaxEntity } from "../entities/tax.entity";

@Injectable()
export class TaxRepository extends Repository<TaxEntity> {
    constructor(private readonly dataSource: DataSource){
        super(TaxEntity, dataSource.createEntityManager());
    }
    
}