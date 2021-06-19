import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CustomDialogComponent } from 'src/app/@shared/modal/customDialog/customDialog.component';
import { ModalService } from 'src/app/@shared/modal/modal.service';
import { Employee } from 'src/app/models/employee/employee.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ReviewService } from 'src/app/services/review/review.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './emplyee-list.component.html',
  styleUrls: ['./emplyee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  employees?: Employee[] | null;
  currentEmployee: Employee = {};
  currentIndex = -1;
  accArray: any[] = [];
  isLoading = false;
  parentMessage = 'employee';

  constructor(
    private employeeService: EmployeeService,
    private modalService: ModalService,
    private feedbackService: FeedbackService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.retrieveEmployees();
  }

  retrieveEmployees(): void {
    this.isLoading = true;
    this.employeeService.getAll().subscribe(
      (data) => {
        this.isLoading = false;
        this.employees = data.length > 0 ? data : null;
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }

  toggleDetails(index: any): void {
    if (this.accArray.includes(index)) {
      const pos = this.accArray.indexOf(index);
      if (index > -1) {
        this.accArray.splice(pos, 1);
      }
    } else {
      this.accArray.push(index);
    }
  }

  refreshList(): void {
    this.retrieveEmployees();
    this.currentEmployee = {};
    this.currentIndex = -1;
  }

  setActiveEmployee(tutorial: Employee, index: number): void {
    this.currentEmployee = tutorial;
    this.currentIndex = index;
  }

  removeAllEmployees(): void {
    this.employeeService.deleteAll().subscribe(
      (response) => {
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openAddEditEmployeeForm(type: string, formData?: Employee): void {
    this.modalService
      .custom(CustomDialogComponent, {
        title: 'Add Employee',
        modalType: 'add-employee',
        formData: formData ? formData : null,
      })
      .pipe(take(1)) // take() manages unsubscription for us
      .subscribe((result: any) => {
        if (result) {
          this.retrieveEmployees();
          // this.openSuccessLeadGenerartionModal();
        }
      });
  }

  deleteEmployee(empId: any): void {
    this.employeeService.delete(empId).subscribe(
      (response) => {
        this.retrieveEmployees();
        this.deleteFeedback(empId);
        this.deleteReview(empId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteFeedback(empId: any): void {
    this.feedbackService.delete(empId).subscribe(
      (response) => {
        this.retrieveEmployees();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteReview(empId: any): void {
    this.reviewService.delete(empId).subscribe(
      (response) => {
        this.retrieveEmployees();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  receiveSearchedData($event: Employee[]) {
    this.currentEmployee = {};
    this.currentIndex = -1;
    this.employees = $event;
  }
}
