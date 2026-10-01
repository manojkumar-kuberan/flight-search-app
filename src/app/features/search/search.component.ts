import { Component, EventEmitter, Output, inject } from '@angular/core';

import {
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export interface SearchFormValue {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private readonly fb = inject(FormBuilder);

  @Output()
  readonly search = new EventEmitter<SearchFormValue>();

  readonly airports = [
    {
      code: 'MAA',
      name: 'Chennai',
    },
    {
      code: 'DEL',
      name: 'Delhi',
    },
    {
      code: 'BOM',
      name: 'Mumbai',
    },
    {
      code: 'BLR',
      name: 'Bengaluru',
    },
    {
      code: 'HYD',
      name: 'Hyderabad',
    },
    {
      code: 'CCU',
      name: 'Kolkata',
    },
    {
      code: 'DXB',
      name: 'Dubai',
    },
    {
      code: 'SIN',
      name: 'Singapore',
    },
  ];

  get today(): string {
    const date = new Date();

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, '0');

    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private dateAndRouteValidator = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const from = control.get('from')?.value as string;

    const to = control.get('to')?.value as string;

    const departureDate = control.get('departureDate')?.value as string;

    const returnDate = control.get('returnDate')?.value as string;

    const errors: ValidationErrors = {};

    /*
     * From and To cannot be the same.
     */
    if (from && to && from === to) {
      errors['sameAirport'] = true;
    }

    /*
     * Departure date cannot be in the past.
     */
    if (departureDate && departureDate < this.today) {
      errors['departureInPast'] = true;
    }

    /*
     * Return date cannot be before departure date.
     */
    if (departureDate && returnDate && returnDate < departureDate) {
      errors['returnBeforeDeparture'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };

  readonly searchForm = this.fb.group(
    {
      from: ['', Validators.required],

      to: ['', Validators.required],

      departureDate: ['', Validators.required],

      returnDate: ['', Validators.required],

      passengers: [
        1,
        [Validators.required, Validators.min(1), Validators.max(9)],
      ],
    },
    {
      validators: this.dateAndRouteValidator,
    },
  );

  get fromControl() {
    return this.searchForm.controls['from'];
  }

  get toControl() {
    return this.searchForm.controls['to'];
  }

  get departureDateControl() {
    return this.searchForm.controls['departureDate'];
  }

  get returnDateControl() {
    return this.searchForm.controls['returnDate'];
  }

  get passengersControl() {
    return this.searchForm.controls['passengers'];
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();

      return;
    }

    const value = this.searchForm.getRawValue();

    const searchCriteria: SearchFormValue = {
      from: value.from!,
      to: value.to!,
      departureDate: value.departureDate!,
      returnDate: value.returnDate!,
      passengers: Number(value.passengers),
    };

    this.search.emit(searchCriteria);
  }

  swapLocations(): void {
    const from = this.fromControl.value;

    const to = this.toControl.value;

    this.fromControl.setValue(to);

    this.toControl.setValue(from);

    this.searchForm.updateValueAndValidity();
  }
}
