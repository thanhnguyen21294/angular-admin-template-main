import { Component } from '@angular/core';
import { NbAuthComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-authx',
  styles: [`
      nb-card {
        margin: 0;
        height: calc(100vh - 2 * 2.5rem);
      }

      .links nb-icon {
        font-size: 2.5rem;
      }

      nb-card-body {
        display: flex;
        width: 100%;
      }

      nb-auth-block {
        margin: auto;
      }

      @include media-breakpoint-down(sm) {
        nb-card {
          border-radius: 0;
          height: 100vh;
        }
      }

      ::ng-deep {
        nb-layout .layout .layout-container .content .columns nb-layout-column {
          padding: 2.5rem;

          @include media-breakpoint-down(sm) {
            padding: 0;
          }
        }
      }

  `],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <nb-auth-block>
              <router-outlet></router-outlet>
            </nb-auth-block>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NgxAuthComponent extends NbAuthComponent {
}
