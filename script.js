const invitationConfig = {
  weddingDate: "2026-11-14T16:50:00+09:00",
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
    naverMap:
      "https://map.naver.com/p/search/%EC%97%98%EB%A7%88%EB%A6%AC%EB%85%B8%20%EC%95%B3%20%EC%9D%B8%EC%B2%9C/place/2072432778?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202606272233%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%97%98%EB%A7%88%EB%A6%AC%EB%85%B8%20%EC%95%B3%20%EC%9D%B8%EC%B2%9C",
  },
  music: "https://hellomybrand.com/wed/audio/12.mp3",
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
    rootMargin: "0px 0px 35% 0px",
    threshold: 0.01,
  }
);

document.querySelectorAll(".section-fade").forEach((section) => observer.observe(section));

const musicToggle = document.getElementById("musicToggle");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicToast = document.getElementById("musicToast");
let attemptedAutoplay = false;

if (backgroundMusic) {
  backgroundMusic.src = invitationConfig.music;
  backgroundMusic.volume = 0.5;
}

const setMusicState = (isPlaying) => {
  musicToggle?.classList.toggle("is-paused", !isPlaying);
  musicToggle?.setAttribute("aria-pressed", String(isPlaying));
  musicToggle?.setAttribute("aria-label", isPlaying ? "배경음악 일시정지" : "배경음악 재생");
};

const playBackgroundMusic = async () => {
  if (!backgroundMusic) return false;

  try {
    backgroundMusic.muted = false;
    await backgroundMusic.play();
    setMusicState(true);
    return true;
  } catch {
    setMusicState(false);
    return false;
  }
};

const tryAutoplay = async () => {
  if (attemptedAutoplay) return;
  attemptedAutoplay = true;
  const didPlay = await playBackgroundMusic();

  if (!didPlay) {
    if (musicToast) {
      musicToast.textContent = "화면을 터치하면 배경음악이 재생됩니다.";
    }

    const resumeOnGesture = async () => {
      const played = await playBackgroundMusic();
      if (!played) return;
      document.removeEventListener("pointerdown", resumeOnGesture);
      document.removeEventListener("keydown", resumeOnGesture);
      document.removeEventListener("touchstart", resumeOnGesture);
    };

    document.addEventListener("pointerdown", resumeOnGesture);
    document.addEventListener("keydown", resumeOnGesture);
    document.addEventListener("touchstart", resumeOnGesture);
    return;
  }

  if (musicToast) {
    musicToast.textContent = "배경음악이 재생되고 있습니다.";
  }
};

musicToggle?.addEventListener("click", async () => {
  if (!backgroundMusic) return;

  if (backgroundMusic.paused) {
    const didPlay = await playBackgroundMusic();
    if (!didPlay) {
      setMusicState(false);
      if (musicToast) {
        musicToast.textContent = "브라우저 설정으로 음악을 재생할 수 없습니다.";
      }
    }
    return;
  }

  backgroundMusic.pause();
  setMusicState(false);
});

backgroundMusic?.addEventListener("pause", () => setMusicState(false));
backgroundMusic?.addEventListener("play", () => setMusicState(true));
setMusicState(false);
tryAutoplay();

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
