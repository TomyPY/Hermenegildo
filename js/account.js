let buttonLogIn = document.getElementById("login") //BOTON LOG IN

//SI HAY UN USUARIO LOGUEADO:
//CAMBIA EL BOTON DE LOG IN DE LA PAGINA PRINCIPAL A LOG OUT
if (localStorage.getItem("usuarioConectado")) {
    buttonLogIn.innerText = "Log Out"
    buttonLogIn.setAttribute("href", "#")
} else {
    buttonLogIn.innerText = "Log In"
    buttonLogIn.setAttribute("href", "login.html")
}

//SI LE VUELVEN A DAR CLICK EL USUARIO SE DESCONECTA
buttonLogIn.addEventListener("click", (e) => {
    if (buttonLogIn.innerText == "Log Out") {
        localStorage.removeItem("usuarioConectado")
        location.reload()
    }
})
