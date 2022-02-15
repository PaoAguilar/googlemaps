mapboxgl.accessToken = 'pk.eyJ1IjoicGFvYWd1aWxhciIsImEiOiJja3puNmIwZjAyYW9iMnVxcndlM2h5azNjIn0.0mzIGK9kk2R8L8C_C3RQbg';

const reverseLocation = async ({ lng, lat }) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place&access_token=pk.eyJ1IjoicGFvYWd1aWxhciIsImEiOiJja3puNmIwZjAyYW9iMnVxcndlM2h5azNjIn0.0mzIGK9kk2R8L8C_C3RQbg`;
    const res = await fetch(url)
    const data = await res.json();
    return data
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

const mapbox = new mapboxgl.Map({
    container: 'mapbox', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-89.23082947704344, 13.694517743321262], // starting position [lng, lat]
    zoom: 7
});

const mapboxMarker = new mapboxgl.Marker()
mapboxMarker.remove();

mapbox.on('click', (e) => {
    const coords = e.lngLat
    const res = reverseLocation(coords)
    res.then((result) => {
        console.log('MAPBOX Info', result)
        responseMapbox.innerText = JSON.stringify(result, null, 2);
    })
    mapboxMarker.setLngLat(coords).addTo(mapbox);
})