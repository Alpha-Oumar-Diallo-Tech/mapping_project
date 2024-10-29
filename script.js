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

class App {
    #map
    #marqueur
    #map_event
    #infrastructure
    #infrastructure_data = new Array ()
    constructor () {
        this.showMap ()
        this.get_all_initial_data ()
    }
    showMap () {
        const guinea = [10.973549898080215, -10.973549898080215]
        this.#map = L.map('map').setView(guinea, 7.5);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
    }
    get_all_initial_data () {
        this._get_initial_app_data ("hospital_data.json")
    }
    async _get_initial_app_data (json_file) {
        try {
            const json_data = await fetch (json_file)
            if (!json_data.ok) {
                throw new Error("Erreur");
            }
            const data = await json_data.json ()
            this.showIndicator (data)
        } catch (error) {
            console.log (error)
        }
    }
    popupContent (name, category) {
        let my_popup_content = `
            <div class = "popup_container">
                <h1 class = "popup_title">${name}</h1>
                <span class = "popup_categorie">${category}</span>
                <button class = "popup_button">en savoir plus</button>
            </div>
        `
        // const container = document.querySelector (".leaflet-popup-content-wrapper")
        // console.log (container)
        // const pops = container.closest (".leaflet-popup-content-wrapper")
        // pops.style.color = "black"
        // this.#marqueur.on ("popupopen", function () {
        //     const pop = document.querySelector (".leaflet-popup-content-wrapper")
        //     if (container) {
        //         switch (category) {
        //             case "hospital":
        //                 document.querySelector (".leaflet-popup-content-wrapper").style.color = "black"
        //                 return my_popup_content
        //                 // break;
        //             default:
        //                 break;
        //         }
        //     }
        // })
        
        // switch (category) {
        //     case "hospital":
        //         document.querySelector (".leaflet-popup-content-wrapper").style.color = "black"
        //         return my_popup_content
        //         // break;
        //     default:
        //         break;
        // }
        return my_popup_content
    }
    showIndicator (infras) {
        infras.forEach(infras => {
            const {name, category, coordinates : {latitude, longitude}} = infras

            const my_popup_content = this.popupContent (name, category)
            const marqueur = L.marker([latitude, longitude]).addTo(this.#map)
            .bindPopup(my_popup_content,
                {
                    autoClose: false,
                    closeOnClick: false
                }
            )
            .openPopup();
            // switch (category) {
            //     case "hospital":
            //         pop.style.backgroundColor  = "black";
            //         break;
            //     case "university":
            //         pop.style.backgroundColor  = "blue";
            //         break;
            //     default:
            //         pop.style.backgroundColor  = "initial";
            //         break;
            // }
            // marqueur.on("popupopen", (e) => {
            //     const pop = e.popup._wrapper; // Accède directement à l'élément du popup via l'événement
            //     if (pop) {
            //         switch (category) {
            //             case "hospital":
            //                 pop.style.backgroundColor  = "black";
            //                 break;
            //             case "university":
            //                 pop.style.backgroundColor  = "blue";
            //                 break;
            //             default:
            //                 pop.style.backgroundColor  = "initial";
            //                 break;
            //         }
            //     }
            // });
        });
        
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