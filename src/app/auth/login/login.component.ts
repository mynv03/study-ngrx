import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  isLoading = false;
  private loadingSubs: Subscription;
  constructor(private readonly fb: FormBuilder,
              private authService: AuthService,
              private uiService: UIService) {

  }

  get loginFormControl(){
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    this.loadingSubs =this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
  }

  ngOnDestroy(): void {
    if(this.loadingSubs){
      this.loadingSubs.unsubscribe();
    }
  }

  onSubmit(){
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }
}
