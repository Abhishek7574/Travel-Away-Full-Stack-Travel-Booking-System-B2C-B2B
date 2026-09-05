import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent {
  userRole: string;
  constructor(private readonly router: Router) { this.userRole = sessionStorage.getItem('userRole')??""; }


  logOut() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    this.router.navigate(['/login/1']);
  }
}
