import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  public latitude: any;

  @Input()
  public longitude: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  private _platform: any;
  private _map: any;
  private _ui: any;
  private _search: any;

  public constructor() { }

  public ngOnInit() {
    this._platform = new H.service.Platform({
      "app_id": environment.appId,
      "apikey": environment.apiKey
    });
  }

  public ngAfterViewInit() {
    let defaultLayers = this._platform.createDefaultLayers();
    this._map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        zoom: 13,
        center: {
          lat: this.latitude,
          lng: this.longitude
        }
      }
    );

    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this._map));
    this._ui = H.ui.UI.createDefault(this._map, defaultLayers);

    this._search = new H.places.Search(this._platform.getPlacesService());
  }

}
