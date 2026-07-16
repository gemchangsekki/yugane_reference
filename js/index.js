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
  
  if(moNavUl.classList.contains("is-open")) {
    moNavUl.classList.remove("is-open");
  }
});

const moNavH2 = document.querySelector(".mo-nav-box h2");
const moNavUl = document.querySelector(".mo-nav-box ul");

// 모바일 메뉴 내에 메뉴 드롭다운 토글 기능
moNavH2.addEventListener("click", () => {
  moNavUl.classList.toggle("is-open");
});

const moNavLink = document.querySelectorAll(".mo-nav-link");

// 메뉴 링크 클릭 후 메뉴 창을 닫는 기능
moNavLink.forEach(link => {
  link.addEventListener("click", () => {
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
    heroSecBtn.forEach(btn => btn.classList.remove("active"));

    heroSecImgListItem[index].classList.add("active");
    heroSecBtn[index].classList.add("active");
  });
});

const costSecSwiper = new Swiper(".cost-sec-swiper", {
  autoplay: {
    delay: 3500,
  },
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 45,
    stretch: 0,
    depth: 20,
    modifier: 1,
    slideShadows: false,
  },
  spaceBetween: 50,
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

// function badgeValueCounter(duration) {
//   const badgeValue = document.querySelectorAll(".badge-value");

//   badgeValue.forEach((counter) => {
//     const target = parseInt(counter.getAttribute("data-target"), 10);
//     const start = 0;
//     let startTime = null;

//     function updateCounter(currentTime) {
//       if(!startTime) startTime = currentTime;
//       const elapsedTime = currentTime - startTime;
//       const progress = Math.min(elapsedTime / duration, 1);

//       const currentCount = Math.floor(progress * (target - start) + start);

//       counter.textContent = `${currentCount.toLocaleString()}%`;

//       if(progress < 1) {
//         requestAnimationFrame(updateCounter);
//       }
//     }
//     requestAnimationFrame(updateCounter);
//   });
// }

// 1. 단 하나의 요소를 받아서 카운트를 올리는 함수
function badgeValueCounter(counterElement, duration) {
  const target = parseInt(counterElement.getAttribute("data-target"), 10) || 0;
  const start = 0;
  let startTime = null

  function updateCounter(currentTime) {

    // 요소가 화면 밖으로 나가서 "started" 클래스가 사라지면 애니메이션 취소
    if(!counterElement.classList.contains("started")) return;

    if(!startTime) startTime = currentTime;

    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1)

    const currentCount = Math.floor(progress * (target - start) + start);
    counterElement.textContent = `${currentCount.toLocaleString()}%`;

    if(progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
};

// 2. 스크롤 시 화면에 보이는 요소만 캐치하는 함수
const startCounterOnScroll = () => {

  // .revenue-list 안의 .list-item(혹은 badge-value 자체) 감지
  const revenueList = document.querySelectorAll(".revenue-list .list-item");

  const observerOptions = {
    root: null,
    threshold: 0.2,
  };

  const observerCallback = (entities) => {
    entities.forEach((entry) => {
      const item = entry.target;

      // 실제 숫자가 올라갈 요소를 찾음
      const counterElement = item.querySelector(".badge-value") || item;

      // 1. 요소가 화면에 나타났을 때
      if(entry.isIntersecting) {

        // 이미 실행 중이 아닐 때만 실행
        if(!item.classList.contains("started")) {
          item.classList.add("started"); // 애니메이션 실행 상태 표시
          counterElement.classList.add("started"); // 취소 플래그용 클래스 추가

          // 핵심: 전체가 아니라 현재 화면에 들어온 '그 요소'만 넘겨서 실행!
          badgeValueCounter(counterElement, 800);
        }

        // 2. 요소가 화면 밖으로 완전히 나갔을 때
      } else {
        if(item.classList.contains("started")) {
          item.classList.remove("started");
          counterElement.classList.remove("started"); // "started"를 지워 카운터 함수(updateCounter) 종료 유도

          // 다시 스크롤해서 내려올 때를 위해 초기 상태로 리셋
          counterElement.textContent = "0%";
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  revenueList.forEach((item) => observer.observe(item));
};

window.addEventListener("load", startCounterOnScroll);

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