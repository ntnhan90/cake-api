import { Injectable } from '@nestjs/common';
import { CreateProductCollectionDto } from './dto/create-product-collection.dto';
import { UpdateProductCollectionDto } from './dto/update-product-collection.dto';

@Injectable()
export class ProductCollectionsService {
  create(createProductCollectionDto: CreateProductCollectionDto) {
    return 'This action adds a new productCollection';
  }

  findAll() {
    return `This action returns all productCollections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productCollection`;
  }

  update(id: number, updateProductCollectionDto: UpdateProductCollectionDto) {
    return `This action updates a #${id} productCollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCollection`;
  }
}
