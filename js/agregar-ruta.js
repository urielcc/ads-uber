var directionsService;
var directionsDisplay;
var mapContext;
$(document).ready(function() { 	
	directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

	mapContext = new google.maps.Map(document.getElementById("map-container"), {
	    center: new google.maps.LatLng(32.531940, -116.966533),
	    zoom: 16,
	    scrollwheel: false,
	    disableDefaultUI: true
	});
	directionsDisplay.setMap(mapContext);

	var autocomplete = new google.maps.places.Autocomplete(document.getElementById("map-suggest"), {
	    types: ['geocode'],
	    componentRestrictions: { country: "mx" }
	});

	google.maps.event.addListener(autocomplete, 'place_changed', function () {
	    var place = autocomplete.getPlace();
	    if(place.geometry){
	      var newPosition = place.geometry.location;	      
	      calculateAndDisplayRoute(directionsService, directionsDisplay, newPosition);
	    }
	 });

	document.getElementById("cancel-route").addEventListener("click", cancelRoute);
});

function calculateAndDisplayRoute(directionsService, directionsDisplay, pos) {
	directionsService.route({
	  origin: new google.maps.LatLng(32.531940, -116.966533),
	  destination: pos,
	  travelMode: 'DRIVING'
	}, function(response, status) {
	  if (status === 'OK') {
	  	$("#confirm-msg").show();
	    directionsDisplay.setDirections(response);
	  } else {
	    window.alert('Directions request failed due to ' + status);
	  }
	});
}

function cancelRoute(){
	directionsDisplay.setMap(null); // clear direction from the map
	directionsDisplay.setPanel(null); // clear directionpanel from the map          
	directionsDisplay = new google.maps.DirectionsRenderer(); // this is to render again, otherwise your route wont show for the second time searching
	directionsDisplay.setMap(mapContext); //this is to set up again
	$("#confirm-msg").hide();
	document.getElementById("map-suggest").value= "";
}