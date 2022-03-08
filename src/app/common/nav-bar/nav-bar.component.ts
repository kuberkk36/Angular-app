import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent implements OnInit {

  registerForm:FormGroup;
  loginForm:FormGroup;
  user: any;
  isAdmin:boolean = false;
  @ViewChild('modalLoginForm') private closeLoginModal!: ElementRef;
  constructor(
    public router: Router,
    private userService: UserService
  ) { 
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/)]),
      email: new FormControl(null, [Validators.required, Validators.email,]),
      password: new FormControl(null, [Validators.required]),
      address:new FormControl(null,[Validators.required]),
      pincode:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]*$/)])
    })
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email,]),
      password: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.isAdmin = this.userService.userLoginValidation()
    if(this.router.url === '/dashboard')
    this.userService.checkIfUserSessionExists()
  }

  /**
   * Method to navigate and setting data in local storage
   * @param url 
   */
  navigate(url:string){
    localStorage.removeItem('type')
    localStorage.removeItem('id')
    this.router.navigate([url]);
  }

  /**
   * Method to Sign up
   */
  signUp(){
    this.userService.addUser(this.registerForm.value).subscribe((user:any) => {
      this.user = user;
      this.userService.successToast("User Registered!")
      this.closeLoginModal.nativeElement.click()
    },(err: HttpErrorResponse) => {
        this.userService.errorToast(err.error.message)
    });     
  }

   /**
   * Method to login
   */
  login(){
    this.userService.findByUsername(this.loginForm.value.email).subscribe((user:any)=>{
      this.user = user;
      
      if(this.user.password == this.loginForm.value.password){
        this.closeLoginModal.nativeElement.click()
        this.userService.saveUsername(user.email,user.id,user.isAdmin);
      this.router.navigate(['/home'])
      }else{
        this.userService.errorToast("Please enter valid password")
      }
    },(err: HttpErrorResponse) => {
      if(err){
        this.userService.errorToast("Please enter valid user name")
      }
    });
  }

  /**
   * Method to logout
   */
  logout(){
    this.userService.signOut();
  }

  /**
   * Method to reset Form
   */
  resetForm(){
    this.loginForm.reset()
    this.registerForm.reset()
  }

}
