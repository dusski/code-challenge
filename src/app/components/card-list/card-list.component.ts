import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  get items(): any[] {
    return this._dataService.hotels;
  }

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
  }

}
