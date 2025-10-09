import { plainToInstance } from 'class-transformer';
import {
  BaseEntity,
 // Column,
  CreateDateColumn,
  DataSource,
  UpdateDateColumn,
} from 'typeorm';
import { getOrder } from '../decorators/order.decorator';

export abstract class AbstractEntity extends BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable:true,
   // default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable:true,
  //  default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;


  toDto<Dto>(dtoClass: new () => Dto): Dto {
    return plainToInstance(dtoClass, this);
  }

  static useDataSource(dataSource: DataSource) {
    BaseEntity.useDataSource.call(this, dataSource);
    const meta = dataSource.entityMetadatasMap.get(this);
    if (meta != null) {
      // reorder columns here
      meta.columns = [...meta.columns].sort((x, y) => {
        const orderX = getOrder((x.target as any)?.prototype, x.propertyName);
        const orderY = getOrder((y.target as any)?.prototype, y.propertyName);
        return orderX - orderY;
      });
    }
  }
}
