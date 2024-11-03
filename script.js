"use strict"



const confirm_modal = document.querySelector (".modal")
const detail_modal = document.querySelector (".detail_modal")
const detail_modal_close = document.querySelector (".detail_modal_close")
const detail_modal_content = document.querySelector (".detail_modal_content")
const stop_modal = document.querySelector (".modal_container")
const no_btn = document.querySelector (".unconfirm_btn")
const oui_btn = document.querySelector (".confirm_btn")

const formulaire = document.querySelector (".form_section")
const stop_form_close_propagation = document.querySelector (".form-container")
const close_form = document.querySelector (".form_modal_close")
const rest_of_the_form = document.querySelector (".form_input_scroll")
const submit_form = document.querySelector (".submit_form")

const nom = document.querySelector (".nom")
const typee = document.querySelector (".type")
const ville = document.querySelector (".city")
const quartier = document.querySelector (".district")
const telephone = document.querySelector (".phone")
const mail = document.querySelector (".email")
const fondateur = document.querySelector (".founder")
const annee_de_fondation = document.querySelector (".year_of_foundation")
const checkbox = document.querySelector (".checkbox")

const university = document.querySelector (".departement")
const service_hopital = document.querySelector (".hopital_service")
const bibliotheque_service = document.querySelector (".bibliotheque_service")
const ecole_niveau = document.querySelector (".ecole")

const departement_input = document.querySelector (".departement_input")
const hopital_input = document.querySelector (".hopital_input")
const bibliotheque_input = document.querySelector (".bibliothèque_input")
const ecole_input = document.querySelector (".ecole_input")

const infrastructure_type = document.querySelector (".infrastructure_type")

const infrastructure_modal = document.querySelector (".infrastructure_modal")

class Infrastructure {
    #marker
    #popup
    constructor (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email) {
        this.map = map
        this.latitude = latitude
        this.longitude = longitude
        this.name = name
        this.category = category
        this.type = type
        this.city = city
        this.district = district
        this.founder = founder
        this.year_established = year_established
        this.phone = phone
        this.email = email
        this.show_indicator ()
        this.close_modal ()
    }
    
    show_indicator () {
        const popup_content = this._popupContent ()
        this.#marker = L.marker ([this.latitude, this.longitude]).addTo(this.map)
        this.#marker.bindPopup(popup_content,
            {
                autoClose: false,
                closeOnClick: false
            }
        )
        this.check_marker_loading ()
        this.#marker.openPopup ();
    }
    _popupContent () {
        const my_popup_content = `
            <div class = "popup_container">
                <h1 class = "popup_title">${this.name}</h1>
            </div>
        `
        return my_popup_content
    }
    check_marker_loading () {
        this.#marker.on("popupopen", (e) => {
            this.#popup = e.popup.getElement ().querySelector (".leaflet-popup-content-wrapper")
            this._popup_customize ()
            this._check_marker_click ()
        })
    }
    _popup_customize () {
        switch (this.category) {
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
    _check_marker_click () {
        this.#popup.addEventListener ("click", () => {
            this.show_modal ()
            this.modal_customise ()
        })
    }
    show_modal () {
        const nom = document.querySelector (".detail_modal_name")
        const categorie = document.querySelector (".detail_modal_category")
        const type = document.querySelector (".detail_modal_type")
        const addresse = document.querySelector (".detail_modal_addresse")
        const founder = document.querySelector (".detail_modal_founder")
        const year_established = document.querySelector (".detail_modal_year_established")
        const telephone = document.querySelector (".detail_modal_telephone")
        const email = document.querySelector (".detail_modal_email")

        const departement = document.querySelector (".detail_modal_departement")
        const service = document.querySelector (".detail_modal_service")
        const niveau = document.querySelector (".detail_modal_niveau")

        switch (this.category) {
            case "hospital" || "bibliothèque":
                departement.classList.add ("not")
                niveau.classList.add ("not")
                service.textContent = this.service.join (", ")
                break;
            case "university":
                service.classList.add ("not")
                niveau.classList.add ("not")
                departement.textContent = this.departement.join (", ")
                break;
            case "ecole":
                service.classList.add ("not")
                departement.classList.add ("not")
                niveau.textContent = this.niveau.join (", ")
                break;
            default:
                break;
        }

        if (detail_modal.classList.contains ("not")) {
            detail_modal.classList.remove ("not")
            nom.textContent = this.name
            categorie.textContent = `Catégorie: ${this.category}` 
            type.textContent = `Type d'établissement: ${this.type}` 
            addresse.textContent = `Addresse: ${this.city}, ${this.district}`
            founder.textContent = `Fondateur: ${this.founder}`
            year_established.textContent = `Année de fondation: ${this.year_established}` 
            telephone.textContent = `Téléphone: ${this.phone}` 
            email.textContent = `Mail: ${this.email}` 
            service.textContent = `Services: ${this.service}` 
            departement.textContent = `Départements: ${this.departement}` 
            niveau.textContent = `Niveau: ${this.niveau}` 
            console.log (this.name)
            // this.showMap (lat, lng, 3)
        } else {
            nom.textContent = this.name
            categorie.textContent = `Catégorie: ${this.category}` 
            type.textContent = `Type d'établissement: ${this.type}` 
            addresse.textContent = `Addresse: ${this.city}, ${this.district}`
            founder.textContent = `Fondateur: ${this.founder}`
            year_established.textContent = `Année de fondation: ${this.year_established}` 
            telephone.textContent = `Téléphone: ${this.phone}` 
            email.textContent = `Mail: ${this.email}` 
            service.textContent = `Services: ${this.service}` 
            departement.textContent = `Départements: ${this.departement}` 
            niveau.textContent = `Niveau: ${this.niveau}` 
        }
    }
    modal_customise () {
        switch (this.category) {
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
    close_modal () {
        detail_modal_close.addEventListener ("click", () => {
            detail_modal.classList.add ("not")
        })
    }
}

class University extends Infrastructure {
    constructor (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, departement) {
        super (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
        this.departement = departement
    }
}

class Hospital extends Infrastructure {
    constructor (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, service) {
        super (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
        this.service = service
    }
}

class School extends Infrastructure {
    constructor (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, niveau) {
        super (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
        this.niveau = niveau
    }
}

class Book_Case extends Infrastructure {
    constructor (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, service) {
        super (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
        this.service = service
    }
}


class App {
// app data
    #base_university = new Array ()
    #base_school = new Array ()
    #base_hospital = new Array ()
    #base_bookCase = new Array ()
    #all_app_data = new Array ()

// map
    #map

// coordoné du click
    #latitude
    #longitude

    constructor () {
        this.guineaLat = 10.973549898080215
        this.guineaLon = -10.973549898080215

        this.showMap (this.guineaLat, this.guineaLon, 7.5)
        this._get_initial_app_data ("app_data.json")

        this.map_click ()
        this.no_click ()
        this.show_form ()
    }






    data_separation (datas) {
        this.#base_hospital = datas.filter (data => data.category === "hospital")
        this.#base_university = datas.filter (data => data.category === "university")
        this.#base_school = datas.filter (data => data.category === "ecole")
        this.#base_bookCase = datas.filter (data => data.category === "bibliotèque")
        this.#all_app_data = [this.#base_hospital, this.#base_university, this.#base_school, this.#base_bookCase]
        this.show_data ()
    }

    hospital_management_function () {
        this.#base_hospital.forEach (data => {
            const {
                name, 
                category,
                type, 
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
                }, service
            } = data
            new Hospital (this.#map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, service)
        })
    }
    University_management_function () {
        this.#base_university.forEach (data => {
            const {
                name, 
                category,
                type, 
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
                }, service
            } = data
            new University (this.#map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, service)
        })
    }
    school_management_function () {
        this.#base_school.forEach (data => {
            const {
                name, 
                category,
                type, 
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
                }, niveau
            } = data
            new School (this.#map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, niveau)
        })
    }
    bookcase_management_function () {
        this.#base_bookCase.forEach (data => {
            const {
                name, 
                category,
                type, 
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
                }, service
            } = data
            new Book_Case (this.#map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, service)
        })
    }

    showMap (lat, long, zoom) {
        const guinea = [lat, long]
        this.#map = L.map('map').setView(guinea, zoom);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
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
            this.school_management_function ()
        } catch (error) {
            console.log (error)
        }
    }

    map_click () {
        this.#map.on ("click", (e) => {
            const {lat, lng} = e.latlng
            this.#latitude = lat
            this.#longitude = lng
            console.log (lat, lng)
            if (detail_modal.classList.contains ("not")) {
                confirm_modal.classList.remove ("not")
            } else {
                detail_modal.classList.add ("not")
            }
            this.form_management (this.#map)
        }, function () {
            console.log ("erreur")
        })
        
    }

    form_management (map) {
        submit_form.addEventListener ("submit", (e) => {
            e.preventDefault ()
            const name = nom.value
            const type = typee.value
            const city = ville.value
            const district = quartier.value
            const phone = telephone.value
            const email = mail.value
            const founder = fondateur.value
            const year_established = annee_de_fondation.value
            const departement = university.value
            const hospital_service = service_hopital.value
            const book_case_service = bibliotheque_service.value
            const niveau = ecole_niveau.value

            switch (infrastructure_type.value) {
                case "hospital":
                    new Hospital (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, hospital_service)
                    break;
                case "university":
                    new University (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, departement)
                    break;
                case "ecole":
                    new School (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, niveau)
                    break;
                case "bookcase":
                    new Book_Case (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, book_case_service)
                    break;
                default:
                    
                    break;
            }
            console.log ("sa prend")
            this.close_form ()
        })
    }

    hide_form () {
        nom.value = ""
        typee.value = ""
        ville.value = ""
        quartier.value = ""
        telephone.value = ""
        mail.value = ""
        fondateur.value = ""
        annee_de_fondation.value = ""
        university.value = ""
        service_hopital.value = ""
        bibliotheque_service.value = ""
        ecole_niveau.value = ""
        checkbox.checked = false
    }

    close_form () {
        this.hide_form ()
        infrastructure_type.value = ""
        rest_of_the_form.classList.add ("not")
        formulaire.classList.add ("not")
    }

    show_form () {
        oui_btn.addEventListener ("click", function () {
            confirm_modal.classList.add ("not")
            formulaire.classList.remove ("not")
        })
        infrastructure_type.addEventListener ("change", (e) => {
            e.preventDefault ()
            switch (infrastructure_type.value) {
                case "hospital":
                    this.hide_form ()
                    hopital_input.classList.remove ("not")
                    departement_input.classList.add ("not")
                    bibliotheque_input.classList.add ("not")
                    ecole_input.classList.add ("not")
                    rest_of_the_form.classList.remove ("not")
                    break;
                case "university":
                    this.hide_form ()
                    departement_input.classList.remove ("not")
                    hopital_input.classList.add ("not")
                    bibliotheque_input.classList.add ("not")
                    ecole_input.classList.add ("not")
                    rest_of_the_form.classList.remove ("not")
                    break;
                case "ecole":
                    this.hide_form ()
                    ecole_input.classList.remove ("not")
                    departement_input.classList.add ("not")
                    bibliotheque_input.classList.add ("not")
                    hopital_input.classList.add ("not")
                    rest_of_the_form.classList.remove ("not")
                    break;
                case "bookcase":
                    this.hide_form ()
                    bibliotheque_input.classList.remove ("not")
                    departement_input.classList.add ("not")
                    hopital_input.classList.add ("not")
                    ecole_input.classList.add ("not")
                    rest_of_the_form.classList.remove ("not")
                    break;
                default:
                    
                    break;
            }
        })
    }

    show_data () {
        console.log (this.#base_university)
        console.log (this.#base_school)
        console.log (this.#base_bookCase)
        console.log (this.#base_hospital)
        infrastructure_modal.insertAdjacentHTML ("afterbegin", "")
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
        close_form.addEventListener ("click", this.close_form.bind (this))
        formulaire.addEventListener ("click", this.close_form.bind (this))
        stop_form_close_propagation.addEventListener ("click", function (e) {
            e.stopPropagation ()
        })
    }
}

new App ()
