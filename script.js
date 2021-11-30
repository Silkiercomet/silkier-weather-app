

const fetchData = async function(){
    let x = document.querySelector("#city").value
    let result = await fetch(`http://dataservice.accuweather.com/locations/v1/search?apikey=OJyRAauMeqGG0oYg2qHSc7DiU7GYyFTI&q=${x}`)
    .then(state => state.json())
    .catch(err => console.log(err))

    console.log("🚀 ~ file: script.js ~ line 6 ~ fetchData ~ JSON.stringify(result[0].Key) ", JSON.stringify(result[0].Key) )
    return result[0]
 }
const fetchWeather = async function(key){
    key.then(async function(a) {
        let result = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${a.Key}?apikey=OJyRAauMeqGG0oYg2qHSc7DiU7GYyFTI`)
        .then(state => state.json())
        .catch(err => console.log(err))
        console.log("🚀 ~ file: script.js ~ line 9 ~ fetchWeather ~ result", result)
        let newLi = document.createElement("li");
        newLi.innerHTML = `
        <h1 class="current__city">
                    ${a.LocalizedName}
                </h1>
                <p class="temperature">${result[0].Temperature.Metric.Value} <span class="temperature">C</span> </p>
                <i class="icon">
                    <img src="https://developer.accuweather.com/sites/default/files/${result[0].WeatherIcon}-s.png" alt="currentweather">
                </i>
                <p class="comment">
                    ${result[0].WeatherText}
                </p>
        `
        newLi.classList.add("card")
        document.querySelector(".grid").appendChild(newLi)
    })
}

const compose = (f,g) => data => f(g(data))
let getWeatherCard = compose(fetchWeather,fetchData)
getWeatherCard()

document.querySelector(".btn").addEventListener("click", getWeatherCard)

