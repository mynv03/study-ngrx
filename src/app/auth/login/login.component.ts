import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  constructor(private readonly fb: FormBuilder) { }

  get loginFormControl(){
    return this.loginForm.controls;
  }
  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.loginForm)
  }
}
