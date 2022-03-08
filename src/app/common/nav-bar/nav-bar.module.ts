import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarRoutingModule } from './nav-bar-routing.module';
import { sharedModule } from 'src/app/shared-module.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NavBarRoutingModule,
    sharedModule,
  ]
})
export class NavBarModule { }
