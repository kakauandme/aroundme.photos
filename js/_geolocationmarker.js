/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @name GeolocationMarker for Google Maps v3
 * @version version 1.0
 * @author Chad Killingsworth [chadkillingsworth at missouristate.edu]
 * Copyright 2012 Missouri State University
 * @fileoverview
 * This library uses geolocation to add a marker and accuracy circle to a map.
 * The marker position is automatically updated as the user position changes.
 */

/**
 * @constructor
 * @extends {google.maps.MVCObject}
 * @param {google.maps.Map=} opt_map
 * @param {(google.maps.MarkerOptions|Object.<string>)=} opt_markerOpts
 * @param {(google.maps.CircleOptions|Object.<string>)=} opt_circleOpts
 */
function GeolocationMarker(opt_map, opt_markerOpts, opt_circleOpts) {

  var markerOpts = {
    'clickable': false,
    'cursor': 'pointer',
    'draggable': false,
    'flat': true,
    'icon':
    {
          path: 'M44.8,39.2C21.3,39.2,2.1,58.4,2.1,82s19.2,42.7,42.7,42.7S87.6,105.5,87.6,82S68.4,39.2,44.8,39.2zM48.3,112.7L42,86.4L16,79.8l51.6-18.9L48.3,112.7z M74,3.3c13.3,0,26.6,5.1,36.7,15.2c10.1,10.1,15.2,23.4,15.2,36.7h-11.3c0-10.4-4-20.8-11.8-28.6S84.5,14.8,74.1,14.8V3.3H74z M74,36.3c4.8,0,9.7,1.9,13.4,5.6c3.7,3.7,5.6,8.5,5.6,13.4h12c0-8-3.1-15.8-9-21.8c-6-6-14-9-21.8-9L74,36.3L74,36.3z',
          fillColor: colors.red,
          fillOpacity: 1,
          scale: 1,
          strokeWeight: 0,
          strokeColor:  colors.red,
          strokeOpacity: 0,
          //scale: 0.5,
          anchor: new google.maps.Point(64, 64)

      },
    //  {
    //     'url': 'https://google-maps-utility-library-v3.googlecode.com/svn/trunk/geolocationmarker/images/gpsloc.png',
    //     'size': new google.maps.Size(34, 34),
    //     'scaledSize': new google.maps.Size(17, 17),
    //     'origin': new google.maps.Point(0, 0),
    //     'anchor': new google.maps.Point(8, 8)
    // },
    // This marker may move frequently - don't force canvas tile redraw
    'optimized': false, 
    'position': new google.maps.LatLng(0, 0),
    'title': 'Current location',
    'zIndex': 2
  };

  if(opt_markerOpts) {
    markerOpts = this.copyOptions_(markerOpts, opt_markerOpts);
  }

  var circleOpts = {
    'clickable': false,
    'radius': 0,
    'strokeColor': colors.blue,
    'strokeOpacity': 1,

    'fillColor': colors.green,
    'fillOpacity': .4,
    'strokeWeight': 1,
    'zIndex': 1
  };

  if(opt_circleOpts) {
    circleOpts = this.copyOptions_(circleOpts, opt_circleOpts);
  }

  this.marker_ = new google.maps.Marker(markerOpts);
  this.circle_ = new google.maps.Circle(circleOpts);

  /**
   * @expose
   * @type {number?}
   */
  this.accuracy = null;

  /**
   * @expose
   * @type {google.maps.LatLng?}
   */
  this.position = null;

  /**
   * @expose
   * @type {google.maps.Map?}
   */
  this.map = null;
  
  this.set('minimum_accuracy', null);
  
  this.set('position_options', /** GeolocationPositionOptions */
      ({enableHighAccuracy: true, maximumAge: 1000}));

  this.circle_.bindTo('map', this.marker_);

  if(opt_map) {
    this.setMap(opt_map);
  }
}
GeolocationMarker.prototype = new google.maps.MVCObject;

/**
 * @override
 * @expose
 * @param {string} key
 * @param {*} value
 */
GeolocationMarker.prototype.set = function(key, value) {
  if (/^(?:position|accuracy)$/i.test(key)) {
    throw '\'' + key + '\' is a read-only property.';
  } else if (/map/i.test(key)) {
    this.setMap(/** @type {google.maps.Map} */ (value));
  } else {
    google.maps.MVCObject.prototype.set.apply(this, arguments);
  }
};

/**
 * @private
 * @type {google.maps.Marker}
 */
GeolocationMarker.prototype.marker_ = null;

/**
 * @private
 * @type {google.maps.Circle}
 */
GeolocationMarker.prototype.circle_ = null;

/** @return {google.maps.Map} */
GeolocationMarker.prototype.getMap = function() {
  return this.map;
};

/** @return {GeolocationPositionOptions} */
GeolocationMarker.prototype.getPositionOptions = function() {
  return /** @type GeolocationPositionOptions */(this.get('position_options'));
};

/** @param {GeolocationPositionOptions|Object.<string, *>} positionOpts */
GeolocationMarker.prototype.setPositionOptions = function(positionOpts) {
  this.set('position_options', positionOpts);
};

/** @return {google.maps.LatLng?} */
GeolocationMarker.prototype.getPosition = function() {
  return this.position;
};

/** @return {google.maps.LatLngBounds?} */
GeolocationMarker.prototype.getBounds = function() {
  if (this.position) {
    return this.circle_.getBounds();
  } else {
    return null;
  }
};

/** @return {number?} */
GeolocationMarker.prototype.getAccuracy = function() {
  return this.accuracy;
};

/** @return {number?} */
GeolocationMarker.prototype.getMinimumAccuracy = function() {
  return /** @type {number?} */ (this.get('minimum_accuracy'));
};

/** @param {number?} accuracy */
GeolocationMarker.prototype.setMinimumAccuracy = function(accuracy) {
  this.set('minimum_accuracy', accuracy);
};

/**
 * @private
 * @type {number}
 */
GeolocationMarker.prototype.watchId_ = -1;

/** @param {google.maps.Map} map */
GeolocationMarker.prototype.setMap = function(map) {
  this.map = map;
  this.notify('map');
  if (map) {
    this.watchPosition_();
  } else {
    this.marker_.unbind('position');
    this.circle_.unbind('center');
    this.circle_.unbind('radius');
    this.accuracy = null;
    this.position = null;
    navigator.geolocation.clearWatch(this.watchId_);
    this.watchId_ = -1;
    this.marker_.setMap(map);
  }
};

/** @param {google.maps.MarkerOptions|Object.<string>} markerOpts */
GeolocationMarker.prototype.setMarkerOptions = function(markerOpts) {
  this.marker_.setOptions(this.copyOptions_({}, markerOpts));
};

/** @param {google.maps.CircleOptions|Object.<string>} circleOpts */
GeolocationMarker.prototype.setCircleOptions = function(circleOpts) {
  this.circle_.setOptions(this.copyOptions_({}, circleOpts));
};

/**
 * @private 
 * @param {GeolocationPosition} position
 */
GeolocationMarker.prototype.updatePosition_ = function(position) {
  var newPosition = new google.maps.LatLng(position.coords.latitude,
      position.coords.longitude), mapNotSet = this.marker_.getMap() == null;
  console.log("Accuracy: " + position.coords.accuracy);
  if(mapNotSet) {
    if (this.getMinimumAccuracy() != null &&
        position.coords.accuracy > this.getMinimumAccuracy()) {
      return;
    }
    this.marker_.setMap(this.map);
    this.marker_.bindTo('position', this);
    this.circle_.bindTo('center', this, 'position');
    this.circle_.bindTo('radius', this, 'accuracy');
  }

  if (this.accuracy != position.coords.accuracy) {
    // The local set method does not allow accuracy to be updated
    google.maps.MVCObject.prototype.set.call(this, 'accuracy', position.coords.accuracy);
  }

  if (mapNotSet || this.position == null ||
      !this.position.equals(newPosition)) {
	// The local set method does not allow position to be updated
    google.maps.MVCObject.prototype.set.call(this, 'position', newPosition);
  }
};

/**
 * @private
 * @return {undefined}
 */
GeolocationMarker.prototype.watchPosition_ = function() {
  var self = this;

  if(navigator.geolocation) {
    this.watchId_ = navigator.geolocation.watchPosition(
        function(position) { self.updatePosition_(position); },
        function(e) { google.maps.event.trigger(self, "geolocation_error", e); },
        this.getPositionOptions());
  }
};

/**
 * @private
 * @param {Object.<string,*>} target
 * @param {Object.<string,*>} source
 * @return {Object.<string,*>}
 */
GeolocationMarker.prototype.copyOptions_ = function(target, source) {
  for(var opt in source) {
    if(GeolocationMarker.DISALLOWED_OPTIONS[opt] !== true) {
      target[opt] = source[opt];
    }
  }
  return target;
};

/**
 * @const
 * @type {Object.<string, boolean>}
 */
GeolocationMarker.DISALLOWED_OPTIONS = {
  'map': true,
  'position': true,
  'radius': true
};