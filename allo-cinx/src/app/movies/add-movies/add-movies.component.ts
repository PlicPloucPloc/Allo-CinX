import { Component, inject } from '@angular/core';
import { Movie } from '../../models/movies';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

import {CommonModule, formatDate} from '@angular/common';
@Component({
  selector: 'app-add-movies',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-movies.component.html',
  styleUrl: './add-movies.component.scss'
})
export class AddMoviesComponent {
  movie: Movie = {
    title: '',
    director: '',
    releaseDate: new Date(),
    synopsis: '',
    id: undefined,
    rate: undefined,
    image: undefined
  }
  private readonly moviesService = inject(MoviesService);

  constructor(private router: Router) {

  }
  formattedDate: string = this.formatDate(new Date());

  // Fonction pour formater la date en "mm/dd/yyyy"
  formatDate(date: Date): string {
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
  goBackToList(): void {
    this.router.navigate(["/movies"])
  }

  addMovie(): void {
        this.moviesService.addMovie(this.movie).subscribe(
          () => this.router.navigate(['/movies'])
        );
      }








}
