// 🌙 Dark Mode
document.getElementById("darkToggle").onclick = () =>{
  document.body.classList.toggle("light");
}

// 📜 أحاديث
const hadiths = [
"قال رسول الله ﷺ: خيركم من تعلم القرآن وعلمه",
"إنما الأعمال بالنيات",
"الدال على الخير كفاعله",
"تبسمك في وجه أخيك صدقة"
];

let i = 0;

setInterval(()=>{
document.getElementById("hadithBox").innerText =
hadiths[i];
i = (i+1) % hadiths.length;
},4000);
