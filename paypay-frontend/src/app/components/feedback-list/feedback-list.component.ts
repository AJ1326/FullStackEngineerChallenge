import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CustomDialogComponent } from 'src/app/@shared/modal/customDialog/customDialog.component';
import { ModalService } from 'src/app/@shared/modal/modal.service';
import { Feedback } from 'src/app/models/feedback/feedback.model';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss'],
})
export class FeedbackListComponent implements OnInit {
  feedbacks?: Feedback[] | null;
  currentFeedback: Feedback = {};
  currentIndex = -1;
  accArray: any[] = [];
  isLoading = false;
  parentMessage = 'feedback';

  constructor(
    private feedbackService: FeedbackService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.retrieveFeedbacks();
  }

  retrieveFeedbacks(): void {
    this.isLoading = true;
    this.feedbackService.getAll().subscribe(
      (data) => {
        this.isLoading = false;
        this.feedbacks = data.length > 0 ? data : null;
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
    this.retrieveFeedbacks();
    this.currentFeedback = {};
    this.currentIndex = -1;
  }

  setActiveFeedback(tutorial: Feedback, index: number): void {
    this.currentFeedback = tutorial;
    this.currentIndex = index;
  }

  removeAllFeedbacks(): void {
    this.feedbackService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openAddEditFeedBackForm(type: string, formData?: Feedback): void {
    this.modalService
      .custom(CustomDialogComponent, {
        title: 'Add Feedback',
        modalType: 'add-feedback',
        formData: formData ? formData : null,
      })
      .pipe(take(1)) // take() manages unsubscription for us
      .subscribe((result: any) => {
        if (result) {
          this.retrieveFeedbacks();
          // this.openSuccessLeadGenerartionModal();
        }
      });
  }

  deleteFeedback(empId: any): void {
    this.feedbackService.delete(empId).subscribe(
      (response) => {
        this.retrieveFeedbacks();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  receiveSearchedData($event: Feedback[]) {
    this.currentFeedback = {};
    this.currentIndex = -1;
    this.feedbacks = $event;
  }
}
