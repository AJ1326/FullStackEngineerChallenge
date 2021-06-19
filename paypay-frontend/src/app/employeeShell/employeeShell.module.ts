import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { AuthModule } from '../auth/auth.module';
import { EmployeeShellComponent } from './employeeShell.component';

@NgModule({
  imports: [CommonModule, NgbModule, AuthModule, RouterModule],
  declarations: [HeaderComponent, EmployeeShellComponent],
})
export class EmployeeShellModule {}
