import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSuccessPageComponent } from './book-success-page.component';

describe('BookSuccessPageComponent', () => {
  let component: BookSuccessPageComponent;
  let fixture: ComponentFixture<BookSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSuccessPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
