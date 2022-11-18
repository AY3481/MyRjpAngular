import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../_services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;                   // {1}                    
  formSubmitAttempt: boolean = false; // {2}
  flag: boolean = true;

  constructor(
    private fb: FormBuilder,          // {3}
    private authService: AuthService, // {4}
    private route: ActivatedRoute,
    private router: Router    
  ) {}

  ngOnInit() {
             
    this.form = this.fb.group({                 // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.f[field].valid && this.f[field].touched) ||
      (this.form.get(field)!.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {      
      this.authService.login(this.form.value)?.subscribe(x => {
        //alert(JSON.stringify(x));
        this.authService.saveToken(x.Token);
        this.authService.redirectSecured();
      });                                       // {7}      
    }
    //this.authService.login();
    this.formSubmitAttempt = true;              // {8}
  }


}
