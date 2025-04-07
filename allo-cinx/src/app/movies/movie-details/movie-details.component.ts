import { Component, inject } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movies';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [DatePipe, NgIf, RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent {
  private readonly moviesService = inject(MoviesService);
  private readonly route = inject(ActivatedRoute);

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined,
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.moviesService.getMovieById(id).subscribe((movie: Movie) => {
        this.movie = movie;
      });
    }
  }
}
