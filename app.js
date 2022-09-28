let liste = JSON.parse(localStorage.getItem("LOCAL")) || [];

console.log(liste);

localStorage.setItem("LOCAL", JSON.stringify(liste));

let now = new Date();
let month = new Array();
month[0] = "OCAK";
month[1] = "ŞUBAT";
month[2] = "MART";
month[3] = "NİSAN";
month[4] = "MAYIS";
month[5] = "HAZİRAN";
month[6] = "TEMMUZ";
month[7] = "AĞUSTOS";
month[8] = "EYLÜL";
month[9] = "EKİM";
month[10] = "KASIM";
month[11] = "ARALIK";
let tarih = `${now.toISOString().slice(0, 10).split("-").reverse()}`;
tarih = `${now.toISOString().slice(8, 10)} ${
  month[now.getMonth()]
} ${now.getFullYear()}`;

const btn = document.querySelector("button");
const input = document.querySelector("input");
btn.addEventListener("click", () => {
  fetchweather(input.value);
});
input.addEventListener("keydown", (e) => {
  e.key == "Enter" && fetchweather(input.value);
});
window.addEventListener("load", () => {
  liste.forEach((name) => fetchweather(name));
});

localStorage.setItem("LOCAL", JSON.stringify(liste));

const fetchweather = (name) => {
  const key = `9bad0bd4b134dd63910604be2575cdc7`;
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${name}&appid=${key}&lang=tr`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong :${res.status}`);
        throw new Error();
      }
      return res.json();
    })
    .then((rest) => renderWeather(rest))
    .catch((err) => console.log(err));

  console.log("ethem");
  const renderError = () => {
    const kapsa = document.querySelector(".kapsa");
    const alert = document.querySelector(".alert");
    function show() {
      alert.innerHTML = `Not found`;
      alert.style.display = "block";
      setTimeout(hide, 2000);
    }
    function hide() {
      alert.innerHTML = "";
      alert.style.display = "none";
      input.value = "";
    }
    show();
    localStorage.setItem("LOCAL", JSON.stringify(liste));
  };

  const kapsa = document.querySelector(".kapsa");

  const renderWeather = (data) => {
    const {
      name,
      sys: { country },
      weather,
      main,
      coord,
    } = data;
    const { description, icon } = weather[0];
    const { temp, temp_max, temp_min, feels_like } = main;
    const { lat, lon } = coord;

    if (!liste.includes(input.value.toLocaleLowerCase())) {
      if (liste.length > 3) {
        kapsa.removeChild(kapsa.children[0]);
        kapsa;

        liste.push(input.value.toLocaleLowerCase());
        liste = liste.slice(1, 5);

        localStorage.setItem("LOCAL", JSON.stringify(liste));
      } else {
        if (!input.value == "") liste.push(input.value.toLocaleLowerCase());
      }

      console.log(kapsa.children[0]);
      kapsa.innerHTML += `
<div class="kutu card d-flex " ><button class="sil"><i class="fa-solid fa-xmark"></i></button>
   <div class="tarih text-center gap-0 col-12 border-bottom h3  ">${name}, ${country}</div>
   <div class="tarih d-flex gap-0 col-10 h6  m-2">${tarih}</div>
   <div class="üst">
    <div class="üst-sol">${temp.toFixed()}°</div>
    <div class="üst-sag"><img src=http://openweathermap.org/img/w/${icon}.png alt=""></div>
    
   </div>
   <div class="alt">
   <div class="alt-sol">
    <p class="his">Gibi hissettiriyor ${feels_like.toFixed()}°</p>
    <p class="gün">Gün ${temp_max.toFixed()}°↓ Gece ${temp_min.toFixed()}°↑</p>
   </div>
   <div class="alt-sag">${description}</div>
  </div>
</div>
`;

      const sil = document.querySelectorAll(".sil");
      sil.forEach((ez) => {
        ez.addEventListener("click", (e) => {
          let asd =
            e.target.parentElement.nextElementSibling.innerText.toLocaleLowerCase();
          if (liste.shift(asd)) {
            console.log("burası");
            console.log(liste.includes(asd));
            e.target.parentElement.parentElement.remove();
            console.log(
              e.target.parentElement.nextElementSibling.innerText.toLocaleLowerCase()
            );
          }
          localStorage.setItem("LOCAL", JSON.stringify(liste));
        });
      });

      localStorage.setItem("LOCAL", JSON.stringify(liste));
      input.value = "";
    } else {
      alert("Zaten eklenmiş");
      input.value = "";
      localStorage.setItem("LOCAL", JSON.stringify(liste));
    }
  };
  localStorage.setItem("LOCAL", JSON.stringify(liste));
};

const renderSavedTodos = () => {
  let liste = JSON.parse(localStorage.getItem("LOCAL")) || [];
  liste.forEach((ad) => {
    fetchweather(ad);
  });
};

localStorage.setItem("LOCAL", JSON.stringify(liste));
