/* Translation content */
const translations = {
  en: {
    welcome: "Welcome",
    warmInvite: "You are warmly invited to celebrate our wedding",
    openInvitation: "Open Invitation",
    intro: "With great joy, Nouhaila and Badr request the honor of your presence as they celebrate their wedding. Your presence will make this day even more memorable.",
    dateLabel: "Date",
    dateValue: "15 July 2026",
    timeLabel: "Time",
    venueLabel: "Venue",
    cityLabel: "City",
    cityValue: "Fès, Morocco",
    dressLabel: "Dress Code",
    dressValue: "Traditional Moroccan or Formal Attire",
    countdownTitle: "Countdown to Our Wedding",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    timelineTitle: "Wedding Timeline",
    timelineWelcome: "Welcome",
    timelineCeremony: "Wedding Ceremony",
    timelineDinner: "Dinner",
    timelineCelebration: "Celebration",
    viewLocation: "View Location",
    rsvpTitle: "RSVP",
    accept: "Accept Invitation",
    decline: "Regretfully Decline",
    wishes: "Leave Wishes"
  },
  fr: {
    welcome: "Bienvenue",
    warmInvite: "Vous êtes chaleureusement invités à célébrer notre mariage",
    openInvitation: "Ouvrir l’invitation",
    intro: "Avec une grande joie, Nouhaila et Badr vous prient de leur faire l’honneur de votre présence pour célébrer leur mariage. Votre présence rendra cette journée encore plus mémorable.",
    dateLabel: "Date",
    dateValue: "15 juillet 2026",
    timeLabel: "Heure",
    venueLabel: "Lieu",
    cityLabel: "Ville",
    cityValue: "Fès, Maroc",
    dressLabel: "Dress code",
    dressValue: "Tenue marocaine traditionnelle ou tenue formelle",
    countdownTitle: "Compte à rebours",
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
    timelineTitle: "Programme",
    timelineWelcome: "Accueil",
    timelineCeremony: "Cérémonie de mariage",
    timelineDinner: "Dîner",
    timelineCelebration: "Célébration",
    viewLocation: "Voir l’emplacement",
    rsvpTitle: "Réponse",
    accept: "Accepter l’invitation",
    decline: "Décliner avec regret",
    wishes: "Laisser un message"
  },
  ar: {
    welcome: "مرحباً",
    warmInvite: "ندعوكم بكل محبة لمشاركتنا فرحة زفافنا",
    openInvitation: "افتح الدعوة",
    intro: "بكل فرح وسرور، تتشرف نهيلة وبدر بدعوتكم لحضور حفل زفافهما. حضوركم سيجعل هذا اليوم أكثر جمالاً وذكرى.",
    dateLabel: "التاريخ",
    dateValue: "15 يوليوز 2026",
    timeLabel: "الوقت",
    venueLabel: "المكان",
    cityLabel: "المدينة",
    cityValue: "فاس، المغرب",
    dressLabel: "اللباس",
    dressValue: "لباس مغربي تقليدي أو لباس رسمي",
    countdownTitle: "العد التنازلي للزفاف",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
    timelineTitle: "برنامج الحفل",
    timelineWelcome: "الاستقبال",
    timelineCeremony: "حفل الزفاف",
    timelineDinner: "العشاء",
    timelineCelebration: "الاحتفال",
    viewLocation: "عرض الموقع",
    rsvpTitle: "تأكيد الحضور",
    accept: "تأكيد الحضور",
    decline: "الاعتذار عن الحضور",
    wishes: "ترك تهنئة"
  }
};

/* Elements */
const openBtn = document.getElementById("openInvitation");
const hero = document.getElementById("hero");
const invitation = document.getElementById("invitation");
const music = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");
const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");
let musicStarted = false;

/* Door opening interaction */
openBtn.addEventListener("click", async () => {
  document.body.classList.add("opened");
  createParticles(38, "petal");
  createParticles(55, "sparkle");

  try {
    await music.play();
    musicStarted = true;
    musicBtn.classList.add("playing");
  } catch (error) {
    musicStarted = false;
  }

  window.setTimeout(() => {
    hero.setAttribute("aria-hidden", "true");
    invitation.classList.remove("hidden");
    invitation.classList.add("reveal");
    invitation.scrollIntoView({ behavior: "smooth" });
  }, 2650);
});

/* Music control */
musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicStarted = true;
      musicBtn.classList.add("playing");
    } catch (error) {
      musicStarted = false;
    }
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
  }
});

/* Language switch */
langBtn.addEventListener("click", () => {
  langMenu.classList.toggle("open");
});

langMenu.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-lang]");
  if (!button) return;
  setLanguage(button.dataset.lang);
  langMenu.classList.remove("open");
});

function setLanguage(lang) {
  const dictionary = translations[lang] || translations.en;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dictionary[key]) element.textContent = dictionary[key];
  });
}

/* Countdown */
const weddingDate = new Date("2026-07-15T20:00:00+01:00").getTime();
const countdownElements = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function updateCountdown() {
  const now = Date.now();
  const distance = Math.max(weddingDate - now, 0);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdownElements.days.textContent = String(days).padStart(2, "0");
  countdownElements.hours.textContent = String(hours).padStart(2, "0");
  countdownElements.minutes.textContent = String(minutes).padStart(2, "0");
  countdownElements.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

/* Decorative particles */
function createParticles(count, className) {
  const container = document.getElementById(className === "petal" ? "petals" : "sparkles");

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    particle.className = className;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${5 + Math.random() * 6}s`;
    particle.style.animationDelay = `${Math.random() * 1.8}s`;
    particle.style.setProperty("--drift", `${(Math.random() - 0.5) * 180}px`);
    container.appendChild(particle);

    window.setTimeout(() => particle.remove(), 12000);
  }
}

/* Occasional subtle sparkles after opening */
window.setInterval(() => {
  if (document.body.classList.contains("opened")) createParticles(5, "sparkle");
}, 3200);

/* Close language menu when clicking outside */
document.addEventListener("click", (event) => {
  if (!langMenu.contains(event.target) && event.target !== langBtn) {
    langMenu.classList.remove("open");
  }
});
