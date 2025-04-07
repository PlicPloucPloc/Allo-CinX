import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MoviesService } from '../services/movies.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Movie } from '../models/movies';
import { MovieComponent } from './movie/movie.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, MovieComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly moviesService = inject(MoviesService);
  movies$: Observable<Movie[]> = this.moviesService.getMovies();
  searchTerm$ = new BehaviorSubject<string>('');
  sortCriteria$ = new BehaviorSubject<string>('title');
  filteredMovies$!: Observable<Movie[]>;

  ngOnInit() {
    this.movies$ = this.moviesService.getMovies();

    this.filteredMovies$ = combineLatest([this.movies$, this.searchTerm$, this.sortCriteria$]).pipe(
      map(([movies, searchTerm, sortCriteria]) => {
        // First filter by search term
        let filtered = movies;
        if (searchTerm.trim() !== '') {
          const term = searchTerm.toLowerCase();
          filtered = movies.filter((movie) => movie.title.toLowerCase().includes(term) || movie.synopsis.toLowerCase().includes(term));
        }

        // Then sort
        return this.sortMoviesList(filtered, sortCriteria);
      }),
    );
  }

  searchMovies(term: string) {
    this.searchTerm$.next(term);
  }

  sortMovies(event: any) {
    this.sortCriteria$.next(event.target.value);
  }

  private sortMoviesList(movies: Movie[], criteria: string): Movie[] {
    switch (criteria) {
      case 'title':
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case 'rate':
        return [...movies].sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));
      case 'newest':
        return [...movies].sort((a, b) => {
          // Assuming there's a releaseDate field or similar
          if (a.releaseDate && b.releaseDate) {
            return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
          }
          return 0;
        });
      default:
        return movies;
    }
  }
}
