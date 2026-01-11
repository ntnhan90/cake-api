import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductCategoryEntity } from "../entities/product-category.entity";

@Injectable()
export class ProductCategoryRepository extends Repository<ProductCategoryEntity> {
    constructor(private readonly dataSource: DataSource){
        super(ProductCategoryEntity, dataSource.createEntityManager());
    }
}