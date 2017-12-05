var directionsService;
var directionsDisplay;
var mapContext;
var centroCalle2da;
var centroCalle4ta;

$(document).ready(function() { 	
	centroCalle2da = new google.maps.LatLng(32.535327, -117.038329);
	centroCalle4ta = new google.maps.LatLng(32.532626, -117.038845);
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

	directionsDisplay.setOptions( { suppressMarkers: true } );
	calculateAndDisplayRoute(directionsService, directionsDisplay);

	
});

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	directionsService.route({
	  origin: centroCalle2da,
	  destination: centroCalle4ta,
	  travelMode: 'DRIVING'
	}, function(response, status) {
	  if (status === 'OK') {
	  	$("#confirm-msg").show();
	    directionsDisplay.setDirections(response);
	  } else {
	    window.alert('Directions request failed due to ' + status);
	  }
	});
	
	insertMarker("man", centroCalle2da.lat(), centroCalle2da.lng());
	insertMarker("car", centroCalle4ta.lat(), centroCalle4ta.lng());
}

function cancelRoute(){
	directionsDisplay.setMap(null); // clear direction from the map
	directionsDisplay.setPanel(null); // clear directionpanel from the map          
	directionsDisplay = new google.maps.DirectionsRenderer(); // this is to render again, otherwise your route wont show for the second time searching
	directionsDisplay.setMap(mapContext); //this is to set up again
	$("#confirm-msg").hide();
	document.getElementById("map-suggest").value= "";
}

function insertMarker (type, lat, lng) {
  var marker = new google.maps.Marker({
    map: mapContext,
    position: new google.maps.LatLng(lat, lng),
    icon : new google.maps.MarkerImage(
      '../js/assets/'+type+'.png',
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new google.maps.Size(60, 60)
    )
  });



}