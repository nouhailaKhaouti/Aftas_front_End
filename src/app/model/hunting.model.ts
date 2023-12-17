import { Competition } from "./competition.model";
import { Fish } from "./fish.model";
import { Member } from "./member.model";


export interface Weight{
    hunting:requestHunting,
    weight:Number
}

export interface requestHunting{
    num:number,
    code:string,
    name:string,
}

export interface Hunting{
    member:Member,
    competition:Competition
    fish:Fish,
    numberOfFish:number,
}