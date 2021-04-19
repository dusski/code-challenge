import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { BookSuccessPageComponent } from './pages/book-success-page/book-success-page.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'book/:place',
    component: BookingPageComponent
  },
  {
    path: 'book-success',
    component: BookSuccessPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
