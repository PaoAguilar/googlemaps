mapboxgl.accessToken = 'pk.eyJ1IjoicGFvYWd1aWxhciIsImEiOiJja3puNmIwZjAyYW9iMnVxcndlM2h5azNjIn0.0mzIGK9kk2R8L8C_C3RQbg';

const mapbox = new mapboxgl.Map({
    container: 'mapbox', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});