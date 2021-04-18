import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // default location, intersection of equator and prime meridian
  currentLocation: [number, number] = [0, 0];

  private _geolocation: Geolocation;

  get position(): Observable<[latitude: number, longitude: number]> {
    return new Observable<[latitude: number, longitude: number]>(
      (subscriber: Subscriber<[latitude: number, longitude: number]>) => {
        window.navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            subscriber.next([latitude, longitude]);
          }
        );
      }
    );

  }

  constructor(
    private _httpClient: HttpClient
  ) {
    this._geolocation = window.navigator.geolocation;

    // bindCallback

    // this._geolocation.getCurrentPosition(
    //   (position: GeolocationPosition) => {
    //     const { latitude, longitude } = position.coords;

    //     this.currentLocation = [latitude, longitude];
    //   }
    // );
  }

  queryLocation(query: string) {
    // return this._httpClient.get
  }
}
