"use strict"


// selection des éléments du modal de confirmation 
const confirm_modal = document.querySelector (".modal")
const stop_modal = document.querySelector (".modal_container")
const no_btn = document.querySelector (".unconfirm_btn")
const oui_btn = document.querySelector (".confirm_btn")

// selection des éléments du modal des détails sur les différents établissements
const detail_modal = document.querySelector (".detail_modal")
const detail_modal_close = document.querySelector (".detail_modal_close")
const detail_modal_content = document.querySelector (".detail_modal_content")

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
// la classe principale qui contient les propriétés communes au quatres types d'infrastructures, ainsi que la logique de gestion des infrastructures
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
    
    // la méthode qui permet d'afficher le marqueur
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

    // la méthode qui personnalise le modal des détails en fonction de la catégorie de l'infrastructure
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

    // la méthode qui ferme le modal
    close_modal () {
        detail_modal_close.addEventListener ("click", () => {
            detail_modal.classList.add ("not")
        })
    }

    simple_property () {
        const all_property = {
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
}

// la classe de l'université qui hérite de la classe infrastructure
class University extends Infrastructure {
    constructor (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, departement) {
        super (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
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
    constructor (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, service) {
        super (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
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
    constructor (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, niveau) {
        super (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
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
    constructor (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email, service) {
        super (map, latitude, longitude, name, category, type, city, district, founder, year_established, phone, email)
        this.service = service
    }
    book_case_simple_property () {
        const book_case_all_property = this.simple_property ()
        book_case_all_property.departement = this.service
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
        this.show_data ()
        
    }

// la méthode qui s'occupe de la gestion de l'hopital (il personnalise la destructuration des données de l'hopital)
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

// la méthode qui s'occupe de la gestion de l'université (il personnalise la destructuration des données de l'université)
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

// la méthode qui s'occupe de la gestion de l'école (il personnalise la destructuration des données de l'école)
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

// la méthode qui s'occupe de la gestion de la bibliothèque (il personnalise la destructuration des données de la bibliothèque)
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

            let hospital
            let universite
            let school
            let bookcase

            switch (infrastructure_type.value) {
                case "hospital":
                    hospital = new Hospital (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, hospital_service)
                    this.#user_hospital.push (hospital.hospital_simple_property ())
                    localStorage.setItem ("hospital", JSON.stringify (this.#user_hospital))
                    // console.log (this.#user_hospital)
                    break;
                case "university":
                    universite = new University (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, departement)
                    this.#user_university.push (universite.simple_property ())
                    localStorage.setItem ("university", JSON.stringify (this.#user_university))
                    // console.log (this.#user_university)
                    break;
                case "ecole":
                    school = new School (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, niveau)
                    this.#user_school.push (school.school_simple_property ())
                    localStorage.setItem ("school", JSON.stringify (this.#user_school))
                    // console.log (this.#user_school)
                    break;
                case "bookcase":
                    bookcase = new Book_Case (map, this.#latitude, this.#longitude, name, infrastructure_type.value, type, city, district, founder, year_established, phone, email, book_case_service)
                    this.#user_bookCase.push (bookcase.book_case_simple_property ())
                    localStorage.setItem ("bookcase", JSON.stringify (this.#user_bookCase))
                    // console.log (this.#user_bookCase)
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
    show_data () {
        console.log (this.#base_university)
        console.log (this.#base_school)
        console.log (this.#base_bookCase)
        console.log (this.#base_hospital)
        infrastructure_modal.insertAdjacentHTML ("afterbegin", "")
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

    store_data_in_local_storage () {
        localStorage.setItem ("university", JSON.stringify (this.#user_university))
        localStorage.setItem ("hospital", JSON.stringify (this.#user_hospital))
        localStorage.setItem ("school", JSON.stringify (this.#user_school))
        localStorage.setItem ("bookcase", JSON.stringify (this.#user_bookCase))
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
        this.download_app_data (university, hospital, school, bookcase)
        down_btn.addEventListener ("click", this.download_app_data.bind (this))

        
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
}

new App ()
