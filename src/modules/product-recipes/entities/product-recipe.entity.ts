
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne,OneToMany,JoinColumn, Index} from "typeorm";
import { ProductEntity } from 'src/modules/products/entities/product.entity';
import { ProductMaterialEntity } from 'src/modules/product-materials/entities/product-material.entity';

@Entity('product_recipes')
export class ProductRecipeEntity extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

     // 1–1 với Product (owner side)
    @OneToOne(() => ProductEntity, product => product.recipe, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column()
    product_id: number;

    // 1–N với Material
    @OneToMany(() => ProductMaterialEntity, material => material.recipe, {
        cascade: true,        // save recipe sẽ save luôn material
        orphanedRowAction: 'delete',
    })
    materials: ProductMaterialEntity[];

    @Column()
    material_quantity:number
}
