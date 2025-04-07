import { Component, DestroyRef, inject } from '@angular/core';
import { Movie } from '../models/movies';
import { take } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { Router, RouterLink } from '@angular/router';
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
  constructor(private router: Router) {}
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
  updateMovie(id: number): void {
    //we get the product
    localStorage.setItem('toUpdate', JSON.stringify(this.movies[id]));
    this.router.navigate(['/update-movie']);
  }
}
