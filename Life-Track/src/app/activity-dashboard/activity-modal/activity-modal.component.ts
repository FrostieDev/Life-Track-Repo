import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RestApiUserActivityService } from 'src/app/shared/rest-api-user-activity.service';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.css']
})
export class ActivityModalComponent implements OnInit {

  dataFromParentComponent: any;

  constructor(public dialogRef: MatDialogRef<ActivityModalComponent>,
    private restAPIUserActivity: RestApiUserActivityService) { }

  ngOnInit(): void {
    this.dataFromParentComponent = this.dialogRef["_containerInstance"]["_config"]["data"];
  }

  deleteActivity() {
    console.log("Trying to delete activity");
    this.restAPIUserActivity.deleteActivity(localStorage.getItem("userId").replace(/['"]+/g, ''), this.dataFromParentComponent._id)
      .subscribe((data: any) => {
        alert("Deleted " + this.dataFromParentComponent.name);
        return data;
      });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
