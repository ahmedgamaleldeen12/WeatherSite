const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
async function Search(...args) {
  try {
    const apiUrl = args.length === 2
      ? `https://api.weatherapi.com/v1/forecast.json?key=ce467980b4074ab7ad7152222231308&q=${args[0]},${args[1]}&days=3`
      : `https://api.weatherapi.com/v1/forecast.json?key=ce467980b4074ab7ad7152222231308&q=${args}&days=3`;

    const data = await fetchData(apiUrl);

    document.getElementById("search").classList.add('true-city-name');
    document.getElementById("search").classList.remove('false-city-name');

    displayCity(data);
    displayToday(data);
    dispalyTomorrow(data);
    displayAfter(data);

  } catch (error) {
    document.getElementById("search").classList.add('false-city-name');
    document.getElementById("search").classList.remove('true-city-name');
    console.log('Received undefined data from API');
  }
}
//===============GET Latitude and Longitude
const succsesCallBack = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  Search(latitude,longitude);
}
const errorCallBack = ()=>{
    console.log("User Denied Geolocation");
}
const watchID = navigator.geolocation.getCurrentPosition(succsesCallBack,errorCallBack,
  {
    enableHighAccuracy: true,
  }
);
//====================Display Data Functions======================START
//===============Display City=================
function displayCity(data){
   document.getElementById("cityName").innerHTML = data.location.name;
}
//===============Display Today=================
function displayToday(data){
  document.getElementById("todayTemp").innerHTML = `${data.current.temp_c} <sup>o</sup>C`;
  document.getElementById("conditionIconToday").setAttribute("src", `https:${data.current.condition.icon}`);
  document.getElementById("conditionTextToday").innerHTML = `${data.current.condition.text}`;

  let d = new Date(data.current.last_updated);
  document.getElementById("today").innerHTML = `${days[d.getDay()]}`
  document.getElementById("todayDate").innerHTML =`${d.getDate() +' '+ monthNames[d.getMonth()]}`
}
//===============Display Tomorrow=================
function dispalyTomorrow(data)
{
  document.getElementById("tomTemp").innerHTML = `${data.forecast.forecastday[1].day.avgtemp_c} <sup>o</sup>C`;
  document.getElementById("conditionIconTom").setAttribute("src",`https:${data.forecast.forecastday[1].day.condition.icon}`);
  document.getElementById("conditionTextTom").innerHTML = `${data.forecast.forecastday[1].day.condition.text}`;

  let d = new Date(data.forecast.forecastday[1].date);
  document.getElementById("tom").innerHTML = `${days[d.getDay()]}`
  document.getElementById("tomDate").innerHTML =`${d.getDate() +' '+ monthNames[d.getMonth()]}`

}
//===============Display Day Ater=================
function displayAfter(data)
{
  document.getElementById("afterTemp").innerHTML = `${data.forecast.forecastday[2].day.avgtemp_c} <sup>o</sup>C`;
  document.getElementById("conditionIconAfter").setAttribute("src",`https:${data.forecast.forecastday[2].day.condition.icon}`);
  document.getElementById("conditionTextAfter").innerHTML = `${data.forecast.forecastday[2].day.condition.text}`;

  let d = new Date(data.forecast.forecastday[2].date);
  document.getElementById("after").innerHTML = `${days[d.getDay()]}`
  document.getElementById("afterDate").innerHTML =`${d.getDate() +' '+ monthNames[d.getMonth()]}`
}
//====================Display Data Functions======================END
document.getElementById("searchIcon").addEventListener("click", async () => {
  const value = document.getElementById("search").value;
  if (value.trim() !== "") {
    await Search(value.toUpperCase());
  }
});
document.getElementById("search").addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const value = document.getElementById("search").value;
    if (value.trim() !== "") {
      await Search(value.toUpperCase());
    }
  }
});
Search("London");



//====================== First Way I Wrote The Code but i Rewrote  it to KEEP DRY(Don't Repeat Your Code) 
// function Search(...args)
// {
//   if(args.length === 2)
//   {
//     fetch(`https://api.weatherapi.com/v1/forecast.json?key=ce467980b4074ab7ad7152222231308&q=${args[0]},${args[1]}&days=3`)
//     .then((res) => {
//       if (!res.ok) {
//         //throw new Error('Network response was not ok');
//         document.getElementById("search").classList.add('false-city-name');
//         document.getElementById("search").classList.remove('true-city-name');
//       }
//       return res.json()})
//     .then((data) =>{
//       if(data){
//         document.getElementById("search").classList.add('true-city-name');
//         document.getElementById("search").classList.remove('false-city-name');
//         displayCity(data);
//         displayToday(data);
//         dispalyTomorrow(data);
//         displayAfter(data);
//       }
//       else {
//         console.log('Received undefined data from API');
//       }   
//     })
//     .catch(error => {
//       console.error('Fetch error:', error);
//     });
//     console.log(args);
//   }
//   else {
//     fetch(`https://api.weatherapi.com/v1/forecast.json?key=ce467980b4074ab7ad7152222231308&q=${args}&days=3`)
//       .then(res => {
//         if (!res.ok) {
//           //throw new Error('Network response was not ok');
//           document.getElementById("search").classList.add('false-city-name');
//           document.getElementById("search").classList.remove('true-city-name');
//         }
//         return res.json();
//       })
//       .then(data => {
//         if (data) {
//           document.getElementById("search").classList.add('true-city-name');
//           document.getElementById("search").classList.remove('false-city-name');
//           displayCity(data);
//           displayToday(data);
//           dispalyTomorrow(data);
//           displayAfter(data);
//         } else {
//           console.log('Received undefined data from API');
//         }
//       })
//       .catch(error => {
//         console.error('Fetch error:', error);
//       });
//   }
// }