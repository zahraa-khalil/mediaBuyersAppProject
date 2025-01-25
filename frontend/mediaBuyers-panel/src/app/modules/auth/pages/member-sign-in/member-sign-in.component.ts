import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-member-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],

  templateUrl: './member-sign-in.component.html',
  styleUrl: './member-sign-in.component.scss'
})
export class MemberSignInComponent {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private svc: AuthService) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {


    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { email, password } = this.form.value;
    let finalData = this.form.value;
    console.log("Login data", finalData);
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    } else{
      this.svc.login(finalData).subscribe({
        next: (response: any) => {
          console.log("Logged in successfully", response);
          this.handleRequestSuccess(response);
          localStorage.setItem('companyId', response.id);
      
          localStorage.setItem('memberName', response.name);
          localStorage.setItem('memberEmail', response.email);
          this._router.navigate(['../dashboard']);
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
    const msg = 'Logged in successfully. Welcome!';
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
