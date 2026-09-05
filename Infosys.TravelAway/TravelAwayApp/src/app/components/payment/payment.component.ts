import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPayment } from '../../interfaces/Payment';
import { PaymentService } from '../../travelAway-services/payment.service';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  bookingId!: number;
  amount!: number;
  isProcessing = false;

  payment: IPayment = {
    paymentId: 0,
    bookingId: this.bookingId,
    Amount: this.amount,
    paymentStatus: 'Completed',
    createdAt: new Date().toISOString()
  };

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly paymentService: PaymentService
  ) {
    this.bookingId = this.route.snapshot.params['bookingId'];
    this.amount = this.route.snapshot.params['amount'];

  }

  payNow() {
    this.isProcessing = true;

    this.paymentService.addPayment(this.payment).subscribe({
      next: (res) => {
        if (res) {
          setTimeout(() => {
            this.isProcessing = false;
            alert('Payment Successful! Booking Confirmed.');
            this.router.navigate(['']);
          }, 2000);
        } else {
          setTimeout(() => {
            this.isProcessing = false;
            alert('Payment Failed! Booking Try Again.');
          }, 2000);
        }
      },
      error: (err) => {
        console.log(err);
        setTimeout(() => {
          this.isProcessing = false;
          alert('Payment Failed! Booking Try Again.');
        }, 2000);
      },
      complete: () => {
        console.log('PayNow Method is Completed');
      }
    });


    console.log('PayNow Method is Completed');
  }
}
