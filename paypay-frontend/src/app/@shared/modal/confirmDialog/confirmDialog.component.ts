import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirmDialog.component.html',
  styleUrls: ['./confirmDialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  title!: string;
  message!: string;
  isLoading!: boolean;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (!this.title) {
      this.title = 'Add Lead';
    }
  }
}
