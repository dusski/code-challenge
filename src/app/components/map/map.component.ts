import { Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  activeMarker: any = null;
  activeMarkerId: string = '';
  passiveMarkerElement: HTMLElement;
  activeMarkerElement: HTMLElement;
  private _platform: any;
  private _map: any;
  private _ui: any;
  private _search: any;
  /**
   * Marker consist of data and map marker instance.
   */
  private _markers: { [markerId: string]: { data: any; instance: any; }; } = {};
  private _activeMarker: any;

  @ViewChild("map") public mapElementRef: ElementRef;
  @ViewChild("activeMarkerRef") public activeMarkerRef: ElementRef;
  @ViewChild("passiveMarkerRef") public passiveMarkerRef: ElementRef;

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
    this._map = new H.Map(this.mapElementRef.nativeElement, defaultLayers.vector.normal.map);

    let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this._map));

    window.navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude: lat, longitude: lng } = position.coords;
        this._dataService.currentLocation = [lat, lng];

        this._map?.setCenter({ lat, lng });
        this._map?.setZoom(15, true);

        this.queryData();
      }
    );

    this.passiveMarkerElement = (<HTMLElement> this.passiveMarkerRef.nativeElement).cloneNode(true) as HTMLElement;
    this.passiveMarkerElement.classList.remove('hidden');
    this.activeMarkerElement = (<HTMLElement> this.activeMarkerRef.nativeElement).cloneNode(true) as HTMLElement;
    this.activeMarkerElement.classList.remove('hidden');
  }

  ngOnDestroy(): void {
    for (const markerId in this._markers) {
      if (Object.prototype.hasOwnProperty.call(this._markers, markerId)) {
        const marker = this._markers[markerId];
        // remove event listener
        marker.instance.destroyListener();
      }
    }
  }

  queryData() {
    this._dataService.queryLocation('hotels')
      .pipe(first())
      .subscribe(
        ({ items }: { items: any[]; }) => {
          items.map(
            (data: any) => {
              const { id, position } = data;

              const icon = new H.map.DomIcon(this.passiveMarkerElement);
              const marker = new H.map.DomMarker(position, { icon });

              marker.addEventListener('tap', (event: any) => this.onMarkerClicked(id));
              // adds a remove listener function
              marker.destroyListener = () => {
                marker.removeEventListener('tap', (event: any) => this.onMarkerClicked(id));
              };

              this._markers[id] = { data, instance: marker };
              this._map.addObject(marker);
            }
          );
        },
      );
  }

  onMarkerClicked(markerId: string) {
    if (this.activeMarkerId !== '' && this.activeMarkerId !== markerId) {
      this.activeMarker.instance.setIcon(new H.map.DomIcon(this.passiveMarkerElement));
    }

    this.activeMarkerId = markerId;
    const { data: { position } } = this.activeMarker = this._markers[markerId];

    this.activeMarker.instance.setIcon(new H.map.DomIcon(this.activeMarkerElement));
    this._map.setCenter(position);
    this._map.setZoom(18, true);
    this._dataService.markerSelectedEvent.next(markerId);
  }

}
