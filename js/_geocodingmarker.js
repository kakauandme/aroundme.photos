

function GeocodingMarker(opt_map) { 


  

  /**
   * @expose
   * @type {google.maps.LatLng?}
   */
  this.position =  null;



  /**
   * @expose
   * @type {google.maps.LatLngBounds?}
   */
  this.bounds = null;

  /**
   * @expose
   * @type {google.maps.Map?}
   */
  this.map = null;
  var geoIcon = 'M37,49.5l46.9-17.2L66.5,79.4l-5.7-24L37,49.5z M115.1,52.6c0,28.7-24.8,47.6-51.1,73.8c-26.2-26.3-51.1-45.2-51.1-73.8C12.9,24.4,35.8,1.5,64,1.5S115.1,24.4,115.1,52.6z M101.5,51.1c0-20.7-16.8-37.5-37.5-37.5c-20.7,0-37.5,16.8-37.5,37.5c0,20.7,16.8,37.5,37.5,37.5C84.7,88.5,101.5,71.8,101.5,51.1z';
  var markerOpts = {
    'clickable': true,
    'cursor': 'pointer',
    'icon':
    {
          path: geoIcon,
          fillColor: global.colors.purple,
          fillOpacity: 1,
          scale: 0.7,
          strokeWeight: 0,
          strokeColor:  global.colors.purple,
          strokeOpacity: 0,
          anchor: new google.maps.Point(64, 128)

      },

    'optimized': true, 
    'position': new google.maps.LatLng(0, 0),
    //'title': this.address,
    'zIndex': 2
  };

  this.marker_ = new google.maps.Marker(markerOpts);
  

  if(opt_map) {
    this.setMap(opt_map);
  }
}
GeocodingMarker.prototype = new google.maps.MVCObject;



/**
 * @override
 * @expose
 * @param {string} key
 * @param {*} value
 */
GeocodingMarker.prototype.set = function(key, value) {
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
GeocodingMarker.prototype.marker_ = null;

GeocodingMarker.prototype.getPin = function(){
  return this.marker_;
};



/** @return {google.maps.Map} */
GeocodingMarker.prototype.getMap = function() {
  return this.map;
};



/** @return {google.maps.LatLng?} */
GeocodingMarker.prototype.getPosition = function() {
  return this.position;
};

/** @return {google.maps.LatLngBounds?} */
GeocodingMarker.prototype.getBounds = function() {
   return this.bounds;
};





/** @param {google.maps.Map} map */
GeocodingMarker.prototype.setMap = function(map) {
  this.map = map;
  this.notify('map');

  if (!map){
    this.marker_.unbind('position');
    this.position = null;
    this.bounds = null;
    google.maps.event.clearInstanceListeners(this.marker_);
    this.marker_.setMap(map);
  }
};


/** @param {google.maps.MarkerOptions|Object.<string>} markerOpts */
GeocodingMarker.prototype.setMarkerOptions = function(markerOpts) {
  this.marker_.setOptions(this.copyOptions_({}, markerOpts));
};


/**
 * @private 
 * @return {undefined}
 */
GeocodingMarker.prototype.updatePosition_= function(_place) {


  var newPosition = _place.geometry.location , 

  mapNotSet = this.marker_.getMap() == null;

  if(mapNotSet) {    
    this.marker_.setMap(this.map);
    this.marker_.bindTo('position', this);  
  }

  if (mapNotSet || this.position == null || !this.position.equals(newPosition)) {
  

    this.bounds = _place.geometry.viewport;
    this.marker_.setTitle(_place.formatted_address);
    // The local set method does not allow position to be updated
    google.maps.MVCObject.prototype.set.call(this, 'position', newPosition);
  }

};



/**
 * @private
 * @param {Object.<string,*>} target
 * @param {Object.<string,*>} source
 * @return {Object.<string,*>}
 */
GeocodingMarker.prototype.copyOptions_ = function(target, source) {
  for(var opt in source) {
    if(GeocodingMarker.DISALLOWED_OPTIONS[opt] !== true) {
      target[opt] = source[opt];
    }
  }
  return target;
};


/**
 * @const
 * @type {Object.<string, boolean>}
 */
GeocodingMarker.DISALLOWED_OPTIONS = {
  'map': true,
  'position': true,
  'radius': true
};


