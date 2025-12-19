import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductColectionEntity } from "../entities/product-collection.entity";

@Injectable()
export class ProductColectionRepository extends Repository<ProductColectionEntity> {
    constructor(private readonly dataSource: DataSource){
        super(ProductColectionEntity, dataSource.createEntityManager());
    }
    
}