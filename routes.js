const Router = require('koa-router');
const { authenticate } = require('./middleware/authentication');
const cities = require('./controllers/cities');

const router = new Router();

// cities by tag
router.get('/cities-by-tag', authenticate, cities.getCityByTag);

// distance between 2 cities
router.get('/distance', authenticate, cities.getDistance);

// all cities within area
router.get('/area', authenticate, cities.getArea);

// results - all cities within area
router.get('/area-result/:guid', authenticate, cities.getAreaResults);

// all cities
router.get('/all-cities', authenticate, cities.getAllCities);

module.exports = router.routes();
