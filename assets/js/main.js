console.log("Hello World")


$("#hello").addClass("bg-danger");

var mapQueryURL = "https://image.maps.api.here.com/mia/1.6/mapview?co=united%20states&z=17&i=1&app_id=RH9YlLdRRfpLaefvUoLl&app_code=2psNpgHEU7JEcQ9sIBaPhA&ci=Atlanta&s=downing%20street&n=10&w=400";

var latitudeQueryURL = "https://image.maps.api.here.com/mia/1.6/mapview?c=52.5159%2C13.3777&z=14&app_id=RH9YlLdRRfpLaefvUoLl&app_code=2psNpgHEU7JEcQ9sIBaPhA"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response.data);
  });