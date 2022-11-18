import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CommonService } from 'src/app/_services/common/common.service';
import { ProxyService } from 'src/app/_services/proxy.service';
import { AddEditCustomerComponent } from '../add-edit-customer/add-edit-customer.component';
import { AddCustomerAccountComponent } from '../add-customer-account/add-customer-account.component';

@Component({
  selector: 'app-cust-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustListComponent implements OnInit {

  constructor(private proxyService: ProxyService, private commonSvc: CommonService) { }

  _List_Customers: Array<any> = [];

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.proxyService.getCustomerTransactions().subscribe(x => this._List_Customers = x);
  }

  onAddClick(){
    const dialogConfig = new MatDialogConfig();    
    dialogConfig.width = "500px";
    //dialogConfig.height = "500px";
    dialogConfig.autoFocus = true;
    let dialogRef = this.commonSvc.openDialog("Add Customer", AddEditCustomerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(x => {
      if (x != null){
        this.getCustomers();
      }
    });
  }

  onAddAccountClick(cust: Customer){
    const dialogConfig = new MatDialogConfig();    
    dialogConfig.width = "500px";
    //dialogConfig.height = "500px";
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        id: cust.Id
    };
    alert(cust.Id)
    let dialogRef = this.commonSvc.openDialog("Add Account for (" + cust.Name + ' ' + cust.SurName + ")", AddCustomerAccountComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(x => {
      //alert(JSON.stringify(x));
      if (x != null){
        this.getCustomers();
      }
    });
  }

}
