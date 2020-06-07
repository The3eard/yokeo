const id = new URLSearchParams(location.search).get('id');
const invite = new URLSearchParams(location.search).get('invite');
const user = getUser();

onInit();
function onInit() {
	if (user === '') {
		alert('Regístrese para poder acceder al servicio');
		toIndex();
	} else if (invite) {
		console.log('añadir al evento');
	} else {
		let param = 'id=' + id + '&user=' + user;
		console.log(param);
		$.get('../php/getName.php', param, makeTitle, 'json');
		$.get('../php/getDates.php', param, makeDatesList, 'json');
		$.get('../php/getObjs.php', param, makeObjsList, 'json');
		$.get('../php/getPlaces.php', param, makePlacesList, 'json');
	}
}

/*
 * Nombre de evento
 */
var title = document.getElementById('eventName');
function makeTitle(json) {
	title.appendChild(document.createTextNode(json));
}

/*
 * Fechas
 */
function makeDatesList(json) {
	let div = document.querySelector('#eventDates');
	for (let e in json) {
		let checkbox = document.createElement('input');
		let label = document.createElement('label');
		let fecha = json[e]['fecha'];
		let votos = json[e]['votos'];
		let id = json[e]['id'];
		let votado;
		if (json[e]['votado'] === null) {
			votado = false;
		} else {
			votado = true;
		}
		checkbox.type = 'checkbox';
		checkbox.name = fecha;
		checkbox.checked = votado;
		checkbox.id = 'id' + id;
		checkbox.classList = 'mr-1';
		checkbox.setAttribute('onclick', 'updateDates(' + id + ')');
		label.htmlFor = id;
		label.appendChild(document.createTextNode(fecha + ', ' + votos + ' votos'));
		div.appendChild(checkbox);
		div.appendChild(label);
		let br = document.createElement('br');
		div.appendChild(checkbox);
		div.appendChild(label);
		div.appendChild(br);
	}
}

function updateDates(id) {
	let update;
	if (document.querySelector('#id' + id).checked) {
		update = 1;
	} else {
		update = 0;
	}
	let param = 'id=' + id + '&user=' + user + '&update=' + update;
	$.post('../php/updateDates.php', param, checkThis, 'json');
}

document.querySelector('#addDate').addEventListener('click', addDateInEvent);

function addDateInEvent() {
	let toDb = document.querySelector('#datepicker').value;
	if (toDb === '') {
		alert('Introduzca fecha');
	} else {
		let today = new Date();
		let DD = String(today.getDate()).padStart(2, '0');
		let MM = String(today.getMonth() + 1).padStart(2, '0'); //Enero es 0!
		let YYYY = today.getFullYear();
		let HH = today.getHours();
		let mm = today.getMinutes();
		today = YYYY + '-' + MM + '-' + DD + ' ' + HH + ':' + mm;
		if (today < toDb) {
			dates++;
			let toDom = document.querySelector('#datepicker').nextElementSibling
				.value;
			event.preventDefault();
			let param = 'id=' + id + '&date=' + toDb + '&mostrar=' + toDom;
			$.post('../php/addDate.php', param, checkThis, 'json');
		} else {
			alert('Añada una fecha válida');
		}
	}
}

/*
 * Objetos
 */
function makeObjsList(json) {
	let div = document.querySelector('#eventObjs');
	for (let e in json) {
		let checkbox = document.createElement('input');
		let label = document.createElement('label');
		let objeto = json[e]['nombre'];
		let user = json[e]['user'];
		let idObj = json[e]['id'];
		let asignado;
		if (json[e]['user'] === null) {
			asignado = false;
			label.appendChild(document.createTextNode(objeto));
		} else {
			asignado = true;
			label.appendChild(document.createTextNode(objeto + ' (' + user + ')'));
		}
		checkbox.type = 'checkbox';
		checkbox.checked = asignado;
		checkbox.id = 'id' + idObj;
		checkbox.classList = 'mr-1';
		checkbox.setAttribute('onclick', 'updateObjs(' + idObj + ')');
		label.htmlFor = idObj;
		div.appendChild(checkbox);
		div.appendChild(label);
		let br = document.createElement('br');
		div.appendChild(checkbox);
		div.appendChild(label);
		div.appendChild(br);
	}
}

function updateObjs(id) {
	let update;
	if (document.querySelector('#id' + id).checked) {
		update = 1;
	} else {
		update = 0;
	}
	let param = 'id=' + id + '&user=' + user + '&update=' + update;
	$.post('../php/updateObjs.php', param, checkThis, 'json');
}

document.querySelector('#addObj').addEventListener('click', addObjInEvent);

function addObjInEvent() {
	let obj = document.querySelector('#formNewObj').value;
	if (obj === '') {
		alert('Introduzca objeto');
	} else {
		let param = 'id=' + id + '&obj=' + obj;
		$.post('../php/addObj.php', param, checkThis, 'json');
	}
}

/*
 * Lugares
 */
function makePlacesList(json) {
	let div = document.querySelector('#eventPlaces');
	for (let e in json) {
		let checkbox = document.createElement('input');
		let label = document.createElement('label');
		let lugar = json[e]['lugar'];
		let votos = json[e]['votos'];
		let id = json[e]['id'];
		let votado;
		if (json[e]['votado'] === null) {
			votado = false;
		} else {
			votado = true;
		}
		checkbox.type = 'checkbox';
		checkbox.name = lugar;
		checkbox.checked = votado;
		checkbox.id = 'id' + id;
		checkbox.classList = 'mr-1';
		checkbox.setAttribute('onclick', 'updatePlace(' + id + ')');
		label.htmlFor = id;
		label.appendChild(document.createTextNode(lugar + ', ' + votos + ' votos'));
		div.appendChild(checkbox);
		div.appendChild(label);
		let br = document.createElement('br');
		div.appendChild(checkbox);
		div.appendChild(label);
		div.appendChild(br);
	}
}

function updatePlace(id) {
	let update;
	if (document.querySelector('#id' + id).checked) {
		update = 1;
	} else {
		update = 0;
	}
	let param = 'id=' + id + '&user=' + user + '&update=' + update;
	$.post('../php/updatePlaces.php', param, checkThis, 'json');
}

document
	.querySelector('#addPlace')
	.addEventListener('click', getLocationInEvent);

var placesN = 0;

function getLocationInEvent() {
	let dir = document.querySelector('#googleMapsNew').value;
	if (dir === '') {
		alert('Introduzca Lugar');
	} else {
		$.get(
			'https://maps.googleapis.com/maps/api/geocode/json?address=' +
				dir +
				'&key=AIzaSyC0zOcrKZQiVP6Gmehtx2CQHSfpl9zIEfY',
			addPlaceInEvent,
			'json'
		);
	}
}

function addPlaceInEvent(json) {
	placesN++;
	let lat = json.results[0].geometry.location.lat;
	let lng = json.results[0].geometry.location.lng;
	let name = json.results[0].formatted_address;
	event.preventDefault();
	let param = 'id=' + id + '&name=' + name + '&lat=' + lat + '&lng=' + lng;
	$.post('../php/addPlace.php', param, checkThis, 'json');
}

/* Check global */
function checkThis(json) {
	console.log(json);
	if (json.error === 0) {
		alert('Su petición se ha procesado correctamente');
		location.reload();
	} else {
		alert(
			'Ha habido un problema con su petición, vuelva a intentarlo mas tarde'
		);
	}
}

/* Send mail functions */
var eventName;
var assistants;
var dates;
var places;
function sendMail() {
	$.get('../php/sendMail.php', checkThis, 'json');
}
