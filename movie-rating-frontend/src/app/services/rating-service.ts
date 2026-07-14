import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Rating } from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private baseUrl = `${environment.apiUrl}/ratings`;

  constructor(private http: HttpClient) { }

  // submits a new rating, or updates the user's existing rating for that movie (upsert on the backend)
  rateMovie(rating: Rating): Observable<ApiResponse<Rating>> {
    return this.http.post<ApiResponse<Rating>>(`${this.baseUrl}/rate`, rating);
  }

  getRatingsForMovie(movieId: number): Observable<ApiResponse<Rating[]>> {
    return this.http.get<ApiResponse<Rating[]>>(`${this.baseUrl}/movie/${movieId}`);
  }

  getRatingsByUser(userId: number): Observable<ApiResponse<Rating[]>> {
    return this.http.get<ApiResponse<Rating[]>>(`${this.baseUrl}/user/${userId}`);
  }

  deleteRating(ratingId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${ratingId}`);
  }

}
