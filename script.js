const invitationConfig = {
  weddingDate: "2026-11-14T16:50:00+09:00",
  groom: { ko: "고범종", en: "BEOMJONG", parents: "고만두 · 장조혜" },
  bride: { ko: "손정원", en: "JEONGWON", parents: "김세진" },
  venue: {
    name: "엘마리노 앳 인천",
    address: "인천 중구 서해대로 227",
    naverMap: "https://map.naver.com/p/search/%EC%97%98%EB%A7%88%EB%A6%AC%EB%85%B8%20%EC%95%B3%20%EC%9D%B8%EC%B2%9C/place/2072432778?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=%2Fhome%3Ffrom%3Dmap%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202606272233%26locale%3Dko%26svcName%3Dmap_pcv5%26searchText%3D%EC%97%98%EB%A7%88%EB%A6%AC%EB%85%B8%20%EC%95%B3%20%EC%9D%B8%EC%B2%9C",
  },
  music: "https://hellomybrand.com/wed/audio/3.mp3",
  photos: {
    cover: "./assets/gallery/custom-cover-main.jpg",
    intro: "./assets/gallery/thumbs/JML_6046.JPG",
    groom: "./assets/gallery/custom-groom-about.jpg",
    bride: "./assets/gallery/custom-bride-about.jpg",
  },
};

if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const resetInitialScroll = () => window.scrollTo(0, 0);
resetInitialScroll();
requestAnimationFrame(resetInitialScroll);
requestAnimationFrame(() => requestAnimationFrame(resetInitialScroll));
window.addEventListener("load", () => {
  resetInitialScroll();
  setTimeout(resetInitialScroll, 0);
  setTimeout(resetInitialScroll, 120);
  setTimeout(resetInitialScroll, 420);
});
window.addEventListener("pageshow", () => {
  resetInitialScroll();
  setTimeout(resetInitialScroll, 0);
});
window.addEventListener("beforeunload", resetInitialScroll);

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
setText("remainingNames", "범종♥정원");

document.querySelectorAll(".family-row b span, .profile-grid h3").forEach((element, index) => {
  element.textContent = index % 2 === 0 ? invitationConfig.groom.ko : invitationConfig.bride.ko;
});

Object.entries(invitationConfig.photos).forEach(([key, src]) => {
  document.querySelectorAll(`[data-photo="${key}"]`).forEach((slot) => {
    slot.style.backgroundImage = `url("${src}")`;
    slot.classList.add("has-photo");
  });
});

const setupCoverPetals = () => {
  const layer = document.querySelector(".cover-petals");
  if (!layer) return;
  layer.replaceChildren();
  const petals = 80;
  const topFallCount = 50;
  for (let index = 0; index < petals; index += 1) {
    const petal = document.createElement("span");
    const topFall = index < topFallCount;
    const row = topFall ? index : index - topFallCount;
    const width = topFall ? 5 + (row % 4) : 5 + (row % 3);
    const duration = topFall ? 18 + ((row * 7) % 30) : 24 + ((row * 5) % 34);
    const delay = -((row * 3.7) % duration);
    const rotate = topFall ? -58 + ((row * 29) % 116) : -44 + ((row * 37) % 96);
    const sway = topFall ? -34 + ((row * 17) % 78) : -(58 + ((row * 19) % 92));
    const spinDirection = row % 2 === 0 ? 1 : -1;
    const spinMid = spinDirection * (76 + ((row * 11) % 72));
    const spinEnd = spinDirection * (190 + ((row * 17) % 150));
    petal.classList.toggle("is-side", !topFall);
    petal.style.setProperty("--w", `${width}px`);
    petal.style.setProperty("--dur", `${duration}s`);
    petal.style.setProperty("--delay", `${delay}s`);
    petal.style.setProperty("--r", `${rotate}deg`);
    petal.style.setProperty("--sway", `${sway}px`);
    petal.style.setProperty("--spinMid", `${spinMid}deg`);
    petal.style.setProperty("--spinEnd", `${spinEnd}deg`);
    if (topFall) {
      const startX = -10 + ((row * 11) % 21);
      const endX = sway;
      petal.style.setProperty("--x", `${4 + ((row * 13) % 92)}%`);
      petal.style.setProperty("--startX", `${startX}px`);
      petal.style.setProperty("--midX", `${(startX + endX) / 2}px`);
      petal.style.setProperty("--endX", `${endX}px`);
      petal.style.setProperty("--endY", `${132 + ((row * 3) % 18)}vh`);
      petal.style.setProperty("--top", `${-18 - (row % 5) * 4}vh`);
    } else {
      const startX = 24 + ((row * 9) % 34);
      const endX = -(92 + ((row * 13) % 74));
      const drop = 72 + ((row * 7) % 46);
      petal.style.setProperty("--x", `${94 + ((row * 7) % 18)}%`);
      petal.style.setProperty("--top", `${-8 + ((row * 11) % 48)}vh`);
      petal.style.setProperty("--startX", `${startX}vw`);
      petal.style.setProperty("--midX", `${(startX + endX) / 2}vw`);
      petal.style.setProperty("--endX", `${endX}vw`);
      petal.style.setProperty("--drop", `${drop}vh`);
    }
    layer.appendChild(petal);
  }
};
setupCoverPetals();

const applyStagger = (root, selector) => {
  root.querySelectorAll(selector).forEach((element, index) => element.style.setProperty("--stagger", index));
};
document.querySelectorAll(".section-fade:not(.cover)").forEach((section) => applyStagger(section, ":scope > *"));
document.querySelectorAll(".calendar, .countdown, .profile-grid, .gallery-grid, .route-buttons, .contact-buttons").forEach((group) => applyStagger(group, ":scope > *"));
document.querySelectorAll(".timeline .storyline").forEach((group) => applyStagger(group, ":scope > li"));
document.querySelectorAll(".account").forEach((section) => {
  section.querySelectorAll(":scope > details").forEach((element, index) => element.style.setProperty("--stagger", index + 1));
});

const countdownElement = document.getElementById("countdown");
const remainingDaysElement = document.getElementById("remainingDays");
const targetDate = new Date(invitationConfig.weddingDate);
const updateCountdown = () => {
  const seconds = Math.max(0, Math.floor((targetDate.getTime() - Date.now()) / 1000));
  const values = [Math.floor(seconds / 86400), Math.floor((seconds % 86400) / 3600), Math.floor((seconds % 3600) / 60), seconds % 60];
  countdownElement?.querySelectorAll("b").forEach((element, index) => { element.textContent = String(values[index]); });
  if (remainingDaysElement) remainingDaysElement.textContent = values[0] === 0 ? "오늘" : `${values[0]}일`;
};
updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: "0px 0px -42% 0px", threshold: 0.001 });
document.querySelectorAll(".section-fade").forEach((section) => observer.observe(section));

const coverSection = document.querySelector(".cover");
if (coverSection) {
  const coverMotionObserver = new IntersectionObserver(([entry]) => {
    coverSection.classList.toggle("is-cover-active", entry.isIntersecting);
  }, { threshold: 0.02 });
  coverMotionObserver.observe(coverSection);
}

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
  const played = await playBackgroundMusic();
  if (!played && musicToast) musicToast.textContent = "화면을 터치하면 배경음악이 재생됩니다.";
};
["pointerdown", "touchstart", "click"].forEach((eventName) => {
  document.addEventListener(eventName, () => {
    if (backgroundMusic?.paused) playBackgroundMusic();
  }, { once: true, passive: true });
});
musicToggle?.addEventListener("click", async () => {
  if (!backgroundMusic) return;
  if (backgroundMusic.paused) {
    const played = await playBackgroundMusic();
    if (played && musicToast) musicToast.textContent = "배경음악이 재생되고 있습니다.";
    return;
  }
  backgroundMusic.pause();
  setMusicState(false);
});
backgroundMusic?.addEventListener("pause", () => setMusicState(false));
backgroundMusic?.addEventListener("play", () => setMusicState(true));
setMusicState(false);
tryAutoplay();

const copyText = async (text, successMessage) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }
  if (musicToast) {
    musicToast.textContent = successMessage;
    musicToast.style.animation = "none";
    musicToast.offsetHeight;
    musicToast.style.animation = "";
  }
};
document.getElementById("copyAddressButton")?.addEventListener("click", () => copyText(invitationConfig.venue.address, "식장 주소가 복사되었습니다."));
document.querySelectorAll("[data-copy-account]").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copyAccount, "계좌번호가 복사되었습니다."));
});

const lightbox = document.getElementById("galleryLightbox");
const lightboxImage = lightbox?.querySelector("img");
const galleryImages = Array.from(document.querySelectorAll(".gallery-grid img"));
let activeGalleryIndex = 0;
let dragStartX = 0;
let dragCurrentX = 0;
let dragStartY = 0;
let isDraggingLightbox = false;
const setLightboxImage = () => {
  const image = galleryImages[activeGalleryIndex];
  if (!image || !lightboxImage) return;
  lightboxImage.src = image.dataset.full || image.src;
  lightboxImage.alt = image.alt;
};
const openLightbox = (index) => {
  if (!lightbox || !lightboxImage || !galleryImages.length) return;
  activeGalleryIndex = index;
  setLightboxImage();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};
const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
};
const moveLightbox = (direction) => {
  if (!galleryImages.length || !lightbox || !lightboxImage) return;
  activeGalleryIndex = (activeGalleryIndex + direction + galleryImages.length) % galleryImages.length;
  lightbox.classList.add("is-switching");
  window.setTimeout(() => {
    setLightboxImage();
    lightboxImage.style.transform = "";
    lightbox.classList.remove("is-switching");
  }, 120);
};
galleryImages.forEach((image, index) => image.closest("button")?.addEventListener("click", () => openLightbox(index)));
lightbox?.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
const beginLightboxDrag = (clientX, clientY = 0) => {
  if (!lightbox || !lightboxImage) return;
  isDraggingLightbox = true;
  dragStartX = clientX;
  dragCurrentX = clientX;
  dragStartY = clientY;
  lightbox.classList.add("is-dragging");
};
const updateLightboxDrag = (clientX) => {
  if (!isDraggingLightbox || !lightboxImage) return;
  dragCurrentX = clientX;
  const deltaX = dragCurrentX - dragStartX;
  lightboxImage.style.transform = "translateX(" + deltaX * 0.35 + "px) rotate(" + deltaX * 0.015 + "deg)";
};
const finishLightboxDrag = () => {
  if (!isDraggingLightbox || !lightbox || !lightboxImage) return;
  const deltaX = dragCurrentX - dragStartX;
  isDraggingLightbox = false;
  lightbox.classList.remove("is-dragging");
  lightboxImage.style.transform = "";
  if (Math.abs(deltaX) > 70) moveLightbox(deltaX < 0 ? 1 : -1);
};
lightboxImage?.addEventListener("pointerdown", (event) => { beginLightboxDrag(event.clientX, event.clientY); lightboxImage.setPointerCapture?.(event.pointerId); });
lightboxImage?.addEventListener("pointermove", (event) => updateLightboxDrag(event.clientX));
lightboxImage?.addEventListener("pointerup", finishLightboxDrag);
lightboxImage?.addEventListener("pointercancel", finishLightboxDrag);
lightboxImage?.addEventListener("lostpointercapture", finishLightboxDrag);
lightbox?.addEventListener("touchstart", (event) => { const touch = event.touches[0]; if (touch) beginLightboxDrag(touch.clientX, touch.clientY); }, { passive: true });
lightbox?.addEventListener("touchmove", (event) => {
  if (!isDraggingLightbox) return;
  const touch = event.touches[0];
  if (!touch) return;
  const deltaX = touch.clientX - dragStartX;
  const deltaY = touch.clientY - dragStartY;
  if (Math.abs(deltaX) > Math.abs(deltaY)) event.preventDefault();
  updateLightboxDrag(touch.clientX);
}, { passive: false });
lightbox?.addEventListener("touchend", finishLightboxDrag);
lightbox?.addEventListener("touchcancel", finishLightboxDrag);
document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

document.querySelectorAll('.bottom-actions a[href^="."]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector(link.getAttribute("href"))?.scrollIntoView({ behavior: "smooth" });
  });
});
document.querySelector('.bottom-actions a[href="#weddingDayTitle"]')?.addEventListener("click", (event) => {
  event.preventDefault();
  const weddingSection = document.querySelector(".wedding-day");
  if (!weddingSection) return;
  weddingSection.classList.add("is-visible");
  weddingSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("shareButton")?.addEventListener("click", async () => {
  const shareData = { title: "고범종 · 손정원 모바일 청첩장", text: "2026년 11월 14일 결혼식에 초대합니다.", url: window.location.href };
  if (navigator.share) {
    await navigator.share(shareData);
    return;
  }
  copyText(window.location.href, "청첩장 주소가 복사되었습니다.");
});
