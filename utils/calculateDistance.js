async function calculateDistance(toCity, fromCity) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(toCity.latitude-fromCity.latitude);  // deg2rad below
  const dLon = deg2rad(toCity.longitude-fromCity.longitude);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(fromCity.latitude)) * Math.cos(deg2rad(toCity.latitude)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return Number(d.toFixed(2));

  function deg2rad(deg) {
    return deg * (Math.PI/180);
  };
};

module.exports = {
  calculateDistance,
};
