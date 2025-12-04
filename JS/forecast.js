const inp = document.getElementById("inp");
const btn = document.getElementById("btn");
const error = document.getElementById("error");
const problem = document.getElementById("problem");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const cityName = inp.value;
    
    if(cityName === "") {
        error.style.display = "block";
        error.style.borderRadius = "8px"
        error.style.height = "30px"
        error.textContent  = "الرجاء ادخال اسم المدينة";
        return;
    }
    else{
        document.getElementById("error").textContent = "";
        error.style.display = "none";
    }

    const APIKey = "b41d659884a1fd42859d9e9d66a4b9d2";

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=metric&lang=ar`)
    .then(res => {
        displayWeather(res.data);
    })
    .catch(error => {
        problem.textContent  = "تعذر جلب التوقعات، الرجاء التأكد من اسم المدينة أو المحاولة لاحقًا.";
        problem.style.display = "block";
        problem.style.borderRadius = "8px"
        problem.style.width = "75%";
        problem.style.justifyContent = "center";
        console.log(error)
    });
    inp.value = ""; 
});

function displayWeather(data) {
    const weatherCont = document.getElementById("displayWeater");
    const cityName = document.getElementById("cityName");

    cityName.style.display= "block";
    cityName.innerHTML = `<strong>${data.city.name}</strong>`;

    const weatherHtml = `
        <div class ="fw-bold p-3 m-2 rounded-4" style="color: #0E172A;  width: 280px; border: 5px solid #0E172A;">
             <p>التاريخ والوقت : ${data.list[2].dt_txt}</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
             <p class= "mt-2">درجة الحرارة  : <span dir="ltr">°C</span>${data.list[2].main.temp}</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
             <p class= "mt-2"> الوصف  : ${data.list[2].weather[0].description}</p>
        </div>
        <div class ="fw-bold p-3 m-2 rounded-4" style="color: #0E172A; width: 280px; border: 5px solid #0E172A;">
             <p>التاريخ والوقت : ${data.list[10].dt_txt}</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
             <p class= "mt-2">درجة الحرارة  : <span dir="ltr">°C</span>${data.list[10].main.temp}</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
             <p class= "mt-2"> الوصف  : ${data.list[10].weather[0].description}</p>
        </div>
        <div class ="fw-bold p-3 m-2 rounded-4" style="color: #0E172A;  width: 280px; border: 5px solid #0E172A;">
             <p>التاريخ والوقت : ${data.list[18].dt_txt}</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
             <p class= "mt-2">درجة الحرارة  : <span dir="ltr">°C</span>${data.list[18].main.temp}</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
             <p class= "mt-2"> الوصف  : ${data.list[18].weather[0].description}</p>
        </div>
        <div class ="fw-bold p-3 m-2 rounded-4" style="color: #0E172A; width: 280px; border: 5px solid #0E172A;">
             <p>التاريخ والوقت : ${data.list[26].dt_txt}</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
             <p class= "mt-2">درجة الحرارة  : <span dir="ltr">°C</span>${data.list[26].main.temp}</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
             <p class= "mt-2"> الوصف  : ${data.list[26].weather[0].description}</p>
        </div>
        <div class ="fw-bold p-3 m-2 rounded-4" style="color: #0E172A; width: 280px; border: 5px solid #0E172A;">
             <p>التاريخ والوقت : ${data.list[34].dt_txt}</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
             <p class= "mt-2">درجة الحرارة  : <span dir="ltr">°C</span>${data.list[34].main.temp}</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
             <p class= "mt-2"> الوصف  : ${data.list[34].weather[0].description}</p>
        </div>
    `;
    weatherCont.innerHTML = weatherHtml;     
}