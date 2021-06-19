import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { Feedback } from 'src/app/models/feedback/feedback.model';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  title = '';

  @Input() childMessage!: string;
  @Output() searchEvent = new EventEmitter<Feedback[]>();

  constructor(
    private feedbackService: FeedbackService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {}

  searchTitle(search: string): void {
    if (this.childMessage === 'feedback') {
      this.feedbackService.findByTitle(search).subscribe(
        (data) => {
          this.searchEvent.emit(data);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.employeeService.findByTitle(search).subscribe(
        (data) => {
          this.searchEvent.emit(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
