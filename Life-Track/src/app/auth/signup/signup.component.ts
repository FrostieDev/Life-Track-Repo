import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]

    });
  }

  signUp() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.signUp(val.email, val.name, val.password)
        .subscribe(
          () => {
            this.router.navigateByUrl('/profile')
              .then(function () {
                window.location.reload()
              });
            console.log(this.authService.isLoggedIn());
          })
    }

  }

  ngOnInit(): void {
  }

}
