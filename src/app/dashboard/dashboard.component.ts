import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  products:any
  isAdmin:boolean=false
  constructor(private productService:ProductService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  /**
   * Method to get all products
   */
  getAllProducts() {
    this.productService.findAllProducts().subscribe(
      (products: any) => {
        this.products = products;
      },(err: HttpErrorResponse) => {
      if(err){
        this.userService.errorToast(err.error.message)
      }
    });
  }

  /**
   * 
   */
  viewProduct(){
    this.isAdmin = this.userService.userLoginValidation()
    if(this.isAdmin == null){
      this.userService.warningToast('Please login to view product and check-out')
    }
  }


}
