const invitationConfig = {
  weddingDate: "2026-11-14T12:00:00+09:00",
  groom: {
    ko: "고범종",
    en: "BEOMJONG",
    parents: "아버지 · 어머니",
  },
  bride: {
    ko: "손정원",
    en: "JEONGWON",
    parents: "아버지 · 어머니",
  },
  venue: {
    name: "엘마리노 앳 인천",
    address: "인천 중구 서해대로 227",
    naverMap: "https://buly.kr/CrOS1f",
  },
  photos: {
    // 예: cover: "./images/cover.jpg"
    cover: "",
    intro: "",
    groom: "",
    bride: "",
  },
};

const setText = (id, text) => {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
};

setText("groomNameKo", invitationConfig.groom.ko);
setText("brideNameKo", invitationConfig.bride.ko);
setText("groomNameEn", invitationConfig.groom.en);
setText("brideNameEn", invitationConfig.bride.en);
setText("groomParents", invitationConfig.groom.parents);
setText("brideParents", invitationConfig.bride.parents);
setText("remainingNames", `${invitationConfig.groom.ko.slice(1)} ${invitationConfig.bride.ko.slice(1)}`);

document.querySelectorAll(".family-row b span, .profile-grid h3").forEach((element, index) => {
  element.textContent = index % 2 === 0 ? invitationConfig.groom.ko : invitationConfig.bride.ko;
});

Object.entries(invitationConfig.photos).forEach(([key, src]) => {
  if (!src) return;
  document.querySelectorAll(`[data-photo="${key}"]`).forEach((slot) => {
    slot.style.backgroundImage = `url("${src}")`;
    slot.classList.add("has-photo");
  });
});

const applyStagger = (selector) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.style.setProperty("--stagger", index);
  });
};

[
  ".section-fade:not(.cover) > *",
  ".calendar > *",
  ".countdown > *",
  ".profile-grid article",
  ".timeline li",
  ".gallery-grid > *",
  ".route-buttons a",
  ".contact-buttons a",
  ".account details",
].forEach(applyStagger);

const countdownElement = document.getElementById("countdown");
const remainingDaysElement = document.getElementById("remainingDays");
const targetDate = new Date(invitationConfig.weddingDate);

const updateCountdown = () => {
  const diff = targetDate.getTime() - Date.now();
  const seconds = Math.max(0, Math.floor(diff / 1000));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const values = [days, hours, minutes, secs];

  countdownElement?.querySelectorAll("b").forEach((element, index) => {
    element.textContent = String(values[index]);
  });

  if (remainingDaysElement) {
    remainingDaysElement.textContent = days === 0 ? "오늘" : `${days}일`;
  }
};

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.08,
  }
);

document.querySelectorAll(".section-fade").forEach((section) => observer.observe(section));

const musicToggle = document.getElementById("musicToggle");
musicToggle?.addEventListener("click", () => {
  musicToggle.classList.toggle("is-paused");
});

document.querySelectorAll('.bottom-actions a[href^="."]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(link.getAttribute("href"))?.scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("shareButton")?.addEventListener("click", async () => {
  const shareData = {
    title: "고범종 · 손정원 모바일 청첩장",
    text: "2026년 11월 14일 결혼식에 초대합니다.",
    url: window.location.href,
  };

  if (navigator.share) {
    await navigator.share(shareData);
    return;
  }

  await navigator.clipboard?.writeText(window.location.href);
  alert("청첩장 주소가 복사되었습니다.");
});
