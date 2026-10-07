// ---------- Language switch (English / Japanese) ----------
// English text lives in index.html. Japanese text lives here.
// Each element with data-i18n="key" is swapped using that key.
const ja = {
  nav_about: "自己紹介",
  nav_why: "志望理由",
  nav_school: "学歴",
  nav_skills: "スキル",
  nav_strengths: "強み",
  nav_hobby: "趣味",
  nav_contact: "連絡先",
  hello: "はじめまして、パイです。",
  role: "システムエンジニア志望 · 横浜",
  intro: "日本でシステムエンジニアを目指して勉強しています。誰でも迷わず使えるソフトウェアを作りたいです。",
  for: "TOMATO株式会社 応募用ポートフォリオ",
  btn_contact: "連絡する",
  btn_why: "志望理由を見る",
  about1: "ミャンマー出身で、現在は横浜に住んでいるパイピョカンです。日本語学校を経て、日本工学院専門学校でシステムエンジニアを目指して勉強していて、2027年3月に卒業予定です。",
  about2: "エンジニアを目指したきっかけは、アルバイト先で使った在庫管理システムです。ミスが減り、仕事がスムーズに進むのを見て、システムの力を実感しました。今は、使う人が迷わず使える仕組みをつくれる人になりたいと思っています。",
  why_title: "TOMATO株式会社を志望する理由",
  why1: "私は現場で働く人に寄り添い、誰でも迷わず使えるシステムを開発したいと考え、貴社を志望いたしました。アルバイト先で在庫管理システムに触れ、業務効率化の重要性を実感したことがエンジニアを目指したきっかけです。",
  why2: "専門学校ではJava、Pythonやシステム設計を学び、利用者視点での開発に魅力を感じています。貴社がWebシステムや物流等の幅広い業務システム開発を手掛け、社員の成長や技術育成を大切にされている点に強く惹かれました。",
  why3: "自身の周りの状況を見て行動する力を活かし、将来は利用者に長く愛されるシステムを開発できるエンジニアとして貢献いたします。",
  school1: "日本工学院専門学校（2027年3月卒業見込み）",
  school2: "新宿日本語学校",
  school_text: "専門学校ではJava、Pythonやデータベースなどを学んでいます。一番好きな授業はシステム設計で、利用者の要望を整理し、どのような画面やデータの仕組みが必要かの全体像を考えることに面白さを感じています。授業では、ただ動くだけでなく、使う人が操作しやすい流れを意識して取り組んでいます。",
  sk_java: "専門学校で学んでいます。",
  sk_python: "専門学校で学んでいます。",
  sk_db_t: "データベース",
  sk_db: "専門学校で学んでいます。",
  sk_design_t: "システム設計",
  sk_design: "一番好きな授業です。利用者の要望を整理し、必要な画面とデータの仕組みの全体像を考えます。",
  strengths_title: "私の強み",
  strengths_text: "私の強みは、周りの状況を見て自分から行動できることです。アルバイトでは少人数で店を回す時間帯もあり、混雑時には周りのスタッフと声を掛け合って対応しました。レジが混みそうだと判断した際にはすぐに他のスタッフにレジの応援を頼み、自分は全体の状況を見ながら片付けや次の準備に回るなど、みんなで協力できるように動きました。その結果、忙しい時間帯でもお客様を待たせずにお店をスムーズに回すことができました。",
  hobby_title: "趣味：登山",
  fuji1: "趣味は登山です。初めて高尾山に登ったとき、体力不足を感じました。そこで富士山登頂という目標を立て、毎週末5kmのランニングを続け、経験者に道具の相談をし、ルートも綿密に計画しました。そして無事に登頂できました。",
  fuji2: "開発でも同じように、高い目標を立て、一歩ずつ準備し、最後までやり切りたいです。",
  contact_text: "ご覧いただきありがとうございます。ご連絡はメールが一番確実です。",
  copy: "コピー",
  btn_email: "メールを送る"
};

const items = document.querySelectorAll("[data-i18n]");
const langButton = document.getElementById("lang");

// remember the English text so we can switch back
items.forEach(function (el) {
  el.dataset.en = el.textContent;
});

function setLanguage(lang) {
  items.forEach(function (el) {
    el.textContent = lang === "ja" ? ja[el.dataset.i18n] : el.dataset.en;
  });
  document.documentElement.lang = lang;
  langButton.textContent = lang === "ja" ? "English" : "日本語";
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

langButton.addEventListener("click", function () {
  setLanguage(document.documentElement.lang === "ja" ? "en" : "ja");
});

// use the language the visitor picked last time
try {
  if (localStorage.getItem("lang") === "ja") setLanguage("ja");
} catch (e) {}

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Copy email button ----------
const copyButton = document.getElementById("copy");
const email = document.getElementById("email").textContent;

copyButton.addEventListener("click", function () {
  navigator.clipboard.writeText(email).then(function () {
    const isJa = document.documentElement.lang === "ja";
    copyButton.textContent = isJa ? "コピーしました" : "Copied!";
    setTimeout(function () {
      copyButton.textContent = isJa ? ja.copy : copyButton.dataset.en;
    }, 1500);
  });
});

// ---------- Highlight the nav link of the section you are reading ----------
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".links a");

window.addEventListener("scroll", function () {
  let current = "";
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 140) current = section.id;
  });
  links.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// ---------- Photo moves with the mouse ----------
// The photo tilts toward the mouse. Change 12 to make the tilt weaker or stronger.
const photo = document.querySelector(".photo");
const canHover = window.matchMedia("(hover: hover)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (photo && canHover && !reduceMotion) {
  const photoImg = photo.querySelector("img");

  photo.addEventListener("mousemove", function (e) {
    const box = photo.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;   // -0.5 to 0.5
    const y = (e.clientY - box.top) / box.height - 0.5;
    photoImg.style.transform =
      "rotateY(" + x * 12 + "deg) rotateX(" + (-y * 12) + "deg) scale(1.03)";
  });

  photo.addEventListener("mouseleave", function () {
    photoImg.style.transform = "";
  });
}
