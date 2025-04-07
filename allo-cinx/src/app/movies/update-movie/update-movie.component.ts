import { Component, inject } from '@angular/core';
import { Movie } from '../../models/movies';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-update-movie',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-movie.component.html',
  styleUrl: './update-movie.component.scss',
})
export class UpdateMovieComponent {
  private readonly moviesService = inject(MoviesService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined,
  };

  releaseDate: string = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.moviesService.getMovieById(id).subscribe((movie: Movie) => {
        this.movie = movie;

        var releaseDate = new Date(this.movie.releaseDate);
        if (!isNaN(releaseDate.getTime())) {
          this.releaseDate = releaseDate.toISOString().split('T')[0];
        }
      });
    }
  }

  goBackToList(): void {
    this.router.navigate(['/movies']);
  }
  updateMovie(): void {
    this.moviesService.updateMovie({ ...this.movie, releaseDate: new Date(this.releaseDate) }).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }
}
