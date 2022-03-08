import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewOrderRoutingModule } from './view-order-routing.module';
import { ViewOrderComponent } from './view-order.component';
import { sharedModule } from '../shared-module.module';


@NgModule({
  declarations: [
    ViewOrderComponent
  ],
  imports: [
    CommonModule,
    ViewOrderRoutingModule,
    sharedModule
  ]
})
export class ViewOrderModule { }
