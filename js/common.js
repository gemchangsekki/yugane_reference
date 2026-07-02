const navigation = document.querySelector(".navigation");

const heroSec = document.getElementById("hero-sec");
const heroSecBtn = document.querySelectorAll("#hero-sec-btn");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if(scrollY > 50) {
    navigation.style.display = "inline";
  } else {
    navigation.style.display = "none";
  }
})

heroSecBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
  heroSec.style.background = `url("img/hero-img${index}.png")  no-repeat center / cover`;
  })
})

const swiper = new Swiper(".cost-sec-swiper", {
  autoplay: {
    delay: 3500,
  },
  spaceBetween: 30,
  slidePerView: 'auto',
  setOffsetAfter: 0,
  setOffsetBefore: 0,
  centeredSlides: true,
  loop: true,
})