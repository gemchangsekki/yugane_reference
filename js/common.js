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
});

heroSecBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
  heroSec.style.background = `url("img/hero-img${index}.png")  no-repeat center / cover`;
  })
});

const costSecSwiper = new Swiper(".cost-sec-swiper", {
  autoplay: {
    delay: 3500,
  },
  spaceBetween: 30,
  slidesPerView: 'auto',
  centeredSlides: true,
  loop: true,
});

const foodCardSwiper = new Swiper(".food-card", {
  autoplay: {
    delay: 3500,
  },
  creativeEffect: {
    prev: {
      rotate: [0, 0, -24],
    },
    next: {
      rotate: [0, 0, 24],
    },
    limitProgress: 3,
  },
  slidesPerView: 3,
  centeredSlides: true,
  effect: 'creative',
  loop: true,
});