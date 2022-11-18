import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer';
import { CommonService } from 'src/app/_services/common/common.service';
import { ProxyService } from 'src/app/_services/proxy.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEditCustomerComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, 
    private commonSvc: CommonService, private proxyService: ProxyService) { }

  id!: number;
  
  title!: string
  form!: FormGroup;
  
  ngOnInit(): void {
    this.title = this.data?.title;
    this.id = this.data?.id;
    
    this.form = this.fb.group({
      Name: ['', [Validators.required]],
      SurName: ['', [Validators.required]]
    }); 
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
   
  createAccount() {
    let account = this.fb.group({
      Id: ['0'],
      Number: ['', Validators.required]
    });

    return account;
  }

  addCustomer(){
    let custDto = this.form.value;
    this.proxyService.addCustomer(custDto).subscribe(x => {
      this.commonSvc.showSnack("S", "Customer successfully added.");
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
      this.addCustomer();
    }
  }

}
