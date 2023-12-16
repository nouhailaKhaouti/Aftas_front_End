import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { Competition } from 'src/app/model/competition.model';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})

export class CompetitionComponent implements OnInit {
  @ViewChild('competitionModal') competitionModal: any;

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

  openModal(): void {
    // Open the modal using the modal('show') method
    this.competitionModal.nativeElement.classList.add('show');
    this.competitionModal.nativeElement.style.display = 'block';
    }

  closeModal(): void {
    // Close the modal using the modal('hide') method
    this.competitionModal.nativeElement.classList.add('hide');
    this.competitionModal.nativeElement.style.display = 'none';
    
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

  }
  submitForm(): void {
    this.competitionService.addCompetitionData(this.competition).subscribe(
      (response) => {
        this.fetchCompetitionData();
        console.log('Competition data sent successfully:', response);
        Swal.fire("Success","Competition data sent successfully","success");

      },
      (error) => {
        console.error('Error sending competition data:', error);
        Swal.fire("Error",error.error,"error");
      }
    );
    this.closeModal();
  }
}
