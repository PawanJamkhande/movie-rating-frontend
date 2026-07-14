import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) { }

  // ---- Admin operations ----

  addMovie(movie: Movie): Observable<ApiResponse<Movie>> {
    return this.http.post<ApiResponse<Movie>>(`${this.baseUrl}/add`, movie);
  }

  updateMovie(movieId: number, movie: Movie): Observable<ApiResponse<Movie>> {
    return this.http.put<ApiResponse<Movie>>(`${this.baseUrl}/update/${movieId}`, movie);
  }

  deleteMovie(movieId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${movieId}`);
  }

  // ---- Shared operations ----

  getMovieById(movieId: number): Observable<ApiResponse<Movie>> {
    return this.http.get<ApiResponse<Movie>>(`${this.baseUrl}/${movieId}`);
  }

  getAllMovies(): Observable<ApiResponse<Movie[]>> {
    return this.http.get<ApiResponse<Movie[]>>(`${this.baseUrl}/all`);
  }

  searchByTitle(title: string): Observable<ApiResponse<Movie[]>> {
    return this.http.get<ApiResponse<Movie[]>>(`${this.baseUrl}/search`, { params: { title } });
  }

  getByGenre(genre: string): Observable<ApiResponse<Movie[]>> {
    return this.http.get<ApiResponse<Movie[]>>(`${this.baseUrl}/genre/${genre}`);
  }

}
