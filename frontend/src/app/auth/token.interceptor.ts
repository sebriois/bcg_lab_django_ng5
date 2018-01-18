import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private router: Router
  ) {}

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
        return event;
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          if (err.status === 401 || err.status === 400) {
            auth.logout();
            auth.redirectUrl = req.url;
            this.router.navigate(['/login']);
          }
        }
        return err;
      }
    );
  }
}
