var geocoder;
var map;
var school;
var markers2 = [];

function initialize() {
  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: new google.maps.LatLng(-33.997112, 151.198241),
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  //Overrides the map center to your current position
  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    map.setCenter(pos);
  });
  cav = {
    url: './cav.png',
    size: new google.maps.Size(76, 56),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(38, 31),
    scaledSize: new google.maps.Size(76, 56),
    class: "gay"
  };
  GeoMarker = new GeolocationMarker();
  GeoMarker.setCircleOptions({
    fillColor: '#808080'
  });
  GeoMarker.setMarkerOptions({
    icon: cav,
    title: 'I might be here',
    visible: true,
    map: map,
    cursor: 'pointer',
    label: " ",
  });
  document.addEventListener("animationstart", AnimationListener, {
    once: true
  });
  document.addEventListener("animationiteration", AnimationListener);

  function AnimationListener() {
    console.log("Ticking");
    var audio = new Audio('./radar.mp3');
    audio.play();
  }
  google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function () {
    map.setCenter(this.getPosition());
    map.fitBounds(this.getBounds());
    console.log("changing lmao")
  });

  google.maps.event.addListener(GeoMarker, 'geolocation_error', function (e) {
    alert('There was an error obtaining your position. Message: ' + e.message);
  });
  GeoMarker.setMap(map);


  var bounds = new google.maps.LatLngBounds();
  for (ss = 0; ss < location_school2.length; ss++) {
    var enemy = {
      size: new google.maps.Size(56, 56),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(31, 31),
      scaledSize: new google.maps.Size(56, 56),
      url: './r2d2.png'
    }
    var marker_school = new google.maps.Marker({
      position: new google.maps.LatLng(location_school2[ss][1], location_school2[ss][2]),
      map: map,
      icon: enemy
    })
    var circle = new google.maps.Circle({
      map: map,
      radius: 130,
      fillColor: '#AA0000',
      strokeColor: '#FFF',
      strokeWeight: 0
    });
    circle.bindTo('center', marker_school, 'position');
    markers2.push(marker_school);
    //bounds.extend(marker_school.getPosition());
  }
  //map.fitBounds(bounds);
}

google.maps.event.addDomListener(window, 'load', initialize);

var location_school2 = [
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Cambridge and Park', 43.150130, 282.412324, 1]
];

/**
 * TODO
 * 1. Add enemy icons to the map
 * 2. Refactor this code so the vars are readable (eg- change all mentions of school)
 * 3. Add cav scout icon
 * 4. Come up with a route and destination
 * 5. Add the grid overlay
 * 6. Add warning sound when crossing into R2D2 sphere
 * 7. Integrate with Raspberry Pi
 */
