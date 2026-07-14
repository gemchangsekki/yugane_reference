const navigation = document.querySelector(".navigation");

const heroSec = document.getElementById("hero-sec");
const heroSecBtn = document.querySelectorAll("#hero-sec-btn");

AOS.init();

const sections = document.querySelectorAll("#hero-sec, #cost-sec, #revenue-sec, #flow-text-sec, #rolling-card-sec, #inquiry-sec");
const menuItems = document.querySelectorAll(".nav-bar > ul > li");

// nav-bar 스크롤시 보이는 기능
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if(scrollY > 50) {
    navigation.style.display = "inline";
  } else {
    navigation.style.display = "none";
  }

  // 현재 section 위치
  let currentId = "";

  sections.forEach((section) => {
    if(scrollY >= section.offsetTop - 150) {
      currentId = section.id;
    }
  });

  // 스크롤시 해당영역 nav-bar에 강조하는 기능
  menuItems.forEach((item) => {
    item.classList.remove("menu-active")

    const link = item.querySelector("a");
    if(link.getAttribute("href") === "#" + currentId) {
      item.classList.add("menu-active");
    }
  });
});

const menuBtn = document.querySelector(".menu-btn");
const moNavBox = document.querySelector(".mo-nav-box");

// 모바일 메뉴 버튼 토클 기능
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("is-open");
  moNavBox.classList.toggle("is-open");
});

const moNavH2 = document.querySelector(".mo-nav-box h2");
const moNavUl = document.querySelector(".mo-nav-box ul");

// 모바일 메뉴 내에 메뉴 드롭다운 토글 기능
moNavH2.addEventListener("click", () => {
  moNavUl.classList.toggle("is-open")
});

const moNavLink = document.querySelectorAll(".mo-nav-link");

// 메뉴 링크 클릭 후 메뉴 창을 닫는 기능
moNavLink.forEach(link => {
  link.addEventListener("click", (e) => {
    menuBtn.classList.remove("is-open");
    moNavBox.classList.remove("is-open");
    moNavUl.classList.remove("is-open");
  })
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

// hero-sec-btn 클릭시 img 변경 기능
heroSecBtn.forEach((button, index) => {
  const heroSecImgListItem = document.querySelectorAll(".hero-sec-img-list-item");
  
  button.addEventListener("click", () => {
    heroSecImgListItem.forEach(li => li.classList.remove("active"));

    heroSecImgListItem[index].classList.add("active");
  });
});

const costSecSwiper = new Swiper(".cost-sec-swiper", {
  autoplay: {
    delay: 3500,
  },
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 15,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
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