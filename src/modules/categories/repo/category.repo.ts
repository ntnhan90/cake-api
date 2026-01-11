import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CategoryEntity } from "../entities/category.entity";

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {
    constructor(private readonly dataSource: DataSource){
        super(CategoryEntity, dataSource.createEntityManager());
    }
    
}