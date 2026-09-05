import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ViewPackagesComponent } from './components/view-packages/view-packages.component';
import { RegisterComponent } from './components/register/register.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ViewPackageDetailsComponent } from './components/view-package-details/view-package-details.component';
import { BookPackageComponent } from './components/book-package/book-package.component';
import { ViewBookedPackageComponent } from './components/view-booked-package/view-booked-package.component';
import { RatingComponent } from './components/rating/rating.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AuthGaurdService } from './travelAway-services/auth-Gaurd/auth-gaurd.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login/:loginRole', component: LoginComponent },
  { path: 'viewPackages', component: ViewPackagesComponent, canActivate: [AuthGaurdService] },
  { path: 'editdetails', component: EditProfileComponent, canActivate: [AuthGaurdService] },
  { path: 'register', component: RegisterComponent },
  { path: 'payment/:bookingId/:amount', component: PaymentComponent },
  { path: 'viewPackageDetails/:packageId/:packageName', component: ViewPackageDetailsComponent, canActivate: [AuthGaurdService] },
  { path: 'bookpkg/:packageId/:amount', component: BookPackageComponent, canActivate: [AuthGaurdService] },
  { path: 'viewbookings', component: ViewBookedPackageComponent, canActivate: [AuthGaurdService] },
  { path: 'rate/:bookingId', component: RatingComponent, canActivate: [AuthGaurdService] },
  { path: '**', component: HomeComponent }

];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);


