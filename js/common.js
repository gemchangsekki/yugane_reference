const heroSec = document.getElementById("hero-sec");
const heroSecBtn = document.querySelectorAll("#hero-sec-btn");

heroSecBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
  heroSec.style.background = `url("img/hero-img${index}.png")  no-repeat center / cover`;
  })
})