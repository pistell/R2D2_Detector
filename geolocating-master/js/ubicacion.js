//Este codigo de pruba lo tome de Google maps.
//Se ha modificado e zoom para hacer enfasis en la ciudad.
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

var marker;
var pos;
var image;
var map;
var contador;
var iconoBusesito = { url: 'img/icons8-bus-48.png' };
var parqueCaldas = { lat: 2.440985, lng: -76.606434 };

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    //center: { lat: 2.4466152, lng: -76.5981539 },
    center: parqueCaldas,
    zoom: 15,
    /* Nuevas opciones para manejo de controles sobre el mapa. */
    //panControl: false,
    //mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    //noClear: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT
    },
    //mapTypeId: 'roadmap',
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a4a29b"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#7daeff"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]
  });
  //var infoWindow = new google.maps.InfoWindow({ map: map });

  /****************** GEOLOCALIZACIÓN ******************/
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      contador = 0;
      
      map.setCenter(pos);
    },

      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

setInterval(refreshMarker, 5000);

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  alert("Por favor vaya a configuraciones y encienda su GPS, luego recargue la página.");
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}


function refreshMarker() {
  if (navigator.geolocation) {
    /* Comprueba si hay un marcador. Si lo hay, lo elimina. */
    if (marker != null) {
      marker.setMap(null);
      marker = null;
    }

    contador++; // Contador para ver cantidad de actualizaciones del marcador.

    /* Extrae -en la variable pos- la latitud, lognitud, velocidad y precición de medida de la Geolocation API */
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        speed: position.coords.speed,
        acc: position.coords.accuracy
      };
    });

    /* Crea marcador */
    marker = new google.maps.Marker({
      //position: pos,
      position: {
        lat: pos.lat,
        lng: pos.lng
      },
      map: map,
      draggable: false,
      icon: iconoBusesito,
      title: 'Mi ubicación',
    });

    /* Evento click. Ventana de Información al darle Click al Marcador */
    marker.addListener('click', function () {
      //posicionMarker = marker.getPosition();
      var markerString = '<div class="infoWindow"><p>Latitud: ' + pos.lat + ',<br>Longitud:' + pos.lng + ',<br>Velocidad: ' + pos.speed + ',<br>Conteo: ' + contador + ',<br>Accuracy: ' + pos.acc + '</div>';
      var markerInfoWindow = new google.maps.InfoWindow({
        content: markerString,
        maxWidth: 800
      });
      markerInfoWindow.open(map, marker);
      setTimeout(function () {
        markerInfoWindow.setMap(null);
      }, 1500);
    });

    /* Ventana de Información al darle Click al Marcador */
    /*marker.addListener('click'/'dragend''mouseover'/, function () {
      toggleBounce();
    });*/
  }
  /* Imprime en consola */
  console.log(pos)
  console.log(contador)
}

/* Función ToggleBounce. Actualmente no está implementada en ningún marcador. */
function toggleBounce() {
  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  }
  else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
      marker.setAnimation(null);
    }, 500);
  }
}


