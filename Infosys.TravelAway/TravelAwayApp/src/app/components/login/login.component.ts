import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelAwayService } from '../../travelAway-services/travel-away.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  status!: number ;
  errorMsg!: string ;
  msg: string= "";
  showDiv: boolean = false;
  name: string ="";
  loginRole: number;
  rolename: string = "";
  constructor(private readonly travelAwayService: TravelAwayService, private readonly router: Router, private readonly route: ActivatedRoute) {
    this.loginRole = Number.parseInt(this.route.snapshot.params['loginRole']);
    if (this.loginRole == 1) this.rolename = "Customer";
  
  }

 
  submitLoginForm(form: NgForm) {
    console.log(form.value.email, form.value.password);
    this.travelAwayService.validateCredentials(form.value.email, form.value.password, 1).subscribe({
      next: (responseLoginStatus) => {
        this.status = responseLoginStatus;
        this.showDiv = true;
        if (this.status === 1) {
          this.msg = "Login Successful";
          sessionStorage.setItem('userName', form.value.email);
          sessionStorage.setItem('userRole', "Customer");
          this.router.navigate(['/viewPackages']);
        } else {
          this.msg = "Try again with valid credentials.";
        }
      },
      error: (responseLoginError) => {
        this.errorMsg = responseLoginError;
      },
      complete: () => {
        console.log("SubmitLoginForm method executed successfully");
      }
    });

  }
}
