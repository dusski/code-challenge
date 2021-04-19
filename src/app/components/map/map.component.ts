import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/location/data.service';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private _platform: any;
  private _map: any;
  private _ui: any;
  private _search: any;

  @ViewChild("map") public mapElement: ElementRef;

  @Input()
  public latitude: any;

  @Input()
  public longitude: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  public constructor(
    private _dataService: DataService
  ) { }

  public ngOnInit() {
    this._platform = new H.service.Platform({
      "app_id": environment.appId,
      "apikey": environment.apiKey
    });
  }

  public ngAfterViewInit() {
    let defaultLayers = this._platform?.createDefaultLayers();
    this._map = new H.Map(this.mapElement.nativeElement, defaultLayers.vector.normal.map);

    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this._map));

    window.navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude: lat, longitude: lng } = position.coords;
        this._dataService.currentLocation = [lat, lng];

        this._map?.setCenter({ lat, lng });
        this._map?.setZoom(13, true);

        this.queryData();
      }
    );
  }

  queryData() {
    this._dataService.queryLocation('hotels')
      .pipe(first())
      .subscribe(
        (response: any) => {},
      );
  }

}
