import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {

  isAdmin:boolean = false
  orderList:any = []
  show: boolean = false;
  orderItem:any;
  orderStatusType:any = ['IN-TRANSIT','OUT-FOR-DELIVERY','DISPATCHED','DELIVERED']
  newStatus:any;
  @ViewChild('orderModal') private closeOrderModal!: ElementRef;
  constructor(private userService:UserService,
    private productService:ProductService,
    private router:Router) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.userLoginValidation()
    this.refreshOrders()
  }

  /**
   * Method get all order for user
   */
  findAllOrdersByUserEmail(){
    this.productService.getOrdersByEmail(this.userService.getUserName()).subscribe((data:any)=>{
      this.orderList = data
      this.closeOrderModal.nativeElement.click()
    },(err: HttpErrorResponse) => {
      if(err){
        this.userService.errorToast(err.error.message)
      }
    });
  }


  /**
   * Method get all order
   */
  findAllOrders(){
    this.productService.getAllOrders().subscribe((data:any)=>{
      this.orderList = data
    },(err: HttpErrorResponse) => {
      if(err){
        this.userService.errorToast(err.error.message)
      }
    });
  }

  /**
   * Method to refresh the data
   */
  refreshOrders(){
    if(this.isAdmin){
      this.findAllOrders()
    }else{
      this.findAllOrdersByUserEmail()
    }
  }

  /**
   * Method to show update order status
   */
  showModal(){
    this.show = !this.show
  }



  /**
   * Method to change order status
   * @param event 
   */
  changeOrderStatus(event:any){
    this.newStatus = event.target.value
    
  }

  /**
   * Method to update order status
   */
  saveOrderStatus(){
    let item:any = this.orderItem
    item.status = this.newStatus
    this.productService.saveOrderStatus(item).subscribe((data:any)=>{
      this.refreshOrders()
      this.closeOrderModal.nativeElement.click();
      this.userService.successToast('Order Status Changed')
      
    },(err: HttpErrorResponse) => {
      if(err){
        this.userService.errorToast(err.error.message)
      }
    });
  }

  /**
   * Method to set Order item
   * @param item 
   */
  setOrder(item:any){
    this.orderItem = item;
  }

  /**
   * Method to navigate and set item in local storage
   * @param item 
   */
  setOrderToView(item:any){
    localStorage.removeItem('order')
    localStorage.setItem('order',JSON.stringify(item))
    this.router.navigate(['/view-orders'])
  }
}
