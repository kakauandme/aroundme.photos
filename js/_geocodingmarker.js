
function GeocodingMarker(opt_map, curCity, curCountry) { 


  

  /**
   * @expose
   * @type {google.maps.LatLng?}
   */
  this.position = null;

  /**
   * @expose
   * @type {string?}
   */
  this.city = curCity || null;

  /**
   * @expose
   * @type {string?}
   */
  this.country = curCountry || null;

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
    'title': this.city,
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

/** @return {string?} */
GeocodingMarker.prototype.getCountry = function() {
   return this.country;
};

/** @return {string?} */
GeocodingMarker.prototype.getCity = function() {
   return this.country;
};




/** @param {google.maps.Map} map */
GeocodingMarker.prototype.setMap = function(map) {
  this.map = map;
  this.notify('map');
  if (map && this.city) {
    this.updatePosition_();//////////////////////////////////////////
  } else {
    this.marker_.unbind('position');
    this.position = null;
    this.bounds = null;
    this.marker_.setMap(map);
  }
};



/**
 * @private 
 * @return {undefined}
 */
GeocodingMarker.prototype.updatePosition_ = function() {

  
  var self = this;
  var geocoder = new google.maps.Geocoder();


  geocoder.geocode( { 'address': this.city  + (this.country?(", " + this.country):"")}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var newPosition = results[0].geometry.location , mapNotSet = self.marker_.getMap() == null;
      if(mapNotSet) {    
        self.marker_.setMap(self.map);
        self.marker_.bindTo('position', self);
      
      }

      if (mapNotSet || self.position == null || !self.position.equals(newPosition)) {
      

        self.bounds = results[0].geometry.viewport;

        self.marker_.setTitle(results[0].formatted_address);
        // The local set method does not allow position to be updated
        google.maps.MVCObject.prototype.set.call(self, 'position', newPosition);
      }





    } else {
      google.maps.event.trigger(self, "geocoding_error", status); 
    }
  });

};


