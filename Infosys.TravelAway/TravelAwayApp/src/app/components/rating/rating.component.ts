import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TravelAwayService } from '../../travelAway-services/travel-away.service';
import { IRatePackage } from '../../interfaces/RatePackage';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  bookingId: number=0
  status: boolean = false
  errormsg:string=""
  constructor(private readonly service: TravelAwayService, private readonly router: Router, private readonly route: ActivatedRoute) { }
  ngOnInit(): void {
    this.bookingId = Number.parseInt(this.route.snapshot.params['bookingId']);
    }

  submitForm(form: NgForm) {
    let rateObj: IRatePackage = {
      comments: form.value.comments,
      rating1: form.value.rating,
      bookingId: this.bookingId
    }

    this.service.ratePackage(rateObj).subscribe({
      next: (responseData) => {
        this.status = responseData;
        if (this.status) {
          alert("Successfully Added");
          this.router.navigate(['/viewbookings']);
        } else {
          alert("failed");
        }
      },
      error: (responseError) => {
        this.errormsg = responseError;
        console.log(responseError);
      },
      complete: () => {
        console.log("Executed");
      }
    });


  }
}
