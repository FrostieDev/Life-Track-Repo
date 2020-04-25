import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { IKeyValue } from 'src/app/models/keyValue';
import { RestApiUserActivityService } from 'src/app/shared/rest-api-user-activity.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivityModalComponent } from '../activity-modal/activity-modal.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-activity-recurrent-overview',
  templateUrl: './activity-recurrent-overview.component.html',
  styleUrls: ['./activity-recurrent-overview.component.css']
})
export class ActivityRecurrentOverviewComponent implements OnInit {

  @Input() sortedActivities: IKeyValue;
  @Output() updates: EventEmitter<string> = new EventEmitter<string>(); //creating an output event

  displayedColumns: string[] = ['name', 'button'];
  dailyDataSource = new MatTableDataSource<Activity>();
  weeklyDataSource = new MatTableDataSource<Activity>();
  monthlyDataSource = new MatTableDataSource<Activity>();

  matDialogRef: MatDialogRef<ActivityModalComponent>;

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.sortedActivities;
  }

  ngOnChanges() {
    this.monthlyDataSource.data = this.sortedActivities["Monthly"];
    this.weeklyDataSource.data = this.sortedActivities["Weekly"];
    this.dailyDataSource.data = this.sortedActivities["Daily"];
  }

  // https://medium.com/swlh/how-to-create-a-modal-dialog-component-in-angular-8-88028d909be0
  openModal(_activity: any) {
    let currentActivity: Activity = _activity;
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "activity-modal-component";
    dialogConfig.data = currentActivity;
    // https://material.angular.io/components/dialog/overview

    this.matDialogRef = this.matDialog.open(ActivityModalComponent, dialogConfig);

    // When modal closes, sends update messages from modal session.
    this.matDialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        this.updates.emit(result);
      }
    })
  }


}
