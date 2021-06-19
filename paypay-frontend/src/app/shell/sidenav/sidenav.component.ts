import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shell-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnChanges {
  currentURL: any;
  closeSideNav = false;
  message!: string;
  subscription!: Subscription;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe((message) => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @Input() sidenavChildMessage: string = 'close';

  ngOnChanges(changes: SimpleChanges) {
    if (this.sidenavChildMessage === 'close') {
      this.closeSideNav = false;
    } else {
      this.closeSideNav = true;
    }
  }

  receiveMessage($event: any) {
    this.message = $event;
  }

  newMessage() {
    this.data.changeMessage('open');
  }
}
