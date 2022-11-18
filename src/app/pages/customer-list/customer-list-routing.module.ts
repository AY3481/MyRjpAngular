import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustListComponent } from './customer-list.component';

const routes: Routes = [{ path: '', component: CustListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustListRoutingModule { }
