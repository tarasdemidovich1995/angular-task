import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Author } from '../interfaces';
import { AlertService } from './alert.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  public list: Author[] = [];

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
    private alertService: AlertService
  ) {}

  public update(): Observable<Author[]> {
    this.loaderService.showLoader();
    return this.http.get<Author[]>(`${environment.apiUrl}/authors`)
      .pipe(
        delay(500),
        tap((authors: Author[]) => {
          this.list = authors;
          this.loaderService.hideLoader();
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse): Observable<void> {
    this.alertService.danger(error.error);
    return throwError(error);
  }
}
