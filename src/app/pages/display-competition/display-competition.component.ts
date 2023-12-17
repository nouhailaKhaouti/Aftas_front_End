import { Component, OnInit, ViewChild } from '@angular/core';
import { Competition } from 'src/app/model/competition.model';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import { RegistreService } from 'src/app/services/register/registre.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-competition',
  templateUrl: './display-competition.component.html',
  styleUrls: ['./display-competition.component.scss']
})
export class DisplayCompetitionComponent implements OnInit {
  @ViewChild('registerModal') registerModal: any;
  currentcompetition: Competition;
  currentIndex = -1;
  code = '';
  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 6, 8 ];
  isModalOpen = false;
  competitions: Competition[] = [];
  register:{ num: Number; code: String; }={
    num:0,
    code:''
  }
  constructor(private competitionService: CompetitionService,private registerService: RegistreService,private router: Router) { }

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
        console.log(this.count);
        console.log(this.competitions);
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

  redirectTocompetition(competition:Competition): void {
    console.log(competition);
    this.router.navigate(['/competitioncompetitions'], {queryParams: { code: competition.code, date: competition.date }
  });
  }

  getCompetitionStatus(dateString: string): string {
    const competitionDate = new Date(dateString);
    const currentDate = new Date();

    if (competitionDate < currentDate) {
      return 'Completed';
    } else if (competitionDate.toDateString() === currentDate.toDateString()) {
      return 'In Process';
    } else {
      return 'Pending';
    }
  }

  isInTheFuture(date: string): boolean {
    const competitionDate = new Date(date);
    const currentDate = new Date();
  
    currentDate.setDate(currentDate.getDate() + 2);
  
    return competitionDate > currentDate;
  }

  openModal(competitionCode: String): void {
    // Open the modal using the modal('show') method
    this.register.code = competitionCode;
    console.log(competitionCode);
    this.registerModal.nativeElement.classList.add('show');
    this.registerModal.nativeElement.style.display = 'block';
    }

  closeModal(): void {
    this.registerModal.nativeElement.classList.add('hide');
    this.registerModal.nativeElement.style.display = 'none';
    this.register = { num: 0, code: '' };

  }

  submitForm(): void {
    console.log(this.register);
    this.registerService.addRegisterData(this.register).subscribe(
      (response) => {
        console.log('This competition has been registred successfully:', response);
        Swal.fire('Success', 'This competition has been registred successfully!', 'success');
      },
      (error) => {
        console.error('Error sending competition data:', error);
        Swal.fire('Error', error.error, 'error');
      }
    );
    this.closeModal();
  }
}
