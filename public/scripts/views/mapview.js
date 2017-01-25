
<<<<<<<

=======
$(function() {

  var allMarkers = []; //returned from the API

  //Start geolocation
  // var pos;
  // var userCords;

  // if (navigator.geolocation) {
  //   function error(err) {
  //     console.warn('ERROR(' + err.code + '): ' + err.message);
  //   }
  //   function success(pos){
  //     userCords = pos.coords;
  //     console.log('I am at line 24', userCords);
  //     return userCords;
  //   }
    // Get the user's current position
    // navigator.geolocation.getCurrentPosition(success, error);
  // } else {
  //   alert('Geolocation is not supported in your browser');
  // }
  //End Geo location

  //map options
  var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(37.09024, -100.712891),
    panControl: false,
    panControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT
    },
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    scaleControl: false
  };
  // New Map
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  google.maps.event.addListener(map, 'click', function (event) {
    displayCoordinates(event.latLng);
  });

  function displayCoordinates(pnt) {

    var lat = pnt.lat();
    lat = lat.toFixed(4);
    var lng = pnt.lng();
    lng = lng.toFixed(4);
    map.setCenter(new google.maps.LatLng(lat, lng));
    console.log(lat, lng);
    var myLatlng = new google.maps.LatLng(lat, lng);

    new Marker(myLatlng, lat, lng);
  }

  function Marker(myLatlng, lat, lng) {


    var state = $.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCIMaNgcvnH-Jqf57ZDoYzA5feP1dtEIrE`, function(data){

      var target = data.results[data.results.length-2];
      var long_name = target.address_components[0].long_name;
      var short_name = target.address_components[0].short_name;

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        latitude: lat,
        longitude: lng,
        title: `${short_name}`,
        state: long_name,
      });

      $('.state-data').html(makeHTML(long_name, short_name));
      allMarkers.push(marker);
    });

  }

  function makeHTML(state, abbr){
    return `<h1>${state}</h1>
            <h2>${abbr}<h2>`;
  }

});
