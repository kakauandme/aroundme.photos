
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

  var markerOpts = {
    'clickable': true,
    'cursor': 'pointer',
    'icon':
    {
          path: geoIcon,
          fillColor: colors.purple,
          fillOpacity: 1,
          scale: 0.7,
          strokeWeight: 0,
          strokeColor:  colors.purple,
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
GeolocationMarker.prototype.setMarkerOptions = function(markerOpts) {
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


