import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { TravelAwayService } from '../../travelAway-services/travel-away.service';
import { ICustomer } from '../../interfaces/Customer';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  msg: string = '';
  showDiv: boolean = false;
  res: boolean = false
  constructor(private readonly travelAwayService: TravelAwayService, private readonly router: Router) { }



  SubmitForm(form: NgForm) {

    const customer: ICustomer = {
      emailId: form.value.emailId,
      roleId: 1,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      userPassword: form.value.password,
      gender: form.value.gender,
      contactNumber: Number(form.value.contactNumber),
      dateOfBirth: form.value.dateOfBirth,
      address: form.value.address
    };

    console.log("Customer Object:", customer);

    this.travelAwayService.addUserDetails(customer).subscribe({
      next: (data) => {
        this.showDiv = true;
        this.res = data;
        if (this.res) {
          this.msg = "Registered Successfully";
          sessionStorage.setItem('userName', customer.emailId);
          sessionStorage.setItem('userRole', "Customer");
          this.router.navigate(['/login/1']);
        } else {
          console.log(data);
          this.msg = "Registration failed";
        }
      },
      error: (err) => {
        console.log(err);
        this.showDiv = true;
        this.msg = "Server error while registering";
      }
    });

  }
}
