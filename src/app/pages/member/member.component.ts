import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/member.model';
import { MemberService } from 'src/app/services/member/member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  Members: Member[] = [];
  Member: Member = {
    num:0,
    name:'',
    familyName:'',
    nationality:'',
    identityDocument:'',
    identityNumber:''
  };
  constructor(private MemberService: MemberService) { }

  ngOnInit(): void {
    this.fetchMemberData();
  }

  fetchMemberData(): void {

    this.MemberService.getMemberData().subscribe(
      (data: Member[]) => {
        this.Members = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching Member data:', error);
      }
    );
  }

  submitForm(): void {
    this.MemberService.addMemberData(this.Member).subscribe(
      (response) => {
        this.fetchMemberData();
        console.log('Member data sent successfully:', response);

        this.Member={
          num:0,
          name:'',
          familyName:'',
          nationality:'',
          identityDocument:'',
          identityNumber:''
        };

          Swal.fire('Success', 'This member has been registred successfully!', 'success');

        },
        (error) => {
          
          console.error('Error sending competition data:', error);
          Swal.fire('Error', error.error, 'error');
  
        }
    );
  }
}
