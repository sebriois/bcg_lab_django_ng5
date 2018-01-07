import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";
import "rxjs/add/operator/do";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // trick from: https://github.com/angular/angular/issues/18224#issuecomment-316957213
    const auth = this.injector.get(AuthService);

    // Get the auth header from the service.
    const authHeader = auth.getAuthorizationHeader();

    // Clone the request to add the new header.
    const authReq = req.clone({setHeaders: {Authorization: authHeader}});

    // Pass on the cloned request instead of the original request.
    return next.handle(authReq).do(
      (event: HttpEvent < any > ) => {
        if (event instanceof HttpResponse) {
          console.log('--> event: ', event);
          console.log('--> status: ', event.status);
        }
        return event;
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log('--> error: ', err);
          console.log('--> errorStatus: ', err.status);
          if (err.status === 401) {
            auth.logout();
          }
        }
        return err;
      }
    );
  }
}
