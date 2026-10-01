# ✈️ Travel Flight Search Application

A small Travel Flight Search Application built using Angular 18+, TypeScript, Reactive Forms, RxJS, Angular Routing, and a mock REST API.

The application allows users to search flights by route and dates, filter results, and view detailed flight information.

---

## Features

### Flight Search

- Search flights by:
  - Departure airport
  - Arrival airport
  - Departure date
  - Return date
  - Number of passengers
- Reactive Forms
- Form validation
- Departure and arrival airport validation
- Date validation
- Passenger validation
- Swap departure and arrival airports

### REST API Integration

- Angular `HttpClient`
- Dedicated `FlightService`
- REST API integration using JSON Server
- Flight list API
- Flight details API
- Loading state
- API error handling
- Retry support

### Flight Results

Displays:

- Airline
- Flight number
- Departure time
- Arrival time
- Duration
- Price
- Number of stops

### Filtering

Flight results can be filtered by:

- Minimum price
- Maximum price
- Maximum stops
- Airline

Filtering is implemented using RxJS `BehaviorSubject` and `combineLatest`.

Filters are applied only to the flights returned for the selected search route.

### Flight Details

Users can open a dedicated flight details page containing:

- Airline
- Flight number
- Departure information
- Arrival information
- Duration
- Stops
- Price
- Aircraft
- Baggage
- Cabin class

### Responsive UI

The application supports:

- Desktop
- Tablet
- Mobile

---

## Tech Stack

| Technology     | Usage                       |
| -------------- | --------------------------- |
| Angular 18     | Frontend framework          |
| TypeScript     | Application development     |
| HTML5          | UI structure                |
| SCSS           | Styling                     |
| Reactive Forms | Search form and validation  |
| RxJS           | Reactive data and filtering |
| HttpClient     | REST API integration        |
| Angular Router | Navigation                  |
| JSON Server    | Mock REST API               |
| Git            | Version control             |
| GitHub         | Source code hosting         |

---

## Project Structure

```text
src/
└── app/
    ├── core/
    │   ├── models/
    │   │   └── flight.model.ts
    │   │
    │   └── services/
    │       └── flight.service.ts
    │
    ├── features/
    │   ├── search/
    │   │   ├── search.component.ts
    │   │   ├── search.component.html
    │   │   └── search.component.scss
    │   │
    │   ├── results/
    │   │   ├── results.component.ts
    │   │   ├── results.component.html
    │   │   └── results.component.scss
    │   │
    │   ├── details/
    │   │   ├── flight-details.component.ts
    │   │   ├── flight-details.component.html
    │   │   └── flight-details.component.scss
    │   │
    │   └── home/
    │       ├── home.component.ts
    │       ├── home.component.html
    │       └── home.component.scss
    │
    ├── shared/
    │   └── components/
    │       └── flight-card/
    │           ├── flight-card.component.ts
    │           ├── flight-card.component.html
    │           └── flight-card.component.scss
    │
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.scss
    ├── app.routes.ts
    └── app.config.ts

mock/
└── db.json
```
