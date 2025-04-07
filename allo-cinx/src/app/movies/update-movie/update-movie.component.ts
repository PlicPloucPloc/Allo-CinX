import { Component, inject, Input } from '@angular/core';
import { Movie } from '../../models/movies';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-update-movie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-movie.component.html',
  styleUrl: './update-movie.component.scss',
})
export class UpdateMovieComponent {
  movieService = inject(MoviesService);
  constructor(private router: Router) {}
  movie: { id: number; title: string; director: string; releaseDate: string; synopsis: string } = {
    id: 0,
    title: '',
    director: '',
    releaseDate: '',
    synopsis: '',
  };
  ngOnInit(): void {
    const detectedMovie = localStorage.getItem('toUpdate');
    if (detectedMovie === null) {
      return;
    }
    const parsedMovie: Movie = JSON.parse(detectedMovie);
    this.movie.id = parsedMovie.id ?? 0;
    this.movie.title = parsedMovie.title;
    this.movie.director = parsedMovie.director;
    this.movie.synopsis = parsedMovie.synopsis;
    const date = new Date(parsedMovie.releaseDate);
    if (!isNaN(date.getTime())) {
      this.movie.releaseDate = date.toISOString().split('T')[0];
    } else {
      this.movie.releaseDate = ''; // Handle invalid dates
    }
  }
  goBackToList(): void {
    this.router.navigate(['/movies']);
  }
  updateMovie(): void {
    this.movieService.updateMovie({ ...this.movie, releaseDate: new Date(this.movie.releaseDate) }).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }
}
