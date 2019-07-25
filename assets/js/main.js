// 
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



//   var hotelQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=16000&types=hotels&rankby=prominence&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA";
// $.ajax({
//   url: hotelQueryURL,
//   method: "GET"
// }).then(function (response) {
//   // on click function to redirect to another page for "Places to Stay"
//   // var results = response.data;
//   for (i=1; i < 5; i++) {

//     console.log(response)
//     var hotelName = response.results[i].name;
//     var hotelPhoto = response.results[i].photos[0].html_attributions[0];
//     var vicinity = response.results[i].vicinity;
//     var rating = response.results[i].rating;
    

//     console.log(hotelName);
//     console.log(hotelPhoto);
//     console.log(vicinity);
//     console.log(rating);


//   }

<<<<<<< HEAD
// });

  
=======
});
    //-----------Weather API----------
    //----Status: WORKING---------
    //---Comments: Queries Geocoding via GoogleMaps API to get zipcode then uses zipcode for weathermap api"   
>>>>>>> master
  var reverseGeocodingQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&result_type=postal_code&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA"
  $.ajax({
    url: reverseGeocodingQueryURL,
    method: "GET"
  }).then(function (response) {
    zip = response.results[0].address_components[0].long_name;
    shortCountry = response.results[0].address_components[3].short_name;
    console.log("Country: " + shortCountry);
    console.log("ZIP: " + zip);
    var weatherGEOqueryURL = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zip + "," + shortCountry + "&appid=bdb30d5ce61beafda3576d082caf2f75&appid=bdb30d5ce61beafda3576d082caf2f75"
    // var weatherCITYqueryURL = "api.openweathermap.org/data/2.5/forecast?=" + city +"," + country + "&appid=bdb30d5ce61beafda3576d082caf2f75";
    $.ajax({
      url: weatherGEOqueryURL,
      method: "GET"
    })
      .then(function (response) {
        for (i = 0; i < 40; i += 8) {
          //appended the weather app to display in the table, should display description, time, and day
          var weatherDate = moment.unix(response.list[i].dt).format("ddd, MMM D")
          
          $("#weatherbody").append("<tr>" + '<th scope="row">' + weatherDate + "</th>" + "<td>" + response.list[i].weather[0].description + "</td>" + "<td>" + response.list[i].dt_txt + "</td>" + "<td>" + "<img src='http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon +"@2x.png' class='w-50'>" + "</td>" + "</tr>")
          console.log("Day " + i + " Weather: " + response.list[i].weather[0].description + " / " + response.list[i].dt_txt)
          console.log(response)
        }
      });
    })

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
      url: weatherGEOqueryURL,
      method: "GET"
    })
      .then(function (response) {
        for (i = 0; i < 5; i++) {
          console.log("Day " + i + " Weather: " + response.list[i].weather[0].description + " / " + response.list[i].dt_txt)
        }
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

var weatherimg = $("")

//----------Events API---------
//----Status: WORKING----------
//----Comments: Used Public API Key, May want to include option to set dates of events listed

//function to click on events button
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
      eventsImage.attr("id", "cardImage");
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
      var address = events[i].venue.address.address_1

      var link = events[i].url

      //create variable to hold all above info and create paragraph with that info
      var eventInfo = $("<p>").html("The start time for this events is " + start + "and it will be ending at " + end + ". It will be held at " + venue + "which is located at " + address)

      var eventLink = $("<a>").html("Link to website!")
      eventLink.attr("href", link);

      eventLink.addClass("card-text");
      eventInfo.addClass("card-text");
      eventsBodyDiv.append(eventInfo);
      eventsBodyDiv.append(eventLink);


      //append restaurantbodyDiv to actual div
      eventsDiv.append(eventsBodyDiv);

      //prepend all information to content display div
      $("#contentDisplay").prepend(eventsDiv);
    }
  });
});
  //on click function will show you local hot spots
  $("#placesToStayButton").on("click", function () {
    console.warn("You clicked a button");
    var placesQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=16000&types=hotels&rankby=prominence&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA";
    $.ajax({
      url: placesQueryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)
      //create variable to store restaurants database reponse
      var hotel = response.results;
      // on click function to redirect to another page for "Places to Stay"
      for (i = 1; i < 9; i++) {
           //create a div hotelDiv
           var hotelDiv = $("<div>");
           hotelDiv.addClass("card");
           hotelDiv.addClass("col-sm-3");
           //create img tag for top card image with a class of card-img-top and id of cardImage
           var hotelImage = $("<img>");
           hotelImage.attr("src", hotel[i].icon);
           hotelImage.addClass("card-img-top w-25");
           hotelImage.attr("id", "cardImage");
           hotelDiv.append(hotelImage);
           //create a second div for the body. with a class of card-body
           var hotelBodyDiv = $("<div>");
           hotelBodyDiv.addClass("card-body");
           //append restaurant name to the body div with the class card-title
           hotelBodyDiv.append("<h5 class='card-title'>" + hotel[i].name + "</h5>");
           //create paragraph to hold the open status with the class of card-subtitle
           // var open = hotel[i].opening_hours.open_now;
           // console.log(open)
           // var hotelOpen = $("<p>").text("Open Now: " + open);
           // hotelOpen.addClass("card-subtitle");
           // hotelBodyDiv.append(hotelOpen);
           //create variables to hold hotel name, hotel photo, vicinity, and ratings
           var hotelName = response.results[i].name;
           var hotelLink = response.results[i].photos[0].html_attributions[0];
           var vicinity = response.results[i].vicinity;
           var rating = response.results[i].rating;
           //create variable to hold all above info and create paragraph with that info
           var hotelInfo = $("<p>").html("Rating: <br>" + rating + " The name: <br>"  + hotelName + " Hotel Link: <br>" + hotelLink + " <br> Address: <br>" + vicinity);
           hotelInfo.addClass("card-text");
           hotelBodyDiv.append(hotelInfo);
           //append hotelbodyDiv to actual div
           hotelDiv.append(hotelBodyDiv);
           //prepend all information to content display div
           $("#contentDisplay").prepend(hotelDiv);
         }
       });
      
   
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

//----------Restaurants API---------
//----Status: WORKING----------
//----Comments: Used Public API Key, May want to include option to set dates of events listed

// On click button that allows the user to find resturants they may like
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
        restaurantImage.addClass("card-img-top w-25 mt-4");
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

   
   
   
   
   
   
   
  //  $("#placesToStayButton").on("click", function () {
  //   console.log("You selected Place to Stay");
  //   //Clear the content display div
  //   $("#contentDisplay").empty();
  //   //Google Places API
  //   var hotelQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=16000&types=hotels&rankby=prominence&key=AIzaSyCxdeV70eNJ_KpZDdphRVKntO23zlCg6KA";
  //   $.ajax({
  //     url: hotelQueryURL,
  //     method: "GET"
  //   }).then(function (response) {
  //     //create variable to store Hotel database reponse
  //     var hotel = response.results;
  //     //for loop to create the cards in the content display div with the restaurants info
  //     for (i=1; i < 5; i++) {
  //       //create a div restaurantDiv
  //       var hotelDiv = $("<div>");
  //       hotelDiv.addClass("card");
  //       hotelDiv.addClass("col-sm-3");
  //       //create img tag for top card image with a class of card-img-top and id of cardImage
  //       var hotelImage = $("<img>");
  //       hotelImage.attr("src", hotel[i].icon);
  //       hotelImage.addClass("card-img-top");
  //       hotelImage.attr("id", "cardImage");
  //       hotelDiv.append(hotelImage);
  //       //create a second div for the body. with a class of card-body
  //       var hotelBodyDiv = $("<div>");
  //       hotelBodyDiv.addClass("card-body");
  //       //append restaurant name to the body div with the class card-title
  //       hotelBodyDiv.append("<h5 class='card-title'>" + hotel[i].name + "</h5>");
  //       //create paragraph to hold the open status with the class of card-subtitle
  //       // var open = hotel[i].opening_hours.open_now;
  //       // console.log(open)
  //       // var hotelOpen = $("<p>").text("Open Now: " + open);
  //       // hotelOpen.addClass("card-subtitle");
  //       // hotelBodyDiv.append(hotelOpen);
  //       //create variables to hold hotel name, hotel photo, vicinity, and ratings
  //       var hotelName = response.results[i].name;
  //       var hotelPhoto = response.results[i].photos[0].html_attributions[0];
  //       var vicinity = response.results[i].vicinity;
  //       var rating = response.results[i].rating;
  //       //create variable to hold all above info and create paragraph with that info
  //       var hotelInfo = $("<p>").html("Rating: " + rating + " The name: " + hotelName + " Photo: " + hotelPhoto + " Vicinity: " + vicinity);
  //       hotelInfo.addClass("card-text");
  //       hotelBodyDiv.append(hotelInfo);
  //       //append hotelbodyDiv to actual div
  //       hotelDiv.append(hotelBodyDiv);
  //       //prepend all information to content display div
  //       $("#contentDisplay").prepend(hotelDiv);
  //     }
  //   });
  //  });




  
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
  //function for continous clock
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
      h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
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


 

