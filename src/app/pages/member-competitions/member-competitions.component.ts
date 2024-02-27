import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Competition } from 'src/app/model/competition.model';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-member-competitions',
  templateUrl: './member-competitions.component.html',
  styleUrls: ['./member-competitions.component.scss']
})
export class MemberCompetitionsComponent implements OnInit {

  currentcompetition: Competition;
  competitions: Competition[] = [];
  constructor(private competitionService: CompetitionService,private tokenService:TokenService,private router: Router) { }

  ngOnInit(): void {
    this.retrievecompetitions();
  }

  retrievecompetitions(): void {
    let params: any = {};
    params[`num`] =this.tokenService.getTokenClaims().num ;
    console.log(params);
    this.competitionService.getMemberCompetitions(params)
    .subscribe(
      response => {
        const { competitions, totalCompetitions } = response;
      this.competitions = competitions.map((c) => ({
          ...c,
          status:this.getCompetitionStatus(c.date),
        }));
        console.log(this.competitions);
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  getCompetitionStatus(dateString: string): string {
    const competitionDate = new Date(dateString);
    competitionDate.setHours(0, 0, 0, 0);
  
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    if (competitionDate < currentDate) {
      return 'Completed';
    } else if (competitionDate.toDateString() === currentDate.toDateString()) {
      return 'In Process';
    } else {
      return 'Pending';
    }
  }
}
