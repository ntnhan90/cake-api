import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ProductTagEntity } from "../entities/product-tag.entity";

@Injectable()
export class ProductTagsRepository extends Repository<ProductTagEntity> {
    constructor(private readonly dataSource: DataSource){
        super(ProductTagEntity, dataSource.createEntityManager());
    }

}