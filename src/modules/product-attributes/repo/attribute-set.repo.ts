import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductAttributeSetEntity } from "../entities/product-attribute-set.entity";

@Injectable()
export class AttributeSetRepository extends Repository<ProductAttributeSetEntity> {
    constructor(private readonly dataSource: DataSource){
        super(ProductAttributeSetEntity, dataSource.createEntityManager());
    }
}