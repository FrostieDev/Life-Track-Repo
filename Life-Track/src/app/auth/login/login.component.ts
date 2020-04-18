import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          () => {
            console.log(localStorage.getItem("id_token"));
            console.log(localStorage.getItem("expires_at"));
            console.log("User is logged in");
            this.router.navigateByUrl('/profile')
              .then(function () { window.location.reload() }); // Refresh page to update nav. Hacky fix TODO: Maybe fix 
            console.log(this.authService.isLoggedIn());
          }
        );
    }

  }

}
