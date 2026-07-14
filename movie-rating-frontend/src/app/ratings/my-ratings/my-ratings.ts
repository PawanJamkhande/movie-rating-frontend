import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RatingService } from '../../services/rating-service';
import { AuthService } from '../../services/auth-service';
import { Rating } from '../../models/rating';

@Component({
  selector: 'app-my-ratings',
  templateUrl: './my-ratings.html',
  styleUrl: './my-ratings.css'
})
export class MyRatings implements OnInit {

  ratings: Rating[] = [];
  loading = true;

  constructor(
    private ratingService: RatingService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadMyRatings();
  }

  loadMyRatings(): void {
    const user = this.authService.getCurrentUser();
    if (!user?.userId) return;

    this.loading = true;

    this.ratingService.getRatingsByUser(user.userId).subscribe({
      next: (res) => {
        this.ratings = res.data.sort((a, b) =>
          new Date(b.ratedDate || 0).getTime() - new Date(a.ratedDate || 0).getTime());
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  viewMovie(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }

  deleteRating(rating: Rating): void {
    if (!rating.ratingId) return;
    if (!confirm(`Remove your rating for "${rating.movieTitle}"?`)) return;

    this.ratingService.deleteRating(rating.ratingId).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Close', { duration: 3000 });
        this.loadMyRatings();
      }
    });
  }

}
