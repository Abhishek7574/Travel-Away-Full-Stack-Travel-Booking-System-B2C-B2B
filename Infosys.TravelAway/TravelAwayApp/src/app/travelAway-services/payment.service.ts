import { Injectable } from '@angular/core';
import { IPayment } from '../interfaces/Payment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private readonly http: HttpClient) { }

  addPayment(payment: IPayment): Observable<boolean> {
    const url = 'https://localhost:7015/apiGateway/AddPayment';
    return this.http.post<boolean>(url, payment)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError( () => error.message || 'Server Error');
  }
}
