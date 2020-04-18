import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RestApiUserActivityService } from '../../shared/rest-api-user-activity.service';

@Component({
  selector: 'app-activities-latest',
  templateUrl: './activities-latest.component.html',
  styleUrls: ['./activities-latest.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ActivitiesLatestComponent implements OnInit, OnChanges {

  @Input() updates: number; // To update list, when changes comes in from another component.

  dataSource = new MatTableDataSource<Activity>();
  columnsToDisplay = ['activity', 'percentage', 'deadline']; //Columns to display in the header
  expandedElement: Activity | null;
  activities: Activity[] = [];
  arrayEmpty: boolean = true; // To show message if no data.

  constructor(
    public restAPIUserActivity: RestApiUserActivityService
  ) { }

  ngOnInit(): void {
    this.getActivities(localStorage.getItem("userId").replace(/['"]+/g, ''));
  }

  async getActivities(id: string) {
    this.restAPIUserActivity.getUser(id).subscribe((data: any) => {
      console.log(data);
      this.convertUserActivitiesToActivities(data)
        .then(() => {
          this.dataSource.data = this.activities;
          if (this.activities.length === 0) {
            this.arrayEmpty = true;
          } else {
            this.arrayEmpty = false;
          }
        });

    })
  }

  async convertUserActivitiesToActivities(tempData) {
    const data: any[] = tempData[0].activities;
    this.activities = [];
    for (var i in data) {
      let element: Activity;
      element = data[i];
      this.activities.push(element);
    }
  }

  ngOnChanges(updates): void {
    this.activities = [];
    this.ngOnInit();
  }

}
