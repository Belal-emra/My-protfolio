// ================= Dark Mode =================
function toggleDark() {
  document.body.classList.toggle("dark");
}


// ================= قرآن API =================
async function loadAyah() {
  const rand = Math.floor(Math.random() * 6236) + 1;

  const res = await fetch(
    `https://api.alquran.cloud/v1/ayah/${rand}/ar`
  );

  const data = await res.json();

  document.getElementById("ayah").innerText =
    data.data.text;
}

loadAyah();


// ================= حديث =================
const hadiths = [
  "خيركم من تعلم القرآن وعلمه",
  "إنما الأعمال بالنيات",
  "تبسمك في وجه أخيك صدقة",
  "الدال على الخير كفاعله"
];

function loadHadith() {
  document.getElementById("hadithBox").innerText =
    hadiths[Math.floor(Math.random() * hadiths.length)];
}

loadHadith();


// ================= سبحة + حفظ =================
let count = localStorage.getItem("tasbeeh") || 0;
document.getElementById("count").innerText = count;

function tasbeeh() {
  count++;
  localStorage.setItem("tasbeeh", count);
  document.getElementById("count").innerText = count;
}

function resetTasbeeh() {
  count = 0;
  localStorage.setItem("tasbeeh", 0);
  document.getElementById("count").innerText = 0;
}


// ================= تاريخ هجري =================
const today = new Date();

const hijri = new Intl.DateTimeFormat(
  "ar-TN-u-ca-islamic",
  { day: "numeric", month: "long", year: "numeric" }
).format(today);

document.getElementById("hijriDate").innerText = hijri;


// ================= مواقيت الصلاة API =================
navigator.geolocation.getCurrentPosition(async pos => {

  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  const res = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=4`
  );

  const data = await res.json();
  const t = data.data.timings;

  document.getElementById("times").innerHTML = `
    الفجر: ${t.Fajr}<br>
    الظهر: ${t.Dhuhr}<br>
    العصر: ${t.Asr}<br>
    المغرب: ${t.Maghrib}<br>
    العشاء: ${t.Isha}
  `;

});


// ================= القبلة =================
function getQibla() {

  navigator.geolocation.getCurrentPosition(pos => {

    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    const angle = Math.atan2(
      Math.sin(kaabaLon - lon),
      Math.cos(lat) * Math.tan(kaabaLat) -
      Math.sin(lat) * Math.cos(kaabaLon - lon)
    );

    const dir = (angle * 180 / Math.PI).toFixed(2);

    document.getElementById("qiblaResult").innerText =
      "الاتجاه: " + dir + "°";
  });

}
