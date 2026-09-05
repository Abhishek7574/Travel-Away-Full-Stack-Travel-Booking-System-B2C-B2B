import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBookPackage } from '../interfaces/BookPackage';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';
import { IRatePackage } from '../interfaces/RatePackage';
import { IPackageDetails } from '../interfaces/PackageDetails';
import { IPackage } from '../interfaces/package';
import { ICategory } from '../interfaces/Category';
import { ICustomer } from '../interfaces/Customer';



@Injectable({
  providedIn: 'root'
})
export class TravelAwayService {

  constructor(private readonly http: HttpClient) { }

  getPackageDetails(packageId: string): Observable<IPackageDetails[]> {
    let PackageId = { packageId: packageId };
    let temp = this.http.get<IPackageDetails[]>('https://localhost:7015/apiGateway/GetPackageDetailsByPackageId', { params: PackageId }).pipe(catchError(this.errorHandler));
    return temp;
  }

  bookPackage(bookObj: IBookPackage): Observable<number> {
    return this.http.post<number>('https://localhost:7015/apiGateway/AddBooking', bookObj).pipe(catchError(this.errorHandler))
  }

  ratePackage(rateObj: IRatePackage): Observable<boolean> {
    return this.http.post<boolean>('https://localhost:7015/apiGateway/Addrating', rateObj).pipe(catchError(this.errorHandler))
  }
  viewBookPackage(emailId: string): Observable<IBookPackage[]> {
    //const params = new HttpParams().set('emailId', emailId)
    return this.http.get<IBookPackage[]>('https://localhost:7015/apiGateway/ViewBookedPackage?emailId=' + emailId).pipe(catchError(this.errorHandler))
  }

  updateUserDetails(firstName: string, lastName: string, emailId: string,
    password: string, contactNumber: number, address: string, gender: string, dateOfBirth: Date, roleId: number): Observable<boolean> {
    let custObj: ICustomer;
    custObj = { emailId: emailId, userPassword: password, firstName: firstName, lastName: lastName, roleId: roleId, gender: gender, dateOfBirth: dateOfBirth, address: address, contactNumber: contactNumber };
    let temp = this.http.put<boolean>('https://localhost:7015/apiGateway/UpdateProfile', custObj).pipe(catchError(this.errorHandler));
    return temp
  }

  addUserDetails(customer: ICustomer): Observable<boolean> {
    console.log(customer)

    return this.http.post<boolean>('https://localhost:7015/apiGateway/RegisterCustomer', customer).pipe(catchError(this.errorHandler))
  }


  GetCustomerByEmail(emailId: string): Observable<ICustomer> {
    let CustId = { emailId: emailId };
    let temp = this.http.get<ICustomer>('https://localhost:7015/apiGateway/GetCustomerDetails', { params: CustId }).pipe(catchError(this.errorHandler));
    return temp;
  }




  

 
  //for login
  validateCredentials(email: string, pass: string, loginRole: number): Observable<any> {
    const loginPayload = {
      emailId: email,             
      userPassword: pass,         
      roleId: loginRole,
      firstName: "string",
      lastName: "string",
      gender: "string",
      contactNumber: 0,
      dateOfBirth: "2026-01-31",  
      address: "string"
    };

    // Send the payload
    return this.http.post<any>(
      'https://localhost:7015/apiGateway/ValidateLoginCustomer',
      loginPayload
    ).pipe(catchError(this.errorHandler));
  }
  getPackages(): Observable<IPackage[]> {
    let temp = this.http.get<IPackage[]>('https://localhost:7015/apiGateway/GetPackages').pipe(catchError(this.errorHandler))
    return temp;
  }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('https://localhost:7015/apiGateway/GetPackageCategories').pipe(catchError(this.errorHandler));
  }





  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(()=>error.message || "Server Error");
  }
}
