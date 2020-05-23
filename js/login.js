document
  .querySelector('#formLogAccept')
  .addEventListener('click', compruebaUsuario);

function compruebaUsuario() {
  let mail = document.querySelector('#formLogMail').value.trim();
  let regexMail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
  if (regexMail.test(mail)) {
    logUser(mail);
  } else {
    alert('Introduzca una dirección de correo electrónico válida');
    return false;
  }
}

function logUser(mail) {
  param = 'mail=' + mail;
  console.log('consulta');
  event.preventDefault();
  $.get('../php/login.php', param, respuestaLogUser, 'json');
  return false;
}

function respuestaLogUser(json) {
  if (json == 0) {
    alert('la dirección de email no se corresponde con ningún usuario');
  } else {
    console.log(json);
    setCookie(json, 30);
  }
}
