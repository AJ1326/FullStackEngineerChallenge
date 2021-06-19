import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../../models/feedback/feedback.model';

const baseUrl = 'http://localhost:8080/api/feedbacks';

const baseUrl1 = 'http://localhost:8080/api/reviews';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseUrl);
  }

  get(id: any): Observable<Feedback> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any, feedbackId: string): Observable<any> {
    return this.http.post(`${baseUrl}/${feedbackId}`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(name: any): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${baseUrl}?name=${name}`);
  }
}
