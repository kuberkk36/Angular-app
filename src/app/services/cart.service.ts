import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const NAME_KEY = 'NAME';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  /**
   * 
   * @param order 
   * @returns 
   */
  placeOrderService(order:any){
    return this.http.post(environment.API_ENDPOINT+`orders`,order)
  }

}
