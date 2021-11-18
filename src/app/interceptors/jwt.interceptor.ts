import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentToken = this.authService.currentTokenValue;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if(currentToken && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentToken}`,
        },
      })
    }

    return next.handle(request);
  }
}
