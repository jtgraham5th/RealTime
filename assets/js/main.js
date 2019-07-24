console.log("Hello World")

// getLocation();
var latitude;
var longitude;
var city = "Atlanta";
var shortCountry;
var longCountry;
var zip;
var placeType = "restaurant"
var platform = new H.service.Platform({
  'apikey': 'RH9YlLdRRfpLaefvUoLl'

});

var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
      zoom: 10,
      center: { lng: 13.4, lat: 52.51 }
    });
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
};

// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD36qNJ7PzZQdCwFC7pXQJZ2z_-MOHvYm4",
  authDomain: "realtime-9afbb.firebaseapp.com",
  databaseURL: "https://realtime-9afbb.firebaseio.com",
  projectId: "realtime-9afbb",
  storageBucket: "realtime-9afbb.appspot.com",
  messagingSenderId: "97304648790",
  appId: "1:97304648790:web:7a14a6c4ef61291d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Create a variable to reference the database.
var database = firebase.database();

// var initialValue = 100;

var Counter = 0;
//This function will send the information to the firebase


function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude)


  //-----------Weather API----------
  //----Status: WORKING---------
  //---Comments: Queries Geocoding via GoogleMaps API to get zipcode then uses zipcode for weathermap api" 
  var reverseGeocodingQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&result_type=postal_code&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA"
  $.ajax({
    url: reverseGeocodingQueryURL,
    method: "GET"
  }).then(function (response) {
    zip = response.results[0].address_components[0].long_name;
    shortCountry = response.results[0].address_components[4].short_name;
    console.log("Country: " + shortCountry);
    console.log("ZIP: " + zip);
    var weatherGEOqueryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "," + shortCountry + "&appid=bdb30d5ce61beafda3576d082caf2f75&appid=bdb30d5ce61beafda3576d082caf2f75"
    // var weatherCITYqueryURL = "api.openweathermap.org/data/2.5/forecast?=" + city +"," + country + "&appid=bdb30d5ce61beafda3576d082caf2f75";
    $.ajax({
      url: weatherGEOqueryURL,
      method: "GET"
    })
      .then(function (response) {
        for (i = 0; i < 5; i++) {
          console.log("Day " + i + " Weather: " + response.list[i].weather[0].description + " / " + response.list[i].dt_txt)
        }
      });
  });

  //----------Events API---------
  //----Status: WORKING----------
  //----Comments: Used Public API Key, May want to include option to set dates of events listed
  
  var eventsQueryURL = "https://www.eventbriteapi.com/v3/events/search/";
  $.ajax({
    url: eventsQueryURL,
    data: { token: "7YTUMTV5GWZSSATPVJM7", sort_by: "best", "location.latitude": latitude, "location.longitude": longitude, expand: "venue" },
    crossDomain: true,
    method: "GET"
  }).then(function (response) {


    for (i = 0; i < 5; i++) {
      console.log("Event #" + i + "-----")
      console.log("Event : " + response.events[i].name.text);
      console.log("Date: " + response.events[i].start.local);
      console.log(response.events[i].venue.address)

    }
  });
};
$("#currentEventsButton").on("click", function () {
  console.warn("You selected Events");

  //Clear the content display div
  $("#contentDisplay").empty();

  //EventBrite API information 
  var eventsQueryURL = "https://www.eventbriteapi.com/v3/events/search/";
  $.ajax({
    url: eventsQueryURL,
    data: { token: "7YTUMTV5GWZSSATPVJM7", sort_by: "best", "location.latitude": latitude, "location.longitude": longitude, expand: "venue" },
    crossDomain: true,
    method: "GET"
  }).then(function (response) {

    //create variable to store events database response
    console.log(response)
    var events = response.events;


    //for loop to create the cards in the content display div with the events info
    for (i = 0; i < 8; i++) {

      //create a div eventsDiv with a class of card
      var eventsDiv = $("<div>");
      eventsDiv.addClass("card");
      eventsDiv.addClass("col-sm-3");

      //create img tag for top card image with a class of card-img-top and id of cardImage
      var eventsImage = $("<img>");
      eventsImage.attr("src", events[i].logo.url);
      eventsImage.addClass("card-img-top");
      eventsImage.attr("id","cardImage");
      eventsDiv.append(eventsImage);

      //create a second div for the body with a class of card-body
      var eventsBodyDiv = $("<div>");
      eventsBodyDiv.addClass("card-body");

      //append event name to the body div with the class card-title
      eventsBodyDiv.append("<h5 class='card-title'>" + events[i].name.text + "</h5>");

      //create paragraph to hold date of event with the class of card-subtitle
      var date = response.events[i].start.local;
      console.log(date)
      var dateOfEvent = $("<p>").text("Date: " + date);
      dateOfEvent.addClass("card-subtitle");
      eventsBodyDiv.append(dateOfEvent);

      //create variables to hold start time, end time, venue name, address and the event brite link. 
      var start = events[i].start.local
      var end = events[i].end.local
      var venue = events[i].venue.name
      var address = events[i].venue.address
      var link = events[i].url

      //create variable to hold all above info and create paragraph with that info
      var eventInfo = $("<p>").html("The start time for this events is " + start + "and it will be ending at " + end + ". It will be held at " + venue + "which is located at " + address + ". If you'd like more information, please follow this link " + link);
      eventInfo.addClass("card-text");
      eventsBodyDiv.append(eventInfo);

       //append restaurantbodyDiv to actual div
      eventsDiv.append(eventsBodyDiv);

      //prepend all information to content display div
      $("#contentDisplay").prepend(eventsDiv);
    }
  });
});

//on click function will show you the restaurants in the area
$("#restaurantsButton").on("click", function () {
  console.warn("You selected Resetaurants");
  
  //Clear the content display div
  $("#contentDisplay").empty();

  //Google Places API
  var placesQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=16000&types=" + placeType + "&rankby=prominence&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA";
  $.ajax({
    url: placesQueryURL,
    method: "GET"
  }).then(function (response) {
    
    //create variable to store restaurants database reponse
    var restaurants = response.results;

    //for loop to create the cards in the content display div with the restaurants info
    for (i = 0; i < 8; i++) {

      //create a div restaurantDiv
      var restaurantDiv = $("<div>");
      restaurantDiv.addClass("card");
      restaurantDiv.addClass("col-sm-3");

      //create img tag for top card image with a class of card-img-top and id of cardImage
      var restaurantImage = $("<img>");
      restaurantImage.attr("src", restaurants[i].icon);
      restaurantImage.addClass("card-img-top");
      restaurantImage.attr("id", "cardImage");
      restaurantDiv.append(restaurantImage);

      //create a second div for the body. with a class of card-body
      var restaurantBodyDiv = $("<div>");
      restaurantBodyDiv.addClass("card-body");

      //append restaurant name to the body div with the class card-title
      restaurantBodyDiv.append("<h5 class='card-title'>" + restaurants[i].name + "</h5>");

      //create paragraph to hold the open status with the class of card-subtitle
      var open = restaurants[i].opening_hours.open_now;
      console.log(open)
      var restaurantOpen = $("<p>").text("Open Now: " + open);
      restaurantOpen.addClass("card-subtitle");
      restaurantBodyDiv.append(restaurantOpen);

      //create variables to hold rating, price level, type, and google maps link
      var rating = restaurants[i].rating;
      var price = restaurants[i].price_level;
      var type = restaurants[i].types[0];
      var mapLink = restaurants[i].photos[0].html_attributions[0];

      //create variable to hold all above info and create paragraph with that info
      var restaurantInfo = $("<p>").html("Rating: " + rating + " The price: " + price + " Category: " + type + " Need Directions? Just follow this link: " + mapLink);
      restaurantInfo.addClass("card-text");
      restaurantBodyDiv.append(restaurantInfo);

      //append restaurantbodyDiv to actual div
      restaurantDiv.append(restaurantBodyDiv);

      //prepend all information to content display div
      $("#contentDisplay").prepend(restaurantDiv);
    }
  });
});


//pushes information to firebase.database
database.ref().on("value", function (snapshot) {
  console.log(snapshot.val());

  Counter = snapshot.val().clickCounter;


}), function (errorObject) {
  console.log("The read failed: " + errorObject.code);
}

//Get Location by using Geolocation
var x = document.getElementById("demo");

function getLocation() {

  //   x.innerHTML = "Latitude: " + position.coords.latitude + 
  //   "<br>Longitude: " + position.coords.longitude;
}
