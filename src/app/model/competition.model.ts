import { Ranking } from "./ranking.model";

export interface Competition{
    code: string;
    date: string;
    startTime: string; 
    endTime: string; 
    numberOfParticipants: number;
    location: string;
    amount: number;
    rankingList: Ranking[];
}