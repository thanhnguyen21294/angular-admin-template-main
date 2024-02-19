import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../@core/models/product';
import { catchError } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { getRandomNumber } from '../../@core/utils/random';
import { NbThemeService } from '@nebular/theme';
import { ProductService } from '../../@core/services';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  barChartData = [
    { name: 'Germany', value: 8940 },
    { name: 'USA', value: 5000 },
    { name: 'France', value: 7200 },
    { name: 'Japan', value: 6300 },
    { name: 'Vietnam', value: 8000 },
  ];
  barChartXAxisLabel = 'Country';
  barChartYAxisLabel = 'Population';

  lineChartData = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300,
        },
        {
          name: '2011',
          value: 8940,
        },
      ],
    },
    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870,
        },
        {
          name: '2011',
          value: 8270,
        },
      ],
    },
    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5002,
        },
        {
          name: '2011',
          value: 5800,
        },
      ],
    },
    {
      name: 'Japan',
      series: [
        {
          name: '2010',
          value: 4000,
        },
        {
          name: '2011',
          value: 3800,
        },
      ],
    },
  ];
  lineChartXAxisLabel = 'Country';
  lineChartYAxisLabel = 'Population';

  pieChartData = [
    { name: 'Germany', value: 8940 },
    { name: 'USA', value: 5000 },
    { name: 'France', value: 7200 },
  ];

  advancedPieChartData = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
  ];
}
