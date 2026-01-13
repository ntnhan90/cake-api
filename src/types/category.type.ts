export interface CategoryWithCount {
    id: number;
    name: string;
    parent_id: number;
    count: number;
    is_featured:number;
    is_default:number;
}