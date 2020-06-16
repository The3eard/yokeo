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
	let today = new Date();
	let DD = String(today.getDate()).padStart(2, '0');
	let MM = String(today.getMonth() + 1).padStart(2, '0'); //Enero es 0!
	let YYYY = today.getFullYear();
	let HH = today.getHours();
	let mm = today.getMinutes();
	today = YYYY + '-' + MM + '-' + DD + ' ' + HH + ':' + mm;
	for (let element in json) {
		if (json[element]['date'] < today) {
		} else {
			addEventToIndex(
				json[element]['nombre'],
				json[element]['lugar'],
				json[element]['asistentes'],
				json[element]['id']
			);
		}
	}
}

function goToEvent(id) {
	// 	window.location.replace('../html/event.html?id=' + id);
	window.location.replace('../../yokeo/html/event.html?id=' + id);
}

function addEventToIndex(name, place, people, id) {
	let global = document.querySelector('#myEvents');
	let divCard = document.createElement('div');
	divCard.classList.add('card');
	divCard.classList.add('bg-light');
	divCard.classList.add('border-info');
	divCard.classList.add('col-md-8');
	divCard.classList.add('col-12');
	divCard.classList.add('mb-2');
	let divContent = document.createElement('div');
	divContent.classList.add('card-body');
	let tittle = document.createElement('h4');
	tittle.appendChild(document.createTextNode(name));
	tittle.classList.add('card-tittle');

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
	button.setAttribute('id', 'evento' + id);
	button.setAttribute('onclick', 'goToEvent(' + id + ')');
	divContent.appendChild(tittle);
	divContent.appendChild(lugar);
	divContent.appendChild(asists);
	divContent.appendChild(button);
	divCard.appendChild(divContent);
	global.appendChild(divCard);
}
