import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authListenerSub: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authListenerSub = this.authService
      .getAuthStatusListner()
      .subscribe((isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      });
  }
  ngOnDestroy(): void {
    this.authListenerSub?.unsubscribe();
  }

  logoutUser() {
    this.authService.logout().subscribe((res) => {
      console.log('Logging out user: ', res);
      if (res.statusCode == 200) {
        this.router.navigate(['/home']);
      }
    });
  }
}
