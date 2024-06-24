import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileApiService {
  constructor(protected http: HttpClient) { }

  getFile(id: string): Observable<string> {
    return this.http.get(id,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      }).pipe(
        catchError((error: HttpErrorResponse) => {
          this.handleError(error);
          return throwError(() => error);
        }),
    )
  }

  handleError(response: HttpErrorResponse): void {
    console.error(response.error || response.status ? `${response.status} - ${response.statusText}` : 'Server error');
  }
}
