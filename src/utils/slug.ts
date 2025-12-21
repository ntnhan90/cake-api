import slugify from 'slugify';

export function makeSlug(text: string): string {
    return slugify(text, {
        lower: true,
        strict: true,      // bỏ ký tự đặc biệt
        locale: 'vi',      // hỗ trợ tiếng Việt
        trim: true,
    });
}