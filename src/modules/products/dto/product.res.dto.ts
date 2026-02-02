import {StringField,NumberField, DateField} from '@/decorators/field.decorators';
import { Exclude, Expose ,Transform} from 'class-transformer';
import { ProductTagsResDto } from 'src/modules/product-tags/dto/product-tags.res.dto';
import { ProductCateResDto } from 'src/modules/product-categories/dto/product-cate.res.dto';
@Exclude()
export class ProductResDto {
	@StringField()
	@Expose()
	id: number;

    @StringField()
    @Expose()
    name:string

    @StringField()
    @Expose()
    slug:string

    @StringField()
    @Expose()
    description:string

    @StringField()
    @Expose()
    content:string

    @StringField()
    @Expose()
    status:string

    @StringField()
    @Expose()
    image:string

    @StringField()
    @Expose()
    sku:string
    
    @NumberField()
    @Expose()
    order:number

    @NumberField()
    @Expose()
    is_featured:number	

    @NumberField()
    @Expose()
    price:number

    @NumberField()
    @Expose()
    sale_price:number

    @DateField()
    @Expose()
    start_date: Date

    @DateField()
    @Expose()
    end_date: Date;


    @NumberField()
    @Expose()
    views:number

    @Expose()
	@Transform(({ obj }) =>
		Array.isArray(obj.tags)
		? obj.tags.map(tag => ({
			id: tag.id,
			name: tag.name,
			}))
		: [],
	)
	tags: ProductTagsResDto[];

	@Expose()
	@Transform(({ obj }) =>
	Array.isArray(obj.categories)
		? obj.categories.map(category => ({
			id: category.id,
			name: category.name,
		}))
		: [],
	)
	categories: ProductCateResDto[];
}
