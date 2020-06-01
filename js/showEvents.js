if (getUser() === '') {
	document.querySelector('#welcome').style.display = 'block';
	document.querySelector('#events').style.display = 'none';
} else {
	onInit();
	document.querySelector('#welcome').style.display = 'none';
	document.querySelector('#events').style.display = 'block';
}
function onInit() {
	let param = 'user=' + getUser();
	$.get('./php/getEvents.php', param, createEventDiv, 'json');
}

function createEventDiv(json) {
	console.log(json);
	json.forEach(event => {
		console.log(event);
		// addEventToIndex(event.nombre, event.fecha, event.lugar, event.asistentes);
	});
}

function addEventToIndex(name, date, place, people) {
	let global = document.querySelector('#myEvents');
	let divCard = document.createElement('div');
	divCard.classList.add('card');
	divCard.classList.add('bg-light');
	divCard.classList.add('border-info');
	divCard.classList.add('col-md-8');
	divCard.classList.add('col-12');
	let divContent = document.createElement('div');
	divContent.classList.add('card-body');
	let tittle = document.createElement('h4');
	tittle.appendChild(document.createTextNode(name));
	tittle.classList.add('card-tittle');
	let fecha = document.createElement('p');
	fecha.appendChild(document.createTextNode('Fecha: ' + date));
	fecha.classList.add('card-text');
	fecha.classList.add('mt-3');
	let lugar = document.createElement('p');
	lugar.appendChild(document.createTextNode('Lugar: ' + place));
	lugar.classList.add('card-text');
	let asists = document.createElement('p');
	asists.appendChild(document.createTextNode('Asistentes: ' + people));
	asists.classList.add('card-text');
	let button = document.createElement('button');
	button.appendChild(document.createTextNode('Acceder'));
	button.classList.add('btn');
	button.classList.add('float-right');
	button.classList.add('btn-primary');
	button.setAttribute('id', 'evento' + '123');
	button.setAttribute('onclick', 'goToEvent(' + '123' + ')');
	divContent.appendChild(tittle);
	divContent.appendChild(fecha);
	divContent.appendChild(lugar);
	divContent.appendChild(asists);
	divContent.appendChild(button);
	divCard.appendChild(divContent);
	global.appendChild(divCard);
}
