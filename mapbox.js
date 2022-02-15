mapboxgl.accessToken = 'pk.eyJ1IjoicGFvYWd1aWxhciIsImEiOiJja3puNmIwZjAyYW9iMnVxcndlM2h5azNjIn0.0mzIGK9kk2R8L8C_C3RQbg';

const reverseLocation = async ({ lng, lat }) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place&access_token=pk.eyJ1IjoicGFvYWd1aWxhciIsImEiOiJja3puNmIwZjAyYW9iMnVxcndlM2h5azNjIn0.0mzIGK9kk2R8L8C_C3RQbg`;
    fetch(url).then(response => response.json())
              .then(data => console.log('MAPBOX Info', data.features[0]))
}

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
    reverseLocation(coords)
    mapboxMarker.setLngLat(coords).addTo(mapbox);
})