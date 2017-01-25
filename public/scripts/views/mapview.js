
<<<<<<<

=======
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

  map.addListener('dblclick', function(){
    console.log('double click');

  });

  function Marker(myLatlng, lat, lng) {

    var stuff = $.getJSON(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCIMaNgcvnH-Jqf57ZDoYzA5feP1dtEIrE`);
    console.log(stuff);
    console.log(stuff.responseText);

    // console.log(stuff.responseJSON.results[4].formatted_address);

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      latitude: lat,
      longitude: lng,
      // title: `${state}`,
      // state: state
    });

>>>>>>>
    allMarkers.push(marker);
    console.log(allMarkers);
  }
});
