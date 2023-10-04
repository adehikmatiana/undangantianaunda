document
  .getElementById("btn-open-invitation")
  .addEventListener("click", function () {
    window.location.href = "#home";

    document.getElementById("nav").style.display = "block";
    document.getElementById("body").style.overflow = "scroll";

    audioAutoPlay();

    setTimeout(() => {
      document.getElementById("btn-open-invitation").style.display = "none";
    }, 500);
  });

document.getElementById("nav-home").addEventListener("click", function () {
  window.location.href = "#home";
});

document.getElementById("nav-couple").addEventListener("click", function () {
  window.location.href = "#couple";
});

document.getElementById("nav-event").addEventListener("click", function () {
  window.location.href = "#event";
});

document.getElementById("nav-gallery").addEventListener("click", function () {
  window.location.href = "#gallery";
});

document.getElementById("nav-wishes").addEventListener("click", function () {
  window.location.href = "#wishes";
});

// document.getElementById("copy-rekening").addEventListener("click", function () {
//   var btn = document.getElementById("copy-rekening");
//   var copyText = document.getElementById("rekening");

//   var btnText = btn.textContent;

//   copyText.select();
//   copyText.setSelectionRange(0, 99999);
//   navigator.clipboard.writeText(copyText.value);
//   btn.textContent = "Copied!";

//   setTimeout(() => {
//     btn.textContent = btnText;
//   }, 3000);
// });

function CountDownTimer(dt) {
  var end = new Date(dt);

  var _idDays = "days-to-go";
  var _idHours = "hours-to-go";
  var _idMinutes = "minutes-to-go";
  var _idSeconds = "seconds-to-go";

  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;
  var timer;

  function showRemaining() {
    var now = new Date();
    var distance = end - now;
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById(_idDays).innerHTML = 0;
      document.getElementById(_idHours).innerHTML = 0;
      document.getElementById(_idMinutes).innerHTML = 0;
      document.getElementById(_idSeconds).innerHTML += 0;

      return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById(_idDays).innerHTML = days;
    document.getElementById(_idHours).innerHTML = hours;
    document.getElementById(_idMinutes).innerHTML = minutes;
    document.getElementById(_idSeconds).innerHTML = seconds;
  }

  timer = setInterval(showRemaining, 1000);
}

function audioAutoPlay() {
  var audio = document.getElementById("audio");
  if (audio.paused) {
    audio.play();
  } else {
    // audio.pause();
  }
}

// fetch data
async function getListWishes() {
  const res = await fetch(
    "https://api.mengundang-nikah.id/api/getComment?id_undangan=6",
    {
      headers: {
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin":
          "https://sanjay-intan.mengundang-nikah.id",
      },
    }
  );
  const data = await res.json();

  let container = document.getElementById("wishes-container");
  container.innerHTML = "";

  for (let i = 0; i < data.data.length; i++) {
    let card = document.createElement("div");
    card.setAttribute("id", i);
    card.className =
      "text-cokelat-400 rounded-md bg-white px-5 py-3 mb-3 w-full bg-opacity-80";

    let sectionName = document.createElement("p");
    sectionName.className = "font-bold mb-2";
    sectionName.innerHTML = data.data[i].pengirim;
    card.appendChild(sectionName);

    let sectionWish = document.createElement("p");
    sectionWish.innerHTML = data.data[i].komentar;
    card.appendChild(sectionWish);

    container.appendChild(card);
  }
}

async function submitWishes() {
  let pengirim = document.getElementById("name");
  let isi = document.getElementById("wish");
  let btn = document.getElementById("submit-wishes");
  let initText = btn.innerHTML;
  let recaptchaToken = "";

  grecaptcha.ready(function () {
    grecaptcha
      .execute("6Ld4Y0UgAAAAAPJK5otVSN6DDV-auzSoalH9AQRs", {
        action: "komentar",
      })
      .then(async function (token) {
        if (pengirim.value === "" || isi.value === "") {
          alert("Isi semua form");
          return;
        }

        btn.disabled = true;
        btn.innerHTML = "Tunggu Sebentar...";

        var details = {
          id_undangan: 6,
          pengirim: pengirim.value,
          komentar: isi.value,
          "g-recaptcha-response": token,
        };

        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        try {
          await fetch("https://api.mengundang-nikah.id/sanctum/csrf-cookie");

          const req = await fetch(
            "https://api.mengundang-nikah.id/api/addComment",
            {
              method: "POST",
              headers: {
                "Cache-Control": "no-cache",
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=UTF-8",
                // "Content-Type": "application/json",
                "Access-Control-Allow-Origin":
                  "https://sanjay-intan.mengundang-nikah.id",
              },
              body: formBody,
            }
          );
          const res = await req.json();
          if (res.id != 0) {
            pengirim.value = "";
            isi.value = "";
            await getListWishes();
            alert("Ucapan telah terkirim. Terima kasih.");
          } else {
            alert("Gagal melakukan koneksi ke server");
          }
        } catch (e) {
          console.log(e);
          alert("Gagal melakukan koneksi ke server");
        }

        btn.disabled = false;
        btn.innerHTML = initText;
      });
  });
}

// init
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.untuk;
params.untuk
  ? history.pushState(
      "",
      document.title,
      window.location.pathname + "?untuk=" + value
    )
  : history.pushState("", document.title, window.location.pathname);
scrollTo(0, 0);
document.getElementById("attendance-name").innerHTML = params.untuk;
document.getElementById("name").value = params.untuk;

//YYYY-MM-DD
CountDownTimer("2023-07-09 08:00:00");
document.getElementById("nav").style.display = "none";
document.getElementById("body").style.overflow = "hidden";
getListWishes();
document
  .getElementById("submit-wishes")
  .addEventListener("click", submitWishes);

// hide recaptcha badge
grecaptcha.ready(function () {
  document.getElementsByClassName("grecaptcha-badge")[0].style.display = "none";
});

// var splide = new Splide(".splide");

// splide.on("autoplay:playing", function (rate) {
//   console.log(rate); // 0-1
// });

// splide.mount();

// Copy to Clipboard
function copyFunction() {
  /* Get the text field */
  var copyText = document.getElementById("noRek");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  // alert("Copied the text: " + copyText.value);

  let clip = document.getElementById("clipboard");
  let check2 = document.getElementById("check2");

  clip.classList.add("hidden");
  check2.classList.remove("hidden");

  setTimeout(resetIcon, 1500);
}

function resetIcon() {
  let clip = document.getElementById("clipboard");
  let check2 = document.getElementById("check2");

  clip.classList.remove("hidden");
  check2.classList.add("hidden");
}

function copyFunctionBca() {
  /* Get the text field */
  var copyText = document.getElementById("noRekBca");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  // alert("Copied the text: " + copyText.value);

  let clip = document.getElementById("clipboardBca");
  let check2 = document.getElementById("check2Bca");

  clip.classList.add("hidden");
  check2.classList.remove("hidden");

  setTimeout(resetIconBca, 1500);
}

function resetIconBca() {
  let clip = document.getElementById("clipboardBca");
  let check2 = document.getElementById("check2Bca");

  clip.classList.remove("hidden");
  check2.classList.add("hidden");
}

