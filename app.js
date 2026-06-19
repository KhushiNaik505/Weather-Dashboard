let isCelsius = true;
const apiKey="5047b6a783bb7f09facedbebc540e4d5";
const apiUrl="https://api.openweathermap.org/data/2.5/weather";

const cityInput=document.getElementById("cityInput");
const searchBtn=document.getElementById("searchBtn");

async function getWeather(city){
    try{
    const response=await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=en`);
    const data=await response.json();
    
    if (data.name) {
     displayWeather(data);
    const forecastResponse=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
const forecastData = await forecastResponse.json();
displayForecast(forecastData);}
    else {
        document.getElementById("cityName").textContent="City Not Found";
    document.getElementById("temperature").textContent=" ";
     document.getElementById("humidity").textContent=" ";
      document.getElementById("windSpeed").textContent=" ";
       document.getElementById("description").textContent=" ";
    }}
    catch(error){
document.getElementById("cityName").textContent="Network Error: Check your Connection";
    }
    
}

searchBtn.addEventListener("click",function(){
    const city=cityInput.value.trim();
    if (city !==""){
        getWeather(city);
    }
});

function displayWeather(data){
    document.getElementById("cityName").textContent="⚲ "+data.name;
    document.getElementById("description").textContent= data.weather[0].description;
     document.getElementById("humidity").textContent=Math.round(data.main.humidity)+" %";
      document.getElementById("windSpeed").textContent= Math.round(data.wind.speed*3.6)+" km/hr";
      document.getElementById("pressure").textContent=data.main.pressure+" hPa"; 
      document.getElementById("visibility").textContent=(data.visibility/1000)+" km";
      document.getElementById("min-temp").textContent=data.main.temp_min+" °C";
      document.getElementById("max-temp").textContent=data.main.temp_max+" °C";
      
const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "numeric"
});
let temp=data.main.temp;
if (!isCelsius){
    temp=(temp*9/5)+32;
}
const unit=isCelsius ? "°C" : "°F";
document.getElementById("temperature").textContent = Math.round(temp) + " " + unit;
const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "numeric"
});
document.getElementById("sunrise").textContent = sunrise;
document.getElementById("sunset").textContent = sunset;




const iconCode=data.weather[0].icon;

document.getElementById("weatherIcon").src=`https://openweathermap.org/img/wn/${iconCode}@2x.png`;}


cityInput.addEventListener("keydown",function(event){
    if (event.key==="Enter"){
const city = cityInput.value.trim();
        if (city !== "") {
            getWeather(city);
        }
    
    }
});

function displayDate() {
const now=new Date();
const formatted=now.toLocaleDateString("en-IN",{
    weekday:"long",
   day:"numeric",
    month:"long"
    
});
document.getElementById("currentDate").textContent=formatted;
}
displayDate();

function displayTime() {
    const timeString = new Date();
    const formattedtimeString = timeString.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "numeric"
    });
    document.getElementById("currentTime").textContent = formattedtimeString;
}
displayTime();
setInterval(displayTime, 1000);

document.getElementById("celsiusBtn").addEventListener("click", function() {
    isCelsius = true;
    document.getElementById("celsiusBtn").classList.add("active");
    document.getElementById("fahrenheitBtn").classList.remove("active");
    getWeather(cityInput.value.trim() || "Mumbai");
});

document.getElementById("fahrenheitBtn").addEventListener("click", function() {
    isCelsius = false;
    document.getElementById("fahrenheitBtn").classList.add("active");
    document.getElementById("celsiusBtn").classList.remove("active");
    getWeather(cityInput.value.trim() || "Mumbai");
});

function displayForecast(forecastData){
    const forecastContainer=document.getElementById("forecastContainer");
    forecastContainer.innerHTML="";

    for (let i=8; i<forecastData.list.length; i+=8){
        const day=forecastData.list[i];
        const temp=Math.round(day.main.temp);
       const date = new Date(day.dt_txt).toLocaleDateString("en-IN", {
    weekday: "short", day:"numeric",
    month:"long"
});
        const icon=day.weather[0].icon;

        const card=`
        <div class="forecast-card" style="display:flex;width:350px;">
        <p style="font-weight:bold;">${date}</p>
         
        <p style="line-height:40px;"><br>${temp} °C</p>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
     
        </div>`;
        forecastContainer.innerHTML+=card;

        

        

    }
}


 getWeather("Mumbai");
