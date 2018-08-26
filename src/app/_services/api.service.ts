import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const config = {
apiUrl: ' https://swapi.co/api'
};

interface Response {
  success: boolean;
  errorMessage: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  getCharacter(username: string) {
    return this.http.get<any>(`${config.apiUrl}/people?search=${username}`)
            .pipe(map(res => {
                if (res && res.success && res.data) {
                    // store user details
                    sessionStorage.setItem('currentUser', JSON.stringify(res.data));
                }
                return res;
            }))
            .pipe(catchError(this.handleError('getPeople', [])));
  }

  getPlanets (name: string) {
    return this.http.get<any>(`${config.apiUrl}/planets?search=${name}`)
    .pipe(map(res => {
      return res.results || [];
    }))
    .pipe(catchError(this.handleError('getPlanet', [])));
  }

  private handleError (operation, result) {
    return (error: any): Observable<Response> => {
      console.log(`error in ${operation}:  ${error}`);
      return of({ success: false, errorMessage: 'Some error occured!!' } as Response);
    };
  }
}
