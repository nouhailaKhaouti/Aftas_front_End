import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { Competition } from 'src/app/model/competition.model';
import { CompetitionService } from 'src/app/services/competition/competition.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})

export class CompetitionComponent implements OnInit {
  competitions: Competition[] = [];
  competition: Competition = {
    code: '',
    date: '',
    startTime: '',
    endTime: '',
    numberOfParticipants: 0,
    location: '',
    amount: 0.0,
    rankingList:[]
  };
  constructor(private competitionService: CompetitionService) { }

  ngOnInit(): void {
    this.fetchCompetitionData();
  }

  fetchCompetitionData(): void {

    this.competitionService.getCompetitionData().subscribe(
      (data: Competition[]) => {
        this.competitions = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching competition data:', error);
      }
    );
  }

  submitForm(): void {
    this.competitionService.addCompetitionData(this.competition).subscribe(
      (response) => {
        this.fetchCompetitionData();
        console.log('Competition data sent successfully:', response);

        this.competition={
          code: '',
          date: '',
          startTime: '',
          endTime: '',
          numberOfParticipants: 0,
          location: '',
          amount: 0.0,
          rankingList:[]
        };

      },
      (error) => {
        console.error('Error sending competition data:', error);
      }
    );
  }
}
