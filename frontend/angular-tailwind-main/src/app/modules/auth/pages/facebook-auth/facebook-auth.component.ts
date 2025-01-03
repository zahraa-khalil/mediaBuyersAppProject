import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-facebook-auth',
  standalone: true,
  imports: [],
  templateUrl: './facebook-auth.component.html',
  styleUrl: './facebook-auth.component.scss'
})
export class FacebookAuthComponent {
  private apiUrl = environment.apiUrl;
  companyId!: number
  userId!: number;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private fbAuthService: AuthService) {

    this.companyId = Number(localStorage.getItem('companyId'))
  }


  ngOnInit() {
    console.log('facebook Component initialized', this.companyId);
    this.checkRouting()

  }

  // this redirects user to facebook for authentication
  onButtonClick(){
    this.fbAuthService.initiateFacebookAuth();
  }

  // this redirects user to facebook for re-authentication after token expiration
  onReAuthentication(){
    this.fbAuthService.initiateFacebookReAuthentication();
  }




  // This function to checks page routing
  // it gets called twice. first when user enters the page after login to choose to authenticate or not
  // second when user redirected from facebook after authentication or reauthentication
  // then the function checks if url includes "callback" ?  fires checkFacebookAuthCallback() to get acess token and completes the authentication process
  // if url doesn't iclude "callback", it checks user authentication status
  // if user is authenticated, redirect user to dashboard
  // if user is not authenticated, redirect user back to the facebook-auth page to authenticate
  checkRouting(): void {
    if (this.router.url.includes('callback')) {
      console.log('The URL includes "callback"');
      // Add your logic here (e.g., call the authentication callback logic)
      this.checkFacebookAuthCallback();
    } else {
      console.log('The URL does not include "callback"');
      this.checkAuthStatus();
    }
  }


  // auth/facebook redirects user to facebook for authentication
  // then facebook redirects user back to your app with the access token
  // checkFacebookAuthCallback gets the access token from the URL and sends it to your backend for processing
  // If authentication is successful, redirect user to dashboard
  // If authentication is not successful, redirect user back to the login page

  checkFacebookAuthCallback(): void {
    console.log('?????????? Checking Facebook Auth Callback');
    const accessToken = this.route.snapshot.queryParamMap.get('accessToken'); // Access token or other identifier

    console.log('Facebook Auth Callback received', accessToken);
    if (accessToken) {
      // Send the accessToken to your backend for processing
      const apiEndpoint = this.companyId
        ? 'auth/facebook/company-auth-callback'
        : 'auth/facebook/user-auth-callback';

        const payload = this.companyId
        ? { accessToken, companyId: this.companyId }
        : { accessToken };

        console.log('payload:', payload);
        console.log('API Endpoint:', `${this.apiUrl}/${apiEndpoint}`);

      this.http.post(`${this.apiUrl}/${apiEndpoint}`, payload).subscribe ({
        next: (response : any) => {
          console.log('Authentication successful', response);
          this.router.navigate(['/dashboard']); // Redirect to dashboard after success
        },
        error: (error) => {
          console.error('Authentication failed', error);
        }
      })

    } else {
      console.error('No accessToken or type found in query params');
    }
  }



  // this function checks if user is authenticated with Facebook or not
  // if not authenticated, it redirects user to the facebook-auth page
  // if authenticated, it redirects user to dashboard
  // It checks the routing parameters and redirects user accordingly
  // It is a common practice to check authentication status in ngOnInit() method
  // and redirect user accordingly in the component constructor or after login/logout actions
  // This is done for better performance and to avoid unnecessary HTTP requests in the component constructor
  // If you want to check authentication status in other parts of your application, you can call this function from those places as well
  // For example, in your main navigation component or in your dashboard component's constructor or ngOnInit() method

  checkAuthStatus() {
    if (this.companyId) {
      // Check company Facebook auth status

      this.fbAuthService.checkCompanyAuthStatus(this.companyId).subscribe((response) => {
        if (!response.isAuthenticated) {
          this.router.navigate(['../auth/facebook-auth']);
          console.log('User is not authenticated with Facebook for this company');
        } else {
          this.router.navigate(['/dashboard']); // Redirect to dashboard
        }
      });
    } else if (this.userId) {
      this.fbAuthService.checkUserAuthStatus(this.userId).subscribe((response) => {
        if (!response.isAuthenticated) {
          this.fbAuthService.initiateFacebookAuth();
        } else {
          this.router.navigate(['/dashboard']); // Redirect to dashboard
        }
      });
    }
  }



  }

