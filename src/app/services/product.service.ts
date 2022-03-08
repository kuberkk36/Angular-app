import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {
  public addToCart: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * 
   * @param product 
   * @param image 
   * @returns 
   */
  addProduct(product: any,image:File) {
    let formData = this.buildObject(product,image,'');
    return this.http.post(environment.API_ENDPOINT+`addProduct`, formData);
  }

  /**
   * 
   * @param product 
   * @param image 
   * @param id 
   * @returns 
   */
  editProduct(product: any, image:File,id:any) {
    let formData = this.buildObject(product,image,id);
    return this.http.put(environment.API_ENDPOINT+`editProduct`, formData);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  deleteProduct(id: number) {
    return this.http.delete<any>(environment.API_ENDPOINT+`deleteProduct/${id}`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  findProductById(id: number){
    return this.http.get(environment.API_ENDPOINT+`findProductById/${id}`);
  }

  /**
   * 
   * @returns 
   */
  findAllProducts() {
    return this.http.get(environment.API_ENDPOINT+`findAllProducts`);
  }

  /**
   * 
   * @param name 
   * @returns 
   */
  findByName(name: string) {
    return this.http.get(environment.API_ENDPOINT+`findByName/${name}`);
  }

  /**
   * 
   * @param item 
   * @returns 
   */
  public setCartItems(item:any){
    return this.addToCart.next(item)
  }

  /**
   * 
   * @returns 
   */
  public getCartItems(){
    return this.addToCart.asObservable();
  }


  /**
   * 
   * @param email 
   * @returns 
   */
  public getOrdersByEmail(email:any){
    return this.http.get(environment.API_ENDPOINT+`getOrdersByEmail/`+email)
  }

  /**
   * 
   * @returns 
   */
  public getAllOrders(){
    return this.http.get(environment.API_ENDPOINT+`getAllOrder`)
  }

  /**
   * 
   * @param order 
   * @returns 
   */
  saveOrderStatus(order:any){
    return this.http.put(environment.API_ENDPOINT+`updateOrder`,order)
  }

  /**
   * 
   * @param product 
   * @param image 
   * @param id 
   * @returns 
   */
  buildObject(product:any,image:File,id:any){
    const formData: FormData = new FormData();
    formData.append("file", image);
    formData.append("description", product.productDescription);
    formData.append("price", product.price);
    formData.append("name", product.productName);
    formData.append("quantity",(product.quantity));
    formData.append("code",product.productCode)
    formData.append("id",id)
    return formData;
  }

}

