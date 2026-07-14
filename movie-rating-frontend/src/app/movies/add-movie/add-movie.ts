import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../../services/movie-service';
import { MOVIE_GENRES } from '../../models/movie';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.css'
})
export class AddMovie {

  movieForm: FormGroup;
  loading = false;
  genresList = MOVIE_GENRES;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genres: [[], Validators.required],
      director: ['', Validators.required],
      releaseYear: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
      language: ['', Validators.required],
      durationMinutes: [null, [Validators.required, Validators.min(1)]],
      posterUrl: [''],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.movieService.addMovie(this.movieForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.snackBar.open(res.message, 'Close', { duration: 3000 });
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Failed to add movie', 'Close', { duration: 3000 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/movies']);
  }

}
