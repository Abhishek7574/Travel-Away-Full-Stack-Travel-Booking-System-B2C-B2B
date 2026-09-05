import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelAwayService } from '../../travelAway-services/travel-away.service';
import { NgForm } from '@angular/forms';
import { ICustomer } from '../../interfaces/Customer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  msg: string="";
  emailId: string = "";
  errorMsg: any;
  status: boolean=false;
  firstName: string = "";
  lastName: string = "";
  contact: string="";
  dob!:Date;
  address: string="";
  userRole: string = "";
  gender: string = "";
  customer!: ICustomer;
  showDiv: boolean = true;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  constructor(private readonly router: Router, private readonly _TravelAwayService: TravelAwayService, private readonly ac: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.emailId = sessionStorage.getItem("userName")??"";
    this.userRole = sessionStorage.getItem('userRole')??"";
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    }
    else {
      this.commonLayout = true;
    }
  
    this.getCustomerDetails(this.emailId);

  }

  getCustomerDetails(emailId: string) {
    this._TravelAwayService.GetCustomerByEmail(emailId).subscribe(
      (api: any) => {

        console.log('Raw API:', api);

        const customer: ICustomer = {
          emailId: api.emailId,
          userPassword: api.userPassword,
          firstName: api.firstName,
          lastName: api.lastName,
          roleId: api.roleId,
          gender: api.gender,
          dateOfBirth: new Date(api.dateOfBirth),
          address: api.address,
          contactNumber: api.contactNumber
        };

        // ✅ bind to form
        this.firstName = customer.firstName;
        this.lastName = customer.lastName;
        this.gender = customer.gender;
        this.address = customer.address;
        this.contact = customer.contactNumber?.toString() ?? '';
        this.dob = api.dateOfBirth; // already yyyy-MM-dd

        
      },
      error => console.error(error)
    );
  }

  SubmitForm(form: NgForm) {
    this._TravelAwayService.updateUserDetails(form.value.firstName, form.value.lastName, this.emailId,
      "", Number.parseInt(form.value.contactNumber), form.value.address, form.value.gender, form.value.dateOfBirth, 1).subscribe({
        next: (responseUpdateStatus) => {
          this.status = responseUpdateStatus;
          this.showDiv = true;
          if (this.status) {
            this.msg = "Updation Successfully";
            alert('details updated')
            this.router.navigate(['/home']);


          } else {
            this.msg = "Not able to update";
            this.router.navigate(['/home']);
          }
        },
        error: (responseUpdateError) => {
          this.errorMsg = responseUpdateError;
        },
        complete: () => console.log("Updated method executed successfully")
      });
  }

}

