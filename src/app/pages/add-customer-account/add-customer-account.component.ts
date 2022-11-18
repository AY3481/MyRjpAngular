import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { CommonService } from 'src/app/_services/common/common.service';
import { ProxyService } from 'src/app/_services/proxy.service';

@Component({
  selector: 'app-add-customer-account',
  templateUrl: './add-customer-account.component.html',
  styleUrls: ['./add-customer-account.component.css']
})
export class AddCustomerAccountComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddCustomerAccountComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, 
    private commonSvc: CommonService, private proxyService: ProxyService) { }

    id!: number;
  
    title!: string
    form!: FormGroup;
    
    ngOnInit(): void {
      this.title = this.data?.title;
      this.id = this.data?.id;
      
      this.form = this.fb.group({
        CustomerId: [this.id],
        InitialCredit: ['0', [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]],
      });
      
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
         
    addCustomerAccount(){
      let custDto = this.form.value;
      this.proxyService.addCustomerAccount(custDto).subscribe(x => {
        this.commonSvc.showSnack("S", "Account successfully created.");
        this.resetForm();
  
        this.dialogRef.close(custDto);
      });
    }
    
    resetForm() {
      this.form.reset();
    }
    
    onCloseClick() {
      this.dialogRef.close();
    }
  
    onSaveClick() {
      if (this.form.valid){
        this.addCustomerAccount();
        //this.dialogRef.close(this.form.value);
      }
    }

}
