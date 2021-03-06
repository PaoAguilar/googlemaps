mapboxgl.accessToken = 'pk.eyJ1IjoicGFvYWd1aWxhciIsImEiOiJja3puNmIwZjAyYW9iMnVxcndlM2h5azNjIn0.0mzIGK9kk2R8L8C_C3RQbg';

const reverseLocation = async ({ lng, lat }) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoicGFvYWd1aWxhciIsImEiOiJja3puNmIwZjAyYW9iMnVxcndlM2h5azNjIn0.0mzIGK9kk2R8L8C_C3RQbg`;
    const res = await fetch(url)
    const data = await res.json();
    return data
}



navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})
const mapboxMarker = new mapboxgl.Marker()


function successLocation(position) {
  console.log('position', position)
  setUpMapbox([position.coords.longitude, position.coords.latitude])
}
function errorLocation() {
  setUpMapbox([-89.23082947704344, 13.694517743321262])
}

function setUpMapbox(center) {
    // Initialize mapbox Map
    const mapbox = new mapboxgl.Map({
        container: 'mapbox', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: center, // starting position [lng, lat]
        zoom: 14
    });
    // Add initial marker to map
    const coords = {lng: center[0], lat: center[1]}
    mapboxMarker.setLngLat(coords).addTo(mapbox);
    const res = reverseLocation(coords)
        res.then((result) => {
        console.log('MAPBOX Info', result)
        responseMapbox.innerText = JSON.stringify(result, null, 2);
    })

    // Initialize the geocoder
    const mapboxGeocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    // Limit seach results to el salvador.
    countries: 'sv',
    limit: 9
    });
        
    // Add the geocoder to the map (search functionality)
    mapbox.addControl(mapboxGeocoder);
    mapbox.on('load', () => {
    mapboxGeocoder.on('result', (info) => {
        const result = info.result
        const coords = {lng: result.center[0], lat: result.center[1]}
        const res = reverseLocation(coords)
        res.then((result) => {
        console.log('MAPBOX Info', result)
        responseMapbox.innerText = JSON.stringify(result, null, 2);
        })
    });
    })

        // Get address information on click map
    mapbox.on('click', (e) => {
        const coords = e.lngLat
        console.log('COORDS', coords)
        const res = reverseLocation(coords)
        res.then((result) => {
            console.log('MAPBOX Info', result)
            responseMapbox.innerText = JSON.stringify(result, null, 2);
        })
        mapboxMarker.setLngLat(coords).addTo(mapbox);
    })
}

// Insert element into the dom
const mapboxResponse = document.getElementById("responses");
responseMapbox = document.createElement("pre");
mapboxRes = document.createElement("div");
mapboxRes.id = "response-container";
mapboxRes.appendChild(responseMapbox);
const mapboxContainer = document.getElementById("container");
insertAfter(mapboxContainer, mapboxResponse)
mapboxResponse.appendChild(mapboxRes);