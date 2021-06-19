import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthenticationService, CredentialsService } from 'src/app/auth';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName = '';
  message: string = 'open';
  subscription!: Subscription;

  @Output() sidenavMessageEvent = new EventEmitter<string>();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private data: DataService
  ) {}

  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(
      (message) => (this.message = message)
    );
  }

  logout() {
    this.authenticationService
      .logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  newMessage() {
    if (this.message === 'open') {
      this.message = 'close';
    } else {
      this.message = 'open';
    }
    this.data.changeMessage(this.message);
  }
}
