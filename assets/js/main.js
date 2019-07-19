console.log("Hello World")

var platform = new H.service.Platform({
  'apikey': '{YOUR_APIKEY}'
});

$("#hello").addClass("bg-danger");

var mapQueryURL = "https://image.maps.api.here.com/mia/1.6/mapview?co=united%20states&z=17&i=1&app_id=RH9YlLdRRfpLaefvUoLl&app_code=2psNpgHEU7JEcQ9sIBaPhA&ci=Atlanta&s=downing%20street&n=10&w=400";

var latitudeQueryURL = "https://image.maps.api.here.com/mia/1.6/mapview?c=52.5159%2C13.3777&z=14&app_id=RH9YlLdRRfpLaefvUoLl&app_code=2psNpgHEU7JEcQ9sIBaPhA"


var hotelQueryUrl = "https://apidojo-booking-v1.p.rapidapi.com/properties/get-static-map?currency_code=USD&languagecode=en-us&width=720&longitude=106.663626&zoom=18&latitude=10.807570&height=280"

$.ajax({
  url: hotelQueryUrl,
  headers: { "Authorization " : "X-RapidAPI-Key 69c5a22958msha081cb7aec1bbefp14a635jsn8d2e4bd970df"
  "X-RapidAPI-Host apidojo-kayak-v1.p.rapidapi.com",
},
  method: "GET"
}).then(function(response) {
  console.log(response);
});

$.ajax({
    url: mapQueryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
  });

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
// var name = firebase.database();


// on click function to redirect to another page for "Page 1"
$("#h1").on("click", function () {
    event.preventDefault()
    $("").empty();

});
// on click function to redirect to another page for "page 2"
// $("#").on("click", function () {
//     event.preventDefault()
//     $("").empty();
// });
// // on click function to redirect to another page for "page 3"
// $("#").on("click", function () {
//     event.preventDefault()
//     $("").empty();
// });
// // on click function to redirect to another page for "page 4"
// $("#").on("click", function () {
//     event.preventDefault()
//     $("").empty();
// });
// // on click function to redirect to another page for "page 5"
// $("#").on("click", function () {
//     event.preventDefault()
//     $("").empty();
// });
// // on click function to redirect to another page for "page 6"
// $("#").on("click", function () {
//     event.preventDefault()
//     $("").empty();
// });


//Get Location by using Geolocation
var x = document.getElementById("demo");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

//Google news API Key 
$(document).on("click", 'button', function () {
    var searchnewarea = $(this).attr("value")
    // console.log(this);
    var apiKey = "e00b92eba88f4067ae9c597f113f0670";
    var queryURL = "https://newsapi.org/v2/top-headlines?" + $(this).html() + "country=us&category=business" + "&apiKey=" + apiKey + "&limit=10";
    // console.log(this);

    $('.info').empty();
            $.ajax({
                url: queryURL,
                method: "Get"
            })

})

