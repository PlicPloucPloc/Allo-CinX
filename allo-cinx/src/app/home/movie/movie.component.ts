import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movies';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [NgClass, NgStyle, RouterLink, DatePipe],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  @Input({ required: true }) movie!: Movie;
  @Input() viewMode: 'grid' | 'list' = 'grid';
}
