'use strict';

var currentState = [];


// function clickStateInfo(e) {
//
//   let clickedState = Data.all.filter((data) => data.state === e.target );
//   console.log(clickedState);
// }


function getCurrentStateArr(arr){
  getState(myLatlng, lat, lng);
  currentState = arr.filter(function(obj) {
    return state === obj.state;
  });
}

console.log(currentState.filter(function(ele){
  return ele.Year === 2015
        && ele.Bencmark === 'Floating'
        && ele.Age.Range === '0-54'
}));
