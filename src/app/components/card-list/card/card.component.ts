import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-card]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
    class: 'card'
  }
})
export class CardComponent implements OnInit {

  @Input() data: number;

  constructor() { }

  ngOnInit(): void {
  }

}
