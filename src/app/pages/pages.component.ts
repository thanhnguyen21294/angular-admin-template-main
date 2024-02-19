import { Component } from '@angular/core';

import { MENU_ITEMS, FIXED_MENU_ITEMS } from './pages-menu';
import { NbMenuService } from '@nebular/theme';
import { NbTokenService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <div fixedMenu>
        <nb-menu [items]="fixedMenu"></nb-menu>
      </div>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS;
  fixedMenu = FIXED_MENU_ITEMS;

  constructor(
    private menuService: NbMenuService,
    private tokenService: NbTokenService,
    private router: Router,
  ) {
    // Logout handler
    this.menuService.onItemClick().subscribe((event) => {
      if (!event.item.link) {
        this.tokenService.clear();
        this.router.navigate(['/auth/logout']);
      }
    });
  }
}
