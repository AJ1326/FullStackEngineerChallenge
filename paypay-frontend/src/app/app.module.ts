import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellModule } from './shell/shell.module';
import { CoreModule } from './@core';
import { SharedModule } from './@shared';
import {
  AuthenticationGuard,
  AuthenticationRoleCheckGuard,
  AuthModule,
} from './auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { FeedbackService } from './services/feedback/feedback.service';
import { EmployeeService } from './services/employee/employee.service';
import { EmployeeListComponent } from './components/emplyee-list/emplyee-list.component';
import { EmployeeShellModule } from './employeeShell/employeeShell.module';
import { EmployeeReviewListComponent } from './components/emplyee-review-list/emplyee-review-list.component';
import { DocumentComponent } from './components/documentation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeReviewListComponent,
    FeedbackListComponent,
    EmployeeListComponent,
    DocumentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    CoreModule,
    SharedModule,
    AuthModule,
    ShellModule,
    EmployeeShellModule,
  ],
  providers: [
    EmployeeService,
    FeedbackService,
    AuthenticationGuard,
    AuthenticationRoleCheckGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
