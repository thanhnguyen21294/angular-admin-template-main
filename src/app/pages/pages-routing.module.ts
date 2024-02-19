import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { GenerateReportsComponent } from './generate-reports/generate-reports.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { PolicyComponent } from './policy/policy.component';
import { DueDiligenceComponent } from './due-diligence/due-diligence.component';
import { DueCareComponent } from './due-care/due-care.component';
import { AlarmsComponent } from './alarms/alarms.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'miscellaneous',
        loadChildren: () =>
          import('./miscellaneous/miscellaneous.module').then((m) => m.MiscellaneousModule),
      },
      {
        path: 'generateReports',
        component: GenerateReportsComponent
      },
      {
        path: 'compliance',
        component: ComplianceComponent
      },
      {
        path: 'policy',
        component: PolicyComponent
      },
      {
        path: 'dueDiligence',
        component: DueDiligenceComponent
      },
      {
        path: 'dueCare',
        component: DueCareComponent
      },
      {
        path: 'alarms',
        component: AlarmsComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
