import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CustomDialogComponent } from 'src/app/@shared/modal/customDialog/customDialog.component';
import { ModalService } from 'src/app/@shared/modal/modal.service';
import { CredentialsService } from 'src/app/auth/credentials.service';
import { Employee } from 'src/app/models/employee/employee.model';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-employee-review-list',
  templateUrl: './emplyee-review-list.component.html',
  styleUrls: ['./emplyee-review-list.component.scss'],
})
export class EmployeeReviewListComponent implements OnInit {
  employeeReview?: Employee[] | null;
  accArray: any[] = [];
  isLoading = false;
  employeeFeedbackByAdmin: string[] = [];

  constructor(
    private modalService: ModalService,
    private reviewService: ReviewService,
    private feedbackService: FeedbackService,
    private credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.retrieveEmployeeReviews(
      this.credentialsService.credentials?.userData?.empId
    );
  }

  retrieveEmployeeReviews(empId: any): void {
    this.isLoading = true;
    this.reviewService.get(empId).subscribe(
      (data) => {
        this.isLoading = false;
        this.employeeReview = data ? data.assigned_to : null;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  toggleDetails(index: any, empId: any): void {
    if (this.accArray.includes(index)) {
      const pos = this.accArray.indexOf(index);
      if (index > -1) {
        this.accArray.splice(pos, 1);
      }
    } else {
      this.getEmployeeFeedback(empId, index);
      this.accArray.push(index);
    }
  }

  getEmployeeFeedback(empId: any, index: number): void {
    this.isLoading = true;
    this.feedbackService.get(empId).subscribe(
      (data: any) => {
        this.employeeFeedbackByAdmin[index] = data?.feedback
          ? data.feedback
          : null;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  openAddReviewEmployeeForm(type: string, formData: Employee): void {
    formData['review_done_by'] =
      this.credentialsService.credentials?.userData?.empId!;
    this.modalService
      .custom(CustomDialogComponent, {
        title: 'Add Review',
        modalType: 'add-review',
        formData: formData ? formData : null,
        reviewList: this.employeeReview,
      })
      .pipe(take(1)) // take() manages unsubscription for us
      .subscribe((result: any) => {
        if (result) {
          this.retrieveEmployeeReviews(
            this.credentialsService.credentials?.userData?.empId
          );
          // this.openSuccessLeadGenerartionModal();
        }
      });
  }
}
