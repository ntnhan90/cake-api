
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { ProductRecipeEntity } from 'src/modules/product-recipes/entities/product-recipe.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne,} from "typeorm";

export enum STATUS {
    PUBLISHED = "published",
    DRAFT = "draft",
    PENDING = "pending"
}

export enum MATERIAL_CATEGORY {
    SPONEGE = "sponege",
    FILLING = "filling",
    TOPING = "topping",
    FROSTING = "frosting",
    PACKAGING = "packaging",
}

export enum MATERIAL_UNIT {
    PIECE = "piece",
    KG = "kg",
    LIT = "lit"
}

@Entity('product_materials')
export class ProductMaterialEntity extends AbstractEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()   
    name:string

    @Column()   
    sku:string

    @Column({
        type: "enum",
        enum: MATERIAL_UNIT,
        default: MATERIAL_UNIT.PIECE,
    })   
    unit:string

     @Column({
        type: "enum",
        enum: MATERIAL_CATEGORY,
        default: MATERIAL_CATEGORY.SPONEGE,
    })    
    category:string

    @Column()   
    cost_price:string

    @Column({
        type: "enum",
        enum: STATUS,
        default: STATUS.DRAFT,
    })
    status:string

    // N–1 về Recipe
    @ManyToOne(() => ProductRecipeEntity, recipe => recipe.materials, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'recipe_id' })
    recipe: ProductRecipeEntity;
    @Column()
    recipe_id: number;
}
