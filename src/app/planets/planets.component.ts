
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }
  searchText = '';
  planets: any = [];
  private timer: any = null;
  character = '';
  model: any;
  searching = false;
  searchFailed = false;



  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term =>
      this.apiService.getPlanets(term).pipe(
        tap(() => this.searchFailed = false),
        catchError(() => {
          this.searchFailed = true;
          return of([]);
        }))
    ),
    tap(() => this.searching = false)
  )

  formatter = (x: {name: string}) => x.name;

  getSize (population) {
    let size = 20; // default size for unknown population
    if (population.toLowerCase() !== 'unknown') {
      size = (200 / 10000000000) * population;
    }
    return {
      'height': size + 'px'
    };
  }

  ngOnInit() {
    const character = sessionStorage.getItem('currentChar');
    if (!character) {
      this.router.navigate(['/login']);
    } else {
      this.character = character;
    }

  }

}
