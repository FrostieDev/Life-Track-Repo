import { Component, OnInit } from '@angular/core';
import { RestApiUserActivityService } from '../shared/rest-api-user-activity.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  user: User = new User();

  constructor(
    public restAPIUserActivity: RestApiUserActivityService
  ) { }

  ngOnInit(): void {
    this.getUser(localStorage.getItem("userId").replace(/['"]+/g, ''));
  }

  getUser(id: string) {
    this.restAPIUserActivity.getUser(id).subscribe((data: any) => {
      this.user = data[0];
    })
  }

}
