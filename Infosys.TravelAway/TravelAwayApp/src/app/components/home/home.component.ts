
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userRole: string | null = null;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
 
  constructor() {
    this.userRole = sessionStorage.getItem('userRole');
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    }
    else {
      this.commonLayout = true;
    }
  }



}
