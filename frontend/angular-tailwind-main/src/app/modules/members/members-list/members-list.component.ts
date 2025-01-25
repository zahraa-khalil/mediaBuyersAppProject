import { Component } from '@angular/core';
import { Member } from '../../../core/models/member.model';
import { toast } from 'ngx-sonner';
import { MembersService } from 'src/app/services/members/members.service';

@Component({
  selector: 'app-members-list',
  standalone: false,
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss'
})

export class MembersListComponent {
  paginatedMembers: Member[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  companyId: any = localStorage.getItem('companyId');

   members: Member[] =[

  ];


  constructor(private svc: MembersService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getTeamMembersByCompany();
  }
  updatePagination() {
    this.totalPages = Math.ceil(this.members.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedMembers = this.members.slice(start, end);
  }


  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  removeMember(data: Member) {
    console.log('Removing member:');

  }


  getTeamMembersByCompany() {
      this.svc.getTeamMemebersByCompany(this.companyId).subscribe({
        next: (response: any) => {
          this.members = response;
          console.log("data retrieved successfully", this.members);
          this.updatePagination();
          // this.handleRequestSuccess(response);
          // localStorage.setItem('companyId', response.id);
          // this._router.navigate(['../dashboard']);
        },
        error: (error: any) => {
          console.error("Error", error);
          this.handleRequestError(error);

        },
        complete: () => {


        },
      });




  }



  private handleRequestSuccess(response: any) {
    // const msg = 'An error occurred while fetching users. Loading dummy data as fallback.';
    const msg = 'Data retrieved Successfully.';
    toast.success(msg, {
      position: 'bottom-right',
      description: response.message,
      action: {
        label: 'Close',
        onClick: () => console.log('Action!'),
      },
      actionButtonStyle: 'background-color:#0e6b05; color:white;',
    });
  }

  private handleRequestError(error: any) {
    // const msg = 'An error occurred while fetching users. Loading dummy data as fallback.';
    const msg = 'An error occurred.';
    toast.error(msg, {
      position: 'bottom-right',
      description: error.message,
      action: {
        label: 'Close',
        onClick: () => console.log('Action!'),
      },
      actionButtonStyle: 'background-color:#DC2626; color:white;',
    });
  }


}
