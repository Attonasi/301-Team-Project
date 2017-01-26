'use strict';

// $(function(module) {

  var allStatesClicked = []; //returned from the API
  var userInput;
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
    getCoordinates(event.latLng);
  });

  function getCoordinates(pnt) {

    var lat = pnt.lat();
    lat = lat.toFixed(4);
    var lng = pnt.lng();
    lng = lng.toFixed(4);
    map.setCenter(new google.maps.LatLng(lat, lng));
    var myLatlng = new google.maps.LatLng(lat, lng);

    // getState(myLatlng, lat, lng);
    getCurrentStateArr();
  }

  function getState(myLatlng, lat, lng) {


    var state = $.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCIMaNgcvnH-Jqf57ZDoYzA5feP1dtEIrE`, function(data){

      var target = data.results[1].address_components;
      var long_name = target[target.length-2].long_name;
      var short_name = target[target.length-2].short_name;

      if (long_name === 'United States'){
        long_name = target[target.length-3].long_name;
        short_name = target[target.length-3].short_name;
      }

      // var marker = new google.maps.Marker({
      //   position: myLatlng,
      //   map: map,
      //   latitude: lat,
      //   longitude: lng,
      //   title: `${short_name}`,
      //   state: long_name,
      // });

      $('.state-data').html(makeHTML(long_name, short_name));
      allStatesClicked.push(long_name);
      console.log(allStatesClicked);
      console.log(target);

      userInput = long_name;
    });

  function makeHTML(state, abbr){

    return `<h1>${state}</h1>
            <h2>${abbr}<h2>`;

  }
}

// })(window);
