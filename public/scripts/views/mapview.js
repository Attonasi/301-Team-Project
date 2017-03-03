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

    getState(myLatlng, lat, lng);
  }

function getState(myLatlng, lat, lng) {

    $.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDpWkIatEG3SKn0Dt3GGKf4NG3U9vFMS04`)
    .done((data)=>{
      var target = data.results[1].address_components;
      var long_name = target[target.length-2].long_name;
      var short_name = target[target.length-2].short_name;

      if (long_name === 'United States'){
        long_name = target[target.length-3].long_name;
        short_name = target[target.length-3].short_name;
      }
      allStatesClicked.push(long_name);
      // $('.state-data').html(makeHTML(long_name));
      console.log("state name",long_name);
      $('#map-chart').html(drawChart(long_name));
  });
}
//
// var myLatLng1 = new google.maps.LatLng(-33.891044,151.275537);
// var marker1 = new google.maps.Marker({
//   position: myLatLng1,
//   map: map
// })
//
// google.maps.event.addListener(marker1, 'click', function() {
//      var infowindow1 = new google.maps.InfoWindow();
//      infowindow1.setContent('Hey there! this shit might work!!');
//      infowindow1.open(map, marker1);
//    });

// function initMap() {
//   var uluru = {lat: -25.363, lng: 131.044};
//   var map = new google.maps.Map(document.getElementById('map-canvas'), {
//     zoom: 4,
//     center: uluru
//   });
//
//   var contentString = 'fuck';
//
//   var infowindow = new google.maps.InfoWindow({
//     content: contentString
//   });
//
//   var marker = new google.maps.Marker({
//     position: uluru,
//     map: map,
//     title: 'Uluru (Ayers Rock)'
//   });
//   marker.addListener('click', function() {
//     infowindow.open(map, marker);
//   });
// }

  // function makeHTML(state){
  //   let currentState = getCurrentStateArr(state);

    // var map = new google.maps.Map(document.getElementById('map-canvas'), {
    //   zoom: 4,
    //   center: seattle
    // });
    //
    // map.addListener('click', function() {
    //   console.log('The map is alive');
    // })
    //
    // var ctx = document.getElementById('map-chart').getContext('2d');
    //
    // function drawChart() {
    //
    //   var mapchart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //       labels: ['Heart Data', 'Cancer Data', 'Stroke Data', 'Chronic Respitory Data', 'Unintentional Injury Data'],
    //       datasets: [{
    //         label: 'Heart Data',
    //         data: heartData,
    //         backgroundColor: "rgba(153,255,51,0.4)"
          // }, {
          //   label: 'Cancer Data',
          //   data: cancerData,
          //   backgroundColor: "rgba(255,153,0,0.4)"
          // }, {
          //   label: 'Stroke Data',
          //   data: strokeData,
          //   backgroundColor: "rgba(255,153,0,0.4)"
          // }, {
          //   label: 'Chronic Respitory Data',
          //   data: respData,
          //   backgroundColor: "rgba(255,153,0,0.4)"
          // }, {
          //   label: 'Unintentional Injury Data',
          //   data: uninData,
          //   backgroundColor: "rgba(255,153,0,0.4)"
//     return `<h1>${state}</h1>
//     <h3>Heart Disease ${heartData}</h3>
//     <h3>Cancer ${cancerData}</h3>
//     <h3>Stroke ${strokeData}</h3>
//     <h3>Respiratory ${respData}</h3>
//     <h3>Accidents ${uninData}</h3>`
// }

function drawChart(state) {
  let currentState = getCurrentStateArr(state);
  var ctx = document.getElementById('map-chart').getContext('2d');
  var mapchart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
    datasets: [{
      label: 'Heart',
      data: heartData,
      backgroundColor: "rgba(153,255,51,0.4)"
    }, {
      label: 'Cancer',
      data: cancerData,
      backgroundColor: "rgba(255,153,0,0.4)"
    }, {
      label: 'Stroke',
      data: strokeData,
      backgroundColor: "rgba(51,153,255,0.4)"
    }, {
      label: 'Unintentional Injury',
      data: uninData,
      backgroundColor: "rgba(255,51,255,0.4)"
    }, {
      label: 'Chronic Respitory',
      data: respData,
      backgroundColor: "rgba(51,255,153,0.4)"
    }]
  },
  options: {
    title: {
      display: true,
      text: state
    },
    legend: {labels:{fontColor:"black",
    markerType:'none',
      fontSize: 12}}
  }
});
}

//



// })(window);
