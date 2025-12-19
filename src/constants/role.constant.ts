export const RoleName = {
    Admin: 'ADMIN',
    Client: 'CLIENT',
    Seller: 'SELLER',
} as const

export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    OPTIONS = 'OPTIONS',
    HEAD = 'HEAD',
}
