import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-shell',
  templateUrl: './employeeShell.component.html',
  styleUrls: ['./employeeShell.component.scss'],
})
export class EmployeeShellComponent implements OnInit {
  message!: string;

  constructor() {}

  ngOnInit() {}

  receiveMessage($event: any) {
    this.message = $event;
  }
}
