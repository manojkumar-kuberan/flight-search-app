import { Component } from '@angular/core';

import { SearchComponent, SearchFormValue } from '../search/search.component';

import { FlightResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, FlightResultsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  searchCriteria: SearchFormValue | null = null;

  onSearch(criteria: SearchFormValue): void {
    this.searchCriteria = criteria;
  }
}
