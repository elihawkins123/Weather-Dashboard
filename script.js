// "05c0fe6c9686852f9a13a8df42c507ce"
apikey="df3fb9934a7d8ebae97c6749b588071a"
var searchBox=document.querySelector("#search-input")
var searchBtn=document.querySelector("#searchBtn")
var todayForecast=document.querySelector(".mainWeather")
var historyList=document.querySelector("#historyList")
var fiveDayForecast=document.querySelector("#fiveDayForecast")


function searchWeather(cityName){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apikey}`
    )
    .then(function(response){
        return response.json()
    }).then(function(weatherData){
        console.log (weatherData)
        var weatherIcon=weatherData.weather[0].icon 
        var iconLink=`https://openweathermap.org/img/wn/${weatherIcon}.png`
        var todaysWeather=`
        <h2>${weatherData.name}</h2>
        <img src="${iconLink}"/>
        <p>${weatherData.weather[0].description}</p>
        <p>temperature: ${weatherData.main.temp}</p>
        <p>humidity: ${weatherData.main.humidity}</p>
        <p>wind speed: ${weatherData.wind.speed}</p>
        
        `
        todayForecast.innerHTML=todaysWeather
        var latitude=weatherData.coord.lat 
        var longitude=weatherData.coord.lon 
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apikey}`
        )
        .then(function(response){
            return response.json()
        })
        .then(function(fiveDay){
            var fiveDayData=fiveDay.list 
            var fiveDayList=""
            for(var i =0; i<=4; i++){
                console.log(fiveDayData[i])
                fiveDayList+=`
                <div class="card">
                <p>${fiveDayData[i].main.temp}</p>
                <p>${fiveDayData[i].main.humidity}</p>
                </div>
                `
                fiveDayForecast.innerHTML=fiveDayList
            }
        })
    })
}





searchBtn.addEventListener("click",function(event){
event.preventDefault()
var cityName=searchBox.value.trim()
searchWeather(cityName)
searchBox.value=""
})