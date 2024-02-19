import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CellModule } from './components/cell/cell.module';
import { FilterModule } from './components/filter/filter.module';
import { PagerModule } from './components/pager/pager.module';
import { TBodyModule } from './components/tbody/tbody.module';
import { THeadModule } from './components/thead/thead.module';

import { DataTableComponent } from './data-table.component';

// This is a customized component for Ng2 Smart Table, which can be found at https://github.com/akveo/ng2-smart-table
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CellModule,
    FilterModule,
    PagerModule,
    TBodyModule,
    THeadModule,
  ],
  declarations: [
    DataTableComponent,
  ],
  exports: [
    DataTableComponent,
  ],
})
export class DataTableModule { }
