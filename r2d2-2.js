var geocoder;
var map;
var school;
var markers2 = [];

function initialize() {
  var map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: new google.maps.LatLng(-33.997112, 151.198241),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // const createMap = ({ lat, lng }) => {
  //   return new google.maps.Map(document.getElementById('map_canvas'), {
  //     zoom: 18
  //   });
  // };

  // const initialPosition = { lat: 59.32, lng: 17.84 };
  // const map = createMap(initialPosition);


  var bounds = new google.maps.LatLngBounds();
  for (ss = 0; ss < location_school2.length; ss++) {
    // var myIcon = new google.maps.MarkerImage("./r2d2.png", null, null, null, new google.maps.Size(56,56));
    // var marker_school = new google.maps.Marker({
    //   position: new google.maps.LatLng(location_school2[ss][1], location_school2[ss][2]),
    //   map: map,
    //   url: myIcon,
    //   //animation: google.maps.Animation.BOUNCE,
    //   visible: true,
    //   flat: true,
    //   size: new google.maps.Size(56, 56),
    //   origin: new google.maps.Point(0, 0),
    //   anchor: new google.maps.Point(-131, 31),
    //   scaledSize: new google.maps.Size(56, 56)
    // });
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

    // google.maps.event.addListener(
    //   marker_school,
    //   'click',
    //   (function(marker_school, ss) {
    //     return function() {
    //       var eee = document.querySelector("#school_bg")
    //       eee.show();

    //       document.querySelector('#name_school').append(location_school2[ss][3]);
    //     };
    //   })(marker_school, ss)
    // );
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