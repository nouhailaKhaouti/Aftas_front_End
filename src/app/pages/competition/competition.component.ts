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
  currentcompetition: Competition;
  currentIndex = -1;
  code = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9 ];
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
    this.retrievecompetitions();
  }
  getRequestParams(code: string, page: number, pageSize: number): any {
    let params: any = {};

    if (code) {
      params[`code`] = code;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrievecompetitions(): void {
    const params = this.getRequestParams(this.code, this.page, this.pageSize);
    console.log(params);
    this.competitionService.getCompetitionData(params)
    .subscribe(
      response => {
        const { competitions, totalCompetitions } = response;
        this.competitions = competitions.map((c) => ({
          ...c,
          status:this.getCompetitionStatus(c.date)
        }));
        this.count = totalCompetitions;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    console.log(event);
    this.page = event;
    this.retrievecompetitions();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievecompetitions();
  }


  searchCode(): void {
    this.page = 1;
    this.retrievecompetitions();
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
        // this.fetchCompetitionData();
        this.retrievecompetitions();
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
