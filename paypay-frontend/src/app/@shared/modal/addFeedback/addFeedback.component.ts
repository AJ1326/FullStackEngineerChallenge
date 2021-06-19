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
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { Feedback } from 'src/app/models/feedback/feedback.model';
import { ReviewService } from 'src/app/services/review/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './addFeedback.component.html',
  styleUrls: ['./addFeedback.component.scss'],
})
export class AddFeedbackComponent implements OnInit, OnDestroy {
  feedbackForm!: FormGroup;
  submitted = false;
  isLoading = false;
  leadOriginalData: any;
  employeesList!: Employee[];
  employeesUpdatedList!: Employee[];
  dropdownSingleSettings = {};
  dropdownMultiSettings = {};
  @Input() title_tag!: string;
  @Input() formType!: string;
  @Input() form_data!: Feedback;
  error: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private spinnerService: SpinnerService,
    private feedbackService: FeedbackService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.dropdownSingleSettings = {
      singleSelection: true,
      text: 'Select emplyee',
      enableSearchFilter: true,
      classes: 'employee-dropdown',
      labelKey: 'name',
      primaryKey: 'empId',
    };

    this.dropdownMultiSettings = {
      singleSelection: false,
      text: 'Select employees',
      enableSearchFilter: true,
      classes: 'employee-dropdown',
      labelKey: 'name',
      primaryKey: 'empId',
    };

    this.retrieveEmployees();
  }

  goToemployeeScreen = () => {
    this.activeModal.close(true);
    this.router.navigate(['/employees']);
  };

  retrieveEmployees(): void {
    this.employeeService.getAll().subscribe(
      (data) => {
        this.employeesList = data;
        this.form_data && this.onItemSelect(this.form_data);
        this.getAddFeedbackForm(this.form_data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.feedbackForm.controls;
  }

  setSpinnner = () => {
    this.isLoading = true;
    this.spinnerService.show();
  };

  closeAndResetFormAndSpinnner = () => {
    this.error = '';
    this.isLoading = false;
    this.submitted = false;
    this.activeModal.close(true);
    this.spinnerService.hide();
  };

  closeResetFormAndSpinnnerError = () => {
    this.isLoading = false;
    this.submitted = false;
    this.spinnerService.hide();
  };

  onItemSelect(item?: any) {
    this.employeesUpdatedList = this.employeesList.filter((obj) => {
      return obj.empId !== item.empId;
    });
  }

  save() {
    this.submitted = true;
    if (this.feedbackForm.valid) {
      this.feedbackForm.patchValue({
        empId: this.feedbackForm.controls.empId.value[0]['empId'],
        name: this.feedbackForm.controls.empId.value[0]['name'],
      });
      this.setSpinnner();
      this.submitAddFeedbackForm(this.feedbackForm.value);
      this.createReviewForm(this.feedbackForm.value);
    } else {
      return;
    }
  }

  saveUpdate(): void {
    this.submitted = true;
    if (this.feedbackForm.valid) {
      this.feedbackForm.patchValue({
        name: this.feedbackForm.controls.empId.value[0]['name'],
      });
      this.setSpinnner();
      this.submitUpdateFeedbackForm(
        this.feedbackForm.controls.empId.value,
        this.feedbackForm.value
      );
      this.updateReviewForm(this.feedbackForm.value);
    } else {
      return;
    }
  }

  createReviewForm = (data: Feedback) => {
    const reviewData = {
      empId: data.empId,
      assigned_to: data.performance_review,
    };
    this.reviewService.create(reviewData, reviewData.empId!).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  updateReviewForm = (data: Feedback) => {
    const reviewData = {
      empId: data.empId,
      assigned_to: data.performance_review,
    };
    this.reviewService.update(data.empId, reviewData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  submitUpdateFeedbackForm(empId: string, feedbackData: Feedback): void {
    this.feedbackService.update(empId, feedbackData).subscribe(
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

  submitAddFeedbackForm(feedbackData: Feedback): void {
    this.feedbackService.create(feedbackData, feedbackData.empId!).subscribe(
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

  getAddFeedbackForm(form_data?: Feedback) {
    this.feedbackForm = this.formBuilder.group({
      empId: [form_data ? form_data.empId : '', [Validators.required()]],
      name: [form_data ? form_data.empId : ''],
      title: [form_data ? form_data.title : '', [Validators.required()]],
      feedback: [form_data ? form_data.feedback : '', [Validators.required()]],
      performance_review: [
        form_data ? form_data.performance_review : [],
        [Validators.required()],
      ],
      published: [false, [Validators.required()]],
    });
  }
}
