import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { FlightService } from '../../core/services/flight.service';
import { Flight } from '../../core/models/flight.model';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.scss',
})
export class FlightDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly flightService = inject(FlightService);

  flight: Flight | null = null;

  loading = false;
  errorMessage = '';

  ngOnInit(): void {
    const flightId = this.route.snapshot.paramMap.get('id');

    if (!flightId) {
      this.errorMessage = 'Flight details are unavailable.';
      return;
    }

    this.loadFlight(flightId);
  }

  private loadFlight(flightId: string): void {
    this.loading = true;
    this.errorMessage = '';

    this.flightService
      .getFlightById(flightId)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (flight) => {
          this.flight = flight;
        },
        error: () => {
          this.errorMessage =
            'Unable to load flight details. Please try again.';
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
