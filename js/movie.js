let peliculas=JSON.parse(localStorage.getItem("peliculas")) //TODAS LAS PELICULAS

//SI HAY UN USUARIO CONECTADO SE CREA UNA VARIABLE CON EL NOMBRE, SI NO, ES ANONYMOUS
if(localStorage.getItem("usuarioConectado")){
    let user=JSON.parse(localStorage.getItem("usuarioConectado"))
    var userName=`${user.name} ${user.surname}`
}else{
    var userName="Anonymous"
    
}

//FUNCION PARA OBTENER EL METADATO QUE NECESITO DE LA URL
function getParameter(parameterName){
    let parameters= new URLSearchParams(window.location.search)
    return parameters.get(parameterName)
}

//ELEMENTOS QUE NECESITO DEL HTML
let title=document.getElementsByClassName("title-movie")
let img=document.querySelector(".container-img img")
let description=document.querySelector(".container-info p")
let sendButton=document.getElementsByClassName("send-comment")

//DEFINO LA VARIABLE DEL METADATO PRODUCTID
let productID=getParameter("productID")

//BUCLE POR TODAS LAS PELICULAS BUSCANDO EL QUE TIENE EL MISMO PRODUCT ID CUANDO LO ENCUENTRA LE ASIGNA A LOS ELEMENTOS HTML SUS CARACTERISTICAS
for(pelicula of peliculas){
    if(pelicula.id==productID){
        title[0].innerText=pelicula.name
        img.setAttribute("src", `${pelicula.img}`)
        img.style.overflow="hidden"
        document.getElementsByClassName("info-stats-genre")[0].innerText=`Genre: ${pelicula.genre[0].name}`
        document.getElementsByClassName("info-stats-date")[0].innerText=`Release date: ${pelicula.releaseDate}`
        document.getElementsByClassName("info-stats-rating")[0].innerText=`Rating: ${pelicula.rating}`
        document.getElementsByClassName("info-stats-long")[0].innerText=`Duration: ${pelicula.duration} minutes`
        description.innerText=pelicula.description
        document.getElementsByClassName("preview-movie")[0].innerText=`Movie-${pelicula.releaseDate.split("-")[0]}-${pelicula.genre[0].name}`

        for(let i=0;i<=(pelicula.genre.length)-1;i++){
                
                let genre=JSON.stringify(pelicula.genre[i])
                let genreBox=document.createElement("div")
                let genreName=document.createElement("h3")
                genreBox.classList.add("genre-box")
                genreName.innerText=pelicula.genre[i]
                genreBox.appendChild(genreName)
                document.getElementsByClassName("container-genres")[0].appendChild(genreBox)
            }
        document.getElementsByClassName("video-link")[0]
        break
    }
}

//NOMBRE EN LA SECCION DE COMENTARIO
document.getElementsByClassName("connected-user")[0].innerText=userName

//GUARDO UN NUEVO COMENTARIO
document.getElementsByClassName("send-comment")[0].addEventListener("click", ()=>{
    let comment=document.getElementsByClassName("comment-text")[0].value

    if(!localStorage.getItem("usuarioConectado")){

        Toastify({
            text: "Debes loguearte primero",
            className: "info",
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
            background: "linear-gradient(90deg, #ff6666, #ff1a1a)",
            }
        }).showToast();

    }else{
        if(comment!=""){
            pelicula.comments.push({userName, comment})
            localStorage.setItem("peliculas", JSON.stringify(peliculas))
            location.reload()
        }else{
            Toastify({
                text: "El campo no debe estar vacio",
                className: "info",
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                style: {
                background: "linear-gradient(90deg, #ff6666, #ff1a1a)",
                }
            }).showToast();
        }
    }
})

//CREO LOS ELEMENTOS PARA LOS COMENTARIOS GUARDADOS
if(pelicula.comments.length>0){
    let commentsContainer=document.getElementsByClassName("comments-container")[0]
    for(comment of pelicula.comments){
        let fullBoxer=document.createElement("div")
        fullBoxer.classList.add("full-boxer")
        let commentUser=document.createElement("div")
        commentUser.classList.add("comment-user")
        let boxTop=document.createElement("div")
        boxTop.classList.add("box-top")
        let profile=document.createElement("div")
        profile.classList.add("profile")
        let profileImg=document.createElement("div")
        profileImg.classList.add("profile-image")
        let imga=document.createElement("img",)
        imga.setAttribute("src", "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png")
        profileImg.appendChild(imga)
        profile.appendChild(profileImg)
        let profileName=document.createElement("div")
        profileName.classList.add("profile-name")
        let str=document.createElement("strong")
        str.innerText=comment.userName
        profileName.appendChild(str)
        profile.appendChild(profileName)
        boxTop.appendChild(profile)
        let commentView=document.createElement("div")
        commentView.classList.add("box-comment-view")
        let commentText=document.createElement("p")
        commentText.classList.add("comment-text")
        commentText.innerText=comment.comment
        commentView.appendChild(commentText)
        commentUser.appendChild(boxTop)
        commentUser.appendChild(commentView)
        fullBoxer.appendChild(commentUser)
        commentsContainer.appendChild(commentUser)
    }
}