import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
const ORDER_STATUS = 'ORDER_PLACED';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {

  isCartBarOpen:boolean = true;
  cartItems:any = []
  cart:any= {};
  userId:any
  totalPrice:number = 0;
  userEmail:any;
  productIds:any = [];
  totalQuantity:number = 0;
  constructor(private productService:ProductService,
    private cartService:CartService,
    private userService:UserService) { 
    this.getCartItems()
  }

  ngOnInit(): void {
    this.userId = this.userService.getUserId()
    this.userEmail = this.userService.getUserName()

  }


  getCartItems(){
    this.productService.getCartItems().subscribe((data:any)=>{
      debugger
      if(data != undefined && data!=null){
          data.quantity--
          this.totalPrice = this.totalPrice + data.cartQuantity*data.price
          this.totalQuantity = ++this.totalQuantity
          this.cartItems.push(data)
        }
    })
  }

  placeOrder(){
    let cartList:any = []
    this.cartItems.forEach((item:any)=>{
      let productItem:any = {}
      item.selected = false
      productItem.price = item.price
      productItem.quantity = item.cartQuantity
      productItem.productName = item.productName
      productItem.productDescription = item.productDescription
      productItem.productIcon = item.productIcon
      productItem.productId = item.id
      productItem.userEmail = this.userEmail
      cartList.push(productItem);
    })
    let orderRequestBody:any = {}
    orderRequestBody.status = ORDER_STATUS;
    orderRequestBody.price = this.totalPrice
    orderRequestBody.createdBy = this.userEmail
    orderRequestBody.carts = cartList
    orderRequestBody.userEmail = this.userEmail
    orderRequestBody.quantity = this.totalQuantity

    this.cartService.placeOrderService(orderRequestBody).subscribe((data:any)=>{
      this.userService.successToast('Order Placed!')
      this.cartItems = []
      this.productIds = []
      this.totalPrice = 0
      this.totalQuantity = 0
    },(err: HttpErrorResponse) => {
      if(err){
        this.userService.errorToast(err.error.message)
      }
    });
  }

  addQuantity(i:number){
    this.cartItems[i].cartQuantity = ++this.cartItems[i].cartQuantity
    this.cartItems[i].quantity--
    this.totalQuantity = ++this.totalQuantity
    this.totalPrice = this.totalPrice + this.cartItems[i].price
    
  }

  removeQuantity(i:number){
    this.cartItems[i].cartQuantity = --this.cartItems[i].cartQuantity
    this.cartItems[i].quantity++
    this.totalQuantity = --this.totalQuantity
    this.totalPrice = this.totalPrice - this.cartItems[i].price
  }

  deleteItem(i:number,id:number){
    this.cartItems[i].selected = false
    this.cartItems[i].quantity = this.cartItems[i].cartQuantity + this.cartItems[i].quantity
    this.totalQuantity = this.totalQuantity - this.cartItems[i].cartQuantity
    this.totalPrice = this.totalPrice - this.cartItems[i].cartQuantity*this.cartItems[i].price
    this.cartItems.splice(i,1)
    
  }

}
