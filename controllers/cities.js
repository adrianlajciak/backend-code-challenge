const operations = require('../operations/cities');
const fs = require('fs-extra');

async function getCityByTag(ctx) {
  const input = {
    tag: ctx.query.tag,
    isActive: ctx.query.isActive,
  };
  ctx.body = { cities: await operations.getCityByTag(input)};
  ctx.status = 200;
};

async function getDistance(ctx) {
  const input = {
    from: ctx.query.from,
    to: ctx.query.to,
  };
  results = await operations.getDistance(input);
  ctx.body = {
    from: results.fromCity,
    to: results.toCity,
    unit: 'km',
    distance: results.distance
  };
  ctx.status = 200;
};

async function getArea(ctx) {
  const input = {
    from: ctx.query.from,
    distance: ctx.query.distance,
  };
  const guid = '2152f96f-50c7-4d76-9e18-f7033bd14428';
  ctx.body = {
    resultsUrl: `http://127.0.0.1:8080/area-result/${guid}`
  };
  ctx.status = 202;
};

async function getAreaResults(ctx) {
  const from = 'ed354fef-31d3-44a9-b92f-4a3bd7eb0408';
  const results = await operations.getArea(from);
  ctx.body = {
    cities: results
  };
  ctx.status = 200;
};

async function getAllCities(ctx) {
  const stream = fs.createReadStream('addresses.json');
  ctx.body = stream;
}

module.exports = {
  getCityByTag,
  getDistance,
  getArea,
  getAreaResults,
  getAllCities,
};
