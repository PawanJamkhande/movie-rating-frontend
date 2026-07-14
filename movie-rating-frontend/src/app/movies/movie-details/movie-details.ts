import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../../services/movie-service';
import { RatingService } from '../../services/rating-service';
import { AuthService } from '../../services/auth-service';
import { Movie } from '../../models/movie';
import { Rating } from '../../models/rating';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit {

  movie?: Movie;
  ratings: Rating[] = [];
  loading = true;

  myStars = 0;
  myReview = '';
  submitting = false;

  // shown whenever posterUrl is empty, OR the given URL fails to actually load as an image
  fallbackPoster = 'https://placehold.co/300x400?text=No+Poster';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private ratingService: RatingService,
    public authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMovie(movieId);
    this.loadRatings(movieId);
  }

  loadMovie(movieId: number): void {
    this.movieService.getMovieById(movieId).subscribe({
      next: (res) => {
        this.movie = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Movie not found', 'Close', { duration: 3000 });
        this.router.navigate(['/movies']);
      }
    });
  }

  loadRatings(movieId: number): void {
    this.ratingService.getRatingsForMovie(movieId).subscribe({
      next: (res) => {
        this.ratings = res.data.sort((a, b) =>
          new Date(b.ratedDate || 0).getTime() - new Date(a.ratedDate || 0).getTime());

        // if the current user already rated this movie, preload the form with their existing rating
        const currentUser = this.authService.getCurrentUser();
        const mine = this.ratings.find(r => r.userId === currentUser?.userId);
        if (mine) {
          this.myStars = mine.stars;
          this.myReview = mine.review || '';
        }
      }
    });
  }

  get otherRatings(): Rating[] {
    const currentUser = this.authService.getCurrentUser();
    return this.ratings.filter(r => r.userId !== currentUser?.userId);
  }

  get myExistingRating(): Rating | undefined {
    const currentUser = this.authService.getCurrentUser();
    return this.ratings.find(r => r.userId === currentUser?.userId);
  }

  submitRating(): void {
    if (this.myStars < 1) {
      this.snackBar.open('Please select at least 1 star', 'Close', { duration: 2500 });
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser?.userId || !this.movie?.movieId) return;

    this.submitting = true;

    const payload: Rating = {
      userId: currentUser.userId,
      movieId: this.movie.movieId,
      stars: this.myStars,
      review: this.myReview
    };

    this.ratingService.rateMovie(payload).subscribe({
      next: (res) => {
        this.submitting = false;
        this.snackBar.open(res.message, 'Close', { duration: 3000 });
        this.loadMovie(this.movie!.movieId!);
        this.loadRatings(this.movie!.movieId!);
      },
      error: (err) => {
        this.submitting = false;
        this.snackBar.open(err.error?.message || 'Failed to submit rating', 'Close', { duration: 3000 });
      }
    });
  }

  deleteMyRating(): void {
    const existing = this.myExistingRating;
    if (!existing?.ratingId) return;

    if (!confirm('Remove your rating for this movie?')) return;

    this.ratingService.deleteRating(existing.ratingId).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Close', { duration: 3000 });
        this.myStars = 0;
        this.myReview = '';
        this.loadMovie(this.movie!.movieId!);
        this.loadRatings(this.movie!.movieId!);
      }
    });
  }

  editMovie(): void {
    if (this.movie?.movieId) this.router.navigate(['/movies/update', this.movie.movieId]);
  }

  // fires when the <img> fails to load (wrong link, webpage instead of an image file,
  // hotlink-blocked, deleted image, etc.) - swap to the placeholder instead of a broken icon
  onPosterError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.src !== this.fallbackPoster) {
      img.src = this.fallbackPoster;
    }
  }

}
