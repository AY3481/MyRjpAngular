import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../../_services/common/common.service';

@Component({
  selector: 'app-loader',
  template: `<mat-progress-bar mode="indeterminate" color="warn" *ngIf="show"></mat-progress-bar>`,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  //<div class='loader-container' *ngIf='show'><mat-spinner color='warn'></mat-spinner></div>
  show = false;
  private subscription: Subscription | any;
  
  constructor(private commonService: CommonService) { }
 
  ngOnInit() {     
    this.subscription = this.commonService.loaderState
          .subscribe((state: boolean) => {
              this.show = state;
          });
  }
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
