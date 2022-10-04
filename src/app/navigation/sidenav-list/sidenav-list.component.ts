import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter;
  isAuth: boolean = false;
  authSubcription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubcription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  onClose(){
    this.closeSidenav.emit();
  }
}
