import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  hotels: any[] = [];
  // default location, intersection of equator and prime meridian
  private _currentLocation: [latitude: number, longitude: number] = [0, 0];

  get currentLocation(): [latitude: number, longitude: number] {
    return this._currentLocation;
  }
  set currentLocation(position: [latitude: number, longitude: number]) {
    this._currentLocation = position;
  }

  constructor(
    private _httpClient: HttpClient
  ) { }

  queryLocation(query: string) {
    const [latitude, longitude] = this._currentLocation;
    const queryParam = new HttpParams().append('q', query);

    return this._httpClient.get(`https://discover.search.hereapi.com/v1/discover?at=${latitude},${longitude}&${queryParam.toString()}&apiKey=${environment.apiKey}`)
      .pipe(
        tap(
          (data: any) => {
            this.hotels = data;
          }
        ),
        catchError(
          () => {
            this.hotels = [];
            return of([]);
          }
        )
      );
  }
}
