import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Flight } from '../../../core/models/flight.model';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss',
})
export class FlightCardComponent {
  @Input({ required: true })
  flight!: Flight;

  @Output()
  viewDetails = new EventEmitter<string>();

  onViewDetails(): void {
    this.viewDetails.emit(this.flight.id);
  }
}
