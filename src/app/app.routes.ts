import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { FlightDetailsComponent } from './features/details/flight-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'flight/:id',
    component: FlightDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
