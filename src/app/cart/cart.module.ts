import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { sharedModule } from '../shared-module.module';
import { CartComponent } from './cart.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    sharedModule,
  
  ]
})
export class CartModule { }
