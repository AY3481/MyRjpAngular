import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustListRoutingModule } from './customer-list-routing.module';
import { CustListComponent } from './customer-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    CustListComponent
  ],
  imports: [
    CommonModule,
    CustListRoutingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CustListModule { }
