"use strict"

class Infrastructure {
    constructor (categorie, nom, quartier, role, coords) {
        this.categorie = categorie
        this.nom = nom
        this.quartier = quartier
        this.role = role
        this.coords = coords
    }
}

class App {
    #map
    #map_event
    #infrastructure
    #infrastructure_data = new Array ()
    constructor () {
        this.showMap ()
        this._get_initial_app_data ()
        // this.add_data ()
    }
    showMap () {
        const guinea = [10.973549898080215, -10.973549898080215]
        this.#map = L.map('map').setView(guinea, 7.5);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
    }
    async _get_initial_app_data () {
        try {
            let data = await fetch ("app_data.json")
            if (!data.ok) {
                throw new Error("Erreur");
            }
            data = await data.json ()
            console.log (data)
            this.add_data (data)
        } catch (error) {
            console.log (error)
        }
    }
    add_data (array) {
        array.forEach(infras => {
            // console.log (infras.coordonee.latitude)
            const {latitude, longitude} = infras.coordonee
            this.showIndicator (latitude, longitude)
        });
    }
    showIndicator (...coords) {
        L.marker(coords).addTo(this.#map)
            .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            .openPopup();
    }
    
}

new App ()

// map.on ("click", function (e) {
//     console.log (e)
// }, () => {
//     console.log ("erreur")
// })

// file reader ()







// const map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
//     .openPopup();

// map.on ("click", function (e) {
//     console.log (e)
// }, function () {
//     console.log ("erreur")
// })