import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { NbAuthSimpleToken, NbTokenService } from '@nebular/auth';
import { Injectable } from "@angular/core";
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: NbTokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Add Bearer token to request headers
    return this.tokenService.get().pipe(
      switchMap((res: NbAuthSimpleToken) => {
        const token = res.getValue();
        const authReq = req.clone({
          setHeaders: { Authorization: 'Bearer ' + token },
        });

        return next.handle(authReq);
      })
    );

  }
}