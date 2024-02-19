import { NgModule } from '@angular/core';
import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { NgxAuthComponent } from './auth.component';

@NgModule({
  imports: [
    NbLayoutModule,
    NbCardModule,
    NbAuthModule,
    NgxAuthRoutingModule,
  ],
  declarations: [
    NgxAuthComponent,
  ],
})
export class NgxAuthModule {
}