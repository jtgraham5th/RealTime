console.log("Hello World")

// getLocation();
var latitude;
var longitude;
var city = "Atlanta";
var shortCountry;
var longCountry;
var zip;
var placeType = "restaurant"

navigator.geolocation.getCurrentPosition(showPosition);

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
    initMap();
 
  function initMap() {
      console.log("Enter INITMAP");
      map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: latitude, lng: longitude },
          zoom: 16
      });
  }

$("#hello").addClass("bg-danger");
// var hotelQueryUrl = "https://apidojo-booking-v1.p.rapidapi.com/properties/get-static-map?currency_code=USD&languagecode=en-us&width=720&longitude=106.663626&zoom=18&latitude=10.807570&height=280"

// $.ajax({
//   url: hotelQueryUrl,
//   headers: { "Authorization " : "X-RapidAPI-Key 69c5a22958msha081cb7aec1bbefp14a635jsn8d2e4bd970df"
// //   "X-RapidAPI-Host apidojo-kayak-v1.p.rapidapi.com",
// },
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// });

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

  //-----------Google Places API----------
  //----Status: WORKING-------------------
  //----Comments: Moved to Google Places API because yelp API does not allow authentication with javascript
  var placesQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=16000&types=" + placeType + "&rankby=prominence&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA";
  $.ajax({
    url: placesQueryURL,
    method: "GET"
  }).then(function (response) {
    // on click function to redirect to another page for "Places to Stay"

    for (i = 0; i < 5; i++) {
      console.log("Restaurant: " + response.results[i].name)
    }
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
  //----------News API-----------
  var searchnewarea = $(this).attr("value")
  var apiKey = "";
  var queryURL = "https://cors-anywhere.herokuapp.com/http://newsapi.patch.org/v1.1/zipcodes/30080/stories?&apiKey=c9eae302cd944b52a90bc6ae43dc432";
  $.ajax({
    url: queryURL,
    method: "Get"
  }).then(function (response) {

    console.log(response)
  })
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

//When I click this button i want my current events api information to console.log
//call the api
//use ajax
//get response
//console log it


//next get the on click function to show up on the live map



$("#currentEventsButton").on("click", function () {
  console.warn("You clicked a button");
  var eventsQueryURL = "https://www.eventbriteapi.com/v3/events/search/";
  $.ajax({
    url: eventsQueryURL,
    data: { token: "7YTUMTV5GWZSSATPVJM7", sort_by: "best", "location.latitude": latitude, "location.longitude": longitude, expand: "venue" },
    crossDomain: true,
    method: "GET"
  }).then(function (response) {
    console.log(response)

    //instead of using console log use jquery
    for (i = 0; i < 5; i++) {
      console.log("Event #" + i + "-----")
      console.log("Event : " + response.events[i].name.text);
      console.log("Date: " + response.events[i].start.local);
      console.log(response.events[i].venue.address);

    }
  });
});
//on click function will show you local hot spots
$("#placesToStayButton").on("click", function () {
  console.warn("You clicked a button");
  var placesQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=16000&types=" + placeType + "&rankby=prominence&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA";
  $.ajax({
    url: placesQueryURL,
    method: "GET"
  }).then(function (response) {
    // on click function to redirect to another page for "Places to Stay"

    for (i = 0; i < 5; i++) {
      console.log("Places to Stay: " + response.results[i].vicinity)
    }
  });


  // var mapQueryURL = "https://image.maps.api.here.com/mia/1.6/mapview?co=united%20states&z=17&i=1&app_id=RH9YlLdRRfpLaefvUoLl&app_code=2psNpgHEU7JEcQ9sIBaPhA&ci=Atlanta&s=downing%20street&n=10&w=400";
  // var latitudeQueryURL = "https://image.maps.api.here.com/mia/1.6/mapview?c=52.5159%2C13.3777&z=14&app_id=RH9YlLdRRfpLaefvUoLl&app_code=2psNpgHEU7JEcQ9sIBaPhA"

  // $.ajax({
  //   url: mapQueryURL,
  //   method: "GET"
  // }).then(function (response) {

  //   for (i = 0; i < 5; i++) {
  //   console.log(response);
  //   }
  // });

});


// on click function to redirect to another page for "Places to Stay"
$("#localButton").on("click", function () {
  console.warn("You clicked this button");
  var queryURL = "https://cors-anywhere.herokuapp.com/http://newsapi.patch.org/v1.1/zipcodes/30080/stories?&apiKey=c9eae302cd944b52a90bc6ae43dc432";
  $.ajax({
    url: queryURL,
    method: "Get"
  }).then(function (response) {

    console.log(response)
  })


});
//on click function will show you the restaurants in the area
$("#restaurantsButton").on("click", function () {
  console.warn("You selected Resetaurants");
  var placesQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=16000&types=" + placeType + "&rankby=prominence&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA";
  $.ajax({
    url: placesQueryURL,
    method: "GET"
  }).then(function (response) {
    // on click function to redirect to another page for "Places to Stay"
    // var results = response.data;

    var restaurants = response.results;

    for (i = 0; i < 8; i++) {
      // console.log("Restaurant: " + response.results[i])
      console.log(restaurants[i])

      //create a div restaurantDiv
      var restaurantDiv = $("<div>");
      restaurantDiv.addClass("card");
      restaurantDiv.addClass("col-sm-3");

      // var restaurantImage = $("<img>");
      // restaurantImage.attr("src", restaurants[i].icon);
      // restaurantImage.addClass("card-img-top");
      // restaurantImage.attr("id", "cardImage");
      // restaurantDiv.append(restaurantImage);

      //create a second div for the body. with a class of card-body
      var restaurantBodyDiv = $("<div>");
      restaurantBodyDiv.addClass("card-body");
      //
      restaurantBodyDiv.append("<h1 class='card-title'>" + restaurants[i].name + "</h1>");
      //Display for if the restaurant is open
      var open = restaurants[i].opening_hours.open_now;
      console.log(open)
      var restaurantOpen = $("<h3>").text("Open Now: " + open);
      restaurantOpen.addClass("card-subtitle");
      restaurantBodyDiv.append(restaurantOpen);

      var rating = restaurants[i].rating;
      var price = restaurants[i].price_level;
      var type = restaurants[i].types[0];
      var mapLink = restaurants[i].photos[0].html_attributions[0];
      var restaurantInfo = $("<p>").html("The rating for this restaurant is: " + rating + ". The price range on a scale of 1 to 4 is: " + price + ". The catrgories this restaurant falls into include: " + type + ". Need Directions? Just follow this link: " + mapLink);
      restaurantInfo.addClass("card-text");
      restaurantBodyDiv.append(restaurantInfo);

      //append restaurantbodyDiv to actual div
      restaurantDiv.append(restaurantBodyDiv);

      $("#contentDisplay").prepend(restaurantDiv);

      






      












      // //Restaurant Icon 
      // var restaurantImageDiv = $("<div>");
      // var restaurantImage = $("<img>");

      // restaurantImage.attr("src", restaurants[i].icon);
      // restaurantImageDiv.append(restaurantImage);

      // $(".contentImage").prepend(restaurantImageDiv);

      // //Restaurant Name
      // var restaurantNameDiv = $("<div>");

      // var name = restaurants[i].name;
      // var h1 = $("<h3>").text("Name: " + name);

      // restaurantNameDiv.append(h1);
      // $("#contentTitle").prepend(restaurantNameDiv);

      // //Restaurant Open
      // var restaurantOpenDiv = $("<div>");

      // var open = restaurants[i].opening_hours.open_now;
      // var h2 = $("<h4>").text("Open Now: " + open);

      // restaurantOpenDiv.append(h2);
      // $("#contentInfo").prepend(restaurantOpenDiv)

      // //Restaurant Info
      // var restaurantInfoDiv = $("<div>");

      // var rating = restaurants[i].rating;
      // var price = restaurants[i].price_level;
      // var type = restaurants[i].types[0,1,2,3];

      // var h3 = $("<h6>").text("Rating: " + rating);
      // var h4 = $("<h6>").text("Price: " + price);
      // var h5 = $("<h6>").text("Type: " + type);

      // restaurantInfoDiv.append(h3);
      // restaurantInfoDiv.append(h4);
      // restaurantInfoDiv.append(h5);
      // $("#contentDescription").prepend(restaurantInfoDiv);

      // //Restaurant Map Link
      // var restaurantMapLink = $("<div>");

      // var mapLink = restaurants[i].photos[0].html_attributions[0];
      // var p = $("<p>").html("Link to Directions : " + mapLink);

      // restaurantMapLink.append(p);
      // $("#directionsLink").prepend(restaurantMapLink);  
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







// function timeFormatter(dateTime){
//   var date = newDate(dateTime);
//   if (date.getHours()>=12){
//       var hour = parseInt(date.getHours()) - 12;
//       var amPm = "PM";
//   } else {
//       var hour = date.getHours(); 
//       var amPm = "AM";
//   }
//   var time = hour + ":" + date.getMinutes() + " " + amPm;
//   console.log(time);
//   return time;

______

