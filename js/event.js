const id = new URLSearchParams(location.search).get('id');
const user = getUser();

onInit();
function onInit() {
	let param = 'id=' + id + '&user=' + user;
	$.get('../php/getName.php', param, makeTitle, 'json');
	$.get('../php/getDates.php', param, makeDatesList, 'json');
	$.get('../php/getObjs.php', param, makeObjsList, 'json');
}

/*
 * Nombre de evento
 */
function makeTitle(json) {
	let title = document.getElementById('eventName');
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
			$.post('../php/addDate.php', param, voteDateInEvent, 'json');
		} else {
			alert('Añada una fecha válida');
		}
	}
}

function voteDateInEvent(json) {
	check(json);
	let param = 'id=' + json.id + '&user=' + user;
	$.post('../php/addDateVoted.php', param, checkThis, 'json');
}

/*
 * Objetos
 */
function makeObjsList(json) {
	console.log(json);
	let div = document.querySelector('#eventObjs');
	for (let e in json) {
		let checkbox = document.createElement('input');
		let label = document.createElement('label');
		let objeto = json[e]['nombre'];
		let user = json[e]['user'];
		let idObj = json[e]['id'];
		console.log(idObj);
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

/* Extras */
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
