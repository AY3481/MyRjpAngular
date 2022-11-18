import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../_shared/confirmation-dialog/confirmation-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonService {

  //-----------------
  private loaderShow = new BehaviorSubject<boolean>(false); // {1}  
  loaderState = this.loaderShow.asObservable();

  //-----------------
  private snackBarRef: any;

  constructor(private matSnackBar: MatSnackBar, private dialog: MatDialog) { }
     
  showLoader() {
    this.loaderShow.next(true);
  }
  hideLoader() {
    this.loaderShow.next(false);
  }

  showSnack(type: string, message: string, action?: string) {
    switch(type.toUpperCase()){
      case "S":
        this.snackBarRef = this.matSnackBar.open(message, action, { duration: 3000, panelClass: ['mat-snack-bar-container-success'] });
        break;
      case "E":
        this.snackBarRef = this.matSnackBar.open(message, action, { panelClass: ['mat-snack-bar-container-error'] }); //verticalPosition: 'bottom|bottom'
        /*this.snackBarRef.onAction().subscribe(() => {
          console.log('The snack-bar action was triggered!');
        });*/
    }    
    //https://github.com/angular/material2/blob/master/src/lib/snack-bar/snack-bar-config.ts
  }

  hideSnack() {
    if (this.snackBarRef){
      this.snackBarRef.dismiss();
    }
  }

  showConfirmation(title: string, message: string, OK_Callback: () => any, Cancel_Callback: () => any){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, { disableClose: true,  data: { title: title, message: message } });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true){
        if (OK_Callback){
          OK_Callback();
        }
      }
      else{
        if (Cancel_Callback){
          Cancel_Callback();
        }
      }
      //console.log(`Dialog closed: ${result}`);      
    });
  }

  openDialog<T, D>(dialogTitle: string, componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: MatDialogConfig<D>){    
    if (config != null){
      if (config.data != null){
        config.data = Object.assign(config.data, { title: dialogTitle });
      }
      else {
        config.data = <any> { title: dialogTitle }; //Object.assign(config.data, { title: dialogTitle });
      }
    }
    else {
      config = new MatDialogConfig(); 
      config.data = <any> { title: dialogTitle };      
    }
    return this.dialog.open(componentOrTemplateRef, config);
  }

}
