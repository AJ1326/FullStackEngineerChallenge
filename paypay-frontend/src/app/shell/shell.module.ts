import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthModule } from '../auth/auth.module';
import { DataService } from './data.service';

@NgModule({
  imports: [CommonModule, NgbModule, AuthModule, RouterModule],
  declarations: [HeaderComponent, SidenavComponent, ShellComponent],
  providers: [DataService],
})
export class ShellModule {}
