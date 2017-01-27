'use strict';




// function clickStateInfo(e) {
//
//   let clickedState = Data.all.filter((data) => data.state === e.target );
//   console.log(clickedState);
// }

function getCurrentStateArr(state){

  var currentState = [];

  Data.all.filter(function(ele){
    return (ele.State === state
      && ele.Year === 2015
      && ele['Age Range'] === '0-54'
      && ele.Benchmark === 'Floating'
      && ele.Locality === 'All'
    );
  })
  .forEach(ele => {
    currentState.push(ele);
  });
  return currentState;
}
