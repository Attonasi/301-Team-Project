'use strict';

// Stuff
// var requestProxy = require('express-request-proxy');
const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();
// const conString = process.env.DATABASE_URL || 'postgres://localhost:5432';

// const conString = 'postgres://localhost:5432';
// const client = new pg.Client(conString);
// client.connect();

  // Github Proxy Function
var proxyGitHub = function(request, response) {
  console.log('Routing GitHub request for', request.params[0]);
  (requestProxy({
    url: 'https://api.github.com/' + request.params[0],
    headers: { Authorization: 'token ' + process.env.GITHUB_TOKEN }
  }))(request, response);
};

//Express Call
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));

//Github Proxy Call
// app.get('/github/*', proxyGitHub);

// app.get('/cods/all', function(request,response){
//   // console.log('bob');
//   let client = new pg.Client(conString); // Pass the conString to pg, which creates a new client object
//   console.log(conString);
//     client.connect(function(err) { // Use the client object to connect to our DB.
//       if (err) console.error(err);
//       client.query('SELECT * FROM cods', function(err, result) { // Make a request to the DB
//         if (err) console.error(err);
//         response.send(result);
//         client.end();
//       });
//     })
// });

app.get('/cods/all', function(request,response){
      client.query(`
        CREATE TABLE IF NOT EXISTS
        cods (
          id SERIAL PRIMARY KEY,
           age_range VARCHAR(255),
           benchmark TEXT,
           cause_of_death TEXT,
           expected_deaths FLOAT,
          hhs_region INTEGER,
          locality TEXT,
          observed_deaths INTEGER,
          population INTEGER NOT NULL,
          potentially_excess_deaths FLOAT,
          state TEXT NOT NULL,
          state_fips_code TEXT NOT NULL,
          year INTEGER NOT NULL);
        `)
      client.query('SELECT * FROM cods', function(err, result) { // Make a request to the DB
        if (err) console.error(err);
        response.send(result);
      });
    });

// app.post('/cods/insert', function(request, response) {
//   // console.log(request.body);
//   let client = new pg.Client(conString)
//
//   client.connect(function(err) {
//     if (err) console.error(err);
//
//     client.query(
//       `INSERT INTO
//       cods(age_range, benchmark, cause_of_death, expected_deaths, hhs_region, locality, observed_deaths, population, potentially_excess_deaths,
//         state, state_fips_code, year)
//       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
//       [
//         request.body.age_range,
//         request.body.benchmark,
//         request.body.cuase_of_death,
//         request.body.expected_deaths,
//         request.body.hhs_region,
//         request.body.locality,
//         request.body.observed_deaths,
//         request.body.population,
//         request.body.potentially_excess_deaths,
//         request.body.state,
//         request.body.state_fips_code,
//         request.body.year
//       ],
//       function(err) {
//         if (err) console.error(err);
//         client.end();
//       }
//     );
//   });
//   //adding line below
//   client.connect();
//   response.send('insert complete');
// });

app.post('/cods/insert', function(request, response) {
    client.query(
      `INSERT INTO
      cods(age_range, benchmark, cause_of_death, expected_deaths, hhs_region, locality, observed_deaths, population, potentially_excess_deaths,
        state, state_fips_code, year)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
      [
        request.body.age_range,
        request.body.benchmark,
        request.body.cuase_of_death,
        request.body.expected_deaths,
        request.body.hhs_region,
        request.body.locality,
        request.body.observed_deaths,
        request.body.population,
        request.body.potentially_excess_deaths,
        request.body.state,
        request.body.state_fips_code,
        request.body.year
      ]
    );
  response.send('insert complete');
});

// Almost all URL's go to index
app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('public/index.html', { root: '.' });
});

// Port Listener
app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
