# MapChallenge

This project is a solution for ["Limehome Challenge - Software Engineer" test](https://gitlab.com/limehome/interviews/full-stack-challenge).

## Project structure
I decided to make a few specialized folders which hold different elements of the application. These are the folders in the app root folder:
- components
- pages
- services

## Components

### Card List and Card
I decided to nest the Card component inside the list because it was a tight dependency.

Card List component gets data from the data service, this ensures that the data is always updated whenever it changes. This is just a wrapper component that passes data to it's children.

Card component keeps track of which card is selected through an observable markerSelectedEvent that map emits when selection changes. I decided to go with an event stream because it's fairly straight forward and you don't need to provide multiple inputs/outputs for components.

### Header
Header is simple, just markup with a simple toggle variable for showing the menu. There was no need to make it more complex because the functionality for the header wasn't apparent from the challenge description.

### Map
I was working with Here Maps API for the first time so I decided to mostly follow their docs for setting up the map. I also initialized marker elements from the template using pure JS.

Because the requirement was to have the users location when the app opens, I decided that this will be requested here using Geolocation API. Optionally, I would have done this through Observables but I decided to keep it simple and just use pure JS. Once the location is resolved, that's when the query search is triggered.

The search is implemented in the data service and it uses Observables. This uses Here Maps search api to get any location that are related to the query, I wasn't sure where to get the price data to display on the screen. Because of this, I decided to add some random data to the Here Maps response by mapping the objects and adding a property called "price". In case a request for this fails, it falls back to no results (empty array).

The query is executed using a method call, therefore I decided to limit the request observable to only one result each time by using the 'first()' operator. This way, the observable is completed and unsubscribed after the first result. If I used the _destruction$ Subject method, that would preserve the observable until the component is destroyed and that isn't something I wanted.

Once the search returns results, these results are mapped and added to the map as markers. They are also saved in the component itself under _markers object. I decided to go with this to ensure that I always have access to the markers on the map based on the marker id.

All of these markers had an event listener for updating the icon and focusing the marker that was tapped/clicked. I wasn't sure whether the event listeners would be cleared from memory, so I implemented a way to remove the listeners. I use this when the map component is destroyed to remove all of the event listeners from the markers.

## Pages

### Booking Success Page
Simple dummy confirmation page. Implemented a timer to return to homepage after 3 seconds.

### Booking Page
The booking page contains a simple Angular forms implementation. Decided to go with Angular Form Builder and I usually prefer Reactive Forms over Template Driven Forms because they offer more control. I didn't do a lot of styling here, just kept the default browser styles with some accents to indicate the status of the fields. The validation is also minimal and it's only set to validate several important fields as required.

The data for the booking is passed through route params, but I would also utilize Observables and services if additional data had to be passed through. On submit, the form will just go to the success page, as described in the challenge.

## Services

### Data Service
Data service uses Angular's HttpClient to implement a query method using Here Maps API. It also keeps track of the location, which is set when the map component gets the user's location. This data is used in requests.