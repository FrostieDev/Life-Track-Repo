import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { IKeyValue } from 'src/app/models/keyValue';
import { RestApiUserActivityService } from 'src/app/shared/rest-api-user-activity.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivityModalComponent } from '../activity-modal/activity-modal.component';

@Component({
  selector: 'app-activity-recurrent-overview',
  templateUrl: './activity-recurrent-overview.component.html',
  styleUrls: ['./activity-recurrent-overview.component.css']
})
export class ActivityRecurrentOverviewComponent implements OnInit {

  @Input() sortedActivities: IKeyValue;

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.sortedActivities
  }

  ngOnChanges() {
    console.log(this.sortedActivities);
  }

  // https://medium.com/swlh/how-to-create-a-modal-dialog-component-in-angular-8-88028d909be0
  openModal(_activity: any) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "activity-modal-component";
    dialogConfig.data = _activity;
    // https://material.angular.io/components/dialog/overview
    this.matDialog.open(ActivityModalComponent, dialogConfig);
  }

}
