import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMoviesComponent } from './movies/add-movies/add-movies.component';
import { UpdateMovieComponent } from './movies/update-movie/update-movie.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'add-movie', component: AddMoviesComponent },
  { path: 'update-movie', component: UpdateMovieComponent },
];
