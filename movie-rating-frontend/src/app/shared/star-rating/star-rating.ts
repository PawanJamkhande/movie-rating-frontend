import { Component, EventEmitter, Input, Output } from '@angular/core';

// Small reusable star-rating widget.
// readonly=true  -> just displays a value (e.g. average rating on a movie card)
// readonly=false -> lets the user click a star to pick 1-5 (used on the rate-movie form)
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.css'
})
export class StarRatingComponent {

  @Input() rating = 0;
  @Input() readonly = false;
  @Output() ratingChange = new EventEmitter<number>();

  hoverValue = 0;

  stars = [1, 2, 3, 4, 5];

  select(value: number): void {
    if (this.readonly) return;
    this.rating = value;
    this.ratingChange.emit(value);
  }

  onHover(value: number): void {
    if (this.readonly) return;
    this.hoverValue = value;
  }

  onLeave(): void {
    this.hoverValue = 0;
  }

  isFilled(star: number): boolean {
    const active = this.hoverValue || this.rating;
    return star <= Math.round(active);
  }

}
