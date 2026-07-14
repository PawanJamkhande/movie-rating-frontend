import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../../services/movie-service';
import { AuthService } from '../../services/auth-service';
import { Movie, MOVIE_GENRES } from '../../models/movie';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.html',
  styleUrl: './list-movie.css'
})
export class ListMovie implements OnInit {

  allMovies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchTerm = '';
  selectedGenre = '';
  genres: string[] = MOVIE_GENRES;
  loading = true;
  fallbackPoster = 'https://placehold.co/300x400?text=No+Poster';

  constructor(
    private movieService: MovieService,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    this.movieService.getAllMovies().subscribe({
      next: (res) => {
        this.allMovies = res.data;
        this.applyFilters();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  applyFilters(): void {
    this.filteredMovies = this.allMovies.filter(m => {
      const matchesSearch = !this.searchTerm ||
        m.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      // a movie tagged [Drama, Horror] should match a filter of either "Drama" OR "Horror"
      const matchesGenre = !this.selectedGenre || (m.genres || []).includes(this.selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onGenreChange(): void {
    this.applyFilters();
  }

  viewMovie(movieId?: number): void {
    if (movieId) this.router.navigate(['/movies', movieId]);
  }

  editMovie(event: Event, movieId?: number): void {
    event.stopPropagation();
    if (movieId) this.router.navigate(['/movies/update', movieId]);
  }

  deleteMovie(event: Event, movie: Movie): void {
    event.stopPropagation();

    if (!confirm(`Delete "${movie.title}"? This will also remove all its ratings.`)) return;

    this.movieService.deleteMovie(movie.movieId!).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Close', { duration: 3000 });
        this.loadMovies();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Delete failed', 'Close', { duration: 3000 })
    });
  }

  onPosterError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== this.fallbackPoster) {
      img.src = this.fallbackPoster;
    }
  }

}
