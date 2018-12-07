import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';

import { NgxRxAlertComponent } from './ngx-rx-alert.component';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    A11yModule
  ],
  declarations: [
    NgxRxAlertComponent,
  ],
  entryComponents: [
    NgxRxAlertComponent
  ]
})
export class NgxRxAlertModule { }
