
export enum Roles {
    ADMIN = "admin",
    PLAYER = "player"
}
export interface User {
    id: string;
    name: string;
    image?: string
    role: Roles
}