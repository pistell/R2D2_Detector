//let geocoder;
//let map;
// var school;
const markers = [];

function initialize() {
  const map = new google.maps.Map(document.getElementById('map_canvas'), {
    center: new google.maps.LatLng(-33.997112, 151.198241),
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  // Overrides the map center to your current position
  navigator.geolocation.getCurrentPosition((position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    map.setCenter(pos);
  });

  const r2d2Array = [
    ['Coogee Beach', -33.923036, 151.259052, 5],
    ['Bondi Beach', -33.890542, 151.274856, 4],
    ['Cronulla Beach', -34.028249, 151.157507, 3],
    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    ['Cambridge and Park', 43.150130, 282.412324, 1],
  ];

  const cav = {
    url: './cav.png',
    size: new google.maps.Size(76, 56),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(38, 31),
    scaledSize: new google.maps.Size(76, 56),
  };

  const GeoMarker = new GeolocationMarker();

  GeoMarker.setCircleOptions({
    fillColor: '#808080',
  });

  GeoMarker.setMarkerOptions({
    icon: cav,
    title: '2nd Platoon Alpha Troop',
    visible: true,
    map,
    cursor: 'pointer',
    label: ' ',
  });

  function radarSoundEffect() {
    console.log('Ticking');
    const audio = new Audio('./radar.mp3');
    audio.play();
  }

  // Play the radar SFX once when the page loads
  // The 'animationiteration' event only begins playing on the 2nd iteration
  document.addEventListener('animationstart', radarSoundEffect, {
    once: true,
  });
  // Play the radar SFX on each animation iteration
  document.addEventListener('animationiteration', radarSoundEffect);


  // Changes map boundaries when your marker moves
  google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
    map.setCenter(this.getPosition());
    map.fitBounds(this.getBounds());
    console.log('Changing Map Boundaries');
  });

  // Error handling for your map marker
  google.maps.event.addListener(GeoMarker, 'geolocation_error', (e) => {
    console.error(`There was an error obtaining your position. Message: ${e.message}`);
  });

  // Places your Cavalry marker on the map
  GeoMarker.setMap(map);

  // Enable this to set your map bounds to include all the R2D2 markers
  // var bounds = new google.maps.LatLngBounds();

  for (i = 0; i < r2d2Array.length; i++) {
    const enemy = {
      size: new google.maps.Size(56, 56),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(31, 31),
      scaledSize: new google.maps.Size(56, 56),
      url: './r2d2.png',
    };
    const r2d2_marker = new google.maps.Marker({
      position: new google.maps.LatLng(r2d2Array[i][1], r2d2Array[i][2]),
      map,
      icon: enemy,
    });
    const enemyCircle = new google.maps.Circle({
      map,
      radius: 130,
      fillColor: '#AA0000',
      strokeColor: '#FFF',
      strokeWeight: 0,
    });
    enemyCircle.bindTo('center', r2d2_marker, 'position');
    markers.push(r2d2_marker);
    // bounds.extend(r2d2_marker.getPosition());
  }
  // map.fitBounds(bounds);
}

// add initialize to the API callback and async/defer it for production
google.maps.event.addDomListener(window, 'load', initialize);


/**
 * TODO
 * 1. Add enemy icons to the map
 * 2. Refactor this code so the vars are readable (eg- change all mentions of school)
 * 3. Add cav scout icon
 * 4. Come up with a route and destination
 * 5. Add the grid overlay
 * 6. Add warning sound when crossing into R2D2 sphere
 * 7. Integrate with Raspberry Pi
 * 8. AirBnB linter
 * 9. Webpack4
 */

/**
 * ***************************
 * Cool guy TV tracking effect
 * ***************************
 */
// (function () {
//   "use strict";

//   var canvas = document.querySelector("#tv"),
//     context = canvas.getContext("gl") || canvas.getContext("2d"),
//     scaleFactor = 2.5, // Noise size
//     samples = [],
//     sampleIndex = 0,
//     scanOffsetY = 0,
//     scanSize = 0,
//     FPS = 50,
//     scanSpeed = FPS * 15, // 15 seconds from top to bottom
//     SAMPLE_COUNT = 10;

//   window.onresize = function () {
//     canvas.width = canvas.offsetWidth / scaleFactor;
//     canvas.height = canvas.width / (canvas.offsetWidth / canvas.offsetHeight);
//     scanSize = (canvas.offsetHeight / scaleFactor) / 3;

//     samples = []
//     for (var i = 0; i < SAMPLE_COUNT; i++)
//       samples.push(generateRandomSample(context, canvas.width, canvas.height));
//   };

//   function interpolate(x, x0, y0, x1, y1) {
//     return y0 + (y1 - y0) * ((x - x0) / (x1 - x0));
//   }


//   function generateRandomSample(context, w, h) {
//     var intensity = [];
//     var random = 0;
//     var factor = h / 50;
//     var trans = 1 - Math.random() * 0.05;

//     var intensityCurve = [];
//     for (var i = 0; i < Math.floor(h / factor) + factor; i++)
//       intensityCurve.push(Math.floor(Math.random() * 15));

//     for (var i = 0; i < h; i++) {
//       var value = interpolate((i / factor), Math.floor(i / factor), intensityCurve[Math.floor(i / factor)], Math.floor(i / factor) + 1, intensityCurve[Math.floor(i / factor) + 1]);
//       intensity.push(value);
//     }

//     var imageData = context.createImageData(w, h);
//     for (var i = 0; i < (w * h); i++) {
//       var k = i * 4;
//       var color = Math.floor(36 * Math.random());
//       // Optional: add an intensity curve to try to simulate scan lines
//       color += intensity[Math.floor(i / w)];
//       imageData.data[k] = imageData.data[k + 1] = imageData.data[k + 2] = color;
//       imageData.data[k + 3] = Math.round(255 * trans);
//     }
//     return imageData;
//   }

//   function render() {
//     context.putImageData(samples[Math.floor(sampleIndex)], 0, 0);

//     sampleIndex += 20 / FPS; // 1/FPS == 1 second
//     if (sampleIndex >= samples.length) sampleIndex = 0;

//     var grd = context.createLinearGradient(0, scanOffsetY, 0, scanSize + scanOffsetY);

//     grd.addColorStop(0, 'rgba(255,255,255,0)');
//     grd.addColorStop(0.1, 'rgba(255,255,255,0)');
//     grd.addColorStop(0.2, 'rgba(255,255,255,0.2)');
//     grd.addColorStop(0.3, 'rgba(255,255,255,0.0)');
//     grd.addColorStop(0.45, 'rgba(255,255,255,0.1)');
//     grd.addColorStop(0.5, 'rgba(255,255,255,1.0)');
//     grd.addColorStop(0.55, 'rgba(255,255,255,0.55)');
//     grd.addColorStop(0.6, 'rgba(255,255,255,0.25)');
//     //grd.addColorStop(0.8, 'rgba(255,255,255,0.15)');
//     grd.addColorStop(1, 'rgba(255,255,255,0)');

//     context.fillStyle = grd;
//     context.fillRect(0, scanOffsetY, canvas.width, scanSize + scanOffsetY);
//     context.globalCompositeOperation = "lighter";

//     scanOffsetY += (canvas.height / scanSpeed);
//     if (scanOffsetY > canvas.height) scanOffsetY = -(scanSize / 2);

//     window.requestAnimationFrame(render);
//   }
//   window.onresize();
//   window.requestAnimationFrame(render);
// })();
