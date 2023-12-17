import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ranking } from 'src/app/model/ranking.model';
import { RegistreService } from 'src/app/services/register/registre.service';

@Component({
  selector: 'app-competition-members',
  templateUrl: './competition-members.component.html',
  styleUrls: ['./competition-members.component.scss']
})
export class CompetitionMembersComponent implements OnInit {

  rankings:Ranking[]=[];
  code:string; 

  constructor(private route: ActivatedRoute, private registreService:RegistreService ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.code = params['code'];
        console.log(this.code); 
      }
    });
    this.fetchData();
  }

  fetchData(){
this.registreService.getRegisterDataByCode(this.code).subscribe(data => {
  // Handle the fetched data
  this.rankings=data;
  console.log(data);
}, error => {
  
  console.log(error);
});
  }

}
