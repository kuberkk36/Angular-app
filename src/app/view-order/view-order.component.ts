import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.less']
})
export class ViewOrderComponent implements OnInit {

  products:any;
  isAdmin:boolean =false
  orderData:any
  orderDetails:any;
  totalQuantity:number = 0;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.userLoginValidation()
    this.orderData = localStorage.getItem('order')
    if(this.orderData != null){
      this.orderData = JSON.parse(this.orderData)
    }
    this.orderDetails = this.orderData.carts
    this.totalQuantity = this.orderData.quantity
  }

  

}
