console.log("Hello World")


// function position(){
//   // console.log(showposition)
// };




$("#hello").addClass("bg-danger");
//-----------Map API----------
var mapQueryURL = "https://image.maps.api.here.com/mia/1.6/mapview?co=united%20states&z=17&i=1&app_id=RH9YlLdRRfpLaefvUoLl&app_code=2psNpgHEU7JEcQ9sIBaPhA&ci=Atlanta&s=downing%20street&n=10&w=400";
var latitudeQueryURL = "https://image.maps.api.here.com/mia/1.6/mapview?c=52.5159%2C13.3777&z=14&app_id=RH9YlLdRRfpLaefvUoLl&app_code=2psNpgHEU7JEcQ9sIBaPhA"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response.data);
  });
//-----------Weather API----------
var weatherqueryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city +"," + country + "&appid=bdb30d5ce61beafda3576d082caf2f75";
$.ajax({
    url: weatherqueryURL,
    method: "GET"
  })
    .then(function(response) {

    });
//-----------Yelp API----------
var yelpqueryURL = "https://api.yelp.com/v3/businesses/search"
  $.ajax({
      url: yelpqueryURL,
      method: "GET"
  })
      .then(function(response) {

      });
//----------News API-----------
var searchnewarea = $(this).attr("value")
var apiKey = "e00b92eba88f4067ae9c597f113f0670";
var queryURL = "https://newsapi.org/v2/top-headlines?" + $(this).html() + "country=us&category=business" + "&apiKey=" + apiKey + "&limit=10";
    $.ajax({
    url: queryURL,
    method: "Get"
    })
 //--------   

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
console.log(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();

// var initialValue = 100;

var clickCounter = 0;
//This function will send the information to the firebase

database.ref().set({
  clickCounter: clickCounter
});

// on click function to redirect to another page for "Places Near By Button"
$("#placesNearbyButton").on("click", function () {
  // window.location.href="google.com";
  event.preventDefault()
  // alert(location.getLocation);
  // $("#placesNearbyButton").html(clickCounter);
  clickCounter++;
});
// on click function to redirect to another page for "Places to Stay"
$("#placesToStayButton").on("click", function () {
  event.preventDefault()
  // window.location.href="/";
  // console.log(this)
  clickCounter++;
});
// // on click function to redirect to another page for "Current Events"
$("#currentEventsButton").on("click", function () {
  event.preventDefault()
  // window.location.href="/"
  // console.log(this)
  // $("#currentEventsButton").text(clickCounter);
  clickCounter++;
});
// // on click function to redirect to another page for "Local News"
$("#localNewsButton").on("click", function () {
  event.preventDefault()
  // window.location.href="/"
  // console.log(this)
  clickCounter++;
});



database.ref().on("value", function(snapshot){
  console.log(snapshot.val());

  clickCounter = snapshot.val().clickCounter;


}), function(errorObject){
  console.log("The read failed: " + errorObject.code);
}

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
//   }