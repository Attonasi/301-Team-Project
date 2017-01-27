'use strict'

const bluebird = require('bluebird')
const fsProm = bluebird.promisifyAll(require('fs'))
const pg = require('pg')
const Pool = pg.Pool
const ops = module.exports = {}

const pool = new Pool({
  user: 'postgres',
  password: 'Joy1is1me!',
  host: 'localhost',
  database: 'postgres',
  max: 10,
  idleTimeoutMillis: 1000
})

const loadRecord = function(record) {
  const sqlVals = [
    `${record['Age Range']}`,
    record.Benchmark,
    `${record['Cause of Death']}`,
    `${record['Expected Deaths']}`,
    `${record['HHS Region']}`,
    record.Locality,
    `${record['Observed Deaths']}`,
    record.Population,
    `${record['Potentially Excess Deaths']}`,
    record.State,
    `$record['State FIPS Code']}`,
    record.Year
    ]
  const sqlString = `INSERT INTO
                     cods(age_range, benchmark, cause_of_death, expected_deaths, hhs_region, locality, observed_deaths, population, potentially_excess_deaths,
                       state, state_fips_code, year)
                     VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`

  return new Promise((res, rej) => {
    res(pool.query(sqlString, sqlVals))
    .catch(err => rej(err))
  })
}

ops.createTable = function() {
  return new Promise((res, rej) => {
    const sqlCreate = `
    CREATE TABLE IF NOT EXISTS
    cods (
      id SERIAL PRIMARY KEY,
       age_range VARCHAR(255),
       benchmark TEXT,
       cause_of_death TEXT,
       expected_deaths VARCHAR,
      hhs_region VARCHAR,
      locality TEXT,
      observed_deaths VARCHAR,
      population VARCHAR,
      potentially_excess_deaths VARCHAR,
      state TEXT,
      state_fips_code TEXT,
      year INTEGER
    );`

    res(
      pool.query(sqlCreate)
      .then(() => console.log('create success'))
      .catch(err => rej(err))
    )
  })
}

pool.on('error', e => console.error(e))

ops.readJSON = (file) => {
  return fsProm.readFileAsync(`${__dirname}/../public/data/${file}`)
  .then(data => JSON.parse(data.toString().trim()))
  .then(fd => fd.map(loadRecord))
  .then(proms => Promise.all(proms))
  .then(() => console.log('files loaded successfully'))
  .catch(err => console.error(err))
}
