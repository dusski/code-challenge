import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-book-success-page',
  templateUrl: './book-success-page.component.html',
  styleUrls: ['./book-success-page.component.scss']
})
export class BookSuccessPageComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    const navigationTimer = timer(3000);

    navigationTimer
      .pipe(first())
      .subscribe(
        () => {
          this._router.navigate(['/']);
        }
      );
  }

}
