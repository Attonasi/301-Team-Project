'use strict';

//TODO: add to double click google maps DOM event listener


function clickStateInfo(e) {

  let clickedState = Data.all.filter((data) => data.state === e.target );
  console.log(clickedState);
}
