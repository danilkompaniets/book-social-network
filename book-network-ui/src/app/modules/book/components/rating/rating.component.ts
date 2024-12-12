import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-rating',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './rating.component.html',
  standalone: true,
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input() rating: number = 0;
  maxRating: number = 5;

  get fullStars(): number {
    return Math.floor(this.rating);
  }

  get halfStar(): boolean {
    return this.rating % 1 !== 0;
  }

  get emptyStars(): number {
    return this.maxRating - Math.ceil(this.rating)
  }

}
