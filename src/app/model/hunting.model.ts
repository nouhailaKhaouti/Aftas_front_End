import { Competition } from "./competition.model";
import { Fish } from "./fish.model";
import { Member } from "./member.model";


export interface Weight{
    hunting:Hunting,
    weight:Number
}


export interface Hunting{
    member:Member,
    competition:Competition
    fish:Fish
}