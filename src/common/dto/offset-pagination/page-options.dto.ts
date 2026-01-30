import {
    DEFAULT_CURRENT_PAGE,
    DEFAULT_PAGE_LIMIT,
    Order,
} from '@/constants/app.constant';
import {
    EnumFieldOptional,
    NumberFieldOptional,
    StringFieldOptional,
} from '@/decorators/field.decorators';
import { Type } from 'class-transformer';

export class PageOptionsDto {
    @Type(() => Number)
    @NumberFieldOptional({
        min: 1,
        default: DEFAULT_PAGE_LIMIT,
        int: true,
    })
    readonly limit?: number = DEFAULT_PAGE_LIMIT;

    @Type(() => Number)
    @NumberFieldOptional({
        min: 1,
        default: DEFAULT_CURRENT_PAGE,
        int: true,
    })
    readonly page?: number = DEFAULT_CURRENT_PAGE;

    @StringFieldOptional()
    readonly q?: string;

    @EnumFieldOptional(() => Order, { default: Order.DESC })
    readonly order?: Order = Order.DESC;

    get offset() {
       return this.page ? (this.page - 1) * this.limit : 0;
    }
}