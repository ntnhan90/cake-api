export interface MediaItem {
    id: number;
    name: string;
    type: 'file' | 'folder';
    url?: string;
}

export type MediaTreeType = Record<string, MediaItem[]>;