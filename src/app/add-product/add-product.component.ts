import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.less']
})
export class AddProductComponent implements OnInit {

  fileToUpload: any;
  imageUrl:any;
  progressBar:boolean =false
  product:any;
  productForm:FormGroup
  productId:any;
  localStorageData:any;
  isAdmin:boolean = false
  constructor(private productService: ProductService,
    private userService:UserService,
    private router:Router) {
    this.productForm = new FormGroup({
      productName: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      productCode: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      price: new FormControl(null, [Validators.required, Validators.email,]),
      productIcon: new FormControl(null, [Validators.required]),
      productDescription: new FormControl(null, [Validators.required]),
      quantity:new FormControl(null, [Validators.required])
    })
   }

  ngOnInit(): void {
    this.localStorageData = localStorage.getItem("type")
    this.isAdmin = this.userService.userLoginValidation()
    if(!this.isAdmin){
      this.router.navigate(['/home'])
    }
    if(this.localStorageData != null)
      this.getProductById()
  }


  handleFileInput(file: any) {
    this.fileToUpload = file.files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  getProductById(){
    this.productId = localStorage.getItem("id")
    this.productService.findProductById(this.productId).subscribe(product => {
      this.product = product;
      this.productForm.patchValue({
        productName:this.product.productName,
        productCode:this.product.productCode,
        price:this.product.price,
        productDescription:this.product.productDescription,
        quantity:this.product.quantity
      })
    },(err: HttpErrorResponse) => {
      if(err){
        this.userService.errorToast(err.error.message)
      }
    });
  }
  

  addProduct() {
    this.progressBar = true;
    
    if (this.localStorageData != null && this.localStorageData == 'edit') {
      this.editProduct()
    } else {
      debugger
      this.productService.addProduct(this.productForm.value,this.fileToUpload).subscribe(product => {
        this.product = product;
        this.userService.successToast("Product Added!")
        this.router.navigate(['/home'])
      },(err: HttpErrorResponse) => {
        if(err){
          this.userService.errorToast(err.error.message)
        }
      });
    }
  }

  editProduct(){
      this.productService.editProduct(this.productForm.value, this.fileToUpload,this.product.id).subscribe(product => {
        this.product = product;
        this.userService.successToast("Product Updated!")
        this.router.navigate(['/home'])
      },(err: HttpErrorResponse) => {
        if(err){
          this.userService.errorToast(err.error.message)
        }
      });
  }

}
