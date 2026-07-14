import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { MovieService } from '../../services/movie-service';
import { RatingService } from '../../services/rating-service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  movies: Movie[] = [];
  topRated: Movie[] = [];
  myRatingsCount = 0;
  loading = true;
  fallbackPoster = 'https://placehold.co/300x400?text=No+Poster';

  constructor(
    public authService: AuthService,
    private movieService: MovieService,
    private ratingService: RatingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.movieService.getAllMovies().subscribe({
      next: (res) => {
        this.movies = res.data;
        this.topRated = [...this.movies]
          .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
          .slice(0, 5);
        this.loading = false;
      },
      error: () => this.loading = false
    });

    const user = this.authService.getCurrentUser();
    if (user?.userId) {
      this.ratingService.getRatingsByUser(user.userId).subscribe({
        next: (res) => this.myRatingsCount = res.data.length
      });
    }
  }

  get totalRatingsCount(): number {
    return this.movies.reduce((sum, m) => sum + (m.totalRatings || 0), 0);
  }

  goToMovie(movieId?: number): void {
    if (movieId) this.router.navigate(['/movies', movieId]);
  }

  onPosterError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== this.fallbackPoster) {
      img.src = this.fallbackPoster;
    }
  }

}
