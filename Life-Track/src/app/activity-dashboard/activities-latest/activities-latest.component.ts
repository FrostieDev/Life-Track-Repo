import { Component, OnInit, OnChanges, Input, SimpleChange } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  @Input() activities: Activity[];

  dataSource = new MatTableDataSource<Activity>();
  columnsToDisplay = ['activity', 'percentage', 'deadline']; //Columns to display in the header
  expandedElement: Activity | null;
  arrayEmpty: boolean = true; // To show message if no data.

  constructor(
  ) { }

  ngOnInit(): void {
  }

  async getActivities(_activities: Activity[]) {
    if (_activities.length === 0) {
      this.arrayEmpty = true;
    } else {
      this.dataSource.data = _activities;
      this.arrayEmpty = false;
    }
  }

  ngOnChanges() {
    this.getActivities(this.activities);
  }

}
