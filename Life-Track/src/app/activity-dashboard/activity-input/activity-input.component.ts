import { Component, OnInit } from '@angular/core';
import { Category, Concurrent, Activity } from 'src/app/models/activity';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { TEMPORARY_NAME } from '@angular/compiler/src/render3/view/util';

interface ICategory {
  value: Category;
  viewValue: string;
}

interface IConcurrent {
  value: Concurrent;
  viewValue: string;
}

@Component({
  selector: 'app-activity-input',
  templateUrl: './activity-input.component.html',
  styleUrls: ['./activity-input.component.css']
})
export class ActivityInputComponent implements OnInit {

  showCategories: ICategory[] = [
    {value: Category.School, viewValue: 'School'},
    {value: Category.PersonalGoal, viewValue: 'Personal Goal'}
  ];

  showConcurrency: IConcurrent[] = [
    {value: Concurrent.No, viewValue: 'No'},
    {value: Concurrent.Daily, viewValue: 'Daily'},
    {value: Concurrent.Monthly, viewValue: 'Monthly'},
    {value: Concurrent.Quarterly, viewValue: 'Quarterly'},
    {value: Concurrent.HalfYearly, viewValue: 'Half Yearly'},
    {value: Concurrent.Yearly, viewValue: 'Yearly'}
  ];
  
  public activityInputForm: FormGroup;

  constructor() { 

  }

  ngOnInit(): void {
    this.activityInputForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      deadlineDate: new FormControl(new Date(),[Validators.required]),
      category: new FormControl('',[Validators.required]),
      concurrency: new FormControl('',[Validators.required]),
      description: new FormControl('', [Validators.required, Validators.maxLength(240)])
    });
    console.log("activity input activated")
  }

  onSubmit(){
    let createdActivity:Activity = this.createActivity();
    console.log(createdActivity);
  }

  createActivity(){

    let tempUser: User = {
      name: "tempname",
      signedUpDate: new Date
    }

    let activity: Activity = {
      name: this.activityInputForm.value.name,
      deadline: this.activityInputForm.value.deadlineDate,
      category: this.activityInputForm.value.category,
      concurrent: this.activityInputForm.value.concurrency,
      description: this.activityInputForm.value.description,
      percentage: 100,
      done: false,
      user: tempUser
    }
    return activity;
  }
}
