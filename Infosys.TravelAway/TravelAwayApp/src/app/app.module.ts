import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookPackageComponent } from './components/book-package/book-package.component';
import { RatingComponent } from './components/rating/rating.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonLayoutComponent } from './components/layouts/common-layout/common-layout.component';

import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ViewPackageDetailsComponent } from './components/view-package-details/view-package-details.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ViewBookedPackageComponent } from './components/view-booked-package/view-booked-package.component';


import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';

import { UserLayoutComponent } from './components/layouts/user-layout/user-layout.component';
import { ViewPackagesComponent } from './components/view-packages/view-packages.component';
import { TravelAwayService } from './travelAway-services/travel-away.service';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BookPackageComponent,
    RatingComponent,
    EditProfileComponent,
    ViewPackageDetailsComponent,
    RatingComponent,
    RegisterComponent,
    CommonLayoutComponent,
    HomeComponent,
    ViewPackageDetailsComponent,
    ViewBookedPackageComponent,
    RatingComponent,
    LoginComponent,
  
    CommonLayoutComponent,
    UserLayoutComponent,
    ViewPackagesComponent,

    PaymentComponent
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    HttpClientModule,
    FormsModule,

     ReactiveFormsModule, routing
  ],
  providers: [TravelAwayService],
  bootstrap: [AppComponent]
})
export class AppModule { }
