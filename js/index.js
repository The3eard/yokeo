navbar();

document.querySelector("#logOutBtn").addEventListener("click", logOut);

function toIndex() {
	// ! Cambiar condición del if cuando esté colgado en el servidor
	if (window.location.pathname === "/yokeo/index.html") {
		location = "index.html";
	} else {
		location = "../index.html";
	}
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function delCookie() {
	setCookie("user", "", 1);
}

function navbar() {
	let wLog = document.querySelectorAll(".wLog");
	let woLog = document.querySelectorAll(".woLog");
	if (getCookie("user") === "") {
		wLog.forEach((element) => (element.style.display = "none"));
		woLog.forEach((element) => (element.style.display = "block"));
		console.log("sin login");
	} else {
		wLog.forEach((element) => (element.style.display = "block"));
		woLog.forEach((element) => (element.style.display = "none"));
		console.log("con login");
	}
}

function logOut() {
	delCookie();
	toIndex();
}
