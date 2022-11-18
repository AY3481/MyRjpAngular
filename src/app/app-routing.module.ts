import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SecuredComponent } from './pages/secured/secured.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  //{ path: 'login', component: LoginComponent },
  { path: '', component: SecuredComponent,/*, canActivate: [AuthGuard],  resolve: { profile: ProfileResolve }*/
    children: [
    { 
      path: '', 
      redirectTo: '/custList', 
      pathMatch: 'full' 
    }, 
    { 
      path: 'custList', 
      loadChildren: () => import('./pages/customer-list/customer-list.module').then(m => m.CustListModule) 
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
