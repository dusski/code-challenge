import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/location/data.service';

@Component({
  selector: '[app-card]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
    class: 'card'
  }
})
export class CardComponent implements OnInit, AfterViewInit {

  selectedCardId: string = '';
  private _destruction$: Subject<any> = new Subject<any>();

  @Input() item: any;

  @ViewChild('card') cardRef: ElementRef;

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._dataService.markerSelectedEvent
      .pipe(
        takeUntil(this._destruction$)
      )
      .subscribe(
        (hotelId: string) => {
          const { id } = this.item;

          if (hotelId !== id) {
            this.selectedCardId = '';
            return;
          }

          this.selectedCardId = id;
          this.cardRef.nativeElement.scrollIntoView(true);
        }
      );
  }

  ngOnDestroy(): void {
    this._destruction$.next();
    this._destruction$.complete();
  }

}
