import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fish } from 'src/app/model/fish.model';
import { Hunting, Weight } from 'src/app/model/hunting.model';
import { FishService } from 'src/app/services/fish/fish.service';
import { HuntingService } from 'src/app/services/hunting/hunting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hunting',
  templateUrl: './hunting.component.html',
  styleUrls: ['./hunting.component.scss']
})
export class HuntingComponent implements OnInit {

  code:string;
  num:number;
  fishes:Fish[]=[];
  hunting:Hunting;
  huntings:Hunting[]=[];
  weight:Weight={
    hunting:{
      code:'',
      num:0,
      name:''
    },
    weight:0,
  };
  constructor(private route: ActivatedRoute,private fishService:FishService,private huntingService:HuntingService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['code'] && params['num']) {
        this.code = params['code'];
        this.num=params['num'];
        console.log(this.code+" "+this.num); 
        this.hunting.competition.code=this.code;
        this.hunting.member.num=this.num;
        this.fetchHuntingData();
      }
    });
    this.fetchFishData();
  }
  fetchFishData(){
    console.log(this.code);
this.fishService.getFishData().subscribe(data => {
  // Handle the fetched data
  this.fishes=data;
  console.log(data);
}, error => {
  
  console.log(error);
});
  }

  fetchHuntingData(){
    this.huntingService.getMemberHuntingData(this.hunting).subscribe(data=>{
      this.huntings=data;
      console.log(data);
    },error=>{
      console.log(error);
    }
    )
  }

  submitForm(){
    this.weight.hunting.code=this.code;
    this.weight.hunting.num=this.num;
    this.huntingService.addHuntingData(this.weight).subscribe(data=>{
      Swal.fire("Success","the hunt has been adde successfully","success");
      console.log(data);
    },error=>{
      Swal.fire("Error",error.error,"error");
    })
   this.weight={
      hunting:{
        code:'',
        num:0,
        name:''
      },
      weight:0,
    };
  }
}
