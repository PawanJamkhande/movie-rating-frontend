export interface Rating {
  ratingId?: number;
  userId: number;
  userName?: string;
  movieId: number;
  movieTitle?: string;
  stars: number;
  review?: string;
  ratedDate?: string;
}
