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

// Cool guy TV tracking effect
(function () {
  "use strict";

  var canvas = document.querySelector("#tv"),
    context = canvas.getContext("gl") || canvas.getContext("2d"),
    scaleFactor = 2.5, // Noise size
    samples = [],
    sampleIndex = 0,
    scanOffsetY = 0,
    scanSize = 0,
    FPS = 50,
    scanSpeed = FPS * 15, // 15 seconds from top to bottom
    SAMPLE_COUNT = 10;

  window.onresize = function () {
    canvas.width = canvas.offsetWidth / scaleFactor;
    canvas.height = canvas.width / (canvas.offsetWidth / canvas.offsetHeight);
    scanSize = (canvas.offsetHeight / scaleFactor) / 3;

    samples = []
    for (var i = 0; i < SAMPLE_COUNT; i++)
      samples.push(generateRandomSample(context, canvas.width, canvas.height));
  };

  function interpolate(x, x0, y0, x1, y1) {
    return y0 + (y1 - y0) * ((x - x0) / (x1 - x0));
  }


  function generateRandomSample(context, w, h) {
    var intensity = [];
    var random = 0;
    var factor = h / 50;
    var trans = 1 - Math.random() * 0.05;

    var intensityCurve = [];
    for (var i = 0; i < Math.floor(h / factor) + factor; i++)
      intensityCurve.push(Math.floor(Math.random() * 15));

    for (var i = 0; i < h; i++) {
      var value = interpolate((i / factor), Math.floor(i / factor), intensityCurve[Math.floor(i / factor)], Math.floor(i / factor) + 1, intensityCurve[Math.floor(i / factor) + 1]);
      intensity.push(value);
    }

    var imageData = context.createImageData(w, h);
    for (var i = 0; i < (w * h); i++) {
      var k = i * 4;
      var color = Math.floor(36 * Math.random());
      // Optional: add an intensity curve to try to simulate scan lines
      color += intensity[Math.floor(i / w)];
      imageData.data[k] = imageData.data[k + 1] = imageData.data[k + 2] = color;
      imageData.data[k + 3] = Math.round(255 * trans);
    }
    return imageData;
  }

  function render() {
    context.putImageData(samples[Math.floor(sampleIndex)], 0, 0);

    sampleIndex += 20 / FPS; // 1/FPS == 1 second
    if (sampleIndex >= samples.length) sampleIndex = 0;

    var grd = context.createLinearGradient(0, scanOffsetY, 0, scanSize + scanOffsetY);

    grd.addColorStop(0, 'rgba(255,255,255,0)');
    grd.addColorStop(0.1, 'rgba(255,255,255,0)');
    grd.addColorStop(0.2, 'rgba(255,255,255,0.2)');
    grd.addColorStop(0.3, 'rgba(255,255,255,0.0)');
    grd.addColorStop(0.45, 'rgba(255,255,255,0.1)');
    grd.addColorStop(0.5, 'rgba(255,255,255,1.0)');
    grd.addColorStop(0.55, 'rgba(255,255,255,0.55)');
    grd.addColorStop(0.6, 'rgba(255,255,255,0.25)');
    //grd.addColorStop(0.8, 'rgba(255,255,255,0.15)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');

    context.fillStyle = grd;
    context.fillRect(0, scanOffsetY, canvas.width, scanSize + scanOffsetY);
    context.globalCompositeOperation = "lighter";

    scanOffsetY += (canvas.height / scanSpeed);
    if (scanOffsetY > canvas.height) scanOffsetY = -(scanSize / 2);

    window.requestAnimationFrame(render);
  }
  window.onresize();
  window.requestAnimationFrame(render);
})();
