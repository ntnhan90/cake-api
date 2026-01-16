import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';

@Entity('post_categories')
export class PostCategoryEntity {
  @PrimaryColumn()
  post_id: number;

  @PrimaryColumn()
  category_id: number;

  @ManyToOne(
    () => PostEntity,
    post => post.postCategories,   // 🔥 THIẾU DÒNG NÀY
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @ManyToOne(
    () => CategoryEntity,
    category => category.postCategories, // 🔥 THIẾU DÒNG NÀY
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}

