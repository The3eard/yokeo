/* uso de cookies para usuario */
/* regex usuario /[a-zA-Z][a-zA-Z0-9-_]{5,20}/gi */
/* regex mail /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi*/

document
  .querySelector("#formRegAccept")
  .addEventListener("click", compruebaUsuario);

function compruebaUsuario() {
  let user = document.querySelector("#formRegUser").value.trim();
  let mail = document.querySelector("#formRegMail").value.trim();
  let regexUser = /[a-zA-Z][a-zA-Z0-9-_]{5,20}/gi;
  let regexMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
  if (regexUser.test(user)) {
    if (regexMail.test(mail)) {
      console.log("hasta aqui1");
      altaUserDb(user, mail);
    } else {
      alert("Introduzca una dirección de correo electrónico válida");
    }
  } else {
    alert("Introduzca un nombre de usuario válido");
  }
}
function altaUserDb(user, mail) {
  console.log("hasta aqui2");
  param = "user=" + user + "&mail=" + mail;
  $.post("../php/registro.php", param, respuestaAltaUser, "json");
}

function respuestaAltaUser(json) {
  console.log(json);
  if (json.error) {
    alert(json.mensaje);
  } else {
    alert(json.mensaje);
    /*     frmInsertClienteFrm.reset();
    $("#frmInsertCliente").hide("normal"); */
  }
}
