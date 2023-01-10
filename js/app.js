// variables
const container = document.querySelector(".container");
const containerResult = document.querySelector("#resultado");
const form = document.querySelector("#formulario")


//Eventos

document.addEventListener("submit", search)



//Funciones
function search (e){
  e.preventDefault()
  
  // validar el formulario
  const city = document.querySelector("#ciudad").value;
  const country = document.querySelector("#pais").value;

  if(city ==="" || country === ""){
    alertNot("los Campos no pueden ir vacios")
    return
  }

  //consultando la api de clima
  consultingApi(city,country);



}

function alertNot(mesagge){
  const alertB = document.querySelector(".bg-red-100")
  
  if(!alertB){
    const alertDiv = document.createElement("DIV");
    alertDiv.classList.add("bg-red-100","border-red-400","tex-red-700","py-3","py-4","rounded","max-w-md","text-center","mt-5","mx-auto")

    alertDiv.innerHTML =
    `
    <strong class="font-bold tex-red-700">Error</strong>
    <span class="block tex-red-700">${mesagge}</span>
    `
   
    container.appendChild(alertDiv)

    setTimeout(() => {
      alertDiv.remove()
    }, 2000);

  }
 

}

function consultingApi(city,country){
  const apiId = "8647a1c78bd70f14cb6af4f0c6319b1a"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`

  spinner()

  fetch(url)
    .then(respons => respons.json())
    .then (datos =>{
      clearHtml()
      if(datos.cod === "404"){
        alertNot("Ciudad no encontrada")
      }
      buildingHtml(datos)
    })
    
  
}


function buildingHtml(datos){
  const {name,main:{temp,temp_max,temp_min}} = datos;
  const centigradosTemp = convertCelcius(temp) 
  const centigradosmax = convertCelcius(temp_max) 
  const centigradosMin = convertCelcius(temp_min) 

  const city = document.createElement("p")
  city.classList.add("text-center","bg-color-white","text-white")
  city.innerHTML =`<span class="font-bold text-2xl">El clima de la ciudad de ${name}</span>`

  const temperate = document.createElement("p")
  temperate.classList.add("text-center","bg-color-white","text-white")
  temperate.innerHTML =`<span class="font-bold text-4xl">${centigradosTemp}°C</span>`

  const temperateMax = document.createElement("p")
  temperateMax.classList.add("text-center","bg-color-white","text-white")
  temperateMax.innerHTML =`<span class="font-bold text-2xl">La temperatura máxima es: ${centigradosmax}°C</span>`

  const temperateMin = document.createElement("p")
  temperateMin.classList.add("text-center","bg-color-white","text-white")
  temperateMin.innerHTML =`<span class="font-bold text-2xl">La temperatura mínima es: ${centigradosMin}°C</span>`

  containerResult.appendChild(city);
  containerResult.appendChild(temperate);
  containerResult.appendChild(temperateMax);
  containerResult.appendChild(temperateMin);
}

function convertCelcius(celcius){
  return parseInt(celcius - 273.15);
}

function clearHtml (){
  while (containerResult.firstChild){
    containerResult.removeChild(containerResult.firstChild);
  }
}

function spinner (){
  const spinner = document.createElement("DIV");
  spinner.classList.add("sk-fading-circle")
  spinner.innerHTML = 
  `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
  `
  containerResult.appendChild(spinner);
}