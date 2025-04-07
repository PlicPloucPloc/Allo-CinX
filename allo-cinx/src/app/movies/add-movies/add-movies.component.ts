import { Component, inject } from '@angular/core';
import { Movie } from '../../models/movies';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-add-movies',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-movies.component.html',
  styleUrl: './add-movies.component.scss',
})
export class AddMoviesComponent {
  private readonly router = inject(Router);
  private readonly moviesService = inject(MoviesService);

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined,
  };

  addMovie(): void {
    this.moviesService.addMovie(this.movie).subscribe(() => this.router.navigate(['/movies']));
  }
}
