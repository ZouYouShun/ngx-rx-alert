import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRxAlertComponent } from './ngx-rx-alert.component';
import { MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    A11yModule
  ],
  declarations: [
    NgxRxAlertComponent
  ],
  entryComponents: [
    NgxRxAlertComponent
  ]
})
export class NgxRxAlertModule { }
