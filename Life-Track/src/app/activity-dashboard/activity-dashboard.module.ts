import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityDashboardComponent } from './activity-dashboard.component';
import { ActivityInputComponent } from './activity-input/activity-input.component';
import { ActivitiesLatestComponent } from './activities-latest/activities-latest.component';

//Material inputs
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivityRecurrentOverviewComponent } from './activity-recurrent-overview/activity-recurrent-overview.component';


@NgModule({
  declarations: [ActivityDashboardComponent, ActivityInputComponent, ActivitiesLatestComponent, ActivityRecurrentOverviewComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTableModule,
    BrowserAnimationsModule
  ]
})
export class ActivityDashboardModule { }
