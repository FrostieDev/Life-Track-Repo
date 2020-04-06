import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-dashboard',
  templateUrl: './activity-dashboard.component.html',
  styleUrls: ['./activity-dashboard.component.css']
})
export class ActivityDashboardComponent implements OnInit {

  updates: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate(count) {
    this.updates = this.updates + count;
  }

}
