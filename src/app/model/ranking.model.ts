import { Competition } from "./competition.model";
import { Member } from "./member.model";

export interface Ranking{
    competition:Competition,
    member:Member,
    score:Number,
    rank:Number
}