import { Component, OnInit } from '@angular/core';
import { RestApiUserActivityService } from '../shared/rest-api-user-activity.service';
import { User } from '../models/user';
import { Activity } from '../models/activity';
import { IKeyValue } from '../models/keyValue';

@Component({
  selector: 'app-activity-dashboard',
  templateUrl: './activity-dashboard.component.html',
  styleUrls: ['./activity-dashboard.component.css']
})
export class ActivityDashboardComponent implements OnInit {

  private id: string;
  updates: number = 0;
  activities: Activity[] = [];
  sortedActivities: IKeyValue = {};
  updateMsgs: string[] = [];

  constructor(private restAPIUserActivity: RestApiUserActivityService) {

  }

  ngOnInit(): void {
    this.id = localStorage.getItem("userId").replace(/['"]+/g, '');
    this.getActivities(this.id)
      .then((_activities) => {
        this.sortActivitiesByRecurrence(_activities)
          .then((_sortedActivities) => {
            this.sortedActivities = _sortedActivities;
          });
      });
  }

  onUpdate(count) {
    this.updates = this.updates + count;
    this.getActivities(this.id)
      .then((_activities) => {
        this.sortActivitiesByRecurrence(_activities)
          .then((_sortedActivities) => {
            this.sortedActivities = _sortedActivities;
          });
      });
  }

  async onModification(_updateMsg: string) {
    this.updateMsgs.push(_updateMsg);
    this.onUpdate(0);

    let self = this;

    setTimeout(function () {
      for (let i = 0; i < self.updateMsgs.length; i++) {
        if (_updateMsg == self.updateMsgs[i]) {
          self.updateMsgs.splice(i);
        }
      }
    }, 5000);
  }

  async getActivities(id: string) {
    return new Promise((resolve, reject) => {
      this.restAPIUserActivity.getUser(id)
        .then((data: any) => {
          this.convertUserActivitiesToActivities(data)
            .then((_activities) => {
              this.activities = _activities;
              console.log(_activities);
              resolve(_activities);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        })
    }
    );
  }

  async convertUserActivitiesToActivities(tempData): Promise<Activity[]> {
    const data: any[] = tempData[0].activities;
    let _activities: Activity[] = [];
    for (var i in data) {
      let element: Activity;
      element = data[i];
      _activities.push(element);
    }
    return _activities;
  }

  async sortActivitiesByRecurrence(_activities) {
    let sortedActivities: IKeyValue = {};

    sortedActivities["No"] = [];
    sortedActivities["Daily"] = [];
    sortedActivities["Weekly"] = [];
    sortedActivities["Monthly"] = [];
    sortedActivities["Yearly"] = [];

    _activities.forEach(element => {
      switch (element.recurrent) {
        case "No": {
          sortedActivities["No"].push(element);
          break;
        }
        case "Daily": {
          sortedActivities["Daily"].push(element);
          break;
        }
        case "Weekly": {
          sortedActivities["Weekly"].push(element);
          break;
        }
        case "Monthly": {
          sortedActivities["Monthly"].push(element);
          break;
        }
        case "Yearly": {
          sortedActivities["Yearly"].push(element);
          break;
        }
      }
    });
    return sortedActivities;
  }

}
