import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: any;
  isLoading = false;
  private loadingSubs: Subscription;
  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  onSubmit(form: NgForm){
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }
}
