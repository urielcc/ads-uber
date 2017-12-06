var directionsService;
var directionsDisplay;
var mapContext;
var pasajero1;
var pasajero2;
var uabc;
var carro;
var markersArray = [];

$(document).ready(function() { 	
	pasajero1 = new google.maps.LatLng(32.53588225781122,-117.03163522216795);
	pasajero2 = new google.maps.LatLng(32.52206043964608,-116.9864024493408);
	carro = new google.maps.LatLng(32.532626, -117.038845);
	uabc = new google.maps.LatLng(32.531940, -116.966533);

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
	  origin: carro,
	  destination: uabc,
	  travelMode: 'DRIVING'
	}, function(response, status) {
	  if (status === 'OK') {
	  	$("#confirm-msg").show();
	    directionsDisplay.setDirections(response);
	  } else {
	    window.alert('Directions request failed due to ' + status);
	  }
	});
	
	insertMarker("man", pasajero1.lat(), pasajero1.lng(),false);
	insertMarker("man", pasajero2.lat(), pasajero2.lng(),false);
	insertMarker("uabc", uabc.lat(), uabc.lng(),false);
	insertMarker("car", carro.lat(), carro.lng(),true);
}

function insertMarker (type, lat, lng,drag) {
  var marker = new google.maps.Marker({
    map: mapContext,
    draggable: drag,
    position: new google.maps.LatLng(lat, lng),
    icon : new google.maps.MarkerImage(
      '../js/assets/'+type+'.png',
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new google.maps.Size(60, 60)
    )
  });
  markersArray.push(marker);


  //simulacion carro moviendo
  google.maps.event.addListener(marker,"dragend",function(){
		latlng = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng());		
		var distanciaPasajero1 = google.maps.geometry.spherical.computeDistanceBetween(pasajero1,latlng);
		var distanciaPasajero2 = google.maps.geometry.spherical.computeDistanceBetween(pasajero2,latlng);
		var distanciauabc = google.maps.geometry.spherical.computeDistanceBetween(uabc,latlng);
		if(distanciaPasajero2<50){
			//markersArray[1].setMap(null);
			$('#pasajeros').show();
			$('#tituloPasajero').html("<i class='fa fa-user-circle-o' aria-hidden='true'></i> Jose Lopez");
			$("#pasajeros").val(1);
		}
		if(distanciaPasajero1<50){
			//markersArray[0].setMap(null);
			$('#pasajeros').show();
			$('#tituloPasajero').html("<i class='fa fa-user-circle-o' aria-hidden='true'></i> Jaime Guzman");
			$("#pasajeros").val(0);
		}
		if(distanciauabc<50){
			$('#finalizacion').show();
		}
	});
}

function ocultar(){
	var i = $('#pasajeros').val();
    $('#pasajeros').hide();
    markersArray[i].setMap(null);
}