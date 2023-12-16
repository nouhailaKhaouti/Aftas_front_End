import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/model/competition.model';
import { CompetitionService } from 'src/app/services/competition/competition.service';
import { RegistreService } from 'src/app/services/register/registre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-display-competition',
  templateUrl: './display-competition.component.html',
  styleUrls: ['./display-competition.component.scss']
})
export class DisplayCompetitionComponent implements OnInit {
  isModalOpen = false;
  competitions: Competition[] = [];
  register:{ num: Number; code: String; }={
    num:0,
    code:''
  }
  constructor(private competitionService: CompetitionService,private registerService: RegistreService) { }

  ngOnInit(): void {
    this.fetchCompetitionData();
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
  // openModal(competitionCode: String) {
  //   console.log("inside");
  //   this.register = { num: 0, code: '' };
  //   this.register.code = competitionCode;
  //   console.log(this.register.code)
  //   this.isModalOpen = true;
  //   console.log(this.isModalOpen);
  // }

  // closeModal() {
  //   console.log('inside');
  //   this.isModalOpen = false;
  //   console.log(this.isModalOpen);
  //   this.register = { num: 0, code: '' };
  // }

  submitForm(): void {
    console.log(this.register);
    this.registerService.addRegisterData(this.register).subscribe(
      (response) => {
        console.log('Competition data sent successfully:', response);
        Swal.fire('Success', 'This member has been registred successfully!', 'success');
        this.register = { num: 0, code: '' };
      },
      (error) => {
        console.error('Error sending competition data:', error);
        Swal.fire('Error', error.error, 'error');

      }
    );
  }
}
