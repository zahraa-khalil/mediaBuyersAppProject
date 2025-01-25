import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgClass, NgIf } from '@angular/common';
import { passwordMatchValidator } from 'src/app/shared/validators/passwordMatchValidator.';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private svc: AuthService) {}



  ngOnInit(): void {

    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: passwordMatchValidator('password', 'confirmPassword'),
    }

    );
  }

  get f() {
    return this.form.controls;
  }


  togglePasswordTextType() {
    console.log('Toggled password text type');
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    // const { email, password } = this.form.value;
    let finalData = this.form.value;
    delete finalData.confirmPassword;

    console.log("register data", finalData);
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    } else{
      this.svc.register(finalData).subscribe({
        next: (response: any) => {
          console.log("register in successfully", response);
          this.handleRequestSuccess(response);
          this._router.navigate(['../auth/sign-in']);
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
    const msg = 'Data successfully registered. Please login.';
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
