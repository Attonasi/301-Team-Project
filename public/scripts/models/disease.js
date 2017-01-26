'use strict';

(function(module){

  function Data(opts) {
    Object.keys(opts).forEach(e => this[e] = opts[e]);
  }

  Data.all = [];

  Data.loadAll = rows => {
    Data.all = rows.map(ele => new Data(ele));
  }

  Data.fetchAll = function() {
    $.get('/cods/all')
    .then(
      results => {
        if (results.rows.length) {
          Data.loadAll(results.rows);
        } else {
          $.getJSON('./data/Death.json')
          .then(rawData => {
            rawData.forEach(item =>{
              let data = new Data(item);
              Data.all.push(data);
              // data.insertRecord();
            })
          })
        .then(() => Data.fetchAll())
        .catch(console.error);
        }
      }
    )
  }

  Data.allStates = () => {
    return Data.all.map(data => data.state)
                  .reduce((names, name) =>{
                    if (names.indexOf(name)=== -1) names.push(name);
                    return names;
                  },[])
  }

  // Data.prototype.insertRecord = function (callback) {
  //   $.post('/cods/insert', {
  //     age_range: this.age_range,
  //     benchmark: this.benchmark,
  //     cause_of_death: this.cause_of_death,
  //     expected_deaths:this.expected_deaths,
  //     hhs_region: this.hhs_region,
  //     locality: this.locality,
  //     observed_deaths: this.observed_deaths,
  //     population: this.population,
  //     potentially_excess_deaths: this.potentially_excess_deaths,
  //     state: this.state,
  //     state_fips_code: this.state_fips_code,
  //     year:this.year
  //   })
  //   .then(console.log)
  //   .then(callback);
  // };

Data.fetchAll();
  module.Data = Data
})(window);
