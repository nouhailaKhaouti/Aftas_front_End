import { Member } from "./member.model";

export interface User{
    num:Number|null,
    name:String|null,
    familyName:String|null,
    nationality:String|null,
    identityDocument:String|null,
    identityNumber:String|null,
    email: string,
    password: string,
    token : string | null,
}
