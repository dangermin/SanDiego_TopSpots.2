$(document).ready(function() {
	"use strict";
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    // center: {lat:32.7151174, lng:-117.1664042},
    center: myCenter,
    zoom: 12
  });
  infoWindow = new google.maps.InfoWindow;
  // Attempt HTML5 geolocation.
  var myCenter = [];
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var myCenter = pos;
      console.log(myCenter);
      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here!');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
//Error handler
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
});
