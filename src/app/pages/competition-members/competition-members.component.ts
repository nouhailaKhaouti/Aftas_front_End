import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ranking } from 'src/app/model/ranking.model';
import { RegistreService } from 'src/app/services/register/registre.service';

@Component({
  selector: 'app-competition-members',
  templateUrl: './competition-members.component.html',
  styleUrls: ['./competition-members.component.scss']
})
export class CompetitionMembersComponent implements OnInit {
  isCompleted=false;
  rankings:Ranking[]=[];
  podiums:Ranking[]=[];
  code:string;
  date:string;

  constructor(private route: ActivatedRoute, private registreService:RegistreService,private router: Router ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['code'] && params['date']) {
        this.code = params['code'];
        this.date=params['date'];
        console.log(this.code+" "+this.date); 
      }
    });
    this.fetchData();
    this.fetchPodiumData();
  }

  fetchData(){
    console.log(this.code);
this.registreService.getRegisterDataByCode(this.code).subscribe(data => {
  // Handle the fetched data
  this.rankings=data;
  console.log(this.rankings);
}, error => {
  
  console.log(error);
});
  }
  redirectToHunt(rank:Ranking): void {
    console.log(rank);
    this.router.navigate(['/hunting'], {queryParams: { code: rank.competition.code, num: rank.member.num }
  });
  }

  fetchPodiumData(){
    this.podiums=this.rankings.slice(0,3);
  }

  getPodium(){
    const competitionDate = new Date(this.date);
    const currentDate = new Date();

    if (competitionDate >= currentDate) {
      this.isCompleted=true;
    } 
  }
}
