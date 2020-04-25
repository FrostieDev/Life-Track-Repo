import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RestApiUserActivityService } from 'src/app/shared/rest-api-user-activity.service';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.css']
})
export class ActivityModalComponent implements OnInit {

  dataFromParentComponent: Activity;
  updateMsg: string = null;

  constructor(public dialogRef: MatDialogRef<ActivityModalComponent>,
    private restAPIUserActivity: RestApiUserActivityService) { }

  ngOnInit(): void {
    this.dataFromParentComponent = this.dialogRef["_containerInstance"]["_config"]["data"];
  }

  // Delete activity
  deleteActivity() {
    this.restAPIUserActivity.deleteActivity(localStorage.getItem("userId").replace(/['"]+/g, ''), this.dataFromParentComponent._id)
      .subscribe((data: any) => {
        this.updateMsg = "Deleted " + this.dataFromParentComponent.name;
        this.closeModal();
        return data;
      });
  }

  // Closes modal and sends update messages from this session.
  closeModal() {
    this.dialogRef.close(this.updateMsg);
  }

}
