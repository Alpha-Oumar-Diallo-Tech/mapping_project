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
const detail_modal = document.querySelector (".detail_modal")
const detail_modal_content = document.querySelector (".detail_modal_content")
const stop_modal = document.querySelector (".modal_container")
const no_btn = document.querySelector (".unconfirm_btn")

class App {
// app data
    #university = new Array ()
    #school = new Array ()
    #hospital = new Array ()
    #bookCase = new Array ()
    #all_app_data = new Array ()

// marker
    #marker
    #marker_event

// popup
    #popup

    #map
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
// beta version






    data_separation (datas) {
        this.#hospital = datas.filter (data => data.category === "hospital")
        this.#university = datas.filter (data => data.category === "university")
        this.#school = datas.filter (data => data.category === "ecole")
        this.#bookCase = datas.filter (data => data.category === "bibliotèque")
        this.#all_app_data = [this.#hospital, this.#university, this.#school, this.#bookCase]
    }

    hospital_management_function () {
        console.log (this.#hospital)
        this.#hospital.forEach (data => {
            const {
                name, 
                category, 
                city, 
                district, 
                founder, 
                year_established, 
                coordinates: {
                    latitude, 
                    longitude
                }, 
                contact: {
                    phone, 
                    email
                }, services
            } = data
            const popup_content = this.popupContent (name, category)
            this.show_indicator (latitude, longitude, popup_content)
            if (this.check_marker_loading ()) {
                console.log ("je suis un génie")
                this.popup_customize (category)
            } else {
                console.log ("bil gate")
            }
            

            
            console.log (
            name, 
            category, 
            city, 
            district, 
            founder, 
            year_established, 
            latitude, 
            longitude, 
            phone, 
            email, 
            services)
        })
        
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
        // this._get_initial_app_data ("hospital_data.json")
        this._get_initial_app_data ("app_data.json")
    }
    async _get_initial_app_data (json_file) {
        try {
            const json_data = await fetch (json_file)
            if (!json_data.ok) {
                throw new Error("Erreur");
            }
            const data = await json_data.json ()
            this.data_separation (data)
            this.hospital_management_function ()
            // this.destructure_data (data)
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
        return my_popup_content
    }
    destructure_data (data) {
        data.forEach(data => {
            const {name, category, city, district, contact : {phone = "non définis"} = "non précis", coordinates : {latitude, longitude}} = data
            const popup_content = this.popupContent (name, category)
            this.show_indicator (latitude, longitude, popup_content, name, category, city, district, phone)
        })
        
    }
    show_indicator (latitude, longitude, popup_content) {
        this.#marker = L.marker([latitude, longitude]).addTo(this.#map)
        this.#marker.bindPopup(popup_content,
            {
                autoClose: false,
                closeOnClick: false
            }
        )
        this.#marker.openPopup();
    }
    check_marker_loading () {
        this.#marker.on("popupopen", (e) => {
            this.#marker_event = e
            if (this.#popup) {
                console.log ("sa marche")
                return true
            } else {
                console.log ("sa marche pas")
                return false
            }
            // this.popup_customize (category, popup)
            // this.check_marker_click (lat, lng, popup, name, category, city, district, phone)
        })
        this.#popup = this.#marker_event.popup.getElement().querySelector (".leaflet-popup-content-wrapper")
        console.log (this.#popup)
        // return true
    }
    check_marker_click (lat, lng, popup, name, category, city, district, phone) {
        popup.addEventListener ("click", () => {
            this.show_modal (lat, lng, name, category, city, district, phone)
            this.modal_customise (category)
        })
    }

    modal_customise (category) {
        switch (category) {
            case "hospital":
                detail_modal_content.style.backgroundColor = "red"
                detail_modal_content.style.color = "white"
                break;
            case "university":
                detail_modal_content.style.backgroundColor = "blue"
                detail_modal_content.style.color = "white"
                break;
            case "ecole":
                detail_modal_content.style.backgroundColor = "yellow"
                detail_modal_content.style.color = "black"
                break;
            case "bookcase":
                detail_modal_content.style.backgroundColor = "green"
                detail_modal_content.style.color = "white"
                break;
            default:
                popup.style.backgroundColor  = "white";
                popup.style.color  = "black";
                popup.style.opacity  = "0.8";
                break;
        }
    }

    popup_customize (category) {
        switch (category) {
            case "hospital":
                this.#popup.style.backgroundColor  = "red";
                this.#popup.style.color  = "white";
                this.#popup.style.opacity  = "0.8";
                break;
            case "university":
                this.#popup.style.backgroundColor  = "blue";
                this.#popup.style.color  = "white";
                this.#popup.style.opacity  = "0.8";
                break;
            case "ecole":
                this.#popup.style.backgroundColor  = "yellow";
                this.#popup.style.color  = "black";
                this.#popup.style.opacity  = "0.8";
                break;
            case "bookcase":
                this.#popup.style.backgroundColor  = "green";
                this.#popup.style.color  = "white";
                this.#popup.style.opacity  = "0.8";
                break;
            default:
                this.#popup.style.backgroundColor  = "white";
                this.#popup.style.color  = "black";
                this.#popup.style.opacity  = "0.8";
                break;
        }
    }

    map_click () {
        this.#map.on ("click", (e) => {
            const {lat, lng} = e.latlng
            console.log (lat, lng)
            L.marker([lat,lng])
            .addTo(map)
            .bindPopup(
                L.popup({
                    minWidth:250,
                    maxWidth:100,
                    autoClose: false,
                    closeOnClick:false,
                    // className: 
                })
            )
            .setPopupContent('workout')
            .openPopup();

            // this.showMap (lat, lng, 3)
            if (detail_modal.classList.contains ("not")) {
                confirm_modal.classList.remove ("not")
            } else {
                detail_modal.classList.add ("not")
            }
            
        }, function () {
            console.log ("erreur")
        })

        ////////////////////////////////
       
       
       //////////////////////////////
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
    show_modal (lat, lng, name, category, city, district, phone) {
        const nom = document.querySelector (".detail_modal_name")
        const categorie = document.querySelector (".detail_modal_category")
        const addresse = document.querySelector (".detail_modal_addresse")
        const telephone = document.querySelector (".detail_modal_telephone")
        if (detail_modal.classList.contains ("not")) {
            detail_modal.classList.remove ("not")
            nom.textContent = name
            categorie.textContent = category
            addresse.textContent = `Addresse: ${city}, ${district}`
            telephone.textContent = phone
            console.log (name)
            console.log ("hello")
            // this.showMap (lat, lng, 3)
        } else {
            nom.textContent = name
            categorie.textContent = category
            addresse.textContent = `Addresse: ${city}, ${district}`
            telephone.textContent = phone
        }
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