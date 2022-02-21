let responseDiv;
let response;
let marker;
// Initialize and add the map
function initMap() {
    const coordinates = { lat: 13.694517743321262, lng:  -89.23082947704344 };
    const mapCanvas = document.getElementById('map');
    const mapOptions = {
        center: coordinates,
        zoom: 13,
    }

    map = new google.maps.Map(mapCanvas, mapOptions);
    // nuevo
    response = document.createElement("pre");
    response.id = "response";
    response.innerText = "";
    responseDiv = document.createElement("div");
    responseDiv.id = "response-container";
    responseDiv.appendChild(response);

    map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
    map.addListener("click", (e) => {
        geocode({ location: e.latLng });
      });

    
    // fin de lo nuevo

    console.log('map', map)
    addMarker(coordinates, map)

    // map.addListener('click',function(event) {
    //     addMarker(event.latLng, 'Click Generated Marker', map);
    // })
}

function clear() {
    marker.setMap(null);
    responseDiv.style.display = "none";
  }

function handleEvent(event) {
    document.getElementById('lat').value = event.latLng.lat();
    document.getElementById('lng').value = event.latLng.lng();
}

function addMarker(latlng, map) {
    const marker = new google.maps.Marker({
        position: latlng,
        map,
        draggable: true
    });

    // marker.addListener('drag', handleEvent);
    marker.addListener('dragend', (e) => {
        const Newlat = map.getCenter().lat();
        console.log('Newlat',Newlat);
    });
}

function geocode(request) {
    clear();
    geocoder
      .geocode(request)
      .then((result) => {
        const { results } = result;
  
        map.setCenter(results[0].geometry.location);
        marker.setPosition(results[0].geometry.location);
        marker.setMap(map);
        responseDiv.style.display = "block";
        response.innerText = JSON.stringify(result, null, 2);
        return results;
      })
      .catch((e) => {
        alert("Geocode was not successful for the following reason: " + e);
      });
  }