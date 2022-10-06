import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubcription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubcription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authSubcription.unsubscribe();
  }
 


}
