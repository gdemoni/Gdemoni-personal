const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const project = window.GARDEN_PROJECTS.find((item) => item.slug === slug) || window.GARDEN_PROJECTS[0];
let language = localStorage.getItem("garden-language") || "zh";

const labels = {
  zh: { back: "返回项目温室", plot: "植物观察记录", problem: "它解决什么问题", contribution: "我的工作", features: "核心功能", tech: "技术选择", challenge: "生长记录", repo: "查看 GitHub 仓库", placeholder: "这是首版内容占位。请在 projects.js 中换成你的真实项目资料。" },
  en: { back: "Back to greenhouse", plot: "Plant observation log", problem: "The problem", contribution: "My contribution", features: "Core features", tech: "Technical choices", challenge: "Growth notes", repo: "View GitHub repository", placeholder: "This is first-draft placeholder copy. Replace it with your real project details in projects.js." }
};

function detailPlant(status) {
  return `<svg class="detail-plant" viewBox="0 0 240 260" aria-hidden="true"><path class="plant-pot" d="M56 175h128l-17 69H73z"/><path class="plant-rim" d="M46 158h148v27H46z"/><path class="plant-stem" d="M120 159c0-67 8-109 11-139"/><path class="plant-leaf" d="M124 112C80 114 58 89 56 56c39-2 65 16 70 49"/><path class="plant-leaf" d="M127 84c14-38 45-54 78-46-5 37-31 60-78 61"/></svg>`;
}

function render() {
  const t = labels[language];
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = `${project.name[language]} · My Digital Garden`;
  document.querySelector("#back-label").textContent = t.back;
  document.querySelector("#project-detail").innerHTML = `
    <section class="project-hero">
      <div><p class="section-kicker">${t.plot} · ${project.status.toUpperCase()}</p><h1>${project.name[language]}</h1><p class="project-summary">${project.summary[language]}</p><ul class="tech-list">${project.tech.map(x => `<li>${x}</li>`).join("")}</ul></div>
      <div class="detail-plant-wrap">${detailPlant(project.status)}<span>${project.license}</span></div>
    </section>
    <section class="project-story hand-border">
      <article><p class="section-kicker">01</p><h2>${t.problem}</h2><p>${t.placeholder}</p></article>
      <article><p class="section-kicker">02</p><h2>${t.contribution}</h2><p>${t.placeholder}</p></article>
      <article><p class="section-kicker">03</p><h2>${t.features}</h2><p>${t.placeholder}</p></article>
      <article><p class="section-kicker">04</p><h2>${t.tech}</h2><p>${t.placeholder}</p></article>
      <article><p class="section-kicker">05</p><h2>${t.challenge}</h2><p>${t.placeholder}</p></article>
    </section>
    ${project.repository ? `<a class="project-repo-button" href="${project.repository}" target="_blank" rel="noreferrer">${t.repo} ↗</a>` : ""}`;
  const switcher = document.querySelector(".language-switch");
  switcher.innerHTML = language === "zh" ? '<span class="language-active">中</span> / <span>EN</span>' : '<span>中</span> / <span class="language-active">EN</span>';
}

document.querySelector(".language-switch").addEventListener("click", () => { language = language === "zh" ? "en" : "zh"; localStorage.setItem("garden-language", language); render(); });
render();
