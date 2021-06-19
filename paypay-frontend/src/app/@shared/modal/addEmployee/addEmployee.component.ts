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

@Component({
  selector: 'app-add-employee',
  templateUrl: './addEmployee.component.html',
  styleUrls: ['./addEmployee.component.scss'],
})
export class AddEmployeeComponent implements OnInit, OnDestroy {
  employeeForm!: FormGroup;
  submitted = false;
  isLoading = false;
  leadOriginalData: any;
  gender: string[] = ['Male', 'Female', 'Other'];
  defaultGender: string = 'Male';
  error: string = '';
  @Input() title_tag!: string;
  @Input() formType!: string;
  @Input() form_data!: Employee;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private spinnerService: SpinnerService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.getAddEmployeeForm(this.form_data);
  }

  getDimensionsByFind = (id: any, arr: any[]) => {
    return arr.find((x: any) => x.empId === id);
  };

  // convenience getter for easy access to form fields
  get f() {
    return this.employeeForm.controls;
  }

  setSpinnner = () => {
    this.isLoading = true;
    this.spinnerService.show();
  };

  closeAndResetFormAndSpinnner = () => {
    this.isLoading = false;
    this.submitted = false;
    this.activeModal.close(true);
    this.spinnerService.hide();
    this.error = '';
  };

  closeResetFormAndSpinnnerError = () => {
    this.isLoading = false;
    this.submitted = false;
    this.spinnerService.hide();
  };

  save() {
    this.submitted = true;
    if (this.employeeForm.valid) {
      this.setSpinnner();
      this.submitAddEmployeeForm(this.employeeForm.value);
    } else {
      return;
    }
  }

  saveUpdate(): void {
    this.submitted = true;
    if (this.employeeForm.valid) {
      this.setSpinnner();
      this.submitUpdateEmployeeForm(
        this.form_data.empId,
        this.employeeForm.value
      );
    } else {
      return;
    }
  }

  submitUpdateEmployeeForm(empId: any, employeeData: Employee): void {
    this.employeeService.update(empId, employeeData).subscribe(
      (response) => {
        this.closeAndResetFormAndSpinnner();
      },
      (error) => {
        this.closeResetFormAndSpinnnerError();
        this.error = error.error.message;
      }
    );
  }

  submitAddEmployeeForm(employeeData: Employee): void {
    this.employeeService.create(employeeData).subscribe(
      (response) => {
        this.closeAndResetFormAndSpinnner();
      },
      (error) => {
        this.closeResetFormAndSpinnnerError();
        this.error = error.error.message;
      }
    );
  }

  getAddEmployeeForm(form_data?: Employee) {
    this.employeeForm = this.formBuilder.group({
      empId: [
        form_data ? form_data.empId : this.employeeService.generateId(),
        [Validators.required()],
      ],
      name: [form_data ? form_data.name : '', [Validators.required()]],
      email: [form_data ? form_data.email : '', [Validators.email()]],
      gender: [
        form_data ? form_data.gender : this.defaultGender,
        [Validators.required()],
      ],
      role: ['EMPLOYEE', [Validators.required()]],
    });
  }
}
