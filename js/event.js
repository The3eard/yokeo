const id = new URLSearchParams(location.search).get('id');

onInit();
function onInit() {
	let param = 'id=' + id + '&user=' + getUser();
	$.get('../php/getName.php', param, makeTitle, 'json');
	$.get('../php/getPlaces.php', param, test, 'json');
}

function makeTitle(json) {
	let title = document.getElementById('eventName');
	title.appendChild(document.createTextNode(json));
}

function test(json) {
	console.log(json);
}
