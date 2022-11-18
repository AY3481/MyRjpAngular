import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

//import 'rxjs/add/observable/throw'
//import 'rxjs/add/operator/catch';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';

import { CommonService } from '../_services/common/common.service';
import { AuthService } from '../_services/common/auth.service';

// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// import { CommonToolsService } from '../services/common-tools.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
constructor(private commonSvc: CommonService, private authService: AuthService /*private spinnerService: Ng4LoadingSpinnerService, private commonToolsService: CommonToolsService*/) { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("intercepted request ... ");

        // Add JWT to each Request
        // --------------------------------
        const token = this.authService.getToken(); //sessionStorage.getItem("JWT_TOKEN");

        if (token) {
            // Clone the request to add the new header.
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }
        // --------------------------------

        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        // Clone the request to add the new header.    
        //const authReq = req.clone({ headers: req.headers.set('headername', 'headervalue')});    
        //const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem("ACCESS_TOKEN"))}); //sessionStorage.getItem("ACCESS_TOKEN")        
        
        //console.log("Sending request with new header now ...");
        //console.log("Show Loader!");

        this.commonSvc.hideLoader();
        this.commonSvc.showLoader();

        //send the newly created request    
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),           
            finalize(() => this.commonSvc.hideLoader()),         
            catchError((error: HttpErrorResponse) => {
                //intercept the response error and displace it to the console
                console.log("Error Occurred: ", error);                
                // let errorMessage = '';
                // if (error.error instanceof ErrorEvent) {
                //     // client-side error
                //     errorMessage = `Error: ${error.error.message}`;
                //   } else {
                //     // server-side error
                //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                //   }             
                //const error = err.error.message || err.statusText;
                this.commonSvc.showSnack('E', error.error.message != null ? error.error?.message : error.message, 'Dismiss');
                
                return throwError(() => error);
            }));
   
    }
}