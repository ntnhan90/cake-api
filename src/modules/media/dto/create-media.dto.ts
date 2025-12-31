export class CreateMediaDto {}

export class CreateFolderDto {
    user_id: number;
    name: string;
    parent_id: number;
}