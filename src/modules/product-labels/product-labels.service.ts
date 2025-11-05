import { Injectable } from '@nestjs/common';
import { CreateProductLabelDto } from './dto/create-product-label.dto';
import { UpdateProductLabelDto } from './dto/update-product-label.dto';

@Injectable()
export class ProductLabelsService {
  create(createProductLabelDto: CreateProductLabelDto) {
    return 'This action adds a new productLabel';
  }

  findAll() {
    return `This action returns all productLabels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productLabel`;
  }

  update(id: number, updateProductLabelDto: UpdateProductLabelDto) {
    return `This action updates a #${id} productLabel`;
  }

  remove(id: number) {
    return `This action removes a #${id} productLabel`;
  }
}
