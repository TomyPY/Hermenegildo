let peliculas=JSON.parse(localStorage.getItem("peliculas")) || []

window.onload=()=>{
    generateSlider("animation", peliculas)
}

const allmovieList=document.getElementsByClassName("movie-list") //LISTA CON TODOS LOS SLIDERS
const movieListContainer=document.getElementsByClassName("movie-list-container")
const slidersContainer=document.getElementsByClassName("sliders-container")[0]
const arrows=document.querySelectorAll(".arrow")

//FUNCION PARA SABER LAS PELICULAS CON MAYOR RATING
function verCatalogoRating(peliculas){
    let catalogoOrdenado = peliculas.sort(((a, b) => b.rating - a.rating))
    let movies=catalogoOrdenado.slice(0, 8) //DE TODAS LAS PELICULAS SOLO AGARRO 8
    return movies
}

//Funcion para organizar las peliculas por genero
function verCatalogoGenero(peliculas, genre){
    let peliculasgenre=[]
    if(genre=='drama' || (genre).toLowerCase()=='animation' || genre=='fiction' || genre=='horror' || genre=="action"){

        peliculasgenre=peliculas.filter((pelicula)=>{
            for(gen of pelicula.genre){
                if((gen.name).toLowerCase().includes(genre)){
                    return (pelicula)
                }
                
            }
        })
    }
    return peliculasgenre
}

//GENERAR SLIDER EN HTML
function generateSlider(genre, peliculas){
    const movieList=document.getElementsByClassName(`movie-list-${genre}`)[0]
    movieList.innerHTML=""

    for(container of movieListContainer){
        container.classList.add("hide")
    }

    document.getElementsByClassName(`movie-list-container-${genre}`)[0].classList.remove("hide")

    if(genre=="rating"){
        var moviesGenre=verCatalogoRating(peliculas)
    }else{
        var moviesGenre=verCatalogoGenero(peliculas, genre)
    }
    
    
    for(object of moviesGenre){
        let movieListItem=document.createElement("div")
        movieListItem.classList.add("movie-list-item")
        let img=document.createElement("img")
        img.classList.add("movie-list-item-img")
        img.setAttribute("src", `${object.img}`)
        let spanTitle=document.createElement("span")
        spanTitle.classList.add("movie-list-item-title")
        spanTitle.innerText=`${object.name}`
        let button=document.createElement("button")
        button.classList.add("movie-list-item-button")
        button.innerText="Ver mas"
        button.setAttribute("onclick", `window.location.href='movie.html?productID=${object.id}'`)

        movieListItem.appendChild(img)
        movieListItem.appendChild(spanTitle)
        movieListItem.appendChild(button)
        movieList.appendChild(movieListItem)
}

}

document.getElementsByClassName("animation-panel")[0].addEventListener("click", ()=>{
    generateSlider("animation", peliculas)
})

document.getElementsByClassName("horror-panel")[0].addEventListener("click", ()=>{
    generateSlider("horror", peliculas)
})

document.getElementsByClassName("drama-panel")[0].addEventListener("click", ()=>{
    generateSlider("drama", peliculas)
})

document.getElementsByClassName("rating-panel")[0].addEventListener("click", ()=>{
    generateSlider("rating", peliculas)
})

document.getElementsByClassName("fiction-panel")[0].addEventListener("click", ()=>{
    generateSlider("fiction", peliculas)
})

//Funcion para que los sliders puedan girar con la flecha
    arrows.forEach((arrow, i) => {
        let clickCounter=0
        arrow.addEventListener("click", ()=>{
            const numberImg=allmovieList[i].querySelectorAll("img").length
            clickCounter++
            if(numberImg - (4+clickCounter)>=0){
                allmovieList[i].style.transform=`translateX(${allmovieList[i].computedStyleMap().get("transform")[0].x.value-300
            }px)`
            }else{
                clickCounter=0
                allmovieList[i].style.transform="translateX(0)"
            }
    });
    })