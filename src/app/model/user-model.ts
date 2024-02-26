import { Member } from "./member.model";

export interface User{
    member:Member| null,
    email: string,
    password: string,
    token : string | null,
}
