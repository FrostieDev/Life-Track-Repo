import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { IKeyValue } from 'src/app/models/keyValue';

@Component({
  selector: 'app-activity-recurrent-overview',
  templateUrl: './activity-recurrent-overview.component.html',
  styleUrls: ['./activity-recurrent-overview.component.css']
})
export class ActivityRecurrentOverviewComponent implements OnInit {

  @Input() sortedActivities: IKeyValue;

  constructor() { }

  ngOnInit(): void {
    this.sortedActivities
  }

  ngOnChanges() {
    console.log(this.sortedActivities);
  }
}
