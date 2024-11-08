"use strict"


// selection des éléments du modal de confirmation 
const confirm_modal = document.querySelector (".modal")
const stop_modal = document.querySelector (".modal_container")
const no_btn = document.querySelector (".unconfirm_btn")
const oui_btn = document.querySelector (".confirm_btn")

// selection des éléments du modal des détails sur les différents établissements
const detail_modal = document.querySelector (".detail_modal")
const detail_modal_close = document.querySelector (".detail_modal_close")

// selections des éléments du formulaire
const formulaire = document.querySelector (".form_section")
const stop_form_close_propagation = document.querySelector (".form-container")
const close_form = document.querySelector (".form_modal_close")
const rest_of_the_form = document.querySelector (".form_input_scroll")
const submit_form = document.querySelector (".submit_form")

// séléction des champs de saisi du formulaire
const nom = document.querySelector (".nom")
const typee = document.querySelector (".type")
const ville = document.querySelector (".city")
const quartier = document.querySelector (".district")
const telephone = document.querySelector (".phone")
const mail = document.querySelector (".email")
const fondateur = document.querySelector (".founder")
const annee_de_fondation = document.querySelector (".year_of_foundation")
const checkbox = document.querySelector (".checkbox")

// sélection des champs d'erreurs
const globale_error = document.querySelector (".globale_error")

const error_field_unique = document.querySelector (".error_field_unique")

const bookcase_error = document.querySelector (".bookcase_error")
const hospital_error = document.querySelector (".hospital_error")
const school_error = document.querySelector (".school_error")
const university_error = document.querySelector (".university_error")

const contact_error = document.querySelector (".contact_error")

const foundation_year_error = document.querySelector (".foundation_year_error")

const name_error = document.querySelector (".name_error")
const type_error = document.querySelector (".type_error")
const city_error = document.querySelector (".city_error")
const district_error = document.querySelector (".district_error")
const founder_error = document.querySelector (".founder_error")

// séléction des containeurs qui contiennent le label ainsi que le champs de saisi du formulaire qui varient en fonction de la catégorie de l'infrastructure
const university = document.querySelector (".departement")
const service_hopital = document.querySelector (".hopital_service")
const bibliotheque_service = document.querySelector (".bibliotheque_service")
const ecole_niveau = document.querySelector (".ecole")

// sélection des champs de saisie du formulaire qui varient en fonction de la catégorie de l'infrastructure
const departement_input = document.querySelector (".departement_input")
const hopital_input = document.querySelector (".hopital_input")
const bibliotheque_input = document.querySelector (".bibliothèque_input")
const ecole_input = document.querySelector (".ecole_input")

// sélection du champ du formulaire qui gère le choix de la catégorie
const infrastructure_type = document.querySelector (".infrastructure_type")

// sélection du modal qui affiche la liste des infrastructures
const infrastructure_modal = document.querySelector (".infrastructure_modal")

const down_btn = document.getElementById ("download")

const infrastructure_list_interface_btn = document.querySelector (".Infrastructure_list_btn")
const infrastructure_list_interface = document.querySelector (".infrastructure")
const university_list_btn = document.querySelector (".university_btn")
const hospital_list_btn = document.querySelector (".hospital_btn")
const school_list_btn = document.querySelector (".school_btn")
const bookcase_list_btn = document.querySelector (".bookcase_btn")

const infrastructure_modal_close = document.querySelector (".infrastructure_modal_close")

// const all_infrastructure_container = document.querySelector (".")

const university_container = document.querySelector (".university_list")
const hospital_container = document.querySelector (".hospital_list")
const school_container = document.querySelector (".school_list")
const bookcase_container = document.querySelector (".bookcase_list")

// la classe principale qui contient les propriétés communes au quatres types d'infrastructures, ainsi que la logique de gestion des infrastructures
class Infrastructure {
    #marker
    #popup
    #marker_icon
    constructor (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email) {
        this.id = this.generate_Id ()
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
    
    // la méthode qui permet d'afficher le marqueur
    show_indicator () {
        // this.customise_marker () 
        // const greenIcon = L.icon({
        //     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        //     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        //     iconSize:     [38, 95], // size of the icon
        //     shadowSize:   [50, 64], // size of the shadow
        //     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        //     shadowAnchor: [4, 62],  // the same for the shadow
        //     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        // });
        const popup_content = this._popupContent ()
        // const me = this.customise_marker () , {icon: greenIcon}
        // console.log (this.#marker_icon)
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

    // la méthode qui contient le contenue du popup
    _popupContent () {
        const my_popup_content = `
            <div class = "popup_container">
                <h1 class = "popup_title">${this.name}</h1>
            </div>
        `
        return my_popup_content
    }

    // la méthode qui vérifie que le popup est bien ouvert
    check_marker_loading () {
        this.#marker.on("popupopen", (e) => {
            this.#popup = e.popup.getElement ().querySelector (".leaflet-popup-content-wrapper")
            this._popup_customize ()
            this._check_marker_click ()
        })
    }

    // la méthode qui permet de personnaliser le popup en fonction de la catégorie de l'infrastructure
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

    // la méthode qui écoute le clic sur le popup
    _check_marker_click () {
        this.#popup.addEventListener ("click", () => {
            this.show_modal ()
            this.modal_customise ()
        })
    }

    // la méthode qui affiche le modal des détails
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
                service.textContent = this.service
                break;
            case "university":
                service.classList.add ("not")
                niveau.classList.add ("not")
                departement.textContent = this.departement
                break;
            case "ecole":
                service.classList.add ("not")
                departement.classList.add ("not")
                niveau.textContent = this.niveau
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

    // la méthode qui personnalise le modal des détails en fonction de la catégorie de l'infrastructure
    modal_customise () {
        switch (this.category) {
            case "hospital":
                detail_modal.style.backgroundColor = "red"
                detail_modal.style.color = "white"
                break;
            case "university":
                detail_modal.style.backgroundColor = "blue"
                detail_modal.style.color = "white"
                break;
            case "ecole":
                detail_modal.style.backgroundColor = "yellow"
                detail_modal.style.color = "black"
                break;
            case "bookcase":
                detail_modal.style.backgroundColor = "green"
                detail_modal.style.color = "white"
                break;
            default:
                popup.style.backgroundColor  = "white";
                popup.style.color  = "black";
                popup.style.opacity  = "0.8";
                break;
        }
    }

    // la méthode qui ferme le modal
    close_modal () {
        detail_modal_close.addEventListener ("click", () => {
            detail_modal.classList.add ("not")
        })
    }

    simple_property () {
        const all_property = {
            id: this.id,
            latitude: this.latitude,
            longitude: this.longitude,
            name: this.name,
            category: this.category,
            type: this.type,
            city: this.city,
            district: this.district,
            founder: this.founder,
            year_established: this.year_established,
            phone: this.phone,
            email: this.email
        }
        return all_property
    }

    customise_marker () {
        const Marker_customised = L.Icon ({
            Options: {
                iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                iconSize: [100, 200],
                shadowSize: [0, 0],
                iconAnchor: [0, 0],
                popupAnchor: [100, 100]
            }
        })
        const greenIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize:     [38, 95], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });
        // this.#marker_icon = greenIcon
        // const hospital_icon = new Marker_customised ({iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png"})
        // const university_icon = new Marker_customised ({iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png"})
        // const school_icon = new Marker_customised ({iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png"})
        // const bookcase_icon = new Marker_customised ({iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png"})
        // switch (this.category) {
        //     case "hospital":
        //         this.#marker_icon = hospital_icon
        //         break;
        //     case "university":
        //         this.#marker_icon = university_icon
        //         break;
        //     case "ecole":
        //         this.#marker_icon = school_icon
        //         break;
        //     case "bookcase":
        //         this.#marker_icon = bookcase_icon
        //         break;
        //     default:
        //         console.log ("erreur marqueur icon")
        //         break;
        // }
        return greenIcon
    }
    generate_Id () {
        return 'id-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
    }
}

// la classe de l'université qui hérite de la classe infrastructure
class University extends Infrastructure {
    constructor (id, map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, departement) {
        super (id, map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
        this.departement = departement
    }
    university_simple_property () {
        const university_all_property = this.simple_property ()
        university_all_property.departement = this.departement
        return university_all_property
    }
}

// la classe de l'hopital qui hérite de la classe infrastructure
class Hospital extends Infrastructure {
    constructor (id, map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, service) {
        super (id, map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
        this.service = service
    }
    hospital_simple_property () {
        const hospital_all_property = this.simple_property ()
        hospital_all_property.service = this.service
        return hospital_all_property
    }
}

// la classe de l'école qui hérite de la classe infrastructure
class School extends Infrastructure {
    constructor (id, map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, niveau) {
        super (id, map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
        this.niveau = niveau
    }
    school_simple_property () {
        const school_all_property = this.simple_property ()
        school_all_property.niveau = this.niveau
        return school_all_property
    }
}

// la classe de la bibliothèque qui hérite de la classe infrastructure
class Book_Case extends Infrastructure {
    constructor (id, map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, service) {
        super (id, map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
        this.service = service
    }
    book_case_simple_property () {
        const book_case_all_property = this.simple_property ()
        book_case_all_property.service = this.service
        return book_case_all_property
    }
}


// la classe principale de l'application qui regorge toute la logique de son fonctionnement
class App {
// les données de base de l'application
    #base_university = new Array ()
    #base_school = new Array ()
    #base_hospital = new Array ()
    #base_bookCase = new Array ()
    #all_app_data = new Array ()

// les données ajoutés par l'utilisateurs
    #user_university = new Array ()
    #user_hospital = new Array ()
    #user_school = new Array ()
    #user_bookCase = new Array ()

// actuelle
    #current_hospital

// la variable qui contient la carte
    #map

// les variables qui contiennent les coordonnées du clic de l'utilisateur
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

// la méthode qui sépare les données en fonction de la catégorie afin de ranger chacun dans le tableau correspondant
    data_separation (datas) {
        this.#base_hospital = datas.filter (data => data.category === "hospital")
        this.#base_university = datas.filter (data => data.category === "university")
        this.#base_school = datas.filter (data => data.category === "ecole")
        this.#base_bookCase = datas.filter (data => data.category === "bibliotèque")
        this.retrive_data_in_local_storage (this.#map)
        this.show_list_of_establishments ()
    }

// la méthode qui s'occupe de la gestion de l'hopital (il personnalise la destructuration des données de l'hopital)
    hospital_management_function () {
        this.#base_hospital.forEach (data => {
            const {
                id,
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
            console.log (id)
            new Hospital (this.#map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, service)
        })
    }

// la méthode qui s'occupe de la gestion de l'université (il personnalise la destructuration des données de l'université)
    University_management_function () {
        this.#base_university.forEach (data => {
            const {
                id,
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
                }, departement
            } = data
            console.log (id)
            new University (this.#map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, departement)
        })
    }

// la méthode qui s'occupe de la gestion de l'école (il personnalise la destructuration des données de l'école)
    school_management_function () {
        this.#base_school.forEach (data => {
            const {
                id,
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
            console.log (niveau)
            new School (this.#map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, niveau)
        })
    }

// la méthode qui s'occupe de la gestion de la bibliothèque (il personnalise la destructuration des données de la bibliothèque)
    bookcase_management_function () {
        this.#base_bookCase.forEach (data => {
            const {
                id,
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
            console.log (id)
            new Book_Case (this.#map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, service)
        })
    }

// la méthode qui affiche la carte
    showMap (lat, long, zoom) {
        const guinea = [lat, long]
        this.#map = L.map('map').setView(guinea, zoom);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
    }

// la méthode qui récupère les données de base de l'application
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

// la méthode qui écoute le clic sur la carte
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

    check_fields_in_letters (field, element) {
        if (!isNaN (Number (field.trim ()))) {
            element.textContent = "champs non valide"
            globale_error.classList.remove ("not")
            console.log ("non valide")
            return false
        } else {
            element.textContent = ""
            console.log ("valide")
            return true
        }
    }

    check_number_field (field, element) {
        if (isNaN(Number(field.trim())) || field.trim ().length > 9) {
            element.textContent = "Ce champ doit contenir 9 chiffres"
            globale_error.classList.remove ("not")
            console.log("Champ non valide")
            return false
        } else {
            element.textContent = ""
            return true
        }
    }

    check_table_field (field, element) {
        const array = field.trim ().split (",")
        const isCorrect = array.every (word => isNaN(Number(word.trim())))
        if (!isCorrect) {
            element.textContent = "entrez non valide"
            globale_error.classList.remove ("not")
            return false
        } else {
            element.textContent = ""
            return true;
        }
    }

    check_foundation_year_field (field, element) {
        if (isNaN(Number(field.trim())) || field < 1960 || field > 2025) {
            element.textContent = "entrez une année valide"
            globale_error.classList.remove ("not")
            console.log("anee non")
            return false
        } else {
            element.textContent = ""
            return true
        }
    }

    empty_error_field () {
        name_error.textContent = ""
        city_error.textContent = ""
        district_error.textContent = ""
        founder_error.textContent = ""
        type_error.textContent = ""
        contact_error.textContent = ""
        foundation_year_error.textContent = ""
        globale_error.classList.add ("not")
    }

// la méthode qui s'occupe de la gestion du formulaire
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

            let isFormValid = true;

            

            isFormValid = isFormValid && this.check_fields_in_letters(name, name_error);
            isFormValid = isFormValid && this.check_fields_in_letters(type, type_error);
            isFormValid = isFormValid && this.check_fields_in_letters(city, city_error);
            isFormValid = isFormValid && this.check_fields_in_letters(district, district_error);
            isFormValid = isFormValid && this.check_fields_in_letters(founder, founder_error);
            isFormValid = isFormValid && this.check_number_field(phone, contact_error);
            isFormValid = isFormValid && this.check_foundation_year_field(year_established, foundation_year_error);

            
            if (infrastructure_type.value === "hospital") {
                isFormValid = isFormValid && this.check_table_field (hospital_service, hospital_error)
            }
            if (infrastructure_type.value === "university") {
                isFormValid = isFormValid && this.check_table_field (departement, university_error)
            }
            if (infrastructure_type.value === "ecole") {
                console.log (ecole_input.value)
                isFormValid = isFormValid && this.check_table_field (niveau, school_error)
            }
            if (infrastructure_type.value === "bookcase") {
                isFormValid = isFormValid && this.check_table_field (book_case_service, bookcase_error)
            }

            if (!isFormValid) {
                return
            }

            let hospital
            let universite
            let school
            let bookcase

            switch (infrastructure_type.value) {
                case "hospital":
                    hospital = new Hospital (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, hospital_service)
                    this.#user_hospital.push (hospital.hospital_simple_property ())
                    this.store_data_in_local_storage ("hospital", this.#user_hospital)
                    break;
                case "university":
                    universite = new University (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, departement)
                    this.#user_university.push (universite.simple_property ())
                    this.store_data_in_local_storage ("university", this.#user_university)
                    break;
                case "ecole":
                    school = new School (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, niveau)
                    this.#user_school.push (school.school_simple_property ())
                    this.store_data_in_local_storage ("school", this.#user_school)
                    break;
                case "bookcase":
                    bookcase = new Book_Case (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, book_case_service)
                    this.#user_bookCase.push (bookcase.book_case_simple_property ())
                    localStorage.setItem ("bookcase", JSON.stringify (this.#user_bookCase))
                    this.store_data_in_local_storage ("bookcase", this.#user_bookCase)
                    break;
                default:
                    
                    break;
            }
            // this.store_data_in_local_storage ()
            console.log ("sa prend")
            this.close_form ()
        })
    }

// la méthode qui remet à 0 les champs du formulaire
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

// la méthode qui ferme le modal
    close_form () {
        this.empty_error_field ()
        this.hide_form ()
        infrastructure_type.value = ""
        rest_of_the_form.classList.add ("not")
        formulaire.classList.add ("not")
    }

// la méthode qui affiche le formulaire
    show_form () {
        oui_btn.addEventListener ("click", function () {
            confirm_modal.classList.add ("not")
            formulaire.classList.remove ("not")
            if (!infrastructure_list_interface.classList.contains ("not")) {
                infrastructure_list_interface.classList.add ("not")
                infrastructure_list_interface_btn.classList.remove ("close")
                infrastructure_list_interface_btn.textContent = "Afficher toutes les infrastructures"
                this.university_hidden ()
            }
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

// la méthode qui affiche la liste des infrastructure
    show_list_of_establishments () {
        infrastructure_list_interface_btn.addEventListener ("click", () => {
            if (!infrastructure_list_interface_btn.classList.contains ("close")) {
                infrastructure_list_interface_btn.classList.add ("close")
                infrastructure_list_interface_btn.textContent = "Masquer toutes les infrastructures"
                infrastructure_list_interface.classList.remove ("not")
                this.university_display ()
            } else {
                infrastructure_list_interface.classList.add ("not")
                infrastructure_list_interface_btn.classList.remove ("close")
                infrastructure_list_interface_btn.textContent = "Afficher toutes les infrastructures"
                this.university_hidden ()
            }
        })
        this.type_of_infrastructure_to_display ()
        this.close_infrastructure_modal ()
    }

    university_display () {
        this.hospital_hidden ()
        this.school_hidden ()
        this.bookcase_hidden ()
        university_list_btn.classList.add ("infras_btn_active")
        hospital_list_btn.classList.remove ("infras_btn_active")
        school_list_btn.classList.remove ("infras_btn_active")
        bookcase_list_btn.classList.remove ("infras_btn_active")
        this.#base_university.forEach (university => {
            const content = this.infrastructure_content_in_list (university.name, university.id)
            university_container.insertAdjacentHTML ("afterbegin", content)
            document.querySelector (".infrastructure_container").style.backgroundColor = "blue"
        })
        this.#user_university.forEach (university => {
            const content = this.infrastructure_content_in_list (university.name, university.id)
            university_container.insertAdjacentHTML ("afterbegin", content)
            document.querySelector (".infrastructure_container").style.backgroundColor = "blue"
        })
        this.see_marker_on_map (university_container, this.#base_university, this.#user_university)
    }

    university_hidden () {
        university_container.innerHTML = ""
    }

    hospital_display () {
        this.university_hidden ()
        this.school_hidden ()
        this.bookcase_hidden ()
        university_list_btn.classList.remove ("infras_btn_active")
        hospital_list_btn.classList.add ("infras_btn_active")
        school_list_btn.classList.remove ("infras_btn_active")
        bookcase_list_btn.classList.remove ("infras_btn_active")
        this.#base_hospital.forEach (hospital => {
            const content = this.infrastructure_content_in_list (hospital.name, hospital.id)
            hospital_container.insertAdjacentHTML ("afterbegin", content)
            document.querySelector (".infrastructure_container").style.backgroundColor = "red"
        })
        this.#user_hospital.forEach (hospital => {
            const content = this.infrastructure_content_in_list (hospital.name, hospital.id)
            hospital_container.insertAdjacentHTML ("afterbegin", content)
            document.querySelector (".infrastructure_container").style.backgroundColor = "red"
        })
        this.see_marker_on_map (hospital_container, this.#base_hospital, this.#user_hospital)
    }

    see_marker_on_map (container, base_infrastructures, user_infrastructure) {
        container.addEventListener ("click", (e) => {
            const id = e.target.getAttribute ("data-id")
            this.current_infrastructure (id, base_infrastructures, user_infrastructure)
        })
    }

    hospital_hidden () {
        hospital_container.innerHTML = ""
    }

    school_display () {
        this.hospital_hidden ()
        this.university_hidden ()
        this.bookcase_hidden ()
        university_list_btn.classList.remove ("infras_btn_active")
        hospital_list_btn.classList.remove ("infras_btn_active")
        school_list_btn.classList.add ("infras_btn_active")
        bookcase_list_btn.classList.remove ("infras_btn_active")
        this.#base_school.forEach (school => {
            const content = this.infrastructure_content_in_list (school.name, school.id)
            school_container.insertAdjacentHTML ("afterbegin", content)
            document.querySelector (".infrastructure_container").style.backgroundColor = "yellow"
            document.querySelector (".infrastructure_container").style.color = "black"
        })
        this.#user_school.forEach (school => {
            const content = this.infrastructure_content_in_list (school.name, school.id)
            school_container.insertAdjacentHTML ("afterbegin", content)
            document.querySelector (".infrastructure_container").style.backgroundColor = "yellow"
            document.querySelector (".infrastructure_container").style.color = "black"
        })
        this.see_marker_on_map (school_container, this.#base_school, this.#user_school)
    }

    school_hidden () {
        school_container.innerHTML = ""
    }

    bookcase_display () {
        this.hospital_hidden ()
        this.school_hidden ()
        this.university_hidden ()
        university_list_btn.classList.remove ("infras_btn_active")
        hospital_list_btn.classList.remove ("infras_btn_active")
        school_list_btn.classList.remove ("infras_btn_active")
        bookcase_list_btn.classList.add ("infras_btn_active")
        this.#base_bookCase.forEach (bookcase => {
            const content = this.infrastructure_content_in_list (bookcase.name, bookcase.id)
            bookcase_container.insertAdjacentHTML ("afterbegin", content)
            document.querySelector (".infrastructure_container").style.backgroundColor = "green"
        })
        this.#user_bookCase.forEach (bookcase => {
            const content = this.infrastructure_content_in_list (bookcase.name, bookcase.id)
            bookcase_container.insertAdjacentHTML ("afterbegin", content)
            document.querySelector (".infrastructure_container").style.backgroundColor = "green"
        })
        this.see_marker_on_map (bookcase_container, this.#base_bookCase, this.#user_bookCase)
    }

    bookcase_hidden () {
        bookcase_container.innerHTML = ""
    }

    close_infrastructure_modal () {
        infrastructure_modal_close.addEventListener ("click", () => {
            infrastructure_list_interface.classList.add ("not")
            infrastructure_list_interface_btn.classList.remove ("close")
            infrastructure_list_interface_btn.textContent = "Afficher toutes les infrastructures"
            this.university_hidden ()
        })
    }

    type_of_infrastructure_to_display () {
        university_list_btn.addEventListener ("click", () => {
            this.university_hidden ()
            this.university_display ()
        }) 
        hospital_list_btn.addEventListener ("click", () => {
            this.hospital_hidden ()
            this.hospital_display ()
        })
        school_list_btn.addEventListener ("click", () => {
            this.school_hidden ()
            this.school_display ()
        })
        bookcase_list_btn.addEventListener ("click", () => {
            this.bookcase_hidden ()
            this.bookcase_display ()
        })
    }

    infrastructure_content_in_list (name, id) {
        const content = `
        <div class = "infrastructure_container">
            <h1 class = "infrastructure_container_title">${name}</h1>
            <div>
                <!-- <button class = "infrastructure_container_btn">En savoir plus</button> -->
                <button class = "infrastructure_container_btn">Modifier</button>
                <button class = "infrastructure_container_btn red">Supprimer</button>
                <button data-id="${id}" class = "infrastructure_container_btn marker_on_map_btn green">voir sur la carte</button>
            </div>
        </div>`
        return content
    }

// la méthode qui ferme les modales au clic
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

    store_data_in_local_storage (identifiant, valeur) {
        localStorage.setItem (identifiant, JSON.stringify (valeur))
    }

    retrive_data_in_local_storage (map) {
        const university = JSON.parse (localStorage.getItem ("university"))
        const hospital = JSON.parse (localStorage.getItem ("hospital"))
        const school = JSON.parse (localStorage.getItem ("school"))
        const bookcase = JSON.parse (localStorage.getItem ("bookcase"))
        if (university) {
            this.#user_university = university
            university.forEach (one_university => {
                new University (map,  one_university.latitude, one_university.longitude, one_university.name, one_university.category, one_university.type, one_university.city, one_university.district, one_university.founder, one_university.year_established, one_university.phone, one_university.email, one_university.departement)
            })
        }
        
        if (hospital) {
            this.#user_hospital = hospital
            hospital.forEach (one_hospital => {
                new Hospital (map, one_hospital.latitude, one_hospital.longitude, one_hospital.name, one_hospital.category, one_hospital.type, one_hospital.city, one_hospital.district, one_hospital.founder, one_hospital.year_established, one_hospital.phone, one_hospital.email, one_hospital.service)
            })
        }
        
        if (school) {
            this.#user_school = school
            school.forEach (one_school => {
                new School (map, one_school.latitude, one_school.longitude, one_school.name, one_school.category, one_school.type, one_school.city, one_school.district, one_school.founder, one_school.year_established, one_school.phone, one_school.email, one_school.niveau)
            })
        }
        
        if (bookcase) {
            this.#user_bookCase = bookcase
            bookcase.forEach (one_bookcase => {
                new Book_Case (map,  one_bookcase.latitude, one_bookcase.longitude, one_bookcase.name, one_bookcase.category, one_bookcase.type, one_bookcase.city, one_bookcase.district, one_bookcase.founder, one_bookcase.year_established, one_bookcase.phone, one_bookcase.email, one_bookcase.service)
            })
        }
        // this.download_app_data (university, hospital, school, bookcase)
        down_btn.addEventListener ("click", this.download_app_data.bind (this, university, hospital, school, bookcase))

        
    }

    download_app_data (university, hospital, school, bookcase) {
        this.#all_app_data = [this.#base_hospital, this.#base_university, this.#base_school, this.#base_bookCase, university, hospital, school, bookcase]
        const data_download = JSON.stringify (this.#all_app_data, null, 2)
        const data_object = new Blob ([data_download], {type: "application/json"})
        const url = URL.createObjectURL (data_object)

        const a = document.createElement ("a")
        a.href = url
        a.download = "infrastructure.json"
        a.click ()

        URL.revokeObjectURL (url)
        console.log (this.#all_app_data)

    }

    current_infrastructure (id, base_infrastructures, user_infrastructure) {
        const current_base_infrastructure = base_infrastructures.find ( hospital => hospital.id === id)
        const current_user_infrastructure = user_infrastructure.find ( hospital => hospital.id === id)
        if (current_base_infrastructure) {
            this.center_marker_on_map (current_base_infrastructure.coordinates.latitude, current_base_infrastructure.coordinates.longitude)
        }
        if (current_user_infrastructure) {
            this.center_marker_on_map (current_user_infrastructure.latitude, current_user_infrastructure.longitude)
        }
    }
    center_marker_on_map(lat, lng) {
        this.#map.flyTo([lat, lng], 18, {
            animate: true,
            duration: 2,
        }); 
    }
}

new App ()
