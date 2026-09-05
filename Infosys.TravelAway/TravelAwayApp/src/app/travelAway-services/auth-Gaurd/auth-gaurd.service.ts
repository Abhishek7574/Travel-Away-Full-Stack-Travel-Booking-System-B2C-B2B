import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private readonly _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('userName') == null) {
      alert("You must login to Page");
      this._router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
