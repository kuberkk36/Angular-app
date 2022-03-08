import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

const USEREMAIL_KEY = 'USERNAME';
const USERID_KEY = "USERID";
const USERTYPE_KEY = "ISADMIN"

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userEmail:any;
  constructor(private http: HttpClient,
    private router:Router,
    private toastr:ToastrService) {}

    /**
     * 
     * @param user 
     * @returns 
     */
  addUser(user: any){
    return this.http.post(environment.API_ENDPOINT+'addUser', user);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  findUserById(id: any) {
    return this.http.get(environment.API_ENDPOINT+`findUserById/${id}`);
  }

  /**
   * 
   * @param user 
   * @param idUser 
   * @returns 
   */
  editUser(user: any, idUser: number) {
    return this.http.put(environment.API_ENDPOINT+`editUser/${idUser}`, user);
  }

  /**
   * 
   * @param idUser 
   * @returns 
   */
  deleteUser(idUser: number){
    return this.http.delete(environment.API_ENDPOINT+`deleteUser/${idUser}`);
  }

  /**
   * 
   * @param email 
   * @returns 
   */
  findByUsername(email: string): Observable<any> {
    return  this.http.get<any>(environment.API_ENDPOINT+`findByUsername/${email}`);
  }

  /**
   * 
   * @param userName 
   * @param userId 
   * @param isAdmin 
   */
  saveUsername(userName: string,userId: string,isAdmin: string) {
    localStorage.removeItem(USEREMAIL_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(USERTYPE_KEY);
    localStorage.setItem(USEREMAIL_KEY, userName);
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(USERTYPE_KEY, isAdmin)
  }

  /**
   * 
   * @returns 
   */
  getUserName() {
    return localStorage.getItem(USEREMAIL_KEY);
  }
  /**
   * 
   * @returns 
   */
  getUserId(){
    return localStorage.getItem(USERID_KEY)
  }

  /**
   * 
   * @returns 
   */
  getUserRole(){
    return localStorage.getItem(USERTYPE_KEY)
  }
/**
 * Method to signout
 */
  signOut() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  /**
   * User validation method
   * @returns 
   */
  userLoginValidation(){
    this.userEmail = this.getUserName()
    if(this.userEmail == null){
      this.router.navigate(['/'])
    }
    let isAdmin:any = this.getUserRole()
    if(isAdmin != null){
      return JSON.parse(isAdmin)
    }
  }

  /**
   * Method to Check if user exists
   */
  checkIfUserSessionExists(){
    let userEmail = this.getUserName()
    if(userEmail != null){
      this.router.navigate(['/home'])
    }
  }


  /**
   * 
   * @param value 
   */
  errorToast(value: string) {
    this.toastr.error(value, '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
  }

  /**
   * 
   * @param value 
   */
   warningToast(value: string) {
    this.toastr.warning(value, '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
  }

  /**
   * 
   * @param value 
   */
  successToast(value: string) {
    this.toastr.success(value, '', { timeOut: 3000,positionClass: 'toast-bottom-right'});
  }
}
