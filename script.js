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
    #map_event
    #infrastructure
    #infrastructure_data = new Array ()
    constructor () {
        this.showMap ()
        this._get_initial_app_data ("hospital_data.json")
        // this.addMarker(9.6412, -13.5784, 'agence', 'Agence Ecobank');
        // this.addMarker(9.6512, -13.5684, 'pointXpress', 'Point Xpress');
        // this.addMarker(9.6612, -13.5584, 'ecole', 'École Primaire');
    }
    showMap () {
        const guinea = [10.973549898080215, -10.973549898080215]
        this.#map = L.map('map').setView(guinea, 7.5);

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
            this.showIndicator (data)
        } catch (error) {
            console.log (error)
        }
    }
    showIndicator (infras) {
        const customIcon = L.ExtraMarkers.icon({
            icon: 'fa-coffee',
            markerColor: 'red',
            shape: 'square',
            prefix: 'fa'
        });
        infras.forEach(infras => {
            const {name, category, coordinates : {latitude, longitude}} = infras
            const pop = `
            <div class = "pop">
                <h1 class = "title">${name}</h1>
                <p class = "description">${category}</p>
                <buttton class = "btn">en savoir plus</buttton>
            </div>`
            L.marker([latitude, longitude], {icon: customIcon}).addTo(this.#map)
            .bindPopup(pop, {
                autoClose: false,
                closeOnClick: false
            })
            .openPopup();
        });
    }
    // Fonction pour créer une icône personnalisée en fonction du type
    createCustomIcon(type) {
        let iconOptions = {
            icon: 'fa-circle', // icône par défaut
            markerColor: 'blue', // couleur par défaut
            prefix: 'fa', // préfixe pour Font Awesome
        };

        switch (type) {
            case 'ecole':
                iconOptions.icon = 'fa-school';
                iconOptions.markerColor = 'purple';
            break;
            case 'hopital':
                iconOptions.icon = 'fa-hospital';
                iconOptions.markerColor = 'red';
            break;
            case 'bibliotheque':
                iconOptions.icon = 'fa-book';
                iconOptions.markerColor = 'blue';
            break;
            default:
                iconOptions.icon = 'fa-map-marker';
                iconOptions.markerColor = 'blue';
        }
        return L.AwesomeMarkers.icon(iconOptions);
    }
    // Fonction pour ajouter un marqueur avec une icône personnalisée
    addMarker(lat, lng, type, popupContent) {
    const customIcon = this.createCustomIcon(type);

    L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(popupContent);
    }

  // Exemple d'utilisation
    // addMarker(9.6412, -13.5784, 'agence', 'Agence Ecobank');
    // addMarker(9.6512, -13.5684, 'pointXpress', 'Point Xpress');
    // addMarker(9.6612, -13.5584, 'ecole', 'École Primaire');

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