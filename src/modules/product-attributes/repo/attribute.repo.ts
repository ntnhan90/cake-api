import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductAttributeEntity } from "../entities/product-attribute.entity";

@Injectable()
export class AttributeRepository extends Repository<ProductAttributeEntity> {
    constructor(private readonly dataSource: DataSource){
        super(ProductAttributeEntity, dataSource.createEntityManager());
    }
}