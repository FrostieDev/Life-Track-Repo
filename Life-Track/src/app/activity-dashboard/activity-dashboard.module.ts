import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

//Custom components
import { ActivityDashboardComponent } from './activity-dashboard.component';
import { ActivityInputModalComponent } from './activity-input/activity-input-modal.component';
import { ActivitiesLatestComponent } from './activities-latest/activities-latest.component';
import { ActivityRecurrentOverviewComponent } from './activity-recurrent-overview/activity-recurrent-overview.component';
import { ActivityModalComponent } from './activity-modal/activity-modal.component';

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

//Modal
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ActivityDashboardComponent, ActivityInputModalComponent, ActivitiesLatestComponent, ActivityRecurrentOverviewComponent, ActivityModalComponent],
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
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class ActivityDashboardModule { }
