import { fetchPlaceholders } from '../../scripts/aem.js';
export default async function decorate(block) {
  const [titleEl, fylTextEl, dylTextEl] = block.children;
  const title = titleEl?.textContent?.trim();
  const fylText = fylTextEl?.textContent?.trim();
  const dylText = dylTextEl?.textContent?.trim();

  block.innerHTML = `
          <button class="location-btn">
              Delhi
          </button>
          <div class="geo-location">
              <p class="geo-location__text">${title}</p>
              <div class="detect-location">
                  <p class="find-location__text">${fylText}</p>
                  <p class="separator">or</p>
                  <div class="detect-location__cta">
                  <p class="detect-location__text">
                      ${dylText}
                  </p>
              </div>
          </div>
      `;
  function processData(data) {
    const citiesObject = data.reduce((acc, item) => {
      acc[item.cityDesc] = {
        cityDesc: item.cityDesc,
        cityCode: item.cityCode,
        latitude: item.latitude,
        longitude: item.longitude,
        forCode: item.forCode,
      };
      return acc;
    }, {});
    return citiesObject;
  }
  const { apiKey, authorization } = await fetchPlaceholders();
  const defaultHeaders = {
    'x-api-key': apiKey,
    'Authorization': authorization,
  };

  const urlWithParams = 'https://api.preprod.developersatmarutisuzuki.in/dms/v1/api/common/msil/dms/dealer-only-cities?channel=EXC';
  const response = await fetch(urlWithParams, { method: 'GET', headers: defaultHeaders });
  const result = await response.json();
  const filteredData = result?.data?.filter((obj) => obj.cityDesc !== null);
  const citiesObject = processData(filteredData);
  const locationButton = block.querySelector('.location-btn');
  const geoLocationDiv = block.querySelector('.geo-location');
  const detectLocationCTA = block.querySelector('.detect-location__cta');

  // Function to calculate distance between two points using Haversine formula
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos((lat1 * Math.PI) / 180)
      * Math.cos((lat2 * Math.PI) / 180)
      * Math.sin(dLon / 2)
      * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }
  // Function to auto-select the nearest city based on user's location
  function autoSelectNearestCity(latitude, longitude) {
    let nearestCity = null;
    let minDistance = Infinity;

    // Iterating over all cities and logging latitude and longitude
    Object.keys(citiesObject).forEach((cityName) => {
      const cityLatitude = citiesObject[cityName].latitude;
      const cityLongitude = citiesObject[cityName].longitude;
      const distance = calculateDistance(latitude, longitude, cityLatitude, cityLongitude);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = cityName;
      }
    });
    // Update the nearest city in the dropdown
    const location = block.querySelector('.location-btn');
    location.innerHTML = nearestCity;
  }
  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    autoSelectNearestCity(lat, lon);
  }
  function requestLocationPermission() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          showPosition(position);
        },
      );
    }
  }

  locationButton.addEventListener('click', () => {
    if (
      geoLocationDiv.style.display === 'none'
      || geoLocationDiv.style.display === ''
    ) {
      geoLocationDiv.style.display = 'block';
    } else {
      geoLocationDiv.style.display = 'none';
    }
  });
  detectLocationCTA.addEventListener('click', () => {
    geoLocationDiv.style.display = 'none';
    requestLocationPermission();
  });
}