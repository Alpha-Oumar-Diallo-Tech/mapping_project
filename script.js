// "use strict"


class Infrastructure {
    constructor (categorie, nom, quartier, role, coords) {
        this.categorie = categorie
        this.nom = nom
        this.quartier = quartier
        this.role = role
        this.coords = coords
    }
}

const confirm_modal = document.querySelector (".modal")
const stop_modal = document.querySelector (".modal_container")
const no_btn = document.querySelector (".unconfirm_btn")

class App {
    #map
    #marqueur
    #map_event
    #infrastructure
    #infrastructure_data = new Array ()
    #state
    constructor () {
        this.guineaLat = 10.973549898080215
        this.guineaLon = -10.973549898080215
        // this.showMap (this.guineaLat, this.guineaLon,7.5)
        this.get_all_initial_data ()
        this.map_click ()
        this.no_click ()
    }
    showMap (lat, long, zoom) {
        const guinea = [lat, long]
        this.#map = L.map('map').setView(guinea, zoom);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
    }
    get_all_initial_data () {
        this.showMap (this.guineaLat, this.guineaLon, 7.5)
        this._get_initial_app_data ("hospital_data.json")
        this._get_initial_app_data ("app_data.json")
    }
    async _get_initial_app_data (json_file) {
        try {
            const json_data = await fetch (json_file)
            if (!json_data.ok) {
                throw new Error("Erreur");
            }
            const data = await json_data.json ()
            this.destructure_data (data)
        } catch (error) {
            console.log (error)
        }
    }
    popupContent (name, category) {
        const my_popup_content = `
            <div class = "popup_container">
                <h1 class = "popup_title">${name}</h1>
                <span class = "popup_categorie">${category}</span>
                <button class = "popup_button">en savoir plus</button>
            </div>
        `
        const learn_more = document.querySelector (".popup_button")
        console.log (learn_more)
        return my_popup_content
    }
    destructure_data (data) {
        data.forEach(data => {
            const {name, category, coordinates : {latitude, longitude}} = data
            const popup_content = this.popupContent (name, category)
            this.show_indicator (latitude, longitude, popup_content, category)
        })
        
    }
    show_indicator (latitude, longitude, popup_content, category) {
        const marqueur = L.marker([latitude, longitude]).addTo(this.#map)
        marqueur.bindPopup(popup_content,
            {
                autoClose: false,
                closeOnClick: false
            }
        )
        this.check_marker_loading (marqueur, category)
        marqueur.openPopup();
    }
    check_marker_loading (marqueur, category) {
        marqueur.on("popupopen", function (e) {
            const popup = e.popup.getElement().querySelector (".leaflet-popup-content-wrapper")
            
            // this.check_marker_click (me)
            switch (category) {
                case "hospital":
                    popup.style.backgroundColor  = "red";
                    popup.style.color  = "white";
                    popup.style.opacity  = "0.8";
                    break;
                case "university":
                    popup.style.backgroundColor  = "blue";
                    popup.style.color  = "white";
                    popup.style.opacity  = "0.8";
                    break;
                case "ecole":
                    popup.style.backgroundColor  = "yellow";
                    popup.style.color  = "black";
                    popup.style.opacity  = "0.8";
                    break;
                case "bookcase":
                    popup.style.backgroundColor  = "green";
                    popup.style.color  = "white";
                    popup.style.opacity  = "0.8";
                    break;
                default:
                    popup.style.backgroundColor  = "white";
                    popup.style.color  = "black";
                    popup.style.opacity  = "0.8";
                    break;
            }
        })
    }
    check_marker_click (pop) {
        pop.addEventListener ("popupclick", function () {
            const modal = this.show_modal ()
            console.log ("success")
        })
    }

// fonction qui devrait prendre mais qui prend pas, mais qui va voir (avec sa grosse tête là)
    popup_customize (category) {
        let pop = document.querySelector (".leaflet-popup-content-wrapper")
        switch (category) {
            case "hospital":
                pop.style.backgroundColor  = "blue";
                break;
            case "university":
                pop.style.backgroundColor  = "red";
                break;
            default:
                pop.style.backgroundColor  = "white";
                break;
        }
    }

    map_click () {
        this.#map.on ("click", function (e) {
            const {lat, lng} = e.latlng
            console.log (lat, lng)
            // this.showMap (lat, lng, 3)
            confirm_modal.classList.remove ("not")
        }, function () {
            console.log ("erreur")
        })
    }
    no_click () {
        no_btn.addEventListener ("click", function () {
            confirm_modal.classList.add ("not")
        })
        confirm_modal.addEventListener ("click", function () {
            confirm_modal.classList.add ("not")
        })
        stop_modal.addEventListener ("click", function (e) {
            e.stopPropagation ()
        })
    }
    show_modal () {
        const modal = `
            <div>
                <div>

                </div>
            </div>
        `
        return modal
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