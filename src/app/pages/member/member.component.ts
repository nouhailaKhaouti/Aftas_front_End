import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/model/member.model';
import { MemberService } from 'src/app/services/member/member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  @ViewChild('memberModal') memberModal: any;
  currentmember: Member;
  currentIndex = -1;
  search = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  Members: Member[] = [];
  Member: Member = {
    num:0,
    name:'',
    familyName:'',
    nationality:'',
    identityDocument:'',
    identityNumber:'',
    accountApproved:false
  };
  constructor(private MemberService: MemberService) { }

  ngOnInit(): void {
    // this.fetchMemberData();
    this.retrievemembers();
  }

  getRequestParams(search: string, page: number, pageSize: number): any {
    let params: any = {};

    if (search) {
      params[`search`] = search;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrievemembers(): void {
    const params = this.getRequestParams(this.search, this.page, this.pageSize);
    console.log(params);
    this.MemberService.getMembersData(params)
    .subscribe(
      response => {
        const { members, totalMembers } = response;
        this.Members = members;
        this.count = totalMembers;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    console.log(event);
    this.page = event;
    this.retrievemembers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievemembers();
  }


  searchTitle(): void {
    this.page = 1;
    this.retrievemembers();
  }

  openModal(): void {
    this.memberModal.nativeElement.classList.add('show');
    this.memberModal.nativeElement.style.display = 'block';
    }

  closeModal(): void {
    this.memberModal.nativeElement.classList.add('hide');
    this.memberModal.nativeElement.style.display = 'none';
    
    this.Member={
      num:0,
      name:'',
      familyName:'',
      nationality:'',
      identityDocument:'',
      identityNumber:'',
      accountApproved:false
    };

  }

  submitForm(): void {
    this.MemberService.addMemberData(this.Member).subscribe(
      (response) => {
        console.log('Member data sent successfully:', response);
          this.retrievemembers();
          Swal.fire('Success', 'This member has been registred successfully!', 'success');

        },
        (error) => {
          console.error('Error sending competition data:', error);

          // Check if error.error.error is an array
          if (Array.isArray(error.error.error)) {
            const errorMessage = error.error.error.join('<br>'); 
            Swal.fire({
              icon: 'error',
              title: 'Error',
              html: errorMessage  
            });
          } else {
            console.log('Unexpected error structure:', error.error);
            Swal.fire('Error', error.error, 'error'); 
          }
  
        }
    );
    this.closeModal();
  }
}
