import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-members',
  standalone: false,
  templateUrl: './add-members.component.html',
  styleUrl: './add-members.component.scss'
})
export class AddMembersComponent {
  addMembersForm: FormGroup;
  showAddMemberForm = false;

  constructor(private fb: FormBuilder) {
    this.addMembersForm = this.fb.group({
      members: this.fb.array([this.createMemberForm()])
    });
  }

  // Get members FormArray
  get members(): FormArray {
    return this.addMembersForm.get('members') as FormArray;
  }

  // Create a new member form group
  createMemberForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['media_buyer', Validators.required]
    });
  }

  // Add a new member form group to the array
  addMember() {
    this.members.push(this.createMemberForm());
  }

  // Remove a member from the array
  removeMember(index: number) {
    this.members.removeAt(index);
  }

  // Submit the form and log members
  addMembers() {
    if (this.addMembersForm.valid) {
      console.log('Members:', this.addMembersForm.value.members);
      // Add API integration here
      this.addMembersForm.reset();
      this.members.clear();
      this.members.push(this.createMemberForm()); // Reset to one empty form group
    }
  }


  toggleAddMemberForm() {
    this.showAddMemberForm = !this.showAddMemberForm;
  }


}
