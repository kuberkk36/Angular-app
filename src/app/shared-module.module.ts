import { NgModule } from '@angular/core';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';


@NgModule({
    imports:
        [
            MatSidenavModule,
            RouterModule,
            MatProgressBarModule,
            FormsModule,
            ReactiveFormsModule,
            MatDialogModule,
            MatFormFieldModule,
            CommonModule,
            MatCardModule,
            
        ],

    declarations:
        [
            NavBarComponent,
            CartComponent
        ],

    exports:
        [
            NavBarComponent,
            CartComponent,
            MatSidenavModule,
            MatProgressBarModule,
            FormsModule,
            ReactiveFormsModule,
            MatDialogModule,
            MatFormFieldModule,
            MatCardModule
        ],
    providers:
    
        [{
            provide: MatDialogRef,
            useValue: {}
        },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {}
        }
           
        ],
})
export class sharedModule { }