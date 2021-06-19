import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeShell, Shell } from './shell/shell.service';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { EmployeeListComponent } from './components/emplyee-list/emplyee-list.component';
import { EmployeeReviewListComponent } from './components/emplyee-review-list/emplyee-review-list.component';
import { DocumentComponent } from './components/documentation/documentation.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: 'feedbacks', pathMatch: 'full' },
    { path: 'feedbacks', component: FeedbackListComponent },
    { path: 'employees', component: EmployeeListComponent },
    { path: 'documentation', component: DocumentComponent },
  ]),

  EmployeeShell.childRoutes([
    { path: '', redirectTo: 'reviews', pathMatch: 'full' },
    { path: 'reviews', component: EmployeeReviewListComponent },
    { path: 'documentation', component: DocumentComponent },
  ]),
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
