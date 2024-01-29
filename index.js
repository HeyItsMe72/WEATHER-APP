import KEYS from "./keys.js";

const d = document, n = navigator, w = window;

let $container = d.querySelector(".main-container"),
    $loader = d.querySelector(".loader"),
    $city = d.querySelector(".city"),
    $date = d.querySelector(".date"),
    $imgWeather = d.querySelector(".weather-img"),
    $temperature = d.querySelector(".temperature"),
    $description = d.querySelector(".weather-description"),
    $temp_max = d.querySelector(".temp-max"),
    $temp_min = d.querySelector(".temp-min"),
    $wind = d.querySelector(".wind"),
    $humidity = d.querySelector(".humidity"),
    $sunset = d.querySelector(".sunset"),
    $sunrise = d.querySelector(".sunrise"),
    lat, lon
;


const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximiumAge: 0
}

const error = err => {
    $container.innerHTML = `<p><mark>Error ${err.code}: ${err.message}</p></mark>`;
    console.log(`Error ${err.status}: ${err.message}`);
}

const success = pos => {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    const urlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${KEYS.APIkey}`;
    
    fetch(urlGeo)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        let date = new Date(json.dt * 1000);
        $date.innerHTML = `${date.toLocaleString()}&nbsp;<img src="assets/reload.png" alt="reload">`;
        $city.innerHTML = `${json.name}, ${json.sys.country}`;
        
        //Define the temperature accord with the number
        json.main.feels_like > 10 ?
            $temperature.innerHTML = `${json.main.feels_like.toString().slice(0, 2)}°C`
            : $temperature.innerHTML = `${json.main.feels_like.toString().slice(0, 1)}°C`;

        let icon = json.weather[0].icon,
            URLicon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            $imgWeather.src = URLicon
        ;

        $description.innerHTML = json.weather[0].description.toUpperCase();
        $temp_max.appendChild(createElement("h5", `${Math.round(json.main.temp_max)}°C`));
        $temp_min.appendChild(createElement("h5", `${Math.round(json.main.temp_min)}°C`));
        $humidity.appendChild(createElement("h5", `${json.main.humidity}%`));
        $wind.appendChild(createElement("h5", `${Math.round(json.wind.speed * 3.6)} km/hr`));
        $loader.classList.add("remove");

        //Change UNIX units. *1000 so the argument it's in seconds
        let sunrise = json.sys.sunrise,
            sunset = json.sys.sunset
        ;

        $sunrise.appendChild(createElement("h5", `${changeUNIX(sunrise)} AM`));
        $sunset.appendChild(createElement("h5", `${changeUNIX(sunset)} PM`));
    })
    .catch(err => {
        let message = err.statusText || "Ocurrió un error";
        $loader.classList.add("remove");
        $container.innerHTML = `
            <h2>Error ${err.status}: ${message}`;
        console.log(err);
    })
};

// Funciones Auxiliares
function createElement(el, content) {
    let $el = d.createElement(el);
    $el.innerHTML = content;
    return $el;
}

function changeUNIX(unix) {
    let date = new Date(unix * 1000),
        hours = date.getHours(),
        minutes = date.getMinutes()
    ;
    if (minutes < 10) minutes = "0" + date.getMinutes();
    if (hours > 12) hours -= 12;
    const time = `${hours}:${minutes}`;
    return time;

}


// Listeners
d.addEventListener("click", e => {
    if (e.target.alt === "reload") location.reload();
})

w.addEventListener("load", e => {
    n.geolocation.getCurrentPosition(success, error, options);
})