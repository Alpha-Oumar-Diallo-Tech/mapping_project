// "use strict"

// school
// university
// book 
// hospital

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
                <span class = "popup_categorie">${this.category}</span>
                <button class = "popup_button">en savoir plus</button>
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
            categorie.textContent = this.category
            type.textContent = this.type
            addresse.textContent = `Addresse: ${this.city}, ${this.district}`
            founder.textContent = this.founder
            year_established.textContent = this.year_established
            telephone.textContent = this.phone
            email.textContent = this.email
            service.textContent = this.service
            departement.textContent = this.departement
            niveau.textContent = this.niveau
            console.log (this.name)
            // this.showMap (lat, lng, 3)
        } else {
            nom.textContent = this.name
            categorie.textContent = this.category
            type.textContent = this.type
            addresse.textContent = `Addresse: ${this.city}, ${this.district}`
            founder.textContent = this.founder
            year_established.textContent = this.year_established
            telephone.textContent = this.phone
            email.textContent = this.email
            service.textContent = this.service
            departement.textContent = this.departement
            niveau.textContent = this.niveau
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

// map
    #map

    constructor () {
        this.guineaLat = 10.973549898080215
        this.guineaLon = -10.973549898080215

        this.showMap (this.guineaLat, this.guineaLon, 7.5)
        this._get_initial_app_data ("app_data.json")

        this.map_click ()
        this.no_click ()
    }






    data_separation (datas) {
        this.#hospital = datas.filter (data => data.category === "hospital")
        this.#university = datas.filter (data => data.category === "university")
        this.#school = datas.filter (data => data.category === "ecole")
        this.#bookCase = datas.filter (data => data.category === "bibliotèque")
        this.#all_app_data = [this.#hospital, this.#university, this.#school, this.#bookCase]
    }

    hospital_management_function () {
        this.#hospital.forEach (data => {
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
        this.#university.forEach (data => {
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
        this.#school.forEach (data => {
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
        this.#bookCase.forEach (data => {
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

// je reproduis trois autre fonction semblable à hospital_management_function pour les trois autres types d'établissement aussi

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
    
    destructure_data (data) {
        data.forEach(data => {
            const {name, category, city, district, contact : {phone = "non définis"} = "non précis", coordinates : {latitude, longitude}} = data
            const popup_content = this.popupContent (name, category)
            this.show_indicator (latitude, longitude, popup_content, name, category, city, district, phone)
        })
        
    }

    map_click () {
        this.#map.on ("click", (e) => {
            const {lat, lng} = e.latlng
            console.log (lat, lng)
            // show_indicator(lat,lng,)
        

            // this.showMap (lat, lng, 3)
            if (detail_modal.classList.contains ("not")) {
                confirm_modal.classList.remove ("not")
            } else {
                detail_modal.classList.add ("not")
            }
            
        }, function () {
            console.log ("erreur")
        })

        ////////////////////

        ////////////////////////////////
       
        document.addEventListener("DOMContentLoaded", function() {
            const formulaire = document.getElementById("formulaire");
        
            formulaire.addEventListener("submit", function(event) {
                event.preventDefault(); // Empêche le rechargement de la page
        
                const nom = document.getElementById("nom").value.trim();
                const email = document.getElementById("email").value.trim();
                const contact = document.getElementById("contact").value.trim();
                const categorie = document.getElementById("categories").value.trim();
                const Anneefondation = document.getElementById("Anneefondation ").value.trim();

                const messageErreur = document.getElementById("messageErreur");
        
                let erreurs = [];
        
                // Vérification du champs nom 
                if (nom.length >0) {
                    erreurs.push("Le champs est vide veuillez remplir le champs");
                }
                 // Vérification du champs contact
                 if (nom.length >0) {
                    erreurs.push("Le champs est vide veuillez remplir le champs");
                }
                 // Vérification du champs categories
                 if (nom.length >0) {
                    erreurs.push("Le champs est vide veuillez remplir le champs");
                }
                 // Vérification du champs categories
                 if (nom.length >0) {
                    erreurs.push("Le champs est vide veuillez remplir le champs");
                }


                // Vérification de l'email (vérifié par le type="email" et par le format @)
                if (!email.includes("@")) {
                    erreurs.push("Veuillez entrer un email valide.");
                }
        
        
                // Affichage des erreurs ou soumission du formulaire
                if (erreurs.length > 0) {
                    messageErreur.textContent = erreurs.join(" ");
                } else {
                    messageErreur.textContent = "";
                    alert("Formulaire soumis avec succès !");
                    formulaire.reset();
                }
            });
        });
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

}

new App ()
