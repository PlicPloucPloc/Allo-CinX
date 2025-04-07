import { Component, inject } from '@angular/core';
import { Movie } from '../models/movies';
import { take } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  private readonly moviesService = inject(MoviesService);

  movies!: Movie[];

  deleteMovie(id: number): void {
    this.moviesService
      .deleteMovie(id)
      .pipe(take(1))
      .subscribe(() => (this.movies = this.movies.filter((film) => film.id !== id)));
  }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe((movies) => (this.movies = movies));
  }
}
