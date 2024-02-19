import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NbAuthService } from '@nebular/auth';
import { NbToast, NbToastrService } from '@nebular/theme';
import { tap } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: NbAuthService, private router: Router, private toast: NbToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(
        () => { },
        (error) => {
          // Log out user if unauthorized (token expired)
          if (error.status === 401) {
            this.authService.logout('email');
            this.router.navigateByUrl("/auth/login");
          } else if (error.status >= 500) {
            this.toast.danger('Internal server error. Please try again later.', 'Error');
          }
        }
      )
    );
  }
}