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

    if (!liste.includes(input.value.toLocaleLowerCase()) || input.value == "") {
      if (input.value !== "") {
        liste.push(input.value.toLocaleLowerCase());
      }
      if (liste.length > 4) {
        console.log("burada");
let bakar = kapsa.children[3].firstChild.firstChild.nextElementSibling.firstChild.innerText.toLocaleLowerCase();
console.log(bakar);
let ort = liste.indexOf(bakar)
liste.splice(ort,1)
        kapsa.removeChild(kapsa.children[3]);
        kapsa;

        localStorage.setItem("LOCAL", JSON.stringify(liste));
      }

      const list = document.createElement("div");
      list.className = "içerik";
      list.innerHTML = `<div class="kutu card d-flex " ><button class="sil"><i class="fa-solid fa-xmark"></i></button>
   <div class="tarih text-center gap-0 col-12 border-bottom h3  "><span>${name}</span><span>, ${country}</span></div>
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
      kapsa.prepend(list);

      //       kapsa.innerHTML += `
      // <div class="kutu card d-flex " ><button class="sil"><i class="fa-solid fa-xmark"></i></button>
      //    <div class="tarih text-center gap-0 col-12 border-bottom h3  ">${name}, ${country}</div>
      //    <div class="tarih d-flex gap-0 col-10 h6  m-2">${tarih}</div>
      //    <div class="üst">
      //     <div class="üst-sol">${temp.toFixed()}°</div>
      //     <div class="üst-sag"><img src=http://openweathermap.org/img/w/${icon}.png alt=""></div>

      //    </div>
      //    <div class="alt">
      //    <div class="alt-sol">
      //     <p class="his">Gibi hissettiriyor ${feels_like.toFixed()}°</p>
      //     <p class="gün">Gün ${temp_max.toFixed()}°↓ Gece ${temp_min.toFixed()}°↑</p>
      //    </div>
      //    <div class="alt-sag">${description}</div>
      //   </div>
      // </div>
      // `;

      const sil = document.querySelectorAll(".sil");
      sil.forEach((ez) => {
        ez.addEventListener("click", (e) => {
          let asd =
            e.target.parentElement.nextElementSibling.firstChild.innerText.toLocaleLowerCase();

          localStorage.setItem("LOCAL", JSON.stringify(liste));
          if (liste.includes(asd)) {
            console.log(1);
            let b = liste.indexOf(asd);
            if (liste.length == 1) {
              liste = [];
              e.target.parentElement.parentElement.parentElement.remove();
            }
            liste.splice(b, 1);
            e.target.parentElement.parentElement.parentElement.remove();
          }
          localStorage.setItem("LOCAL", JSON.stringify(liste));
        });
      });

      localStorage.setItem("LOCAL", JSON.stringify(liste));
      input.value = "";
    } else {
      console.log("son");
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
  localStorage.setItem("LOCAL", JSON.stringify(liste));
};
