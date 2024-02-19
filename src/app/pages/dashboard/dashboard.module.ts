import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
} from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { AdvancedPieChartComponent } from './chart/advanced-pie-chart.component';
import { BarChartComponent } from './chart/bar-chart.component';
import { LineChartComponent } from './chart/line-chart.component';
import { PieChartComponent } from './chart/pie-chart.component';

const components = [
  BarChartComponent,
  LineChartComponent,
  PieChartComponent,
  AdvancedPieChartComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    NbProgressBarModule,
    NgxChartsModule,
  ],
  declarations: [
    DashboardComponent,
    ...components
  ],
})
export class DashboardModule { }
