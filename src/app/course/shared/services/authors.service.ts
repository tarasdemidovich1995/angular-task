import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Author } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient) {}

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiUrl}/authors`)
      .pipe(delay(500));
  }
}
