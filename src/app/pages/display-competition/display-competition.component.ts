import { Component, OnInit, ViewChild } from '@angular/core';
import { Competition } from 'src/app/model/competition.model';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import { RegistreService } from 'src/app/services/register/registre.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Ranking } from 'src/app/model/ranking.model';

@Component({
  selector: 'app-display-competition',
  templateUrl: './display-competition.component.html',
  styleUrls: ['./display-competition.component.scss']
})
export class DisplayCompetitionComponent implements OnInit {
  @ViewChild('registerModal') registerModal: any;

  isModalOpen = false;
  competitions: Competition[] = [];
  register:{ num: Number; code: String; }={
    num:0,
    code:''
  }
  constructor(private competitionService: CompetitionService,private registerService: RegistreService,private router: Router) { }

  ngOnInit(): void {
    this.fetchCompetitionData();
  }

  redirectToMember(code:string): void {
    console.log(code);
    // Redirect to the member component and pass the code as query params
    this.router.navigate(['/competitionMembers'], { queryParams: {code} });
  }
  fetchCompetitionData(): void {
    this.competitionService.getCompetitionData().subscribe(
      (data: Competition[]) => {
        this.competitions = data.map((competition) => ({
          ...competition,
          status: this.getCompetitionStatus(competition.date)
        }));
      },
      (error) => {
        console.error('Error fetching competition data:', error);
      }
    );
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

  openModal(competitionCode: String): void {
    // Open the modal using the modal('show') method
    this.register.code = competitionCode;
    console.log(competitionCode);
    this.registerModal.nativeElement.classList.add('show');
    this.registerModal.nativeElement.style.display = 'block';
    }

  closeModal(): void {
    // Close the modal using the modal('hide') method
    this.registerModal.nativeElement.classList.add('hide');
    this.registerModal.nativeElement.style.display = 'none';
    this.register = { num: 0, code: '' };

  }

  submitForm(): void {
    console.log(this.register);
    this.registerService.addRegisterData(this.register).subscribe(
      (response) => {
        console.log('This member has been registred successfully:', response);
        Swal.fire('Success', 'This member has been registred successfully!', 'success');
      },
      (error) => {
        console.error('Error sending member data:', error);
        Swal.fire('Error', error.error, 'error');
      }
    );
    this.closeModal();
  }
}
