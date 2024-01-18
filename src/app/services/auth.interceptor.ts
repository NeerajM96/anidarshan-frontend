import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    // Check if the request body is FormData
    if (req.body instanceof FormData) {
      // Clone the request and append the access token to FormData
      const authRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      // Don't modify the FormData here, as it may not behave well with spreading
      return next.handle(authRequest);
    } else {
      // For non-FormData requests, include the access token in the body. using spread operator was not adding form data to request,
    //   so seperated requests for form data and non-form data
      const authRequest = req.clone({
        body: { ...req.body, accessToken },
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      return next.handle(authRequest);
    }
  }
}
