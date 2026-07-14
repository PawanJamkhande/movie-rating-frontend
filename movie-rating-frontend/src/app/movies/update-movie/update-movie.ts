import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../../services/movie-service';
import { MOVIE_GENRES } from '../../models/movie';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.html',
  styleUrl: './update-movie.css'
})
export class UpdateMovie implements OnInit {

  movieForm: FormGroup;
  loading = false;
  fetching = true;
  movieId!: number;
  genresList = MOVIE_GENRES;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genres: [[], Validators.required],
      director: ['', Validators.required],
      releaseYear: [null, [Validators.required, Validators.min(1900)]],
      language: ['', Validators.required],
      durationMinutes: [null, [Validators.required, Validators.min(1)]],
      posterUrl: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getMovieById(this.movieId).subscribe({
      next: (res) => {
        this.movieForm.patchValue(res.data);
        this.fetching = false;
      },
      error: (err) => {
        this.fetching = false;
        this.snackBar.open(err.error?.message || 'Movie not found', 'Close', { duration: 3000 });
        this.router.navigate(['/movies']);
      }
    });
  }

  onSubmit(): void {
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.movieService.updateMovie(this.movieId, this.movieForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.snackBar.open(res.message, 'Close', { duration: 3000 });
        this.router.navigate(['/movies']);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Failed to update movie', 'Close', { duration: 3000 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/movies']);
  }

}
