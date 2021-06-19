import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderDataValidators as Validators } from '../../../modules/data-valiidator';
import { SpinnerService } from '../../spinner/spinner.service';
import { EmployeeService } from '../../../services/employee/employee.service';
import { Employee } from 'src/app/models/employee/employee.model';
import { Feedback } from 'src/app/models/feedback/feedback.model';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './addReview.component.html',
  styleUrls: ['./addReview.component.scss'],
})
export class AddEmployeeReviewComponent implements OnInit, OnDestroy {
  employeeReviewForm!: FormGroup;
  submitted = false;
  isLoading = false;
  leadOriginalData: any;
  status: string[] = ['In Review', 'Pending', 'Done'];
  defaultStatus: string = 'In Review';
  @Input() title_tag!: string;
  @Input() formType!: string;
  @Input() form_data!: Employee;
  @Input() review_list!: Employee[];
  error: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private spinnerService: SpinnerService,
    private reviewService: ReviewService,
    private feedbackService: FeedbackService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.getAddEmployeeForm(this.form_data);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.employeeReviewForm.controls;
  }

  setSpinnner = () => {
    this.isLoading = true;
    this.spinnerService.show();
  };

  closeAndResetFormAndSpinnner = () => {
    this.isLoading = false;
    this.submitted = false;
    this.error = '';
    this.activeModal.close(true);
    this.spinnerService.hide();
  };

  closeResetFormAndSpinnnerError = () => {
    this.isLoading = false;
    this.submitted = false;
    this.spinnerService.hide();
  };

  saveUpdate(): void {
    this.submitted = true;
    if (this.employeeReviewForm.valid) {
      const reviewFormData = {
        empId: this.form_data.empId,
        review: this.employeeReviewForm.controls.review.value,
        status: this.employeeReviewForm.controls.status.value,
        review_done_by: this.form_data.review_done_by,
      };
      this.setSpinnner();
      this.updateReviewListData(reviewFormData);
      this.submitUpdatEmployeeForm(this.form_data.empId, reviewFormData);
    } else {
      return;
    }
  }

  getUpdatedEmployeeListData = (
    index: number,
    updatedEmployeeData: Employee
  ) => {
    this.review_list[index]['empId'] = updatedEmployeeData.empId;
    this.review_list[index]['review'] = updatedEmployeeData.review;
    this.review_list[index]['status'] = updatedEmployeeData.status;
    this.review_list[index]['review_done_by'] =
      updatedEmployeeData.review_done_by;
  };

  updateReviewListData = (updatedEmployeeData: Employee) => {
    const updatedEmpReviewIndex = this.findIndex();
    this.getUpdatedEmployeeListData(updatedEmpReviewIndex, updatedEmployeeData);
    const payload = {
      empId: updatedEmployeeData.review_done_by,
      assigned_to: this.review_list,
    };
    this.updateFeedbackListData();
    this.reviewService.update(this.form_data.review_done_by, payload).subscribe(
      (response) => {
        this.closeAndResetFormAndSpinnner();
      },
      (error) => {
        this.error = error.error.message;
        this.closeResetFormAndSpinnnerError();
        console.log(error);
      }
    );
  };

  updateFeedbackListData = () => {
    const payload = {
      performance_review: this.review_list,
    };
    this.feedbackService
      .update(this.form_data.review_done_by, payload)
      .subscribe(
        (response) => {
          this.closeAndResetFormAndSpinnner();
        },
        (error) => {
          this.error = error.error.message;
          this.closeResetFormAndSpinnnerError();
          console.log(error);
        }
      );
  };

  findIndex = () => {
    return this.review_list.findIndex((x) => x.empId === this.form_data.empId);
  };

  submitUpdatEmployeeForm(empId: any, employeeData: Employee): void {
    this.employeeService.update(empId, employeeData).subscribe(
      (response) => {
        this.closeAndResetFormAndSpinnner();
      },
      (error) => {
        this.error = error.error.message;
        this.closeResetFormAndSpinnnerError();
        console.log(error);
      }
    );
  }

  getAddEmployeeForm(form_data: Employee) {
    this.employeeReviewForm = this.formBuilder.group({
      review: [form_data ? form_data.review : '', [Validators.required()]],
      status: [
        form_data ? form_data.status : this.defaultStatus,
        [Validators.required()],
      ],
    });
  }
}
