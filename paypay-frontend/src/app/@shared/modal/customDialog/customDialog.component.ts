import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/employee/employee.model';
import { Feedback } from 'src/app/models/feedback/feedback.model';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './customDialog.component.html',
  styleUrls: ['./customDialog.component.scss'],
})
export class CustomDialogComponent implements OnInit {
  title!: string;
  modalType!: string;
  formType!: string;
  formData!: Feedback;
  reviewList!: Employee[];

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
