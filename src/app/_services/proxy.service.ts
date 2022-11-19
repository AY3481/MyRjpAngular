import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../_helpers/api';

@Injectable()
export class ProxyService {

  constructor(private api: Api) { }

  getCustomerTransactions(): Observable<any> {
    return this.api.get("Customer/customer-transactions");
  }
  
  addCustomerAccount(data: any): Observable<any> {
    return this.api.post("Customer/create-account", data);
  }
  getCustomers(): Observable<any> {
    return this.api.get("Customer");
  }

  getCustomer(id: number): Observable<any> {
    return this.api.get("Customer/" + id);
  }

  addCustomer(data: any): Observable<any> {
    return this.api.post("Customer", data);
  }

  updateCustomer(id: number, data: any): Observable<any> {
    return this.api.put("Customer/" + id, data);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.api.delete("Customer/" + id);
  }

  getAllAlarms(){    
    return this.api.post("GetAllAlarms", {});
  }

  getPlantInfo(){
    return this.api.post("GetPlantInfo", {});
  }
}
