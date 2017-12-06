var directionsService;
var directionsDisplay;
var mapContext;
var centroCalle2da;
var centroCalle4ta;
var markersArray = [];

$(document).ready(function() { 	
	centroCalle2da = new google.maps.LatLng(32.535327, -117.038329);
	centroCalle4ta = new google.maps.LatLng(32.532626, -117.038845);
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
	
	insertMarker("man", centroCalle2da.lat(), centroCalle2da.lng(),false);
	insertMarker("car", centroCalle4ta.lat(), centroCalle4ta.lng(),true,centroCalle2da,true);
}

function loadUABC(){
	goToUABC(directionsService, directionsDisplay);
	$("#driver-info").hide();
	$("#trip-info").show();
	$("#trip-detail").show();
}

function goToUABC(directionsService, directionsDisplay) {
	directionsService.route({
	  origin: centroCalle4ta,
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
	clearOverlays();
	insertMarker("car", centroCalle4ta.lat(), centroCalle4ta.lng(),true,uabc,false);
	insertMarker("uabc", uabc.lat(), uabc.lng(),false);

	window.setTimeout(function() {		
		mapContext.setZoom(15);  	
      	mapContext.panTo(centroCalle4ta);
    }, 2000);
}

function finish(){		
	window.setTimeout(function() {		
		mapContext.setZoom(15);  	
      	mapContext.panTo(uabc);      	
    }, 1000);

window.setTimeout(function() {		
    $("#complete-trip").show();
		$("#trip-detail").hide();
	}, 2000);
}

function cancelRoute(){
	directionsDisplay.setMap(null); // clear direction from the map
	directionsDisplay.setPanel(null); // clear directionpanel from the map          
	directionsDisplay = new google.maps.DirectionsRenderer(); // this is to render again, otherwise your route wont show for the second time searching
	directionsDisplay.setMap(mapContext); //this is to set up again
	$("#confirm-msg").hide();
	document.getElementById("map-suggest").value= "";
}

function insertMarker (type, lat, lng,drag,destino,recogerPasajero) {
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
		var distancia = google.maps.geometry.spherical.computeDistanceBetween(destino,latlng);
		$(".distancia").text("A " + Math.round(distancia)/1000 + " Km. aprox");
		if(distancia < 50){
			if(recogerPasajero==true){
				$(".distancia").text(" ");
				loadUABC();
			}else{finish();}
		}

		directionsService.route({
		  origin: latlng,
		  destination: destino,
		  travelMode: google.maps.TravelMode.DRIVING
		}, function(response, status) {
		  if (status === google.maps.DirectionsStatus.OK) {
		    
		    // Get first route duration
		    var route = response.routes[0];
		    var duration = 0;
		    
		    route.legs.forEach(function (leg) {
		    	// The leg duration in seconds.
		    	duration += leg.duration.value;
		    });
		    
		    //directionsDisplay.setDirections(response);
		    //console.log(Math.round(duration/60));
		    $("#cajatexto").text("A "+(Math.round(duration)/60).toFixed(0)+" min");
		  } else {
		    window.alert('Directions request failed due to ' + status);
		  }
		});
	});
}

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {  	
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}