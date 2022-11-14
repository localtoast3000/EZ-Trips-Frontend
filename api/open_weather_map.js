const baseUrl = 'http://api.openweathermap.org/geo/1.0/direct';
const appId = '7cecadeb80528d114d059361830568c1';
const iso = require('iso-3166-1');

function constructURL(endpoint) {
  return `${baseUrl}${endpoint}`;
}

export async function getPositionData(city, country) {
  const countryCode = iso.whereCountry(country).alpha2;
  const res = await fetch(constructURL(`?q=${city},${countryCode}&appid=${appId}`));
  const data = await res.json();
  return data;
}
