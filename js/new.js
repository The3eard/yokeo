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
});

/* Creación de evento - nombre */
if (document.querySelector('#nameNextButton') === null) {
} else {
	document.querySelector('#nameNextButton').addEventListener('click', addName);
}

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
var dates = 0;

if (document.querySelector('#dateNextButton') === null) {
} else {
	document.querySelector('#dateNextButton').addEventListener('click', addDate);
}

function addDate() {
	let toDb = document.querySelector('#datepicker').value;
	if (toDb === '') {
		alert('Introduzca fecha');
	} else {
		let today = new Date();
		let DD = String(today.getDate()).padStart(2, '0');
		let MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let YYYY = today.getFullYear();
		let HH = today.getHours();
		let mm = today.getMinutes();
		today = YYYY + '-' + MM + '-' + DD + ' ' + HH + ':' + mm;
		if (today < toDb) {
			dates++;
			let toDom = document.querySelector('#datepicker').nextElementSibling
				.value;
			event.preventDefault();
			let param = 'id=' + getId() + '&date=' + toDb + '&mostrar=' + toDom;
			$.post('../php/addDate.php', param, voteDate, 'json');
		} else {
			alert('Añada una fecha válida');
		}
	}
}

function voteDate(json) {
	check(json);
	let param = 'id=' + json.id + '&user=' + getUser();
	$.post('../php/addDateVoted.php', param, finishDate, 'json');
}

function finishDate(json) {
	check(json);
	if (dates === 0) {
		alert('Introduzca una fecha para poder continuar');
	} else {
		next('#formNewDateDiv', '#formNewObjDiv');
	}
}
/* Creación de evento - Objetos */

if (document.querySelector('#objNextButton') === null) {
} else {
	document.querySelector('#objNextButton').addEventListener('click', addObj);
}

function addObj() {
	let obj = document.querySelector('#formNewObjTxt').value;
	if (obj === '') {
		finishObj(0);
	} else {
		event.preventDefault();
		let param = 'id=' + getId() + '&obj=' + obj;
		document.querySelector('#formNewObjTxt').value = '';
		$.post('../php/addObj.php', param, voteObj, 'json');
	}
}

function voteObj(json) {
	check(json);
	let param = 'id=' + json.id + '&user=' + getUser();
	$.post('../php/addObjVoted.php', param, finishObj, 'json');
}

function finishObj(json) {
	if (json === 0) {
	} else {
		check(json);
	}
	next('#formNewObjDiv', '.formMap');
}

/* Creación de evento - Lugar */

if (document.querySelector('#finishQuantumatic') === null) {
} else {
	document
		.querySelector('#finishQuantumatic')
		.addEventListener('click', getLocation);
}

var places = 0;

function getLocation() {
	let dir = document.querySelector('#googleMapsNew').value;
	if (dir === '') {
		alert('Introduzca Lugar');
	} else {
		$.get(
			'https://maps.googleapis.com/maps/api/geocode/json?address=' +
				dir +
				'&key=AIzaSyC0zOcrKZQiVP6Gmehtx2CQHSfpl9zIEfY',
			addPlace,
			'json'
		);
	}
}

function addPlace(json) {
	places++;
	let lat = json.results[0].geometry.location.lat;
	let lng = json.results[0].geometry.location.lng;
	let name = json.results[0].formatted_address;
	event.preventDefault();
	console.log(lat + lng + name);
	let param = 'id=' + getId() + '&name=' + name + '&lat=' + lat + '&lng=' + lng;
	$.post('../php/addPlace.php', param, votePlace, 'json');
}

function votePlace(json) {
	check(json);
	let param = 'id=' + json.id + '&user=' + getUser();
	$.post('../php/addPlaceVoted.php', param, finishPlaces, 'json');
}

function finishPlaces() {
	if (places === 0) {
		event.preventDefault();
		alert('Debe añadir una localización');
	} else {
		alert('Ha creado su evento correctamente');
		toIndex();
	}
}

/* Funciones comunes */
function next(currentDiv, nextDiv) {
	let current = document.querySelectorAll(currentDiv);
	let next = document.querySelectorAll(nextDiv);
	current.forEach(element => (element.style.display = 'none'));
	next.forEach(element => (element.style.display = 'block'));
}

function check(json) {
	if (json.error === 1) {
		alert('ERROR');
		toIndex();
	}
}
