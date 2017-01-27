'use strict';

var currentState;

var heartArray;
var heartData;

var cancerArray;
var cancerData;

var strokeArray;
var strokeData;

var respArray;
var respData;

var uninArray;
var uninData;

function Selected(obj) {
  this['Cause of Death'] = obj['Cause of Death'];
  this['Observed Deaths'] = obj['Observed Deaths'];
  this['Year'] = obj['Year'];
}

function getCurrentStateArr(state){

  currentState = [];

  heartArray = [];
  heartData = [];

  cancerArray = [];
  cancerData = [];

  strokeArray = [];
  strokeData = [];

  respArray = [];
  respData = [];

  uninArray = [];
  uninData = [];

//////////////// FOR STATES ///////////////////////////////
  Data.all.filter(function(ele){
    return (ele.State === state
      && ele['Cause of Death'] === 'Heart Disease'
      && ele['Age Range'] === '0-54'
      && ele.Benchmark === 'Floating'
      && ele.Locality === 'All'
    );
  })
  .forEach(ele => {
    heartArray.push(ele) && heartData.push(ele['Observed Deaths']);
  });

  Data.all.filter(function(ele){
    return (ele.State === state
      && ele['Cause of Death'] === 'Cancer'
      && ele['Age Range'] === '0-54'
      && ele.Benchmark === 'Floating'
      && ele.Locality === 'All'
    );
  })
  .forEach(ele => {
    cancerArray.push(ele) && cancerData.push(ele['Observed Deaths']);
  });

  Data.all.filter(function(ele){
    return (ele.State === state
      && ele['Cause of Death'] === 'Stroke'
      && ele['Age Range'] === '0-54'
      && ele.Benchmark === 'Floating'
      && ele.Locality === 'All'
    );
  })
  .forEach(ele => {
    strokeArray.push(ele) && strokeData.push(ele['Observed Deaths']);
  });

  Data.all.filter(function(ele){
    return (ele.State === state
      && ele['Cause of Death'] === 'Chronic Lower Respiratory Disease'
      && ele['Age Range'] === '0-54'
      && ele.Benchmark === 'Floating'
      && ele.Locality === 'All'
    );
  })
  .forEach(ele => {
    respArray.push(ele) && respData.push(ele['Observed Deaths']);
  });

  Data.all.filter(function(ele){
    return (ele.State === state
      && ele['Cause of Death'] === 'Unintentional Injury'
      && ele['Age Range'] === '0-54'
      && ele.Benchmark === 'Floating'
      && ele.Locality === 'All'
    );
  })
  .forEach(ele => {
    uninArray.push(ele) && uninData.push(ele['Observed Deaths']);
  });

  console.log(heartArray);
  console.log(heartData);
  console.log(cancerArray);
  console.log(cancerData);
  console.log(strokeArray);
  console.log(strokeData);
  console.log(respArray);
  console.log(respData);
  console.log(uninArray);
  console.log(uninData);
}

///////////////// DATA OBJECTS /////////////////////////////
// var currentStateHeart = currentState.filter(function(obj) {
//   if (obj.cause_of_death === 'Heart Disease') {
//     var selectedHeart = new Selected(obj);
//     heartArray.push(selectedHeart);
//   }
// })
//
// var currentStateCancer = currentState.filter(function(obj) {
//   if (obj['Cause of Death'] === 'Cancer') {
//     var selectedCancer = new Selected(obj);
//     cancerArray.push(selectedCancer);
//   }
// })
//
// var currentStateStroke = currentState.filter(function(obj) {
//   if (obj['Cause of Death'] === 'Stroke') {
//     var selectedStroke = new Selected(obj);
//     strokeArray.push(selectedStroke);
//   }
// })
//
// var currentStateResp = currentState.filter(function(obj) {
//   if (obj['Cause of Death'] === 'Chronic Lower Respiratory Disease') {
//     var selectedResp = new Selected(obj);
//     respArray.push(selectedResp);
//   }
// })
//
// var currentStateUnin = currentState.filter(function(obj) {
//   if (obj['Cause of Death'] === 'Unintentional Injury') {
//     var selectedUnin = new Selected(obj);
//     uninArray.push(selectedUnin);
//   }
// })

////////////////// SORTING THE OBJECTS /////////////////////////
// let sortedHeart = heartArray.sort(function(a, b) {
//   if (a.year < b.year) {
//     return -1;
//   } if (a.year > b.year) {
//     return 1;
//   } else {
//     return 0;
//   }
// });
//
// let sortedCancer = cancerArray.sort(function(a, b) {
//   if (a.year < b.year) {
//     return -1;
//   } if (a.year > b.year) {
//     return 1;
//   } else {
//     return 0;
//   }
// });
//
// let sortedStroke = strokeArray.sort(function(a, b) {
//   if (a.year < b.year) {
//     return -1;
//   } if (a.year > b.year) {
//     return 1;
//   } else {
//     return 0;
//   }
// });
//
// let sortedResp = respArray.sort(function(a, b) {
//   if (a.year < b.year) {
//     return -1;
//   } if (a.year > b.year) {
//     return 1;
//   } else {
//     return 0;
//   }
// });
//
// let sortedUnin = uninArray.sort(function(a, b) {
//   if (a.year < b.year) {
//     return -1;
//   } if (a.year > b.year) {
//     return 1;
//   } else {
//     return 0;
//   }
// });
//
// for (var i = 0; i < sortedHeart.length; i++) {
//   heartData.push(sortedHeart[i]['Observed Deaths']);
// }
//
// for (var j = 0; j < sortedCancer.length; j++) {
//   cancerData.push(sortedCancer[j]['Observed Deaths']);
// }
//
// for (var k = 0; k < sortedStroke.length; k++) {
//   strokeData.push(sortedStroke[k]['Observed Deaths']);
// }
//
// for (var l = 0; l < sortedResp.length; l++) {
//   respData.push(sortedResp[l]['Observed Deaths']);
// }
//
// for (var m = 0; m < sortedUnin.length; m++) {
//   uninData.push(sortedUnin[i]['Observed Deaths']);
// }
