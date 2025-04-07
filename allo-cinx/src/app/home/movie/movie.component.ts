import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movies';
import { DatePipe, NgClass, NgStyle, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [NgClass, NgStyle, SlicePipe, DatePipe],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  @Input({ required: true }) movie!: Movie;
  @Input() viewMode: 'grid' | 'list' = 'grid';
}
