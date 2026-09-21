import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

const STORAGE_KEY = "tango.app.state";
const VERSION = 2;
const app = document.querySelector("#app");

const icons = {
  home: `<svg class="icon" viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>`,
  learn: `<svg class="icon" viewBox="0 0 24 24"><path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17.5a2.5 2.5 0 0 0-2.5-2.5H5z"/><path d="M5 4.5v15A2.5 2.5 0 0 0 7.5 22H20"/><path d="M9 7h7M9 11h5"/></svg>`,
  rank: `<svg class="icon" viewBox="0 0 24 24"><path d="M8 21V10H4v11M14 21V3h-4v18M20 21v-7h-4v7"/></svg>`,
  collection: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 3c4.5 0 8 2.4 8 5.4v7.1c0 3-3.5 5.4-8 5.4s-8-2.4-8-5.4V8.4C4 5.4 7.5 3 12 3Z"/><path d="M4 8.5c0 3 3.5 5.4 8 5.4s8-2.4 8-5.4"/><path d="M12 6v4"/></svg>`,
  user: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4.2 3.5-6 8-6s7.2 1.8 8 6"/></svg>`,
  sun: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`,
  moon: `<svg class="icon" viewBox="0 0 24 24"><path d="M20.7 15.2A8.6 8.6 0 0 1 8.8 3.3 9 9 0 1 0 20.7 15.2Z"/></svg>`,
  flame: `<svg class="icon" viewBox="0 0 24 24"><path d="M12.5 2.5c1.1 4.8-3.6 5.7-2.2 9.3.5 1.2 1.4 1.8 2.7 1.8 2.2 0 3.6-2.1 2.7-4.4 2.8 2 4.1 4.6 3.2 7.4-.9 2.9-3.5 4.9-6.7 4.9-4.1 0-7.2-3.1-7.2-7.2 0-4.2 3.1-7.1 7.5-11.8Z"/></svg>`,
  coin: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M15 9.5c-.6-.6-1.5-1-2.6-1-1.4 0-2.4.6-2.4 1.7 0 2.8 5 1.1 5 4 0 1.1-1.1 1.8-2.6 1.8-1.2 0-2.2-.4-2.9-1.2M12.5 7v10"/></svg>`,
  heart: `<svg class="icon" viewBox="0 0 24 24"><path d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4L12 22l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z"/></svg>`,
  arrow: `<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  back: `<svg class="icon" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>`,
  close: `<svg class="icon" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
  spark: `<svg class="icon" viewBox="0 0 24 24"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></svg>`,
  check: `<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>`,
  play: `<svg class="icon" viewBox="0 0 24 24"><path d="m8 5 10 7-10 7Z"/></svg>`,
  volume: `<svg class="icon" viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6L8 10H4Z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>`,
  bookmark: `<svg class="icon" viewBox="0 0 24 24"><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z"/></svg>`,
  flag: `<svg class="icon" viewBox="0 0 24 24"><path d="M5 21V4m0 1c4-3 6 2 11-1v9c-5 3-7-2-11 1"/></svg>`,
  skip: `<svg class="icon" viewBox="0 0 24 24"><path d="m5 5 9 7-9 7V5ZM19 5v14"/></svg>`,
  auto: `<svg class="icon" viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0 1.1 4"/><path d="M20 4v7h-7"/></svg>`,
  info: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>`,
  lock: `<svg class="icon" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`,
  share: `<svg class="icon" viewBox="0 0 24 24"><circle cx="18" cy="5" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="19" r="2"/><path d="m8 11 8-5M8 13l8 5"/></svg>`,
  gear: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 2.1-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-3v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-2.1-2.1.1-.1A1.7 1.7 0 0 0 7 15a1.7 1.7 0 0 0-1.5-1H5.3v-3h.2A1.7 1.7 0 0 0 7 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-2.1.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h3v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 2.1 2.1-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v3h-.2a1.7 1.7 0 0 0-1.6 1Z"/></svg>`,
  database: `<svg class="icon" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"/></svg>`,
  chevron: `<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>`
};

const vocab = [
  { id: "environment", word: "environment", kana: "/ɪnˈvaɪrənmənt/", meaning: "環境", options: ["環境", "経験", "証拠", "価値"] },
  { id: "achieve", word: "achieve", kana: "/əˈtʃiːv/", meaning: "達成する", options: ["避ける", "達成する", "説明する", "交換する"] },
  { id: "evidence", word: "evidence", kana: "/ˈevɪdəns/", meaning: "証拠", options: ["価値", "方法", "証拠", "結果"] },
  { id: "develop", word: "develop", kana: "/dɪˈveləp/", meaning: "発達させる", options: ["発達させる", "減らす", "受け取る", "判断する"] },
  { id: "available", word: "available", kana: "/əˈveɪləbl/", meaning: "利用できる", options: ["可能な", "必要な", "特別な", "複雑な"] },
  { id: "relationship", word: "relationship", kana: "/rɪˈleɪʃnʃɪp/", meaning: "関係", options: ["選択", "関係", "習慣", "理由"] },
  { id: "opportunity", word: "opportunity", kana: "/ˌɑːpərˈtuːnəti/", meaning: "機会", options: ["機会", "目的", "変化", "解決"] },
  { id: "experience", word: "experience", kana: "/ɪkˈspɪriəns/", meaning: "経験", options: ["努力", "経験", "意見", "挑戦"] },
  { id: "particularly", word: "particularly", kana: "/pərˈtɪkjələrli/", meaning: "特に", options: ["最近", "特に", "完全に", "急に"] },
  { id: "consequence", word: "consequence", kana: "/ˈkɑːnsɪkwens/", meaning: "結果", options: ["原因", "結果", "段階", "目的"] },
  { id: "independent", word: "independent", kana: "/ˌɪndɪˈpendənt/", meaning: "独立した", options: ["同じ", "独立した", "不安な", "安全な"] },
  { id: "immediately", word: "immediately", kana: "/ɪˈmiːdiətli/", meaning: "すぐに", options: ["おそらく", "すぐに", "たとえば", "別々に"] },
  { id: "communication", word: "communication", kana: "/kəˌmjuːnɪˈkeɪʃn/", meaning: "コミュニケーション", options: ["教育", "会話・通信", "環境", "習慣"] },
  { id: "responsibility", word: "responsibility", kana: "/rɪˌspɑːnsəˈbɪləti/", meaning: "責任", options: ["責任", "可能性", "選択", "関係"] },
  { id: "significant", word: "significant", kana: "/sɪɡˈnɪfɪkənt/", meaning: "重要な", options: ["危険な", "重要な", "便利な", "明確な"] },
  { id: "education", word: "education", kana: "/ˌedʒuˈkeɪʃn/", meaning: "教育", options: ["教育", "研究", "文化", "情報"] },
  { id: "necessary", word: "necessary", kana: "/ˈnesəseri/", meaning: "必要な", options: ["可能な", "必要な", "特別な", "静かな"] },
  { id: "traditional", word: "traditional", kana: "/trəˈdɪʃənl/", meaning: "伝統的な", options: ["現代的な", "伝統的な", "個人的な", "一般的な"] }
];

const sections = [
  { id: 1, title: "基礎を固める", note: "よく使う動詞と基本語", units: ["基本動詞", "日常の名詞", "かんたんな形容詞"] },
  { id: 2, title: "会話を広げる", note: "考えを伝えるための言葉", units: ["気持ちを表す", "つながりの言葉", "学校と社会"] },
  { id: 3, title: "読解に強くなる", note: "長文で出会うキーワード", units: ["抽象語", "論理の言葉", "アカデミック語彙"] }
];

const badges = [
  { id: "first-step", name: "FIRST STEP", note: "最初のレッスン", kind: "achievement" },
  { id: "seven-days", name: "7 DAYS", note: "7日続ける", kind: "achievement" },
  { id: "focus", name: "FOCUS", note: "集中のしるし", kind: "capsule" },
  { id: "sakura-star", name: "SAKURA STAR", note: "春色のしるし", kind: "capsule" },
  { id: "thirty-days", name: "30 DAYS", note: "30日続ける", kind: "achievement" },
  { id: "century", name: "100 DAYS", note: "100日続ける", kind: "achievement" }
];

const themes = [
  { id: "midnight", name: "MIDNIGHT", swatch: "#806fff", desc: "深い夜のパープル" },
  { id: "sakura", name: "SAKURA GLASS", swatch: "#f487b3", desc: "やわらかな桜色" },
  { id: "ocean", name: "OCEAN GLASS", swatch: "#41b3ff", desc: "澄んだ水面の青" },
  { id: "aurora", name: "AURORA", swatch: "#63e9a8", desc: "静かな光のグリーン" }
];

const todayKey = () => new Date().toISOString().slice(0, 10);
const defaultState = () => ({
  version: VERSION,
  xp: 340,
  level: 12,
  coin: 140,
  hp: 4,
  combo: 3,
  streak: 4,
  weeklyXP: 340,
  lastStudyDate: null,
  completedLessons: [],
  words: {},
  savedWords: [],
  difficultWords: [],
  daily: { date: todayKey(), lessons: 0, words: 0, saved: 0 },
  ownedThemes: ["midnight"],
  equippedTheme: "midnight",
  items: { hpStock: 1, streakKeep: 1 },
  ownedBadges: ["first-step", "focus"],
  equippedBadges: ["first-step", "focus"],
  history: [],
  profile: { name: "ミナト", email: "", loggedIn: false },
  settings: { dark: true, sound: true },
  ui: { view: "home", modal: null, rankingTab: "weekly", authTab: "login", auto: false }
});

function mergeState(saved) {
  const fresh = defaultState();
  if (!saved || typeof saved !== "object") return fresh;
  return {
    ...fresh, ...saved,
    daily: { ...fresh.daily, ...(saved.daily || {}) },
    items: { ...fresh.items, ...(saved.items || {}) },
    profile: { ...fresh.profile, ...(saved.profile || {}) },
    settings: { ...fresh.settings, ...(saved.settings || {}) },
    ui: { ...fresh.ui, modal: null, view: "home", ...(saved.ui || {}) }
  };
}

function loadState() {
  try { return mergeState(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
  catch { return defaultState(); }
}
let state = loadState();
let learning = null;
let feverTimer = null;
let autoTimer = null;

function persist() {
  state.version = VERSION;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function resetDailyIfNeeded() {
  if (state.daily.date !== todayKey()) state.daily = { date: todayKey(), lessons: 0, words: 0, saved: 0 };
}
function levelRemaining() { return Math.max(0, 500 - state.xp); }
function levelProgress() { return Math.min(100, (state.xp / 500) * 100); }
function totalCompleted() { return state.completedLessons.length; }
function isUnlocked(lessonIndex) { return lessonIndex <= totalCompleted(); }
function mastery(wordId) { return state.words[wordId]?.mastery ?? 0; }
function masteryText(score) {
  if (score <= 20) return "NEW";
  if (score <= 40) return "LEARNING";
  if (score <= 70) return "GOOD";
  if (score <= 90) return "STRONG";
  return "MASTERED";
}
function wordFontSize(word) {
  return Math.max(22, Math.min(46, Math.round(470 / word.length)));
}
function escapeHTML(s = "") { return String(s).replace(/[&<>'"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" }[c])); }
function badgeName(id) { return badges.find(b => b.id === id)?.name || "BADGE"; }
function toast(message, kind = "normal") {
  let stack = document.querySelector(".toast-stack");
  if (!stack) { stack = document.createElement("div"); stack.className = "toast-stack"; document.body.append(stack); }
  const el = document.createElement("div");
  el.className = `toast ${kind === "good" ? "good" : kind === "bad" ? "bad" : ""}`;
  const symbol = kind === "good" ? icons.check : kind === "bad" ? icons.info : icons.spark;
  el.innerHTML = `<span class="toast-icon">${symbol}</span><span>${escapeHTML(message)}</span>`;
  stack.append(el);
  setTimeout(() => el.remove(), 2850);
}
function haptic(pattern = 10) { if (navigator.vibrate) navigator.vibrate(pattern); }
function tone(type = "good") {
  if (!state.settings.sound || !window.AudioContext && !window.webkitAudioContext) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type = "sine"; osc.frequency.value = type === "fever" ? 659 : type === "bad" ? 180 : 470;
    gain.gain.setValueAtTime(.04, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + (type === "fever" ? .22 : .12));
    osc.connect(gain).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + (type === "fever" ? .22 : .12));
  } catch { /* audio is optional */ }
}
function navHtml(active) {
  const items = [["home", "ホーム", "home"], ["path", "学習", "learn"], ["ranking", "ランキング", "rank"], ["collection", "コレクション", "collection"], ["profile", "マイページ", "user"]];
  return `<nav class="bottom-nav" aria-label="メインナビゲーション">${items.map(([id, label, ico]) => `<button class="nav-item ${active === id ? "active" : ""}" data-nav="${id}" aria-label="${label}">${icons[ico]}<span>${label}</span></button>`).join("")}</nav>`;
}
function topBar(title, action = "") { return `<header class="top-bar"><button class="icon-btn" data-nav="home" aria-label="ホームに戻る">${icons.back}</button><h1>${title}</h1>${action || `<span style="width:44px"></span>`}</header>`; }

function renderHome() {
  const goalDone = state.daily.lessons >= 1;
  const review = vocab.filter(w => state.difficultWords.includes(w.id) || (mastery(w.id) > 0 && mastery(w.id) < 55)).slice(0, 3).length;
  const missionRows = [
    [goalDone, "今日の1レッスンを終える", goalDone ? "できた！ 明日はまた気が向いたら。" : "最低目標はこれだけ。", `${Math.min(state.daily.lessons, 1)} / 1`],
    [state.daily.words >= 3, "3語ふれる", "短くても、ちゃんと積み上がる。", `${Math.min(state.daily.words, 3)} / 3`],
    [state.daily.saved >= 1, "1語を保存・苦手登録", "あとで見返したい言葉を残そう。", `${Math.min(state.daily.saved, 1)} / 1`]
  ];
  return `<main class="screen">
    <header class="home-header"><div class="brand"><span class="brand-mark">T</span><span>TANGO</span></div><div class="header-actions"><button class="icon-btn" data-action="theme" aria-label="${state.settings.dark ? "ライトモードへ" : "ダークモードへ"}">${state.settings.dark ? icons.sun : icons.moon}</button><button class="icon-btn" data-action="profile" aria-label="マイページ">${icons.user}</button></div></header>
    <section class="hero-greeting"><div class="eyebrow">TODAY · ${new Intl.DateTimeFormat("ja-JP", { month: "long", day: "numeric", weekday: "short" }).format(new Date())}</div><h1>今日は、ひとつだけ。</h1><p>1 LESSONできたら、それで十分。</p></section>
    <div class="status-ribbon"><span class="chip">${icons.flame}<b>${state.streak}</b> day streak</span><span class="chip">${icons.coin}<b>${state.coin}</b> coin</span><span class="chip">${icons.heart}<b>${state.hp}/5</b> HP</span></div>
    <section class="level-card"><div class="level-card-top"><div><div class="level-number"><span>LV</span>${state.level}</div><p class="xp-line"><b>${state.xp}</b> / 500 XP</p></div><div class="level-pulse">${icons.spark}</div></div><div class="progress-rail"><div class="progress-bar" style="--progress:${levelProgress()}%"></div></div><div class="level-footer"><span>次のLvまであと ${levelRemaining()} XP</span><span>${Math.round(levelProgress())}%</span></div></section>
    <section class="today-card"><div class="today-head"><h2>今日の最低目標</h2><span class="chip ${goalDone ? "good" : "violet"}">${goalDone ? "COMPLETED" : "1 LESSON"}</span></div><div class="goal-line"><div class="goal-check ${goalDone ? "done" : ""}">${goalDone ? icons.check : icons.play}</div><div><strong>${goalDone ? "今日の分、できました。" : "あと1レッスンでOK"}</strong><span>${goalDone ? "もっとやるのも、ここで終えるのも自由。" : "だいたい2分。気軽にスタート。"}</span></div></div></section>
    <section class="start-card"><div class="eyebrow">NEXT UP</div><h2>UNIT 1 · 基本動詞</h2><p>5語だけ、スクロール感覚で。</p><button class="primary-btn small" data-start="1-1">はじめる ${icons.arrow}</button></section>
    <section><div class="section-head"><h2 class="section-title">Daily Mission</h2><span class="eyebrow">GENTLE</span></div><div class="mission-list">${missionRows.map(([done,title,desc,count]) => `<div class="mission-row"><div class="mission-indicator ${done ? "done" : ""}">${icons.check}</div><div class="mission-text"><strong>${title}</strong><span>${desc}</span></div><span class="mission-progress">${count}</span></div>`).join("")}</div></section>
    <section style="margin-top:25px"><div class="section-head"><h2 class="section-title">復習候補</h2><button class="text-link" data-start="review">${review || 0}語をみる</button></div><div class="review-card"><div class="review-orb">${icons.spark}</div><div><strong>${review ? `気になる ${review} 語があります` : "まだ復習候補はありません"}</strong><span>${review ? "苦手・学習中の言葉を軽く確認。" : "学習した言葉が、ここに並びます。"}</span></div>${review ? `<button class="icon-btn" data-start="review" aria-label="復習を開始">${icons.arrow}</button>` : ""}</div></section>
  </main>`;
}

function renderPath() {
  let globalIndex = 0;
  return `<main class="screen">${topBar("学習パス", `<span class="chip violet">${totalCompleted()} / 27</span>`)}<section class="path-intro"><div class="eyebrow">TANGO PATH</div><h2>順番に、軽く。</h2><p>難しいことは後回し。今できるLESSONだけ、ぽんと押して進めよう。</p></section>${sections.map(section => `<section class="path-section"><div class="path-section-header"><div class="path-section-num">S${section.id}</div><div><h2>${section.title}</h2><p>${section.note}</p></div></div>${section.units.map((unit, ui) => { const currentIndices = [globalIndex++, globalIndex++, globalIndex++]; const unitLocked = !isUnlocked(currentIndices[0]); return `<article class="unit-card ${unitLocked ? "locked" : ""}"><div class="unit-title"><h3>UNIT ${ui + 1} · ${unit}</h3><span>${currentIndices.filter(i => state.completedLessons.includes(i)).length}/3</span></div><div class="lesson-pills">${currentIndices.map((idx, li) => { const done = state.completedLessons.includes(idx); const unlocked = isUnlocked(idx); const className = done ? "complete" : unlocked ? "current" : ""; const lessonId = `${section.id}-${ui + 1}-${li + 1}`; return `<button class="lesson-pill ${className}" ${unlocked ? `data-start="${lessonId}"` : "disabled"} aria-label="LESSON ${li + 1}${unlocked ? "を開始" : "は未解放"}">${done ? icons.check : unlocked ? `L${li + 1}` : icons.lock}</button>`; }).join("")}</div></article>`; }).join("")}</section>`).join("")}</main>`;
}

function makeRanking(tab) {
  const base = [
    ["アカリ", 864, "#d0798d"], ["ソウタ", 731, "#5d9fe3"], ["ユイ", 618, "#8d7bdb"], ["ハル", 553, "#cb9a5e"], ["レナ", 507, "#58b9a8"], ["タクミ", 465, "#d16e9b"], ["カナ", 412, "#8094db"], ["コウ", 382, "#cc8453"], ["ナナ", 346, "#889e68"], ["ミオ", 309, "#b477d5"], ["リク", 281, "#58a6b8"] ];
  const multiplier = tab === "today" ? .13 : tab === "streak" ? .035 : 1;
  const scored = base.map(([name, score, color]) => ({ name, score: Math.max(1, Math.round(score * multiplier)), color }));
  const userScore = tab === "today" ? Math.max(0, Math.round(state.daily.words * 10 + state.daily.lessons * 15)) : tab === "streak" ? state.streak : state.weeklyXP;
  scored.push({ name: state.profile.name || "あなた", score: userScore, color: "#8b7af0", self: true });
  scored.sort((a, b) => b.score - a.score);
  return scored;
}
function rankZone(pos) { return pos <= 3 ? ["↑ 昇格圏", "up"] : pos <= 9 ? ["— 維持圏", "stay"] : ["↓ 降格圏", "down"]; }
function renderRanking() {
  const tab = state.ui.rankingTab || "weekly";
  const rows = makeRanking(tab); const myRank = rows.findIndex(r => r.self) + 1; const [zone, zoneClass] = rankZone(myRank);
  return `<main class="screen">${topBar("ランキング")}<p class="muted" style="font-size:12px;margin:-11px 2px 0">今週の自分の位置を、さっと確認。</p><div class="segmented"><button data-rank-tab="today" class="${tab === "today" ? "active" : ""}">TODAY</button><button data-rank-tab="weekly" class="${tab === "weekly" ? "active" : ""}">WEEKLY</button><button data-rank-tab="streak" class="${tab === "streak" ? "active" : ""}">STREAK</button></div><section class="rank-summary"><div class="rank-place">${myRank}<small>th</small></div><div><h2>${tab === "weekly" ? zone : tab === "today" ? "今日の参考順位" : "継続の参考順位"}</h2><p>${tab === "weekly" ? "今週のXPでリーグが決まります。" : "端末内のデモデータと比較しています。"}</p></div></section>${tab === "weekly" ? `<div class="zone-guide"><div class="zone up">↑ 1–3位<br>昇格</div><div class="zone stay">— 4–9位<br>維持</div><div class="zone down">↓ 10–12位<br>降格</div></div>` : ""}<section class="rank-list">${rows.map((row, i) => { const pos = i + 1; return `<div class="rank-row ${row.self ? "self" : ""} ${tab === "weekly" && pos === 3 ? "boundary-up" : ""} ${tab === "weekly" && pos === 9 ? "boundary-down" : ""}"><span class="rank-num">${pos}</span><div class="rank-user"><span class="avatar" style="--avatar:${row.color}">${row.name.slice(0, 1)}</span><span>${row.name}${row.self ? " <small style=\"color:var(--violet-bright)\">YOU</small>" : ""}</span></div><span class="rank-xp">${row.score}${tab === "streak" ? " days" : " XP"}</span></div>`; }).join("")}</section><p class="demo-label">端末内のデモユーザーランキングです。オンライン順位ではありません。</p></main>`;
}

function renderCollection() {
  const unlocked = new Set(state.ownedThemes);
  return `<main class="screen">${topBar("コレクション")}<section class="capsule-hero"><div class="capsule-visual">${icons.spark}</div><div class="eyebrow">ITEM CAPSULE</div><h2>100 COINで、ひとつ。</h2><p>テーマや小さな助けを、ゆるく集めよう。</p><button class="primary-btn" data-action="capsule" ${state.coin < 100 ? "disabled" : ""}>${icons.coin} 100 COINで引く <span style="margin-left:auto">${state.coin}</span></button></section><section class="collection-section"><div class="section-head"><h2 class="section-title">所持アイテム</h2><span class="eyebrow">INVENTORY</span></div><div class="settings-list"><div class="item-row"><div class="item-icon">${icons.heart}</div><div class="item-copy"><strong>HP回復ストック</strong><span>HPが必要なときに使える。</span></div><span class="item-count">×${state.items.hpStock}</span><button class="outline-btn" data-action="use-hp" ${state.items.hpStock < 1 || state.hp >= 5 ? "disabled" : ""}>使う</button></div><div class="item-row"><div class="item-icon">${icons.flame}</div><div class="item-copy"><strong>Streak Keep</strong><span>続けられなかった日の保護。</span></div><span class="item-count">×${state.items.streakKeep}</span></div></div></section><section class="collection-section"><div class="section-head"><h2 class="section-title">テーマ</h2><span class="eyebrow">LOOK</span></div><div class="theme-grid">${themes.map(theme => `<button class="theme-card ${state.equippedTheme === theme.id && state.settings.dark ? "active" : ""}" style="--swatch:${theme.swatch}" data-equip-theme="${theme.id}" ${unlocked.has(theme.id) ? "" : "disabled"}><span>${unlocked.has(theme.id) ? state.equippedTheme === theme.id ? "EQUIPPED" : "EQUIP" : "LOCKED"}</span><strong>${theme.name}</strong></button>`).join("")}</div></section><section class="collection-section"><div class="section-head"><h2 class="section-title">バッジ</h2><button class="text-link" data-action="badges">編集</button></div><div class="badge-tray">${state.equippedBadges.length ? state.equippedBadges.map(id => `<div class="badge-token">${icons.spark}<span>${badgeName(id)}</span></div>`).join("") : `<div class="empty-note" style="width:100%">プロフィールに飾りたいバッジを選ぼう。</div>`}</div></section><section class="collection-section"><div class="section-head"><h2 class="section-title">獲得履歴</h2><span class="eyebrow">RECENT</span></div>${state.history.length ? `<div class="settings-list">${state.history.slice(0, 3).map(item => `<div class="item-row"><div class="item-icon">${icons.spark}</div><div class="item-copy"><strong>${item.name}</strong><span>${item.date}</span></div></div>`).join("")}</div>` : `<div class="empty-note">ITEM CAPSULEを引くと履歴がここに残ります。</div>`}</section></main>`;
}

function renderProfile() {
  const initial = (state.profile.name || "ミ").slice(0, 1);
  return `<main class="screen">${topBar("マイページ", `<button class="icon-btn" data-action="share" aria-label="プロフィールを共有">${icons.share}</button>`)}<section class="profile-hero"><div class="profile-head"><div class="profile-avatar">${initial}</div><div><h2>${escapeHTML(state.profile.name || "ミナト")}</h2><p>${state.profile.loggedIn ? escapeHTML(state.profile.email || "TANGO Account") : "ローカル学習データ"}</p></div></div><div class="profile-stats"><div class="profile-stat"><b>${state.level}</b><span>LV</span></div><div class="profile-stat"><b>${state.xp}</b><span>XP</span></div><div class="profile-stat"><b>${state.streak}</b><span>STREAK</span></div><div class="profile-stat"><b>${state.coin}</b><span>COIN</span></div></div><div class="badge-tray">${state.equippedBadges.length ? state.equippedBadges.map(id => `<div class="badge-token">${icons.spark}<span>${badgeName(id)}</span></div>`).join("") : `<span class="muted" style="font-size:11px">バッジを選んでプロフィールを飾ろう。</span>`}</div></section><section class="settings-group"><h2>PROFILE</h2><div class="settings-list"><button class="setting-row" data-action="badges"><span class="setting-icon">${icons.spark}</span><strong>プロフィールバッジ</strong><span>${state.equippedBadges.length}/3</span>${icons.chevron}</button><button class="setting-row" data-action="share"><span class="setting-icon">${icons.share}</span><strong>プロフィールを共有</strong><span>Lv・Streak・Badge</span>${icons.chevron}</button></div></section><section class="settings-group"><h2>ACCOUNT</h2><div class="settings-list"><button class="setting-row" data-action="login"><span class="setting-icon">${icons.user}</span><strong>${state.profile.loggedIn ? "アカウント" : "ログイン / 会員登録"}</strong><span>${state.profile.loggedIn ? "接続済み" : "同期の準備"}</span>${icons.chevron}</button></div></section><section class="settings-group"><h2>SETTINGS</h2><div class="settings-list"><button class="setting-row" data-action="theme"><span class="setting-icon">${state.settings.dark ? icons.moon : icons.sun}</span><strong>表示モード</strong><span>${state.settings.dark ? "ダーク" : "ライト"}</span>${icons.chevron}</button><div class="setting-row"><span class="setting-icon">${icons.volume}</span><strong>サウンド & Haptics</strong><button class="toggle ${state.settings.sound ? "on" : ""}" data-action="sound" aria-label="サウンド切替"><i></i></button></div></div></section><section class="settings-group"><h2>DATA</h2><div class="settings-list"><button class="setting-row" data-action="data-info"><span class="setting-icon">${icons.database}</span><strong>この端末の学習データ</strong><span>localStorage</span>${icons.chevron}</button></div></section></main>`;
}

function renderModal() {
  const modal = state.ui.modal;
  if (!modal) return "";
  if (modal === "login") {
    const signup = state.ui.authTab === "signup";
    return `<div class="modal-backdrop" data-close-modal><section class="modal" role="dialog" aria-modal="true" aria-labelledby="auth-title"><div class="modal-head"><div><div class="eyebrow">TANGO ACCOUNT</div><h2 id="auth-title">${signup ? "会員登録" : "ログイン"}</h2></div><button class="icon-btn" data-action="close-modal" aria-label="閉じる">${icons.close}</button></div><p class="modal-sub">学習データの同期に備えたアカウント画面です。</p><div class="auth-tabs"><button data-auth-tab="login" class="${!signup ? "active" : ""}">ログイン</button><button data-auth-tab="signup" class="${signup ? "active" : ""}">会員登録</button></div><form id="auth-form"><div class="field"><label for="email">メールアドレス</label><input id="email" name="email" type="email" required placeholder="you@example.com" /></div><div class="field"><label for="password">パスワード</label><input id="password" name="password" type="password" minlength="6" required placeholder="6文字以上" /></div><button class="primary-btn" type="submit">${signup ? "会員登録する" : "ログインする"} ${icons.arrow}</button></form><p class="firebase-note">${isFirebaseConfigured() ? "Firebase Authenticationを利用できます。" : "Firebaseは未設定です。現在はこの端末だけで安全に学習を続けられます。設定は firebase-config.js に分けてあります。"}</p></section></div>`;
  }
  if (modal === "badges") {
    return `<div class="modal-backdrop" data-close-modal><section class="modal" role="dialog" aria-modal="true"><div class="modal-head"><div><div class="eyebrow">PROFILE BADGES</div><h2>バッジを選ぶ</h2></div><button class="icon-btn" data-action="close-modal" aria-label="閉じる">${icons.close}</button></div><p class="modal-sub">プロフィールには最大3個まで装備できます。</p><div class="badge-options">${badges.map(b => { const owned = state.ownedBadges.includes(b.id); const active = state.equippedBadges.includes(b.id); return `<button class="badge-choice ${active ? "active" : ""}" data-badge="${b.id}" ${owned ? "" : "disabled"}>${active ? "● " : "○ "}${b.name}<br><span style="color:var(--muted);font-family:var(--font)">${owned ? b.note : "未獲得"}</span></button>`; }).join("")}</div></section></div>`;
  }
  if (modal === "data") return `<div class="modal-backdrop" data-close-modal><section class="modal" role="dialog" aria-modal="true"><div class="modal-head"><div><div class="eyebrow">LOCAL DATA</div><h2>この端末に保存中</h2></div><button class="icon-btn" data-action="close-modal" aria-label="閉じる">${icons.close}</button></div><p class="modal-sub">XP、コイン、HP、単語ごとの習熟度、苦手・保存語、進捗、ミッション、テーマ、バッジ、週間XP、設定はこのブラウザのlocalStorageに保存されています。</p><div class="firebase-note">アプリの更新時にデータが壊れないよう、保存データにはバージョンを持たせています。ブラウザのサイトデータを削除すると、デモデータも削除されます。</div></section></div>`;
  if (modal.startsWith("capsule:")) {
    const prize = modal.slice(8);
    return `<div class="modal-backdrop" data-close-modal><section class="modal capsule-result" role="dialog" aria-modal="true"><div class="eyebrow">ITEM CAPSULE</div><div class="capsule-visual pop">${icons.spark}</div><h3>${escapeHTML(prize)}</h3><p>コレクションに追加しました。</p><button class="primary-btn" data-action="close-modal">コレクションへ</button></section></div>`;
  }
  return "";
}

function renderApp() {
  resetDailyIfNeeded();
  clearAuto();
  const active = state.ui.view;
  document.body.dataset.theme = state.settings.dark ? state.equippedTheme : "light";
  const main = active === "home" ? renderHome() : active === "path" ? renderPath() : active === "ranking" ? renderRanking() : active === "collection" ? renderCollection() : renderProfile();
  app.innerHTML = `<div class="app-shell">${main}${navHtml(active)}${renderModal()}</div>`;
  persist();
}

function parseLessonIndex(id) {
  const nums = String(id).split("-").map(Number);
  if (nums.length === 3 && nums.every(Number.isFinite)) return (nums[0] - 1) * 9 + (nums[1] - 1) * 3 + (nums[2] - 1);
  return 0;
}
function chooseLessonWords(lessonIndex) {
  const start = (lessonIndex * 5) % vocab.length;
  const selection = [];
  for (let i = 0; i < 5; i++) selection.push(vocab[(start + i) % vocab.length]);
  return selection;
}
function chooseReviewWords() {
  const candidates = vocab.slice().sort((a, b) => scoreForReview(b) - scoreForReview(a));
  return candidates.slice(0, 5);
}
function scoreForReview(word) {
  const d = state.words[word.id] || {}; const elapsed = d.lastSeen ? Math.min(50, Math.floor((Date.now() - d.lastSeen) / 86400000) * 7) : 20;
  return (100 - (d.mastery ?? 0)) + (d.wrong || 0) * 20 + (state.difficultWords.includes(word.id) ? 38 : 0) + (state.savedWords.includes(word.id) ? 8 : 0) + elapsed;
}
function startLearning(id) {
  const lessonIndex = id === "review" ? -1 : parseLessonIndex(id);
  if (lessonIndex >= 0 && !isUnlocked(lessonIndex)) { toast("このLESSONはまだ未解放です。", "bad"); return; }
  const words = id === "review" ? chooseReviewWords() : chooseLessonWords(lessonIndex);
  learning = { id, lessonIndex, words, index: 0, revealed: false, testAnswered: false, auto: false, completed: false };
  state.ui.view = "learn"; state.ui.modal = null; renderLearning();
}
function currentWord() { return learning?.words[learning.index]; }
function isTest() { return learning && learning.index === 3; }
function renderLearning() {
  if (!learning) { state.ui.view = "home"; renderApp(); return; }
  document.body.dataset.theme = state.settings.dark ? state.equippedTheme : "light";
  const word = currentWord(); const test = isTest(); const progress = ((learning.index) / learning.words.length) * 100;
  const saved = state.savedWords.includes(word.id); const difficult = state.difficultWords.includes(word.id);
  const wordStage = test ? renderQuickTest(word) : `<div class="word-card" id="word-card"><div class="word-count">WORD ${String(learning.index + 1).padStart(2, "0")} / 05</div><div class="word-english" id="word-text" style="font-size:${wordFontSize(word.word)}px">${word.word}</div><div class="word-phonetic">${word.kana}</div><div class="tap-hint ${learning.revealed ? "" : ""}" id="tap-hint">${learning.revealed ? "意味を見たら、左右にスワイプ。" : `<span class="tap-dot"></span>タップして意味を見る`}</div><div class="translation-wrap ${learning.revealed ? "show" : ""}" id="translation"><div class="translation-label">JAPANESE</div><div class="translation">${word.meaning}</div></div></div><div class="swipe-guide ${learning.revealed ? "show" : ""}" id="swipe-guide"><span class="no">← 覚えてない</span><span class="yes">覚えた →</span></div>`;
  app.innerHTML = `<div class="app-shell learn-screen"><main class="screen learn-screen"><header class="learn-top"><button class="icon-btn" data-action="exit-learn" aria-label="学習を終了">${icons.close}</button><div class="learn-progress"><small>${test ? "QUICK TEST" : "FOR YOU"}</small><div class="progress-rail"><div class="progress-bar" style="--progress:${progress}%"></div></div></div><button class="icon-btn" data-action="learn-info" aria-label="学習情報">${icons.info}</button></header><div class="learn-meta"><span>${masteryText(mastery(word.id))} · ${mastery(word.id)}%</span><span class="combo">${state.combo ? `${state.combo} COMBO` : ""}</span></div>${state.fever ? `<div class="fever-banner show" id="fever">${icons.spark} FEVER · XP ×2 · ${state.feverSeconds || 20}s</div>` : ""}<div class="word-stage" id="word-stage">${wordStage}</div><aside class="action-rail" aria-label="学習アクション"><div class="action-stack"><button class="action-orb" data-learn-action="pronounce" aria-label="発音">${icons.volume}</button><span>発音</span></div><div class="action-stack"><button class="action-orb ${saved ? "active" : ""}" data-learn-action="save" aria-label="保存">${icons.bookmark}</button><span>保存</span></div><div class="action-stack"><button class="action-orb ${difficult ? "active" : ""}" data-learn-action="difficult" aria-label="苦手">${icons.flag}</button><span>苦手</span></div><div class="action-stack"><button class="action-orb" data-learn-action="skip" aria-label="スキップ">${icons.skip}</button><span>スキップ</span></div><div class="action-stack"><button class="action-orb ${learning.auto ? "active" : ""}" data-learn-action="auto" aria-label="自動">${icons.auto}</button><span>自動</span></div><div class="action-stack"><button class="action-orb" data-learn-action="detail" aria-label="詳細">${icons.info}</button><span>詳細</span></div></aside>${!test ? `<div class="learn-actions"><button class="learn-answer no" id="no-answer" ${learning.revealed ? "" : "disabled"}>← 覚えてない</button><button class="learn-answer yes" id="yes-answer" ${learning.revealed ? "" : "disabled"}>覚えた →</button></div>` : ""}</main></div>`;
  persist();
  setupLearningEvents();
  if (learning.auto && !test) scheduleAuto();
}
function renderQuickTest(word) {
  const letters = ["A", "B", "C", "D"];
  const correctIndex = word.options.indexOf(word.meaning);
  return `<section class="quick-test"><div class="test-label">QUICK TEST</div><h2>${word.word}</h2><p>この単語の意味は？</p><div class="answers">${word.options.map((option, i) => `<button class="answer-btn" data-test-answer="${i}"><span class="answer-letter">${letters[i]}</span><strong>${option}</strong></button>`).join("")}</div><div id="test-result" class="test-result"></div></section>`;
}
function setupLearningEvents() {
  const stage = document.querySelector("#word-stage");
  const card = document.querySelector("#word-card");
  if (!stage || isTest()) return;
  let startX = 0; let deltaX = 0; let moved = false;
  stage.addEventListener("pointerdown", e => { startX = e.clientX; deltaX = 0; moved = false; card?.setPointerCapture?.(e.pointerId); });
  stage.addEventListener("pointermove", e => {
    deltaX = e.clientX - startX; if (Math.abs(deltaX) > 8) moved = true;
    if (learning.revealed && card) { card.classList.add("dragging"); card.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 32}deg)`; }
  });
  stage.addEventListener("pointerup", () => {
    if (!learning) return;
    if (learning.revealed && Math.abs(deltaX) > 70) { animateSwipe(deltaX > 0); return; }
    if (!moved && !learning.revealed) revealCurrent();
    if (card) { card.classList.remove("dragging"); card.style.transform = ""; }
  });
  document.querySelector("#yes-answer")?.addEventListener("click", () => animateSwipe(true));
  document.querySelector("#no-answer")?.addEventListener("click", () => animateSwipe(false));
}
function revealCurrent() {
  if (!learning || learning.revealed || isTest()) return;
  learning.revealed = true;
  document.querySelector("#translation")?.classList.add("show");
  const hint = document.querySelector("#tap-hint"); if (hint) hint.textContent = "意味を見たら、左右にスワイプ。";
  document.querySelector("#swipe-guide")?.classList.add("show");
  document.querySelector("#yes-answer")?.removeAttribute("disabled"); document.querySelector("#no-answer")?.removeAttribute("disabled");
  haptic(8);
}
function animateSwipe(known) {
  if (!learning || !learning.revealed) return;
  const card = document.querySelector("#word-card");
  if (card) card.classList.add(known ? "is-out-right" : "is-out-left");
  setTimeout(() => applyAnswer(known), 165);
}
function updateWordData(word, known) {
  const existing = state.words[word.id] || { mastery: 0, correct: 0, wrong: 0, lastSeen: 0 };
  existing.mastery = Math.max(0, Math.min(100, existing.mastery + (known ? 16 : -12)));
  existing.correct += known ? 1 : 0; existing.wrong += known ? 0 : 1; existing.lastSeen = Date.now();
  state.words[word.id] = existing;
}
function addRewards(known) {
  const beforeCapsules = Math.floor(state.coin / 100);
  const multiplier = state.fever ? 2 : 1;
  const xpGain = (known ? 10 : 3) * multiplier; const coinGain = (known ? 5 : 1) * multiplier;
  state.xp += xpGain; state.coin += coinGain; state.weeklyXP += xpGain;
  while (state.xp >= 500) { state.xp -= 500; state.level += 1; toast(`Lv ${state.level} にアップ！`, "good"); }
  const afterCapsules = Math.floor(state.coin / 100);
  if (afterCapsules > beforeCapsules) toast("ガチャを1回引けます", "good");
  if (known) {
    state.combo += 1; tone("good"); haptic(12);
    if (state.combo > 0 && state.combo % 7 === 0) startFever();
  } else {
    state.combo = 0; state.hp = Math.max(0, state.hp - 1); state.fever = false; clearFever(); tone("bad"); haptic([15, 35, 15]);
  }
}
function startFever() {
  state.fever = true; state.feverSeconds = 20; tone("fever"); toast("FEVER TIME — XPとCoinが2倍！", "good");
  clearFever();
  feverTimer = setInterval(() => { if (!state.fever) return clearFever(); state.feverSeconds -= 1; const banner = document.querySelector("#fever"); if (banner) banner.innerHTML = `${icons.spark} FEVER · XP ×2 · ${state.feverSeconds}s`; if (state.feverSeconds <= 0) { state.fever = false; clearFever(); toast("Fever Time 終了。", "normal"); } persist(); }, 1000);
}
function clearFever() { if (feverTimer) { clearInterval(feverTimer); feverTimer = null; } }
function clearAuto() { if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; } }
function scheduleAuto() { clearAuto(); autoTimer = setTimeout(() => { if (!learning || !learning.auto || isTest()) return; if (!learning.revealed) revealCurrent(); autoTimer = setTimeout(() => { if (learning?.auto) animateSwipe(true); }, 1050); }, 900); }
function applyAnswer(known) {
  if (!learning) return;
  const word = currentWord(); updateWordData(word, known); addRewards(known); state.daily.words += 1; persist();
  learning.index += 1; learning.revealed = false; learning.testAnswered = false;
  if (learning.index >= learning.words.length) return finishLearning();
  renderLearning();
}
function testAnswer(choice) {
  if (!learning || learning.testAnswered) return;
  const word = currentWord(); const correct = word.options[choice] === word.meaning; learning.testAnswered = true;
  document.querySelectorAll("[data-test-answer]").forEach(btn => { const isCorrect = word.options[Number(btn.dataset.testAnswer)] === word.meaning; btn.disabled = true; if (isCorrect) btn.classList.add("correct"); else if (Number(btn.dataset.testAnswer) === choice) btn.classList.add("wrong"); });
  const result = document.querySelector("#test-result"); if (result) { result.className = `test-result ${correct ? "good" : "bad"}`; result.textContent = correct ? "正解！ この調子。" : `おしい。正解は「${word.meaning}」。`; }
  setTimeout(() => applyAnswer(correct), 780);
}
function finishLearning() {
  clearAuto(); clearFever();
  state.fever = false;
  const wasLesson = learning.lessonIndex >= 0; const completedIndex = learning.lessonIndex;
  if (wasLesson && !state.completedLessons.includes(completedIndex)) {
    state.completedLessons.push(completedIndex); state.completedLessons.sort((a,b) => a-b); state.daily.lessons += 1;
    const oldDate = state.lastStudyDate; const today = todayKey();
    if (oldDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
      if (oldDate && oldDate !== yesterday) { if (state.items.streakKeep > 0) { state.items.streakKeep -= 1; toast("Streak Keep が今日をつなぎました。", "good"); } else state.streak = 1; }
      else state.streak += 1;
      state.lastStudyDate = today;
    }
    if (!state.ownedBadges.includes("first-step")) state.ownedBadges.push("first-step");
    toast("1 LESSON 完了。今日の最低目標を達成！", "good");
  } else toast("復習、おつかれさま。", "good");
  state.ui.view = "home"; learning = null; persist(); renderApp();
}
function learnAction(action) {
  if (!learning) return;
  const word = currentWord();
  if (action === "pronounce") { const utterance = new SpeechSynthesisUtterance(word.word); utterance.lang = "en-US"; utterance.rate = .85; speechSynthesis.cancel(); speechSynthesis.speak(utterance); haptic(7); }
  if (action === "save" || action === "difficult") { const key = action === "save" ? "savedWords" : "difficultWords"; const item = state[key]; const on = item.includes(word.id); state[key] = on ? item.filter(id => id !== word.id) : [...item, word.id]; if (!on) { state.daily.saved += 1; toast(action === "save" ? "保存しました。" : "苦手リストに入れました。", "good"); } persist(); renderLearning(); }
  if (action === "skip") { toast("スキップしました。あとでまた出会えます。", "normal"); learning.index += 1; learning.revealed = false; if (learning.index >= learning.words.length) finishLearning(); else renderLearning(); }
  if (action === "auto") { learning.auto = !learning.auto; toast(learning.auto ? "自動送りをオンにしました。" : "自動送りをオフにしました。"); renderLearning(); }
  if (action === "detail") { toast(`${word.word} · 習熟度 ${mastery(word.id)}%（${masteryText(mastery(word.id))}）`); }
}
function useCapsule() {
  if (state.coin < 100) return;
  state.coin -= 100; const awards = [
    { name: "SAKURA GLASS テーマ", grant: () => addTheme("sakura") },
    { name: "OCEAN GLASS テーマ", grant: () => addTheme("ocean") },
    { name: "AURORA テーマ", grant: () => addTheme("aurora") },
    { name: "HP +1", grant: () => { const wasFull = state.hp >= 5; state.hp = Math.min(5, state.hp + 1); if (wasFull) state.items.hpStock += 1; } },
    { name: "HP回復ストック", grant: () => state.items.hpStock += 1 },
    { name: "Streak Keep", grant: () => state.items.streakKeep += 1 },
    { name: "FOCUS バッジ", grant: () => addBadge("focus") },
    { name: "SAKURA STAR バッジ", grant: () => addBadge("sakura-star") }
  ];
  const award = awards[Math.floor(Math.random() * awards.length)]; award.grant(); state.history.unshift({ name: award.name, date: new Intl.DateTimeFormat("ja-JP", { month: "numeric", day: "numeric" }).format(new Date()) }); state.history = state.history.slice(0, 8); state.ui.modal = `capsule:${award.name}`; tone("fever"); haptic(18); persist(); renderApp();
}
function addTheme(theme) { if (!state.ownedThemes.includes(theme)) state.ownedThemes.push(theme); }
function addBadge(badge) { if (!state.ownedBadges.includes(badge)) state.ownedBadges.push(badge); }
function toggleBadge(id) {
  const active = state.equippedBadges.includes(id);
  if (active) state.equippedBadges = state.equippedBadges.filter(b => b !== id);
  else { if (state.equippedBadges.length >= 3) { toast("バッジは3個まで選択できます", "bad"); return; } state.equippedBadges.push(id); }
  persist(); renderApp();
}
function shareProfile() {
  const text = `TANGO｜Lv ${state.level} · ${state.streak} day streak\n${state.equippedBadges.map(badgeName).join(" · ") || "Badgeを集め中"}`;
  if (navigator.share) navigator.share({ title: "TANGO", text }).catch(() => {});
  else if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast("共有用テキストをコピーしました。", "good")).catch(() => toast(text));
  else toast(text);
}
function handleAuth(form) {
  const data = new FormData(form); const email = String(data.get("email") || "");
  state.profile.email = email; state.profile.name = email.split("@")[0].slice(0, 12) || "TANGO USER"; state.profile.loggedIn = true; state.ui.modal = null; persist(); renderApp(); toast(isFirebaseConfigured() ? "Firebaseに接続しました。" : "この端末でログイン状態にしました。", "good");
}

// App-wide event delegation
window.addEventListener("click", event => {
  const target = event.target.closest("button, [data-close-modal]"); if (!target) return;
  if (target.hasAttribute("data-close-modal") && event.target === target) { state.ui.modal = null; renderApp(); return; }
  if (target.dataset.nav) { state.ui.view = target.dataset.nav; state.ui.modal = null; renderApp(); return; }
  if (target.dataset.start) { startLearning(target.dataset.start); return; }
  if (target.dataset.rankTab) { state.ui.rankingTab = target.dataset.rankTab; renderApp(); return; }
  if (target.dataset.authTab) { state.ui.authTab = target.dataset.authTab; renderApp(); return; }
  if (target.dataset.badge) { toggleBadge(target.dataset.badge); return; }
  if (target.dataset.equipTheme) { state.equippedTheme = target.dataset.equipTheme; state.settings.dark = true; persist(); renderApp(); toast(`${themes.find(t => t.id === state.equippedTheme)?.name} を装備しました。`, "good"); return; }
  if (target.dataset.testAnswer !== undefined) { testAnswer(Number(target.dataset.testAnswer)); return; }
  if (target.dataset.learnAction) { learnAction(target.dataset.learnAction); return; }
  const action = target.dataset.action;
  if (!action) return;
  if (action === "theme") { state.settings.dark = !state.settings.dark; persist(); renderApp(); }
  if (action === "profile") { state.ui.view = "profile"; renderApp(); }
  if (action === "login") { state.ui.modal = "login"; renderApp(); }
  if (action === "badges") { state.ui.modal = "badges"; renderApp(); }
  if (action === "data-info") { state.ui.modal = "data"; renderApp(); }
  if (action === "close-modal") { state.ui.modal = null; renderApp(); }
  if (action === "share") shareProfile();
  if (action === "sound") { state.settings.sound = !state.settings.sound; persist(); renderApp(); toast(state.settings.sound ? "サウンドをオンにしました。" : "サウンドをオフにしました。"); }
  if (action === "capsule") useCapsule();
  if (action === "use-hp") { if (state.items.hpStock > 0 && state.hp < 5) { state.items.hpStock -= 1; state.hp += 1; persist(); renderApp(); toast("HPを1回復しました。", "good"); } }
  if (action === "exit-learn") { clearAuto(); clearFever(); learning = null; state.ui.view = "home"; renderApp(); }
  if (action === "learn-info") toast("タップで意味を表示。意味を見た後、左右スワイプで答えよう。");
});
window.addEventListener("submit", event => { if (event.target.id === "auth-form") { event.preventDefault(); handleAuth(event.target); } });
window.addEventListener("keydown", event => { if (event.key === "Escape" && state.ui.modal) { state.ui.modal = null; renderApp(); } });

renderApp();
