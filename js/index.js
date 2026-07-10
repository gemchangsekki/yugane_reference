const navigation = document.querySelector(".navigation");

const heroSec = document.getElementById("hero-sec");
const heroSecBtn = document.querySelectorAll("#hero-sec-btn");

AOS.init();

const sections = document.querySelectorAll("#hero-sec, #cost-sec, #revenue-sec, #flow-text-sec, #rolling-card-sec, #inquiry-sec");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if(scrollY > 50) {
    navigation.style.display = "inline";
  } else {
    navigation.style.display = "none";
  }
});

// chatbot button (".chatbot-toggle-btn")
// const chatbotWrap = document.querySelector(".chatbot-wrap");
// const chatbotToggleBtn = document.querySelector(".chatbot-toggle-btn");

// chatbotToggleBtn.addEventListener("click", () => {
//   chatbotWrap.classList.toggle("display-none");
// })

const chatbotToggleBtn = document.querySelectorAll(".chatbot-toggle-btn");

chatbotToggleBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    chatbotToggleBtn.forEach(b => {
      b.classList.toggle("active");
    });
  });
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

// input 전화번호 자동 하이픈 추가
let autoHyphen = (userPhoneNumber) => {
  // 숫자 외의 모든 문자(기존 하이픈 등) 제거
  userPhoneNumber = userPhoneNumber.replace(/[^0-9]/g, '');

  if(userPhoneNumber.length < 4) {
    return userPhoneNumber;
  } else if(userPhoneNumber.length < 7) {
    // 010-123 형태로 반환
    return userPhoneNumber.replace(/(\d{3})(\d{1,3})/, '$1-$2');
  } else if(userPhoneNumber.length < 11) {
    // 010-123-4567 혹은 02-123-4567로 반환
    return userPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  } else {
    // 010-1234-5678 형태로 반환 (최대 11자리)
    // 11자리가 넘어가면 자름
    return userPhoneNumber.slice(0, 11).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
};

let userPhoneNumber = document.querySelector('#inquiry-input-tel');

userPhoneNumber.oninput = (e) => {
  e.target.value = autoHyphen(e.target.value);
};