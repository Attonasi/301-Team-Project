'use strict';

$(function() {

  var allLatlng = []; //returned from the API
  var allMarkers = []; //returned from the API
  var infowindow = null;
  var pos;
  var userCords;
  var tempMarkerHolder = [];

  //Start geolocation
  if (navigator.geolocation) {

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    function success(pos){
      userCords = pos.coords;

      console.log('I am at line 24', userCords);
      return userCords;
    }

    // Get the user's current position
    navigator.geolocation.getCurrentPosition(success, error);

  } else {
    alert('Geolocation is not supported in your browser');
  }
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

	//Adding infowindow option
  infowindow = new google.maps.InfoWindow({
    content: 'holding...'
  });

	//Fire up Google maps and place inside the map-canvas div
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

//set the markers.
  map.addListener('click', function () {

    if (navigator.geolocation) {
      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      }
      function success(pos){
        userCords = pos.coords;
        return userCords;
      }
      navigator.geolocation.getCurrentPosition(success, error);

    } else {

      alert('Geolocation is not supported in your browser');
    }
    console.log(userCords);
  });

  map.addListener('dblclick', function(){
    console.log('double click');
    var myLatlng = new map.LatLng(latitude,longitude);

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Click to zoom'
    });
  })

  // google.maps.event.addListener(allMarkers, 'click', function () {
  //   infowindow.setContent(this.html);
  //   infowindow.open(map, this);
  //   console.log('myLatlng');
  // });

  // var marker = new google.maps.Marker({
  //   position: myLatlng,
  //   map: map,
  //   title: 'Click to zoom'
  // });


});
