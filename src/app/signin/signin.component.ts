import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  errorOccurred: boolean;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.errorOccurred = false;
    this.errorMsg = '';
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    const URL = 'http://localhost:5000/login/';
    if (this.loginForm.valid) {
      try {
        const response = await this.http.post(URL, this.loginForm.value, { observe: 'response' }).toPromise();
        if (response.status === 200) {
          sessionStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['user_manager']);
        }
      } catch (err) {
        this.errorOccurred = true;
        this.errorMsg = err.error.message;
      }
    }
  }
}
