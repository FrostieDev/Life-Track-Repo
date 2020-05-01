import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category, Recurrent, Activity, Progression } from 'src/app/models/activity';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { User } from 'src/app/models/user';
import { TEMPORARY_NAME } from '@angular/compiler/src/render3/view/util';
import { RestApiUserActivityService } from '../../shared/rest-api-user-activity.service';
import { Router } from '@angular/router';
import { recurrentValidator } from 'src/app/shared/form-validation/recurrent-validator';
import { MatDialogRef } from '@angular/material/dialog';

interface ICategory {
  value: Category;
  viewValue: string;
}

interface IRecurrent {
  value: Recurrent;
  viewValue: string;
}

interface IProgression {
  value: Progression;
  viewValue: string;
}

@Component({
  selector: 'app-activity-input-modal',
  templateUrl: './activity-input-modal.component.html',
  styleUrls: ['./activity-input-modal.component.css']
})

export class ActivityInputModalComponent implements OnInit {

  @Output() update: EventEmitter<number> = new EventEmitter<number>(); //creating an output event

  showCategories: ICategory[] = [
    { value: Category.School, viewValue: Category.School.toString() },
    { value: Category.PersonalGoal, viewValue: Category.PersonalGoal.toString() }
  ];

  showRecurrent: IRecurrent[] = [
    { value: Recurrent.No, viewValue: Recurrent.No.toString() },
    { value: Recurrent.Daily, viewValue: Recurrent.Daily.toString() },
    { value: Recurrent.Weekly, viewValue: Recurrent.Weekly.toString() },
    { value: Recurrent.Monthly, viewValue: Recurrent.Monthly.toString() },
    { value: Recurrent.Quarterly, viewValue: Recurrent.Quarterly.toString() },
    { value: Recurrent.HalfYearly, viewValue: Recurrent.HalfYearly.toString() },
    { value: Recurrent.Yearly, viewValue: Recurrent.Yearly.toString() }
  ];

  showProgression: IProgression[] = [
    { value: Progression.Percentage, viewValue: Progression.Percentage.toString() },
    { value: Progression.Repetition, viewValue: Progression.Repetition.toString() },
    { value: Progression.Time, viewValue: Progression.Time.toString() }
  ]

  public activityInputForm: FormGroup;
  public activity: Activity = new Activity();
  public showProgressionField: boolean = false;
  public showExpectedTimeField: boolean = false;
  public showExpectedRepetitionField: boolean = false;

  constructor(
    public restAPIUserActivity: RestApiUserActivityService,
    public router: Router,
    public dialogRef: MatDialogRef<ActivityInputModalComponent>) {

  }

  ngOnInit(): void {
    this.activityInputForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      deadlineDate: new FormControl(new Date(), [Validators.required]),
      timeOfDay: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      recurrent: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(240)]),
      progression: new FormControl(''),
      expectedRepetition: new FormControl(''),
      expectedTime: new FormControl('')
    });
    this.activityInputForm.setValidators(recurrentValidator);
    this.activityInputForm.updateValueAndValidity();
  }

  onSubmit() {
    this.createActivity()
      .then(() => {
        this.closeModal("Added: " + this.activityInputForm.value.name);
      }).catch((err) => {
        console.log(err);
      });;
  }

  //Not used because of Modal
  //https://stackoverflow.com/questions/48216330/angular-5-formgroup-reset-doesnt-reset-validators
  resetForm() {
    this.notifyParent();
    this.showProgressionField = false;
    this.showExpectedTimeField = false;
    this.showExpectedRepetitionField = false;
    this.activityInputForm.reset();
  }

  async createActivity() {
    let timeArray = this.activityInputForm.value.timeOfDay.split(":");
    this.activity = {
      _id: null,
      name: this.activityInputForm.value.name,
      deadline: this.activityInputForm.value.deadlineDate.setHours(timeArray[0], timeArray[1]),
      category: this.activityInputForm.value.category["viewValue"],
      recurrent: this.activityInputForm.value.recurrent["viewValue"],
      description: this.activityInputForm.value.description,
      percentage: 0,
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

  addActivityToDB(id: string, activity: Activity): any {
    this.restAPIUserActivity
      .addActivity(id, activity)
      .subscribe((data: any) => {
        return data;
      });
  }

  notifyParent() {
    setTimeout(() => { // Let backend have some time
      console.log("Notify parent component!");
      this.update.emit(1);
    }
      , 500);
  }

  changeRecurrentInput(stateOfRecurrent) {
    if (stateOfRecurrent !== null) {
      if (stateOfRecurrent.viewValue == "No") {
        this.showProgressionField = false;
      } else {
        this.showProgressionField = true;
      }
      console.log(this.showProgressionField);
    }
  }

  changeProgressionInput(stateOfProgression) {
    if (stateOfProgression !== null) {
      if (stateOfProgression.viewValue == "Time") {
        this.showExpectedTimeField = true;
        this.showExpectedRepetitionField = false;
        console.log(this.showExpectedTimeField);
      } else if (stateOfProgression.viewValue == "Repetition") {
        this.showExpectedRepetitionField = true;
        this.showExpectedTimeField = false;
        console.log(this.showExpectedRepetitionField);
      } else {
        this.showExpectedTimeField = false;
        this.showExpectedRepetitionField = false;
      }
    }
  }

  //Modal
  closeModal(_updateMsg: string) {
    this.dialogRef.close(_updateMsg);
  }

}
