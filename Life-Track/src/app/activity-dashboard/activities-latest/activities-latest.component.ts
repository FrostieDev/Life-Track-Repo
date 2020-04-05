import { Component, OnInit } from '@angular/core';
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
export class ActivitiesLatestComponent implements OnInit {

  dataSource = new MatTableDataSource<Activity>();
  columnsToDisplay = ['activity', 'percentage', 'deadline']; //Columns to display in the header
  expandedElement: Activity | null;
  data: any;
  activities: Activity[] = [];

  constructor(
    public restAPIUserActivity: RestApiUserActivityService
  ) { }

  ngOnInit(): void {
    this.getActivities("5e8642b650a815274cb469e6")
      .then();

  }

  async getActivities(id: string) {
    this.restAPIUserActivity.getUser(id).subscribe((data: any) => {
      console.log(data);
      this.convertUserActivitiesToActivities(data)
        .then(() => {
          this.dataSource.data = this.activities;
          console.log(this.dataSource);
        });

    })
  }

  async convertUserActivitiesToActivities(tempData) {
    const data: any[] = tempData[0].activities;
    for (var i in data) {
      let element: Activity;
      element = data[i];
      this.activities.push(element);
    }
  }

}
