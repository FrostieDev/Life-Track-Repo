import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category, Recurrent, Activity } from 'src/app/models/activity';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { TEMPORARY_NAME } from '@angular/compiler/src/render3/view/util';
import { RestApiUserActivityService } from '../../shared/rest-api-user-activity.service';
import { Router } from '@angular/router';

interface ICategory {
  value: Category;
  viewValue: string;
}

interface IRecurrent {
  value: Recurrent;
  viewValue: string;
}

@Component({
  selector: 'app-activity-input',
  templateUrl: './activity-input.component.html',
  styleUrls: ['./activity-input.component.css']
})

export class ActivityInputComponent implements OnInit {

  @Output() update: EventEmitter<number> = new EventEmitter<number>(); //creating an output event

  showCategories: ICategory[] = [
    { value: Category.School, viewValue: 'School' },
    { value: Category.PersonalGoal, viewValue: 'Personal Goal' }
  ];

  showRecurrent: IRecurrent[] = [
    { value: Recurrent.No, viewValue: 'No' },
    { value: Recurrent.Daily, viewValue: 'Daily' },
    { value: Recurrent.Monthly, viewValue: 'Monthly' },
    { value: Recurrent.Quarterly, viewValue: 'Quarterly' },
    { value: Recurrent.HalfYearly, viewValue: 'Half Yearly' },
    { value: Recurrent.Yearly, viewValue: 'Yearly' }
  ];

  public activityInputForm: FormGroup;
  public activity: Activity = new Activity();

  constructor(
    public restAPIUserActivity: RestApiUserActivityService,
    public router: Router) {

  }

  ngOnInit(): void {
    this.activityInputForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      deadlineDate: new FormControl(new Date(), [Validators.required]),
      category: new FormControl('', [Validators.required]),
      recurrent: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(240)])
    });
    console.log("activity input activated")
  }

  onSubmit() {
    this.createActivity()
      .then((result) => {
        console.log(result);
        this.notifyParent();
        this.activityInputForm.reset();
      }).catch((err) => {
        console.log(err);
      });;
  }

  async createActivity() {

    this.activity = {
      name: this.activityInputForm.value.name,
      deadline: this.activityInputForm.value.deadlineDate,
      category: this.activityInputForm.value.category["viewValue"],
      recurrent: this.activityInputForm.value.recurrent["viewValue"],
      description: this.activityInputForm.value.description,
      percentage: 100,
      done: false,
      creationDate: null // creationDate is handled backend side for correct time formatting. Server location dates.
    }

    try {
      let result = this.addActivityToDB(
        localStorage.getItem("userId").replace(/['"]+/g, ''),
        this.activity);

      alert("Activity created!");
      return result;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  addActivityToDB(id: string, activity: Activity) {
    this.restAPIUserActivity
      .addActivity(id, activity)
      .subscribe((data: any) => {
        return data;
      });
  }

  notifyParent() {
    setTimeout(() => {
      console.log("Notify parent component!");
      this.update.emit(1);
    }
      , 1000);
  }

}
