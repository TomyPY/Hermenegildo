var personasRegistradas = JSON.parse(localStorage.getItem("personasRegistradas")) || []

let name = document.getElementById("name") //campo del login NOMBRE
let password = document.getElementById("password") // CAMPO DEL LOGIN CONTRASEÑA

let errorText = document.getElementById("error") // PARTE DEL LOGIN ERROR

let button = document.getElementById("button")  // BUTTON DE INGRESAR
button.addEventListener("click", login)  // CUANDO LE DEN CLICK EJECUTA LA FUNCION

function login(e) {

  let resultado = personasRegistradas.find(objeto => objeto.name === name.value && objeto.pass === password.value) // SI EL NOMBRE Y CONTRASEÑA EXISTEN DEVUELVE ESE OBJETO PERSONA

  if (resultado != undefined) {
    localStorage.setItem("usuarioConectado", JSON.stringify(resultado)) //ALMACENA EN EL LOCAL STORAGE EL OBJETO PERSONA COMO CONECTADO
    window.location.href = "index.html"
  } else {
    Toastify({
      text: "El usuario o la contraseña fueron incorrectos",
      className: "info",
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(90deg, #ff6666, #ff1a1a)",
      }
    }).showToast();
  }
}



