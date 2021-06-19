import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ProviderDataValidators as Validators } from '../../app/modules/data-valiidator';
import { AuthenticationService } from './authentication.service';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../models/employee/employee.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  employees?: Employee[] | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private employeeService: EmployeeService
  ) {
    this.createForm();
  }

  ngOnInit() {
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

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        (credentials) => {
          if (credentials.isUserExist) {
            if (credentials.role === 'ADMIN') {
              this.router.navigate(['/feedbacks']);
            } else {
              this.router.navigate(['/reviews']);
            }
            this.error = '';
          } else {
            console.log('error');
            this.error = '*Please login via mentioned credentials.';
          }
        },
        (error) => {
          this.error = error;
        }
      );
  }

  private checkUserRole() {}

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required()],
      password: ['', Validators.required()],
      remember: [true],
    });
  }
}
