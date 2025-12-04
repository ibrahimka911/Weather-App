const inp = document.getElementById("inp");
const btn = document.getElementById("btn");
const error = document.getElementById("error");
const problem = document.getElementById("problem");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const cityName = inp.value;
    
    if(!cityName) {
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

    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`)
    .then(res => {
        const lat = res.data[0].lat;
        const lon = res.data[0].lon;

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric&lang=ar`)
        .then(res => {
            displayWeather(res.data)
        })
        .catch(error => {
            problem.textContent  = "عذراً... حدث خطاء اثناء الحصول على بيانات الطقس";
            problem.style.display = "block";
            problem.style.borderRadius = "8px"
            problem.style.width = "100%";
            console.log(error)            
        });
    })
    .catch(error => {
        problem.textContent  = "عذراً... حدث خطاء اثناء البحث عن المدينة";
        problem.style.display = "block";
        problem.style.borderRadius = "8px"
        problem.style.width = "100%";
        console.log(error)
    });
    inp.value = ""; 
});


function displayWeather(data) {
    const weatherCont = document.getElementById("displayWeater");

    const weatherHtml = `
        <div class ="fw-bold p-3 mb-1 rounded-4 w-75" style="color: #0E172A; border: 5px solid #0E172A;">
            <p class = "mt-2">درجة الحرارة :  <span dir="ltr"> °C </span>${ data.main.temp }</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
            <p class = "mt-2">الوصف :  ${data.weather[0].description}</p><div style="border-radius: 5px; height: 2px; width: 100%; background-color: #0E172A;"></div>
            <p class = "mt-2">الموقع :  ${data.name}</p>
        </div>
    `
    weatherCont.innerHTML = weatherHtml;     
};