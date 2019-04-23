// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/geolocation-marker/geolocation-marker.js":[function(require,module,exports) {
(function(){
/*
 geolocation-marker version 2.0.5
 @copyright 2012, 2015 Chad Killingsworth
 @see https://github.com/ChadKillingsworth/geolocation-marker/blob/master/LICENSE.txt
*/
'use strict';var b;function e(a,c){function f(){}f.prototype=c.prototype;a.B=c.prototype;a.prototype=new f;a.prototype.constructor=a;for(var g in c)if("prototype"!=g)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(c,g);d&&Object.defineProperty(a,g,d)}else a[g]=c[g]}
function h(a,c,f,g){var d=google.maps.MVCObject.call(this)||this;d.c=null;d.b=null;d.a=null;d.i=-1;var l={clickable:!1,cursor:"pointer",draggable:!1,flat:!0,icon:{path:google.maps.SymbolPath.CIRCLE,fillColor:"#C8D6EC",fillOpacity:.7,scale:12,strokeWeight:0},position:new google.maps.LatLng(0,0),title:"Current location",zIndex:2},m={clickable:!1,cursor:"pointer",draggable:!1,flat:!0,icon:{path:google.maps.SymbolPath.CIRCLE,fillColor:"#4285F4",fillOpacity:1,scale:6,strokeColor:"white",strokeWeight:2},
optimized:!1,position:new google.maps.LatLng(0,0),title:"Current location",zIndex:3};c&&(l=k(l,c));f&&(m=k(m,f));c={clickable:!1,radius:0,strokeColor:"1bb6ff",strokeOpacity:.4,fillColor:"61a0bf",fillOpacity:.4,strokeWeight:1,zIndex:1};g&&(c=k(c,g));d.c=new google.maps.Marker(l);d.b=new google.maps.Marker(m);d.a=new google.maps.Circle(c);google.maps.MVCObject.prototype.set.call(d,"accuracy",null);google.maps.MVCObject.prototype.set.call(d,"position",null);google.maps.MVCObject.prototype.set.call(d,
"map",null);d.set("minimum_accuracy",null);d.set("position_options",{enableHighAccuracy:!0,maximumAge:1E3});d.a.bindTo("map",d.c);d.a.bindTo("map",d.b);a&&d.setMap(a);return d}e(h,google.maps.MVCObject);b=h.prototype;b.set=function(a,c){if(n.test(a))throw"'"+a+"' is a read-only property.";"map"===a?this.setMap(c):google.maps.MVCObject.prototype.set.call(this,a,c)};b.f=function(){return this.get("map")};b.l=function(){return this.get("position_options")};
b.w=function(a){this.set("position_options",a)};b.g=function(){return this.get("position")};b.m=function(){return this.get("position")?this.a.getBounds():null};b.j=function(){return this.get("accuracy")};b.h=function(){return this.get("minimum_accuracy")};b.v=function(a){this.set("minimum_accuracy",a)};
b.setMap=function(a){google.maps.MVCObject.prototype.set.call(this,"map",a);a?navigator.geolocation&&(this.i=navigator.geolocation.watchPosition(this.A.bind(this),this.o.bind(this),this.l())):(this.c.unbind("position"),this.b.unbind("position"),this.a.unbind("center"),this.a.unbind("radius"),google.maps.MVCObject.prototype.set.call(this,"accuracy",null),google.maps.MVCObject.prototype.set.call(this,"position",null),navigator.geolocation.clearWatch(this.i),this.i=-1,this.c.setMap(a),this.b.setMap(a))};
b.u=function(a){this.b.setOptions(k({},a))};b.s=function(a){this.a.setOptions(k({},a))};
b.A=function(a){var c=new google.maps.LatLng(a.coords.latitude,a.coords.longitude),f=!this.b.getMap();if(f){if(null!=this.h()&&a.coords.accuracy>this.h())return;this.c.setMap(this.f());this.b.setMap(this.f());this.c.bindTo("position",this);this.b.bindTo("position",this);this.a.bindTo("center",this,"position");this.a.bindTo("radius",this,"accuracy")}this.j()!=a.coords.accuracy&&google.maps.MVCObject.prototype.set.call(this,"accuracy",a.coords.accuracy);!f&&this.g()&&this.g().equals(c)||google.maps.MVCObject.prototype.set.call(this,
"position",c)};b.o=function(a){google.maps.event.trigger(this,"geolocation_error",a)};function k(a,c){for(var f in c)!0!==p[f]&&(a[f]=c[f]);return a}var p={map:!0,position:!0,radius:!0},n=/^(?:position|accuracy)$/i;var q=window;function r(){h.prototype.getAccuracy=h.prototype.j;h.prototype.getBounds=h.prototype.m;h.prototype.getMap=h.prototype.f;h.prototype.getMinimumAccuracy=h.prototype.h;h.prototype.getPosition=h.prototype.g;h.prototype.getPositionOptions=h.prototype.l;h.prototype.setCircleOptions=h.prototype.s;h.prototype.setMap=h.prototype.setMap;h.prototype.setMarkerOptions=h.prototype.u;h.prototype.setMinimumAccuracy=h.prototype.v;h.prototype.setPositionOptions=h.prototype.w;return h}
"function"===typeof q.define&&q.define.amd?q.define([],r):"object"===typeof q.exports?q.module.exports=r():q.GeolocationMarker=r();
}).call(this)



},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51789" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","node_modules/geolocation-marker/geolocation-marker.js"], null)
//# sourceMappingURL=/geolocation-marker.20039c5f.js.map