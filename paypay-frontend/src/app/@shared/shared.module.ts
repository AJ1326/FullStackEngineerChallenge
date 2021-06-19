import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ConfirmDialogComponent } from './modal/confirmDialog/confirmDialog.component';
import { CustomDialogComponent } from './modal/customDialog/customDialog.component';
import { SpinnerService } from './spinner/spinner.service';
import { ModalService } from './modal/modal.service';
import { SearchComponent } from './search/search.component';
import { AddFeedbackComponent } from './modal/addFeedback/addFeedback.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AddEmployeeComponent } from './modal/addEmployee/addEmployee.component';
import { AddEmployeeReviewComponent } from './modal/addReview/addReview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
  ],
  declarations: [
    LoaderComponent,
    ConfirmDialogComponent,
    CustomDialogComponent,
    SpinnerComponent,
    SearchComponent,
    AddFeedbackComponent,
    AddEmployeeComponent,
    AddEmployeeReviewComponent,
  ],
  exports: [
    LoaderComponent,
    CustomDialogComponent,
    ConfirmDialogComponent,
    SearchComponent,
    AddFeedbackComponent,
    AddEmployeeComponent,
    AddEmployeeReviewComponent,
  ],
  providers: [SpinnerService, ModalService],
})
export class SharedModule {}
