import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/review/review.model';

const baseUrl = 'http://localhost:8080/api/reviews';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(baseUrl);
  }

  get(id: any): Observable<Review> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any, reviewId: string): Observable<any> {
    return this.http.post(`${baseUrl}/${reviewId}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
