import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { MembersService } from 'src/app/services/members/members.service';

@Component({
  selector: 'app-add-members',
  standalone: false,
  templateUrl: './add-members.component.html',
  styleUrl: './add-members.component.scss'
})
export class AddMembersComponent {
  addMembersForm: FormGroup;
  showAddMemberForm = false;
  submitted: boolean = false
  companyId: any = localStorage.getItem('companyId');
  constructor(private fb: FormBuilder, private svc: MembersService) {
    this.addMembersForm = this.fb.group({
      companyId: [this.companyId ?  Number(this.companyId) : null],
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
      this.onSubmit();
      this.addMembersForm.reset();
      this.members.clear();
      this.members.push(this.createMemberForm()); // Reset to one empty form group
    }
  }


  toggleAddMemberForm() {
    this.showAddMemberForm = !this.showAddMemberForm;
  }


  submit(){
    console.log('Form submitted!');

  }



  onSubmit() {
    this.submitted = true;
    let finalData = this.addMembersForm.value;
    console.log("add members data", finalData);
    // stop here if form is invalid
    if (this.addMembersForm.invalid) {
      return;
    } else{
      this.svc.addTeam(finalData).subscribe({
        next: (response: any) => {
          console.log("added successfully", response);
          this.handleRequestSuccess(response);
          window.location.reload()
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



  }



  private handleRequestSuccess(response: any) {
    // const msg = 'An error occurred while fetching users. Loading dummy data as fallback.';
    const msg = 'Data Added Successfully.';
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


