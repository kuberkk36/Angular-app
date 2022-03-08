import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  products: any;
  userEmail:any;
  isAdmin:boolean = false
  constructor(private productService: ProductService,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.userLoginValidation()
    this.getAllProducts()
    
  }


  /**
   * Method to get all products
   */
  getAllProducts() {
    this.productService.findAllProducts().subscribe(
      (products: any) => {
        this.products = products;
        this.products.forEach((item:any)=>{
          item.selected = false
        })
      },(err: HttpErrorResponse) => {
      if(err){
        this.userService.errorToast(err.error.message)
      }
    });
  }

  /**
   * Method to set navigation data
   * @param item 
   */
  setNavigationData(item:any){
    localStorage.setItem("type","edit")
    localStorage.setItem("id",item.id)
  }

  /**
   * Method to add item to cart
   * @param item 
   */
  addToCart(item:any){
    item.cartQuantity = 1
    item.selected =true
    this.productService.setCartItems(item)

  }

  /**
   * Method to delete product
   * @param item 
   */
  deleteProduct(item:any){
    this.productService.deleteProduct(item.id).subscribe(() => {
      this.userService.successToast("Product deleted!")
      this.getAllProducts()
    },(err: HttpErrorResponse) => {
      if(err){
        this.userService.errorToast(err.error.message)
      }
    });
  }
}
