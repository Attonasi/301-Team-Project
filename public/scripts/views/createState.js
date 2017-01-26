'use strict';

var currentState = [];


// function clickStateInfo(e) {
//
//   let clickedState = Data.all.filter((data) => data.state === e.target );
//   console.log(clickedState);
// }


function getCurrentStateArr(userInput){
  getState(myLatlng, lat, lng);
  Data.all.filter(function(ele, userInput){
    return (ele.State === userInput
      && ele.Year === 2015
      && ele['Age Range'] === '0-54'
      && ele.Benchmark === 'Floating'
    ).then(currentState.push(this));
  });
}

console.log(currentState)
