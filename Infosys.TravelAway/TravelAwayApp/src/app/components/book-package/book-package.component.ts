import { Component, OnInit } from '@angular/core';
import { TravelAwayService } from '../../travelAway-services/travel-away.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IBookPackage } from '../../interfaces/BookPackage';

@Component({
  selector: 'app-book-package',
  templateUrl: './book-package.component.html',
  styleUrls: ['./book-package.component.css']
})
export class BookPackageComponent implements OnInit {
  bookingId!: number
  packageId!: number
  errorMsg: string = ""
  userRole!: string
  amount: number = 0
    customerLayout: boolean=false;
 

  constructor(private readonly service: TravelAwayService, private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole') ?? "";
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    }
    this.packageId =Number.parseInt(this.route.snapshot.params['packageId']);
    this.amount = Number.parseInt(this.route.snapshot.params['amount']);
 
  }


  submitBookForm(form: NgForm) {
    let email = sessionStorage.getItem("userName") ?? "";
    

    let bookObj: IBookPackage = {
      bookingId:0,
      contactNumber: form.value.contactNumber,
      emailId: email,
      address: form.value.address,
      dateOfTravel: form.value.dateOfTravel,
      numberOfAdults: Number.parseInt(form.value.adults),
      numberOfChildren: Number.parseInt(form.value.children),
      status: "Booked",
      packageId: this.packageId
    }

    this.service.bookPackage(bookObj).subscribe({
      next: (responseData) => {
        this.bookingId = responseData
        if (this.bookingId > 0) {
          bookObj.bookingId = responseData
          const proceed = confirm(
            'You\'ll be redirected to the payment page to complete your booking.\nDo you want to continue  ?'
          );

          if (proceed) {
            this.router.navigate(['/payment', this.bookingId, this.amount * bookObj.numberOfAdults]);
          } else {
            this.router.navigate(['/']);
          }
        }
        else {
          alert("Failed try again")
        }
      }, error: (responseError) => {
        this.errorMsg = responseError
        console.log(this.errorMsg);
      }, complete: () => { console.log("Executed successfully"); }
    });
  }

}
