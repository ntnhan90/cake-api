import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductLabelsEntity } from "../entities/product-label.entity";

@Injectable()
export class ProductLabelsRepository extends Repository<ProductLabelsEntity> {
    constructor(private readonly dataSource: DataSource){
        super(ProductLabelsEntity, dataSource.createEntityManager());
    }

}