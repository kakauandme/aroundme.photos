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
    'clickable': true,
    'cursor': 'pointer',
    'draggable': false,
    'flat': true,
    'icon':
    {
          path: 'M44.3,38.1c-24.2,0-43.8,20-43.8,44.7s19.7,44.8,43.8,44.8s43.8-20.1,43.8-44.8S68.5,38.1,44.3,38.1z M47.9,114.9l-6.5-27.6l-26.8-6.9l53-19.9L47.9,114.9z M74.3,0.5c13.6,0,27.2,5.3,37.6,15.9s15.6,24.5,15.6,38.4h-11.7c0-10.9-4-21.7-12.2-29.9S84.9,12.5,74.2,12.5L74.3,0.5L74.3,0.5z M74.3,35c4.9,0,10,1.9,13.7,5.8c3.8,3.8,5.7,9,5.7,14H106c1.4-11.7-2.6-17.8-9.3-22.9c-6.2-6.3-14.3-9.5-22.5-9.5V35L74.3,35z',
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
    'title': 'My location',
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