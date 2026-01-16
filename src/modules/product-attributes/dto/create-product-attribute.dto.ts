export class CreateAttributeDto {
  name: string;
  value: string;
  order?: number;
}

export class CreateAttributeSetDto {
  name: string;
  slug: string;
  status: 'published' | 'draft';
  attributes: CreateAttributeDto[];
}