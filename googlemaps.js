let map;
let marker;
let geocoder;
let responseDiv;
let response;

const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
const center = { lat: 13.694517743321262, lng:  -89.23082947704344 }

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center,
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();
  marker = new google.maps.Marker({
    map,
  });

  // Insert element into the dom
  const googlemapResponse = document.getElementById("responses");
  response = document.createElement("pre");
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);
  const div = document.getElementById("container");
  insertAfter(div, googlemapResponse)
  googlemapResponse.appendChild(responseDiv);

  // Autocomplete functionality
  const input = document.getElementById("autocomplete");
  const options = {
    fields: ["address_components","formatted_address", "geometry", "name", "place_id", "plus_code", "types"],
    strictBounds: false,
    types: ["establishment"],
  };
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    console.log('GOOGLEMAPS INFO', place)

    response.innerText = JSON.stringify(place, null, 2);

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    marker.setPosition(place.geometry.location);
    marker.setMap(map);
  });

// GET INFO WHEN CLICK DE MAP
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
    marker.setPosition(e.latLng);
    marker.setMap(map);
  });
  clear();
}

function clear() {
  marker.setMap(null);
}

function geocode(request) {
  clear();
  geocoder
    .geocode(request)
    .then((result) => {
      const { results } = result;
      console.log('GOOGLE MAPS Info', results)
      
      response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}