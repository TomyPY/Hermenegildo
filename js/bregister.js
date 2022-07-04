var personasRegistradas=JSON.parse(localStorage.getItem("personasRegistradas")) || []
let name=document.getElementById("name")
let surname=document.getElementById("surname")
let mail=document.getElementById("mail")
let pass=document.getElementById("password")
let passCheck=document.getElementById("passwordCheck")
let errorText=document.getElementById("error")

let btn=document.getElementById("btn")
btn.addEventListener("click", checkFields)

function checkFields(e){

    e.preventDefault()

    if(isNaN(name.value)){
        if(isNaN(surname.value)){
                if(pass.value==passCheck.value){
                    if(isNaN(mail.value)){
                        const usuario=new Persona(name.value, surname.value, pass.value, mail.value)
                        personasRegistradas.push(usuario)
                        localStorage.setItem("personasRegistradas", JSON.stringify(personasRegistradas))
                        alert("¡Registrado correctamente!")
                        window.location.href="login.html"
                    }else{
                        Toastify({
                            text: "El campo mail tiene que tener letras",
                            className: "info",
                            gravity: "top", // `top` or `bottom`
                            position: "center", // `left`, `center` or `right`
                            style: {
                              background: "linear-gradient(90deg, #ff6666, #ff1a1a)",
                            }
                          }).showToast();
                    }
                }else{
                    Toastify({
                        text: "Las contraseñas no son identicas",
                        className: "info",
                        gravity: "top", // `top` or `bottom`
                        position: "center", // `left`, `center` or `right`
                        style: {
                          background: "linear-gradient(90deg, #ff6666, #ff1a1a)",
                        }
                      }).showToast();
                }
        }else{
            Toastify({
                text: "El campo apellido tiene que tener letras",
                className: "info",
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                style: {
                  background: "linear-gradient(90deg, #ff6666, #ff1a1a)",
                }
              }).showToast();
        }
    }else{
        Toastify({
            text: "El campo nombre debe tener letras",
            className: "info",
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(90deg, #ff6666, #ff1a1a)",
            }
          }).showToast();
    }

}

