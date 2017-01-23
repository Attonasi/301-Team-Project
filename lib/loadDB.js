'use strict'

const bluebird = require('bluebird')
const fsProm = bluebird.promisifyAll(require('fs'))
const pg = require('pg')
const Pool = pg.Pool
const ops = module.exports = {}

const pool = new Pool({
  user: process.env.USER,
  password: '',
  host: 'localhost',
  database: process.env.USER,
  max: 10,
  idleTimeoutMillis: 1000
})

const loadRecord = function(record) {
  const sqlVals = [
    record.age_range,
    record.benchmark,
    record.cause_of_death,
    record.expected_deaths,
    record.hhs_region,
    record.locality,
    record.observed_deaths,
    record.population,
    record.potentially_excess_deaths,
    record.state,
    record.state_fips_code,
    record.year
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
       cause_of_death TEXT NOT NULL,
       expected_deaths FLOAT NOT NULL,
      hhs_region INTEGER,
      locality TEXT,
      observed_deaths INTEGER NOT NULL,
      population INTEGER NOT NULL,
      potentially_excess_deaths FLOAT,
      state TEXT NOT NULL,
      state_fips_code TEXT NOT NULL,
      year INTEGER NOT NULL
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
