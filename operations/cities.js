const fs = require('fs-extra');
const data = JSON.parse(fs.readFileSync('addresses.json'));
const { calculateDistance } = require('../utils/calculateDistance');

async function getCityByTag(input) {
  const isActive = input.isActive === 'true';
  let results = data.filter(function (obj) {
    return obj.tags.includes(input.tag) && obj.isActive === isActive;
  });
  return results;
};

async function getDistance(input) {
  const fromCity = data.find(obj => obj.guid === input.from);
  const toCity = data.find(obj => obj.guid === input.to);
  results = {
    fromCity,
    toCity,
    distance: await calculateDistance(fromCity, toCity),
  };
  return results;
};

async function getArea(input) {
  const fromCity = data.find(obj => obj.guid === input);
  let citiesWithinRange = [];
  await Promise.all(
    data
    .filter(city => city.guid !== input)
    .map(async city => {
      const distance = await calculateDistance(fromCity, city);
      if (distance < 250) {
        citiesWithinRange.push(city)
      }
    })
  );
  return citiesWithinRange;
};

module.exports = {
  getCityByTag,
  getDistance,
  getArea,
};
