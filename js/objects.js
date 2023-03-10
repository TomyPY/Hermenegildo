//********************
//EN ESTE ARCHIVO SE ENCUENTRAN TODOS LOS OBJETOS QUE SERAN UTILIZADOS
//******************* 

//CONTADOR DE USUARIOS QUE ENTRARON A LA PAGINA
let totalPersonas = localStorage.getItem("totalPersonas") || 1

//CONTADOR PELICULAS TOTALES DISPONIBLES
let totalPeliculas = localStorage.getItem("totalPeliculas") || 0

//CREA LOS OBJETOS PARA LAS PERSONAS QUE SE REGISTRAN
function Persona(name, surname, pass, mail) {
    this.name = name
    this.surname = surname
    this.pass = pass
    this.mail = mail
    this.id = totalPersonas++
    localStorage.setItem("totalPersonas", totalPersonas)
}

//FUNCION CONSTRUCTORA PARA TODAS LAS PELICULAS DE LA PAGINA
class Pelicula {

    constructor(name, genre, releaseDate, rating, duration, img, video, description) {
        this.id = totalPeliculas++
        this.name = name
        this.genre = genre.split(", ")
        this.releaseDate = releaseDate
        this.rating = rating
        this.duration = duration
        this.img = img
        this.video = video
        this.description = description
        this.comments = []
    }

    mostrarRating() {
        return `El rating es de: ${this.rating}`
    }

    mostrarNombre() {
        return `Nombre: ${this.name}`
    }

    mostraredadApta() {
        return `La edad maxima para ver esta pelicula es: ${this.suitableAge}`
    }

    mostrarfechaEstreno() {
        return `La fecha de estreno es de: ${this.releaseDate}`
    }

    mostrarDuracion() {
        return `Esta pelicula dura: ${this.duration}`
    }

    mostrarPelicula() {
        return `Nombre:${this.name}\nGenero:${this.genre}\n Edad apta:${this.suitableAge}\n Fecha de Estreno:${this.releaseDate}\n Rating:${this.rating}\nDuracion:${this.duration}\n`
    }

    mostrarPeliculaConID() {
        return `ID:${totalPeliculas}\nNombre:${this.name}\nGenero:${this.genre}\n Edad apta:${this.suitableAge}\n Fecha de Estreno:${this.releaseDate}\n Rating:${this.rating}\nDuracion:${this.duration}`
    }
}

//ARRAY CON LOS NOMBRES DE LAS PELICULAS QUE SERAN BUSCADAS EN LA API DE IMDB Y LUEGO AGREGADAS AL ARRAY PELICULAS
movieNames = ["Cars 3", "Inception", "Batman vs Superman", "La bella y la bestia", "Avengers", "Black Panther", "The Grudge", "Annabelle", "Forrest Gump", "Gladiator", "Luca", "Jurassic World",
    "Coraline", "The Lion King", "Coco", "Shrek", "The Nightmare Before Christmas", "WALL-E", "The conjuring", "The shining", "The Curious Case of Benjamin Button", "Scarface", "Fight Club",
    "The Wolf of Wall Street", "Castaway", "Rocky", "Good Will Hunting", "The witch", "Malignant", "Paranormal Activity", "Oculus", "Interestelar", "Moonfall", "Lightyear", "TOP GUN: MAVERICK", "parasite",
    "jojo rabbit", "get out", "Logan", "Batman begins", "Mad Max: fury road", "The shape of water", "moonlight", "inglourious basterds", "up", "district 9", "blade runner 2049", "life of pi", "the others",
    "1917", "little women", "the lord of the rings", "v for vendetta", "inside out", "iron man", "avatar", "Wonder woman", "cars 2", "cars", "toy story", "toy story 2", "toy story 3", "toy story 4"]

//SI EL ARRAY DE PELICULAS NO EXISTE LO CREA Y LO SUBE AL STORAGE
if (!localStorage.getItem("peliculas")) {
    const peliculas = []
    let counter = 0
    movieNames.forEach((name) => {
        counter++
        fetch(`http://www.omdbapi.com/?apikey=3f719f93&t=${name.replace(/ /g, "-")}&plot=full`)
            .then(response => response.json())
            .then(response => {
                let movie = response
                let video = 'example.com'
                peliculas.push(new Pelicula(movie.Title, movie.Genre, movie.Released, movie.imdbRating, movie.Runtime, movie.Poster, video, movie.Plot))
                if (counter == movieNames.length) {
                    localStorage.setItem("peliculas", JSON.stringify(peliculas))
                }
            })
            .catch(err => console.error(err))
    })
}
