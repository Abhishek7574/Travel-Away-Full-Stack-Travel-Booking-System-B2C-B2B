import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPackageDetails } from '../../interfaces/PackageDetails';
import { TravelAwayService } from '../../travelAway-services/travel-away.service';

@Component({
  selector: 'app-view-package-details',
  templateUrl: './view-package-details.component.html',
  styleUrls: ['./view-package-details.component.css']
})
export class ViewPackageDetailsComponent implements OnInit {
  packageId: string="";
  packageName: string = "";
  packageDetails: IPackageDetails[]=[];
  showMsgDiv: boolean = false;
  errMsg: string = "";
  userRole: string = "";
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  constructor(private readonly _TravelAwayService: TravelAwayService, private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole')??"";
    if (this.userRole != "Customer") {
      this.router.navigate(['/login/1']);
    } else if (this.userRole == "Customer") {
      this.customerLayout = true;
    }
    this.packageId = this.route.snapshot.params['packageId'];
    this.packageName = this.route.snapshot.params['packageName'];

    this.getPackageDetails(this.packageId);

    if (this.packageDetails == null) {
      this.showMsgDiv = true;
    }
  }


  getPackageDetails(packageId: string) {
    this._TravelAwayService.getPackageDetails(packageId).subscribe({
      next: (responseData) => {
        this.packageDetails = responseData;
        console.log(this.packageDetails);
        this.showMsgDiv = false;
      },
      error: (responseError) => {
        this.packageDetails = [];
        this.errMsg = responseError;
        console.log(this.errMsg);
      },
      complete: () => console.log("GetPackageDetails method excuted successfully")
    });
  }
  navigateToBookPackage(pck: IPackageDetails) {
 
    this.router.navigate(['bookpkg', pck.packageDetailsId, pck.pricePerAdult]);
  }

}
