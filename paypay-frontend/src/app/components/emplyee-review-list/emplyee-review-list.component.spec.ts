import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReviewListComponent } from './emplyee-review-list.component';

describe('EmployeeReviewListComponent', () => {
  let component: EmployeeReviewListComponent;
  let fixture: ComponentFixture<EmployeeReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeReviewListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
