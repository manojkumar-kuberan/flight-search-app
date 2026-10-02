# ✈️ Travel Flight Search Application

A small Travel Flight Search Application built using Angular 18+, TypeScript, Reactive Forms, RxJS, Angular Routing, and a mock REST API.

The application allows users to search flights by route and dates, filter results, and view detailed flight information.

---

## How to Run the Application

Follow the steps below to set up and run the Angular Flight Search Application locally.

### Prerequisites

Before running the application, make sure the following software is installed:

- Node.js 18 or later
- npm
- Angular CLI
- Git

Verify the installations:

    node --version
    npm --version
    ng version
    git --version

If Angular CLI is not installed, install it globally using:

    npm install -g @angular/cli

---

### Quick Start

For subsequent runs, once the project has already been cloned and dependencies have been installed, only two commands are required.

Terminal 1:

    npm run mock:server

Terminal 2:

    ng serve

Then open:

    http://localhost:4200

The mock REST API will be available at:

    http://localhost:3000/flights

---

### Step 1: Clone the Repository

Clone the project from GitHub:

    git clone <your-github-repository-url>

Navigate to the project directory:

    cd <project-folder>

Example:

    cd flight-search-app

---

### Step 2: Install Project Dependencies

Install all required dependencies defined in package.json:

    npm install

Wait for the installation to complete successfully.

---

### Step 3: Verify the Mock API Configuration

This application uses JSON Server as a local mock REST API.

The mock API data is stored in:

    mock/db.json

The flight data is exposed through the `/flights` endpoint.

The application uses the following API URL:

    http://localhost:3000/flights

The `FlightService` is responsible for communicating with this REST API.

---

### Step 4: Start the Mock REST API

The Angular application requires the mock REST API to be running before searching for flights.

Open the first terminal in the project directory and run:

    npm run mock:server

The JSON Server should start on:

    http://localhost:3000

The flights API endpoint is:

    http://localhost:3000/flights

You can verify that the mock API is working by opening the following URL in a browser:

    http://localhost:3000/flights

You should see the flight data from `mock/db.json`.

Keep this terminal running.

---

### Step 5: Start the Angular Application

Open a second terminal in the same project directory.

Run:

    ng serve

Alternatively, if the project contains the Angular start script, you can run:

    npm start

After the Angular development server starts, the application will be available at:

    http://localhost:4200

Open the following URL in a browser:

    http://localhost:4200

Keep this terminal running as well.

---

### Step 6: Run Both Services Together

The application requires two processes to be running at the same time.

Terminal 1 - Mock REST API:

    npm run mock:server

API:

    http://localhost:3000

Terminal 2 - Angular Application:

    ng serve

Application:

    http://localhost:4200

Both terminals must remain open while using the application.

The overall setup is:

    Browser
       |
       v
    Angular Application
    http://localhost:4200
       |
       | HTTP GET
       v
    FlightService
       |
       v
    JSON Server
    http://localhost:3000/flights
       |
       v
    mock/db.json

---

### Step 7: Search for Flights

Open:

    http://localhost:4200

The home page contains the flight search form.

Enter the required search information:

1. Select the departure airport in the `From` field.
2. Select the arrival airport in the `To` field.
3. Select a departure date.
4. Select a return date.
5. Select the number of passengers.
6. Click `Search Flights`.

Example search:

    From:
    MAA - Chennai

    To:
    DEL - Delhi

    Departure Date:
    Select today's date or a future date

    Return Date:
    Select the same date or a future date

    Passengers:
    1 Passenger

Click:

    Search Flights

The Angular application will call the REST API and retrieve the available mock flight data.

---

### Step 8: Search Form Validation

The search form uses Angular Reactive Forms.

The following validations are implemented:

- From airport is required.
- To airport is required.
- From and To airports cannot be the same.
- Departure date is required.
- Departure date cannot be in the past.
- Return date is required.
- Return date cannot be before the departure date.
- Number of passengers is required.
- Number of passengers must be between 1 and 9.

If the form is invalid, the search request will not be submitted.

---

### Step 9: View Flight Results

After submitting a valid search, the application:

1. Sends a request to the mock REST API.
2. Retrieves the flight data.
3. Filters the flights based on the selected departure and arrival airports.
4. Displays the matching flight results.

Each result displays:

- Airline
- Flight Number
- Departure Time
- Departure Airport
- Arrival Time
- Arrival Airport
- Duration
- Number of Stops
- Price
- View Details button

For example, when searching:

    MAA → DEL

only flights matching:

    MAA → DEL

are displayed.

---

### Step 10: Filter Flight Results

After the search results are displayed, the application provides the following filters:

- Minimum Price
- Maximum Price
- Maximum Stops
- Airline

The filters are applied only to the flights returned for the selected search route.

For example:

    Search:
    MAA → DEL

The application first gets the MAA → DEL flights.

The price, stops, and airline filters are then applied only to those MAA → DEL results.

The filtering logic uses RxJS `combineLatest()` and Observables to combine:

- Flight results
- Minimum price
- Maximum price
- Maximum stops
- Selected airline

The filtered results update when a filter is changed.

---

### Step 11: View Flight Details

Each flight result contains a:

    View Details

button.

Clicking the button navigates to the flight details page.

The route format is:

    /flight/{flight-id}

For example:

    http://localhost:4200/flight/FL001

The flight details page displays additional information such as:

- Airline
- Flight Number
- Departure Airport
- Departure Time
- Arrival Airport
- Arrival Time
- Duration
- Number of Stops
- Price
- Aircraft
- Baggage
- Cabin Class

A Back button is provided to return to the main search page.

---

### Step 12: Loading and Error Handling

When the application is requesting flight data from the REST API, a loading state is displayed.

Example:

    Searching for available flights...

If the API request fails, an error message is displayed:

    Unable to load flight results. Please try again.

A `Try Again` button is also provided to retry the API request.

---

### Step 13: Test Different Search Scenarios

The mock data contains flights for multiple routes.

You can test different searches such as:

    MAA → DEL

    MAA → BOM

    MAA → BLR

    MAA → HYD

    MAA → DXB

    MAA → SIN

For each route, verify that:

- Only matching flights are displayed.
- Price filtering works.
- Stops filtering works.
- Airline filtering works.
- Flight details can be opened.

---

### Step 14: Verify the REST API Directly

If flight results are not displayed, first verify that the REST API is running.

Open:

    http://localhost:3000/flights

You should receive a JSON response containing the flight records.

For example, the response contains flight objects with properties such as:

    id
    airline
    flightNumber
    departure
    arrival
    duration
    price
    stops
    aircraft
    baggage
    cabinClass

If this URL does not load, make sure JSON Server is running:

    npm run mock:server

---

### Step 15: Verify the Angular Application

If the Angular application is not loading, make sure the Angular development server is running:

    ng serve

Then open:

    http://localhost:4200

If port 4200 is already being used, Angular may automatically select another available port.

The terminal will display the actual URL.

---

### Step 16: Troubleshooting

#### Problem: `npm run mock:server` does not work

Make sure project dependencies are installed:

    npm install

Then try:

    npm run mock:server

Also verify that the `mock/db.json` file exists.

---

#### Problem: Flight results are not loading

First verify the API:

    http://localhost:3000/flights

If the API is not available, start JSON Server:

    npm run mock:server

Then restart Angular if required:

    ng serve

---

#### Problem: Angular cannot connect to the API

Verify that JSON Server is running on:

    http://localhost:3000

Verify the flights endpoint:

    http://localhost:3000/flights

Also verify that `FlightService` is configured to use:

    http://localhost:3000/flights

---

#### Problem: Dependencies are missing

Run:

    npm install

Then start the application again:

    ng serve

---

#### Problem: Port 3000 is already in use

Stop the existing process using port 3000 and start the mock server again.

The application expects the mock API at:

    http://localhost:3000/flights

---

#### Problem: Port 4200 is already in use

Stop the existing Angular process or allow Angular CLI to use another available port.

You can also specify a different port:

    ng serve --port 4300

Then open:

    http://localhost:4300

Note that the mock API should continue running separately on:

    http://localhost:3000

---

### Step 17: Build the Application

To verify that the Angular application can be built successfully, run:

    ng build

The production build will be generated under:

    dist/

A successful build confirms that the application compiles correctly for production.

---

### Step 18: Development Workflow

For normal development, follow this workflow:

    1. Open the project directory.
    2. Run `npm install` if dependencies are not installed.
    3. Start JSON Server using `npm run mock:server`.
    4. Open a second terminal.
    5. Start Angular using `ng serve`.
    6. Open `http://localhost:4200`.
    7. Perform a flight search.
    8. Test price, stops, and airline filters.
    9. Open flight details.
    10. Make code changes as required.
    11. Verify the application in the browser.
    12. Run `ng build` before committing the changes.

---

### Step 19: Stop the Application

When development is complete, stop both running processes.

In the Angular terminal, press:

    Ctrl + C

In the JSON Server terminal, press:

    Ctrl + C

This will stop both the Angular development server and the mock REST API.

---

### Important Note About Mock Data

The mock API contains route and flight-level information but does not contain date-specific flight inventory.

Therefore:

- Departure and return dates are validated in the Angular Reactive Form.
- The selected dates are captured as part of the search criteria.
- The mock REST API returns flights based on the selected route.
- Date-specific flight availability is not simulated because the mock data does not contain date-level inventory.

This implementation is intentionally focused on demonstrating:

- Angular 18+
- TypeScript
- Reactive Forms
- REST API integration
- HttpClient
- RxJS and Observables
- RxJS-based filtering
- Routing
- Reusable components
- Loading and error handling
- Responsive UI
- Clean component/service separation
- Maintainable Angular architecture

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
