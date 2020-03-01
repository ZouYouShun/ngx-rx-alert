import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { NgxRxAlertComponent } from './ngx-rx-alert.component';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    A11yModule,
  ],
  declarations: [NgxRxAlertComponent],
  entryComponents: [NgxRxAlertComponent],
})
export class NgxRxAlertModule {}
