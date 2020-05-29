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

/* Datos de lugar para aguardar */
function getLocation(dir) {
	$.get(
		'https://maps.googleapis.com/maps/api/geocode/json?address=' +
			dir +
			'&key=AIzaSyC0zOcrKZQiVP6Gmehtx2CQHSfpl9zIEfY',
		extractLatLng,
		'json'
	);
	function extractLatLng(json) {
		let lat = json.results[0].geometry.location.lat;
		let lng = json.results[0].geometry.location.lng;
		let name = json.results[0].formatted_address;
		/**
		 * Pasamos data a la funcion que cree la entrada en DB
		 */
	}
}

/**
 * DateTimePicker insert y config
 */

flatpickr.localize(flatpickr.l10ns.es);
$('#datepicker').flatpickr({
	enableTime: true,
	altInput: true,
	time_24hr: true,
	dateFormat: 'Y-m-d H:i:S',
	altFormat: 'l, d \\de F \\de Y, \\a \\l\\a\\s H:i \\h\\o\\r\\a\\s',
	parseDate: true,
	/**
	 * Acceso a datos
	 * document.querySelector('#datepicker').nextElementSibling.value; para la web
	 * document.querySelector('#datepicker').value; para la DB
	 */
});

/* Creación de evento - nombre */

document.querySelector('#nameNextButton').addEventListener('click', addName);

function addName() {
	let regex = /[a-zA-Z][a-zA-Z0-9-\s-.-]{5,32}/gi;
	let name = document.querySelector('#formNewName').value.trim();
	if (regex.test(name)) {
		let eventParams = 'name=' + name;
		let regex = /[a-zA-Z][a-zA-Z0-9-\s-.-]{5,32}/gi;
		event.preventDefault();
		$.post('../php/newEvent.php', eventParams, responseId, 'json');
	} else {
		alert(
			'Introduzca descripción entre 5 y 32 caracteres alfanuméricos. Se admiten espacios'
		);
	}
	return false;
}
function getId() {
	return localStorage.getItem('id');
}

function clearId() {
	localStorage.clear();
	return true;
}

function responseId(json) {
	localStorage.setItem('id', json.id);
	let userParams = 'user=' + getCookie('user') + '&event=' + json.id;
	$.post('../php/addUserToEvent.php', userParams, check, 'json');
	next('#formNewNameDiv', '#formNewDateDiv');
}

/* Creación de evento - fecha y hora */
var date = 0;
document.querySelector('#formNewCreate').addEventListener('click', addDate);

function addDate() {
	let toDb = document.querySelector('#datepicker').value;
	if (toDb === '') {
		alert('Introduzca fecha');
	} else {
		date++;
		let toDom = document.querySelector('#datepicker').nextElementSibling.value;
		let ul = document.querySelector('#dateList');
		let li = document.createElement('li');
		li.appendChild(document.createTextNode(toDom));
		ul.appendChild(li);
		event.preventDefault();
		let param = 'id=' + getId() + '&date=' + toDb;
		console.log('yo men	');
		$.post('../php/addDate.php', param, check, 'json');
	}
}

document.querySelector('#dateNextButton').addEventListener('click', finishDate);

function finishDate() {
	if (date === 0) {
		alert('Introduzca una fecha para poder continuar');
	} else {
		next('#formNewDateDiv', '#formNewObjDiv');
	}
}

function next(currentDiv, nextDiv) {
	let current = document.querySelector(currentDiv);
	let next = document.querySelector(nextDiv);
	current.style.display = 'none';
	next.style.display = 'block';
}

function check(json) {
	if (json.error === 1) {
		alert('ERROR');
		toIndex();
	}
}
