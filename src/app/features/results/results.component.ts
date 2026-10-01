import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';

import { AsyncPipe, DecimalPipe } from '@angular/common';

import { Router } from '@angular/router';

import { BehaviorSubject, combineLatest, finalize, map } from 'rxjs';

import { FlightService } from '../../core/services/flight.service';

import { Flight } from '../../core/models/flight.model';

import { SearchFormValue } from '../search/search.component';

import { FlightCardComponent } from '../../shared/components/flight-card/flight-card.component';

@Component({
  selector: 'app-flight-results',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe, FlightCardComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class FlightResultsComponent implements OnChanges {
  private readonly flightService = inject(FlightService);

  private readonly router = inject(Router);

  @Input()
  searchCriteria: SearchFormValue | null = null;

  loading = false;

  errorMessage = '';

  readonly searchFlights$ = new BehaviorSubject<Flight[]>([]);

  readonly minPrice$ = new BehaviorSubject<number>(0);

  readonly maxPrice$ = new BehaviorSubject<number>(0);

  readonly maxStops$ = new BehaviorSubject<number>(2);

  readonly selectedAirline$ = new BehaviorSubject<string>('ALL');

  readonly priceRange$ = this.searchFlights$.pipe(
    map((flights) => {
      if (flights.length === 0) {
        return {
          min: 0,
          max: 50000,
        };
      }

      const prices = flights.map((flight) => flight.price);

      return {
        min: Math.min(...prices),
        max: Math.max(...prices),
      };
    }),
  );

  readonly airlines$ = this.searchFlights$.pipe(
    map((flights) =>
      Array.from(new Set(flights.map((flight) => flight.airline))).sort(),
    ),
  );

  readonly filteredFlights$ = combineLatest([
    this.searchFlights$,
    this.minPrice$,
    this.maxPrice$,
    this.maxStops$,
    this.selectedAirline$,
  ]).pipe(
    map(([flights, minPrice, maxPrice, maxStops, selectedAirline]) =>
      flights.filter((flight) => {
        const matchesPrice =
          flight.price >= minPrice && flight.price <= maxPrice;

        const matchesStops = flight.stops <= maxStops;

        const matchesAirline =
          selectedAirline === 'ALL' || flight.airline === selectedAirline;

        return matchesPrice && matchesStops && matchesAirline;
      }),
    ),
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchCriteria']?.currentValue) {
      this.resetFilters();

      this.loadFlights();
    }
  }

  private loadFlights(): void {
    if (!this.searchCriteria) {
      return;
    }

    this.loading = true;

    this.errorMessage = '';

    this.searchFlights$.next([]);

    this.flightService
      .getFlights()
      .pipe(
        map((flights) =>
          this.filterBySearchCriteria(flights, this.searchCriteria!),
        ),
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (flights) => {
          this.searchFlights$.next(flights);

          this.setPriceRange(flights);
        },

        error: () => {
          this.errorMessage =
            'Unable to load flight results. Please try again.';

          this.searchFlights$.next([]);
        },
      });
  }

  private filterBySearchCriteria(
    flights: Flight[],
    criteria: SearchFormValue,
  ): Flight[] {
    return flights.filter((flight) => {
      const matchesFrom = flight.departure.airport === criteria.from;

      const matchesTo = flight.arrival.airport === criteria.to;

      return matchesFrom && matchesTo;
    });
  }

  private setPriceRange(flights: Flight[]): void {
    if (flights.length === 0) {
      this.minPrice$.next(0);
      this.maxPrice$.next(0);

      return;
    }

    const prices = flights.map((flight) => flight.price);

    const minPrice = Math.min(...prices);

    const maxPrice = Math.max(...prices);

    this.minPrice$.next(minPrice);
    this.maxPrice$.next(maxPrice);
  }

  private resetFilters(): void {
    this.minPrice$.next(0);

    this.maxPrice$.next(0);

    this.maxStops$.next(2);

    this.selectedAirline$.next('ALL');
  }

  onMinPriceChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);

    if (value <= this.maxPrice$.value) {
      this.minPrice$.next(value);
    }
  }

  onMaxPriceChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);

    if (value >= this.minPrice$.value) {
      this.maxPrice$.next(value);
    }
  }

  onStopsChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);

    this.maxStops$.next(value);
  }

  onAirlineChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    this.selectedAirline$.next(value);
  }

  onViewDetails(flightId: string): void {
    this.router.navigate(['/flight', flightId]);
  }

  retry(): void {
    this.loadFlights();
  }
}
