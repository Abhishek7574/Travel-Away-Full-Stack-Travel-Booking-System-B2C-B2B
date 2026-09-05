import { Component, OnInit } from '@angular/core';
import { IBookPackage } from '../../interfaces/BookPackage';
import { TravelAwayService } from '../../travelAway-services/travel-away.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-booked-package',
  templateUrl: './view-booked-package.component.html',
  styleUrls: ['./view-booked-package.component.css']
})
export class ViewBookedPackageComponent implements OnInit {
  bookedPackages: IBookPackage[] = [];
  errorMessage: string = '';
  email:string=""
    userRole: string="";
    customerLayout: boolean=false;

  constructor(private readonly travelService: TravelAwayService, private readonly router:Router) { }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole') ?? "";
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    }

    this.email = sessionStorage.getItem('userName') ?? "";
    this.getBookings()

  }

  getBookings(): void {

    this.travelService.viewBookPackage(this.email).subscribe({
      next: (responseData) => {
        this.bookedPackages = responseData;
        console.log('Bookings fetched successfully:', this.bookedPackages);
      },
      error: (responseError) => {
        this.errorMessage = 'Failed to load bookings. Please try again later.';
        console.error(responseError);
      }, complete: () => { console.log("Sucessfully Added"); }
    });
  }
  ratePackage(booking: IBookPackage): void {
    this.router.navigate(['/rate', booking.bookingId])
  }
}
