import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMoviesComponent } from './movies/add-movies/add-movies.component';
import { UpdateMovieComponent } from './movies/update-movie/update-movie.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'add-movie', component: AddMoviesComponent },
  { path: 'update-movie/:id', component: UpdateMovieComponent },
];
