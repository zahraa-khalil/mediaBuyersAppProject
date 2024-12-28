import { Component } from '@angular/core';
import { Member } from '../../../core/models/member.model';

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

   members: Member[] =[
    {
      name: "Sarah Davis",
      email: "john.doe@example.com",
      role: "manager",
      status: "pending"
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "media_buyer",
      status: "pending"
    },
    {
      name: "Emma Wilson",
      email: "alice.johnson@example.com",
      role: "media_buyer",
      status: "pending"
    },
    {
      name: "Chris Lee",
      email: "bob.brown@example.com",
      role: "manager",
      status: "pending"
    },
    {
      name: "Emily White",
      email: "emily.davis@example.com",
      role: "media_buyer",
      status: "pending"
    }
  ];


  constructor() {
    this.updatePagination();
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

}
