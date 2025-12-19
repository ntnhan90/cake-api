import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ContactEntity } from "../entities/contact.entity";

@Injectable()
export class ContactRepository extends Repository<ContactEntity> {
    constructor(private readonly dataSource: DataSource){
        super(ContactEntity, dataSource.createEntityManager());
    }
    
}