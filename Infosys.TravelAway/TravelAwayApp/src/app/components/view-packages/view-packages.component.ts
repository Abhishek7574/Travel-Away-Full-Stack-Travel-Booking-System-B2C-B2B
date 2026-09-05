import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { TravelAwayService } from '../../travelAway-services/travel-away.service';
import { IPackage } from '../../interfaces/package';
import { ICategory } from '../../interfaces/Category';

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})


export class ViewPackagesComponent implements OnInit {

    packages: IPackage[] = [];
    categories: ICategory[] = [];
    filteredPackages!: IPackage[];
    errorMsg: string = "";
    showMsg: boolean = false;
    imagePath: string = "";
    userRole: string = "";
    customerLayout: boolean = false;
    commonLayout: boolean = false;

  constructor(
    private readonly travelawayService: TravelAwayService,
    private readonly router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole') ?? '';
    if (this.userRole !== 'Customer') {
      this.router.navigate(['/login/1']);
    } else {
      this.customerLayout = true;
    this.getPackages();
    this.getCategories();
    }
  }

  // 🔹 GET PACKAGES
  getPackages() {
    this.travelawayService.getPackages().subscribe({
      next: (responseGet) => {
        this.showMsg = false;

        // ✅ add image dynamically
        this.packages = responseGet.map(pkg => ({
          ...pkg,
          imageUrl: this.getImageByPackage(pkg.packageName)
        }));

        this.filteredPackages = this.packages;
      },
      error: (responseError) => {
        this.showMsg = true;
        this.packages = [];
        this.errorMsg = responseError;
      }
    });
  }

  // 🔹 GET CATEGORIES
  getCategories() {
    this.travelawayService.getCategories().subscribe({
      next: (responseGet) => {
        this.categories = responseGet;
      },
      error: (responseError) => {
        this.errorMsg = responseError;
        this.categories = [];
      }
    });
  }

  // 🔹 IMAGE MAPPING LOGIC
  getImageByPackage(packageName: string): string {
   
      if (packageName.includes('North')) {
        return 'assets/Images/NorthIndia.jpg';
      }
    if (packageName.includes('Malibu Islands')) {
        return 'assets/Images/MalibuIslands.jpg';
      }
      if (packageName.includes('Australia')) {
        return 'assets/Images/Australia.jpg';
    }
    if (packageName.includes('America')) {
      return 'assets/Images/America.jpg';
    }
    if (packageName.includes('Beauty')) {
      return 'assets/Images/BeautyofSouthIndia.jpg';
    }
    if (packageName.includes('Heart')) {
      return 'assets/Images/HeartofIndia.jpg';
    }
    if (packageName.includes('Himachal')) {
      return 'assets/Images/Himachal.jpg';
    }
    if (packageName.includes('Manali')) {
      return 'assets/Images/Manali.jpg';
    }
    if (packageName.includes('Maldives')) {
      return 'assets/Images/MalibuIslands.jpg';
    }
   
      return 'assets/Images/default.jpg';
    
  }

  // 🔹 FILTER BY CATEGORY
  searchPackageByCategory(categoryId: string) {
    if (categoryId === '0') {
      this.filteredPackages = this.packages;
      return;
    }

    const catId = Number.parseInt(categoryId);
    this.filteredPackages = this.packages.filter(
      pkg => pkg.packageCategoryId === catId
    );
  }

  // 🔹 VIEW DETAILS
  viewPackageDetails(packageId: number, packageName: string) {
    this.router.navigate(['viewPackageDetails', packageId, packageName]);
  }
}
