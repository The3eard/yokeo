/* Initial position */
function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.389193, lng: -5.984478 },
    zoom: 12,
    mapTypeId: 'roadmap',
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('googleMapsNew');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();

    places.forEach(function (place) {
      if (!place.geometry) {
        console.log('Returned place contains no geometry');
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

/* Datos de lugar par aguardar */
function getLocation(dir) {
  /* hay que modificar dir para que sea una llamada a la API de GMaps, eliminamos espacios y solo dejamos las comas */
  $.get(
    'https://maps.googleapis.com/maps/api/geocode/json?address=Sevilla,España&key=AIzaSyC0zOcrKZQiVP6Gmehtx2CQHSfpl9zIEfY',
    extractLatLng,
    'json'
  );
  function extractLatLng(json) {
    var data = [];
    data['lat'] = json.results[0].geometry.location.lat;
    data['lng'] = json.results[0].geometry.location.lng;
    console.log(data);
    /* Pasamos data a la funcion que cree la entrada en DB */
  }
}

$('#datepicker').flatpickr({
  enableTime: true,
  altInput: true,
  time_24hr: true,
  dateFormat: 'Z',
  altFormat: 'd-m-Y, H:i',
});

// document.querySelector('#datepicker').nextElementSibling.value; para la web
// document.querySelector('#datepicker').value; para la DB
