import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {

  hotel: string = '';
  bookingForm: any;
  private _destruction$: Subject<any> = new Subject<any>();

  get firstName(): FormControl {
    return this.bookingForm.get('firstName');
  }
  get lastName(): FormControl {
    return this.bookingForm.get('lastName');
  }
  get dateFrom(): FormControl {
    return this.bookingForm.get('dateFrom');
  }
  get dateTo(): FormControl {
    return this.bookingForm.get('dateTo');
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {

    this.bookingForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      comments: [''],
    });

  }

  ngOnInit(): void {
    this._route.params
      .pipe(
        takeUntil(this._destruction$)
      )
      .subscribe(
        (params: Params) => {
          this.hotel = params.place;
        }
      );
  }

  ngOnDestroy(): void {
    this._destruction$.next();
    this._destruction$.complete();
  }

  onSubmit() {
    console.log(this.bookingForm.value);
    this._router.navigate(['/book-success']);
  }

  onCancel() {
    this._router.navigate(['/']);
  }

}
