export interface Movie {
  movieId?: number;
  title: string;
  genres: string[];
  director: string;
  releaseYear: number;
  description?: string;
  posterUrl?: string;
  language: string;
  durationMinutes?: number;
  status?: string;
  averageRating?: number;
  totalRatings?: number;
}

// fixed, curated list used by both the add/update movie form (as a multi-select)
// and the browse/filter dropdown, so genre values are always consistent - no risk
// of "Drama" vs "drama" vs "Drama,Horror" being treated as different genres.
export const MOVIE_GENRES: string[] = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'Horror', 'Musical',
  'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
];

