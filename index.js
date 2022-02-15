let map;
let marker;
let geocoder;
let responseDiv;
let response;

const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 13.694517743321262, lng:  -89.23082947704344 },
    mapTypeControl: false,
  });
  geocoder = new google.maps.Geocoder();
  
  // Insert element into the dom
  const googlemapResponse = document.getElementById("responses");
  response = document.createElement("pre");
  responseDiv = document.createElement("div");
  responseDiv.id = "response-container";
  responseDiv.appendChild(response);
  const div = document.getElementById("container");
  insertAfter(div, googlemapResponse)
  googlemapResponse.appendChild(responseDiv);

  marker = new google.maps.Marker({
    map,
  });
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
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
      marker.setPosition(results[0].geometry.location);
      marker.setMap(map);
      response.innerText = JSON.stringify(result, null, 2);
      return results;
    })
    .catch((e) => {
      alert("Geocode was not successful for the following reason: " + e);
    });
}