var peliculas=JSON.parse(localStorage.getItem("peliculas"))
var buttonAll=document.getElementsByClassName("button-filter-all")[0]
var buttonDrama=document.getElementsByClassName("button-filter-drama")[0]
var buttonHorror=document.getElementsByClassName("button-filter-horror")[0]
var buttonAdventure=document.getElementsByClassName("button-filter-adventure")[0]
var buttonAction=document.getElementsByClassName("button-filter-action")[0]
var buttonAnimation=document.getElementsByClassName("button-filter-animation")[0]

//FUNCION PARA FILTRAR PELICULAS CON LOS BOTONES
function filterMovies(parameter){
    console.log("hola")
    let buttons=document.querySelectorAll("button-value")
    buttons.forEach((button)=>{
        if(parameter==(button.innerText).toLowerCase()){
            button.classList.add("active")
        }else{
            button.classList.remove("active")
        }
    })

    let elements = document.querySelectorAll(".card")
    
    elements.forEach((element)=>{
        if(parameter=="all"){
            element.classList.remove("hide")
        }else{
            if(element.classList.contains(parameter)){
                element.classList.remove("hide")
            }else{
                element.classList.add("hide")
            }
        }
    })
}

//POR DEFECTO APLICA EL FILTRO ALL
window.onload=()=>{
    filterMovies("all")
}

//CREO LAS CARDS PARA CADA PELICULA
for(pelicula of peliculas){
    let card=document.createElement("div")
    if(pelicula.genre[0].name=="Family" || pelicula.genre[0].name=="Fantasy"){
        pelicula.genre[0].name="Animation"
    }else if(pelicula.genre[0].name=="Crime"){
        pelicula.genre[0].name="Drama"
    }
    card.classList.add("card", ((pelicula.genre[0].name).toLowerCase()).replace(" ", ""), "hide")
    let imgContainer=document.createElement("div")
    imgContainer.classList.add("image-container")
    let image_link=document.createElement("a")
    image_link.setAttribute("href", `movie.html?productID=${pelicula.id}`)
    let image = document.createElement("img")
    image.setAttribute("src", `${pelicula.img}`)
    image_link.appendChild(image)
    imgContainer.appendChild(image_link)
    card.appendChild(imgContainer)
    let container=document.createElement("div")
    container.classList.add("container")
    let name=document.createElement("a")
    name.classList.add(`movie-name`)
    let nameContainer=document.createElement("h5")
    name.setAttribute("href", `movie.html?productID=${pelicula.id}`)
    name.innerText= pelicula.name
    nameContainer.appendChild(name)
    nameContainer.classList.add("name-container")

    container.appendChild(nameContainer)
    card.appendChild(container)
    document.getElementById("products").appendChild(card)
}

buttonAll.addEventListener("click", ()=>{filterMovies("all")})
buttonDrama.addEventListener("click", ()=>{filterMovies("drama")})
buttonHorror.addEventListener("click", ()=>{filterMovies("horror")})
buttonAdventure.addEventListener("click", ()=>{filterMovies("adventure")})
buttonAction.addEventListener("click", ()=>{filterMovies("action")})
buttonAnimation.addEventListener("click", ()=>{filterMovies("animation")})

//MUESTRA TODAS LAS PELICULAS QUE INCLUYAN LA PALABRA QUE BUSCASTE
document.getElementById("search").addEventListener("click", ()=>{
    //BARRA DE BUSQUEDA
    let searchInput=document.getElementsByClassName("nav__explore")[0].value
    //NOMBRES PELICULAS
    let elements=document.querySelectorAll(".movie-name")
    let cards=document.querySelectorAll(".card")

    elements.forEach((element, index)=>{
        //SI CONTIENE LA PALABRA LE REMUEVE EL CLASSLIST "HIDE" SI NO SE LO AÑADE
        if(((element.innerText).toLowerCase()).includes(searchInput.toLowerCase())){
            cards[index].classList.remove("hide")
        }else{
            cards[index].classList.add("hide")
        }
    })
})



