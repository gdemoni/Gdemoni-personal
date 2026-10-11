import { plantForeground } from './plants.js';
import { drawMarkerDoor, markerVisitor } from './marker-art.js';
import { animateVisitors } from './garden-motion.js';

const dictionary = {
  zh: {
    mailboxOpenHint: "轻轻掀开，投递一点想法。",
    resumeInvite: "对我感兴趣？<br>看看我的简历",
    skillExplored: "国内外主流 AI 工具，基本都使用、体验过。",
    skillPrompt: "提示词工程",
    aboutIdentities: "我的身份有点多：<strong>提示词工程师、Yes 工程师、报错翻译官、AI 监工、脑洞施工队长</strong>——以上属于玩梗，主要工作是对 AI 说「再改一下」。",
    skillPython: "Python · 会使用", skillTypeScript: "TypeScript · 正在学习", skillJava: "Java · 正在学习", skillGo: "Go · 正在学习",
    skillInvite: "对 <mark>Codex</mark> 感兴趣的朋友，也欢迎找我聊聊，很乐意交流！", skillChat: "来聊聊 Codex ↗",
    brand: "Gdemoni’s world", entranceEyebrow: "A PERSONAL OPEN-SOURCE GARDEN", welcome: "Gdemoni’s", my: "", garden: "world",
    entranceNote: "我在这里培育想法、代码和一些仍在生长的项目。", admit: "ADMIT ONE · DIGITAL GARDEN",
    passTitleA: "Grow small ideas", passTitleB: "into useful things.", madeBy: "Cultivated by YOUR NAME", season: "Season", plot: "Plot",
    gardenMap: "Garden map", dockHint: "领取门票后，可用这五个按钮在花园里漫游。", navAbout: "园丁档案", navAboutNote: "关于我", navProjects: "项目温室", navProjectsNote: "精选开源项目",
    navSkills: "工具棚", navSkillsNote: "技能与工具", navJourney: "成长小径", navJourneyNote: "经历履历", navContact: "花园信箱", navContactNote: "保持联系",
    navUpcoming: "敬请期待", upcomingKicker: "COMING SOON", upcomingTitle: "这座花园，还会继续生长。", upcomingBody: "个人博客和更多有趣的个人小网站正在计划中。未来会在这里分享我的文章、学习笔记，以及新的小创作。敬请期待！",
    noRoute: "NO PRESCRIBED ROUTE", enter: "Take Gdemoni Ticket", aboutKicker: "THE GARDENER", aboutTitle: "欢迎来到 Gdemoni 的数字花园",
    aboutLead: "你好，我是 <mark>Gdemoni</mark>，就读于苏大下的某附属学院，软件工程专业，一名<mark>在校大三学生</mark>。",
    aboutBodyA: "目前还在不断学习、接触<mark>互联网</mark>，也在探索自己真正感兴趣、愿意长期投入的方向。平时会接触 AI、<mark>编程</mark>和各种新工具，脑海里也经常会冒出一些奇奇怪怪但很想实现的想法。",
    aboutBodyB: "这个网站更像是我的一个小花园，也像是一场持续更新中的个人展览。这里会放一些我做过的项目、写过的文章，以及大学期间的一些成长经历。它们可能并不完美，但都真实记录了我在不同阶段做过什么、想过什么，又学到了什么。",
    growingTitle: "这座花园正在生长：",
    growingProjects: "<strong>Coding Projects：</strong>我利用 AI 辅助做的有趣项目。",
    growingPath: "<strong>Growth &amp; Experiences：</strong>大学期间的经历，包括<a class='experience-project-link' href='#projects'>企业实践</a>、<a class='experience-project-link' href='#projects'>项目参与</a>。",
    growingNotes: "<strong>Articles &amp; Notes：</strong>关于 AI、编程和新工具的文章与笔记。",
    aboutExplore: "在这个世界里，没有规定好的路线。你可以随意乱逛，点开一个项目，读一段经历，或者看看我最近在想些什么。希望你离开的时候，也能顺手带走一点灵感，继续完成属于你自己的创作。",
    aboutInvite: "对我的 Coding 项目、<mark>AI、编程工具或各种新鲜事物</mark>感兴趣的话，欢迎参考、交流，也欢迎通过社交媒体来找我聊天。",
    aboutFindMe: "你可以在这里找到我：",
    availability: "当前状态：开放交流与合作", sceneNote: "still growing...", projectsKicker: "OPEN-SOURCE PLANTS", projectsTitle: "项目温室",
    projectsIntro: "每个项目都从一个小问题开始。这里先放入四株示例植物，之后可替换为你的真实仓库。", skillDev: "开发", skillDesign: "设计", skillTools: "AI / 工具",
    skillsKicker: "TOOLS I ACTUALLY USE", skillsTitle: "工具棚", journeyKicker: "GROWTH RINGS", journeyTitle: "成长小径",
    journeyHarvestTitle: "AI 开始变现：",
    journeyShareTitle: "不断分享，不断帮人：我做 AI 知识付费的这段日子",
    journeyHarvestAside: "感觉很多人对 AI 的需求还是挺大的。上班虽然赚得更多，但还是不希望被束缚，想多条路走走。",
    journeyCase2Title: "最怕的是发错消息",
    journeyCase2Body: "一位做 <mark>TikTok Shop 巴西站</mark>的跨境卖家，店里每天都要回差评、催达人。我做了一个替运营发送的工具。程序很快就能跑，真正难的是让它知道什么时候该停：窗口没对上人，就不要发；说不清发没发出去，就标成待核实。一次样品催拍停下来时，成功 25 条，被它自己拦下的有 27 条。客户转来定金，说「做的可以」。整单接近 <mark>1500 元</mark>。",
    journeyCase2Link: "读这篇手记 ↗",
    journeyCase1Title: "收到 1K+ 的那一刻",
    journeyCase1Body: "对面是一位炒股的大哥。他说：<mark>「我了解市场，你了解 AI，AI 了解代码。」</mark>我第一次把 Codex、Claude，还有「聊天」和「能动手的助手」的差别，讲给一个陌生人听。两通很长的电话之后，他转来 <mark>1K+</mark>。收到的时候，手有点抖。",
    journeyCase1Link: "读这篇手记 ↗",
    journeyCase3Title: "一个小小的思路",
    journeyCase3Body: "前段时间，我给一位朋友指了个用 AI 做小生意的方向。没有手把手带，剩下的是他自己去试。第一天晚上，三个小时赚了 <mark>200 多</mark>，还发了条朋友圈，说虽然很累，但很值得。一个月下来，也陆陆续续有了几百块。数字不大，我是真心替他高兴。",
    journeyCase4Title: "陪着迈出第一步",
    journeyCase4Body: "前几天帮一位朋友把 <mark>Codex</mark> 装好。装好之后，屏幕上回了一句：「你好！有什么可以帮你的吗？」今天又陪另一位兄弟装好 Codex，认识了 GPT，也注册好了 Google 账号。卡住大家的，往往不是 AI 有多难，而是第一步没人带。",
    journeyCase5Title: "和朋友一起搭了 skymoni",
    journeyCase5Body: "最近和身边的朋友一起，把会做的东西收成一个 AI 网站。大家做过的软件和项目放在一起，连接模型、工具和创作。自己用着方便，也希望能帮到更多人。",
    journeyCase5Link: "打开 skymoni ↗",
    journeyHarvestNote: "手记只记录个人经历，不构成投资建议。",
    journeyNowTitle: "在校大三学生", journeyNowBody: "不断学习 AI、编程与互联网工具，把感兴趣的想法做成项目，探索愿意长期投入的方向。",
    journeyWorkTitle: "上海七牛信息技术有限公司", journeyWorkBody: "产品架构部 · 产品架构实习生。担任五人小组组长，主导 Askio 运维排障 AI 助手整个项目的整体架构设计与技术选型，统筹系统分层、事件驱动协作、前后端 HTTP / SSE 接口合同，以及数据存储与异步任务设计；同时负责 Agent 核心实现，串联调查图、工具调用与经验检索复用链路。",
    journeyEduTitle: "苏大下的某附属学院", journeyEduBody: "软件工程专业", contactKicker: "LEAVE A NOTE", contactTitle: "花园信箱",
    contactBody: "有什么想法想分享，或想聊聊 AI、编程和有趣的项目？欢迎通过邮件或 X 给我留言。", footerNote: "用好奇心和代码培育", backTop: "回到花园入口 ↑",
    viewProject: "查看项目", repositoryPending: "项目资料待补充", starsFallback: "GitHub 数据待接入", status_experimental: "试验中", status_active: "持续维护", status_stable: "稳定成熟", status_paused: "暂时休眠"
  },
  en: {
    mailboxOpenHint: "Lift the lid. Leave a little thought.",
    resumeInvite: "Curious about me?<br>Take a peek at my résumé",
    skillExplored: "I've tried most mainstream AI tools from China and abroad.",
    skillPrompt: "Prompt engineering",
    aboutIdentities: "I wear a few hats: <strong>prompt engineer, Yes engineer, error-message translator, AI supervisor, and chief builder of wild ideas</strong> — tongue-in-cheek titles. Mostly, I tell AI: ‘One more tweak.’",
    skillPython: "Python · Working knowledge", skillTypeScript: "TypeScript · Learning", skillJava: "Java · Learning", skillGo: "Go · Learning",
    skillInvite: "Interested in <mark>Codex</mark>? Feel free to reach out — I'd love to chat!", skillChat: "Let's talk Codex ↗",
    brand: "Gdemoni’s world", entranceEyebrow: "A PERSONAL OPEN-SOURCE GARDEN", welcome: "Gdemoni’s", my: "", garden: "world",
    entranceNote: "This is where I grow ideas, code, and projects that are still finding their shape.", admit: "ADMIT ONE · DIGITAL GARDEN",
    passTitleA: "Grow small ideas", passTitleB: "into useful things.", madeBy: "Cultivated by YOUR NAME", season: "Season", plot: "Plot",
    gardenMap: "Garden map", dockHint: "Claim the ticket, then use these five buttons to explore the garden.", navAbout: "Garden Profile", navAboutNote: "About me", navProjects: "Project greenhouse", navProjectsNote: "Selected open source",
    navSkills: "Tool shed", navSkillsNote: "Skills & tools", navJourney: "Growing", navJourneyNote: "Experience", navContact: "Mailbox", navContactNote: "Keep in touch",
    navUpcoming: "Coming soon", upcomingKicker: "COMING SOON", upcomingTitle: "This garden is still growing.", upcomingBody: "A personal blog and more little websites are on the drawing board. Articles, learning notes, and new creations will find a home here. Stay tuned!",
    noRoute: "NO PRESCRIBED ROUTE", enter: "Take Gdemoni Ticket", aboutKicker: "THE GARDENER", aboutTitle: "Welcome to Gdemoni’s digital garden",
    aboutLead: "Hello, I'm <mark>Gdemoni</mark>, a <mark>third-year university student</mark> majoring in Software Engineering at an affiliated college of Soochow University.",
    aboutBodyA: "I'm still learning, getting to know the <mark>internet</mark>, and exploring what genuinely interests me enough to pursue for the long term. I spend time with AI, <mark>programming</mark>, and new tools, and often come up with strange little ideas that I really want to bring to life.",
    aboutBodyB: "This website is my little garden, and a personal exhibition that keeps evolving. Here I share projects I've made, articles I've written, and experiences from university. They may not be perfect, but they honestly record what I did, thought about, and learned along the way.",
    growingTitle: "This garden is growing:",
    growingProjects: "<strong>Coding Projects:</strong> Fun projects I build with AI assistance.",
    growingPath: "<strong>Growth &amp; Experiences:</strong> University experiences, <a class='experience-project-link' href='#projects'>industry practice</a>, and <a class='experience-project-link' href='#projects'>project participation</a>.",
    growingNotes: "<strong>Articles &amp; Notes</strong><br>Articles, notes, and reflections on AI, programming, internet tools, and new things I'm discovering.",
    aboutExplore: "There is no prescribed route here. Wander around, open a project, read about an experience, or see what's been on my mind. I hope you leave with a little inspiration to keep making things of your own.",
    aboutInvite: "If you're interested in my Coding projects, <mark>AI, programming tools, or new discoveries</mark>, feel free to explore, exchange ideas, or find me on social media for a chat.",
    aboutFindMe: "You can find me here:",
    availability: "Current status: open to conversations and collaborations", sceneNote: "still growing...", projectsKicker: "OPEN-SOURCE PLANTS", projectsTitle: "Project greenhouse",
    projectsIntro: "Every project starts with a small problem. These four plants are placeholders ready for your real repositories.", skillDev: "Development", skillDesign: "Design", skillTools: "AI / Tools",
    skillsKicker: "TOOLS I ACTUALLY USE", skillsTitle: "Tool shed", journeyKicker: "GROWTH RINGS", journeyTitle: "Growing path",
    journeyHarvestTitle: "AI starts to pay:",
    journeyShareTitle: "Keep sharing, keep helping: these days of sharing what I know about AI",
    journeyHarvestAside: "A lot of people still seem to need help with AI. A job pays more, but I don't want to be tied down. I'd rather keep more than one path open.",
    journeyCase2Title: "The scary part was sending the wrong message",
    journeyCase2Body: "A cross-border seller on <mark>TikTok Shop Brazil</mark> spent every day answering bad reviews and nudging creators. I built a tool to send those messages for the shop. Getting it to run was the quick part. The hard part was teaching it when to stop: if the chat is not tied to the right person, do not send; if it cannot tell whether a message went out, mark it for a person to check. One sample follow-up paused at 25 sent, and 27 held back by the tool itself. The client sent a deposit and said the work was solid. The whole job came to about <mark>¥1,500</mark>.",
    journeyCase2Link: "Read the note ↗",
    journeyCase1Title: "The moment 1K+ landed",
    journeyCase1Body: "He trades stocks. He put it this way: <mark>“I know the market, you know AI, and AI knows the code.”</mark> I walked a stranger through Codex, Claude, and how a chat differs from an assistant that can actually do the work. After two long calls he sent <mark>1K+</mark>. My hands shook a little.",
    journeyCase1Link: "Read the note ↗",
    journeyCase3Title: "A small idea",
    journeyCase3Body: "A while ago I pointed a friend toward a small business idea built on an AI product. I didn't walk him through it. He tried the rest himself. That first night he made a bit over <mark>¥200</mark> in three hours, and posted that it was tiring but worth it. Over the month, a few hundred more came in. The number is small. I was genuinely happy for him.",
    journeyCase4Title: "Someone there for the first step",
    journeyCase4Body: "The other day I installed <mark>Codex</mark> on a friend's computer. When it was ready, the screen said: “Hi! How can I help?” Today I sat with another friend through Codex, GPT, and signing up for a Google account. What stops people is usually not that AI is hard. It's that nobody is there for the first step.",
    journeyCase5Title: "We built skymoni together",
    journeyCase5Body: "Lately some friends and I have been gathering what we know how to make into an AI site. Software and projects people have built sit together, connecting models, tools, and making things. Handy for us, and hopefully useful for more people.",
    journeyCase5Link: "Open skymoni ↗",
    journeyHarvestNote: "These notes record a personal experience. They are not investment advice.",
    journeyNowTitle: "Third-year university student", journeyNowBody: "Learning about AI, programming, and internet tools, turning ideas into projects, and exploring what I want to pursue for the long term.",
    journeyWorkTitle: "Qiniu · Shanghai", journeyWorkBody: "Product Architecture Department · Product Architecture Intern. Led a five-person team and the overall architecture and technology selection for Askio, an AI incident investigation assistant. Defined system layers, event-driven coordination, frontend–backend HTTP / SSE contracts, data storage, and asynchronous tasks. Also implemented the core Agent, connecting investigation graphs, tool calls, and experience retrieval and reuse.",
    journeyEduTitle: "An affiliated college of Soochow University", journeyEduBody: "Major in Software Engineering", contactKicker: "LEAVE A NOTE", contactTitle: "Garden mailbox",
    contactBody: "Have an idea to share, or want to chat about AI, programming, and fun projects? Leave me a message by email or on X.", footerNote: "Cultivated with curiosity and code", backTop: "Back to the garden gate ↑",
    viewProject: "View project", repositoryPending: "Project details pending", starsFallback: "GitHub data pending", status_experimental: "Experimental", status_active: "Actively growing", status_stable: "Mature", status_paused: "Resting"
  }
};

const plantSVG = (status) => {
  const blooms = status === "stable" ? '<circle class="plant-bloom" cx="70" cy="39" r="10"/><circle class="plant-bloom" cx="104" cy="54" r="8"/>' : "";
  const smallLeaf = status === "experimental" ? "is-seedling" : "";
  const paused = status === "paused" ? "is-paused" : "";
  return `<svg class="project-plant ${smallLeaf} ${paused}" viewBox="0 0 160 190" aria-hidden="true">
    <path class="plant-pot" d="M40 127h80l-10 48H51z"/><path class="plant-rim" d="M34 118h92v17H34z"/>
    <path class="plant-stem" d="M80 119c0-45 4-74 4-96"/>
    <path class="plant-leaf leaf-one" d="M82 89C55 92 43 76 40 56c25-2 41 9 45 28"/>
    <path class="plant-leaf leaf-two" d="M83 72c8-24 27-34 48-30-2 23-17 38-48 40"/>
    <path class="plant-leaf leaf-three" d="M81 109c-21 0-34-10-38-26 20-4 33 3 40 20"/>
    ${blooms}</svg>`;
};

let currentLanguage = "zh";
let ticketLanguage = "en";
let currentWork = 0;

// Replace the three sample slots with real covers and descriptions when ready.
const galleryWorks = [
  { id: "askio", title: { zh: "Askio · 智能排障工作台", en: "Askio · Investigation workbench" }, category: "AI / SRE", color: "#91aa82", cover: "", summary: { zh: "面向线上故障排查的对话式工作台。它把混在长对话中的不同猜测拆成独立调查方向，在画布上并行推进、对照证据；工程师可以排除、恢复或组合验证方向。调查结束后，再将确认过的检查方法沉淀为经验，用当前数据验证后复用。", en: "A conversational workbench for incident investigation. Separate hypotheses become independent paths on a canvas, with parallel evidence gathering and human review. Confirmed investigation methods can be saved and reused after checking current data." }, note: { zh: "项目解读 · 根据产品设计整理。图中为流程示意，并非产品截图；个人负责部分待补充。", en: "Project overview based on its design. The diagram is illustrative, not a product screenshot. My specific contribution is to be added." } },
  { id: "eduavatar", title: { zh: "EduAvatar · 师智分身", en: "EduAvatar · Teaching avatar" }, category: "AI / EDUCATION", color: "#91aa82", cover: "", summary: { zh: "一个面向课程辅导的多模态 AI 数字人。通过语音识别理解学生提问，由 LangGraph 区分知识讲解与题目求解，结合课程知识库生成回答，再经语音合成与唇形同步，在浏览器里完成数字人讲解。让课程资料从静态文本变成可以对话的学习伙伴。", en: "A multimodal teaching avatar for course tutoring. Speech recognition captures questions, LangGraph routes explanation and problem-solving tasks, and course retrieval grounds responses. Speech synthesis and lip synchronization bring the answer to life in the browser." } },
  { id: "travel-agent", title: { zh: "旅行助手 · 多 Agent 协作", en: "Travel assistant · Multi-agent system" }, category: "AI / BACKEND", color: "#9baed0", cover: "", summary: { zh: "面向航班、酒店、租车与旅行推荐的多 Agent 助手。主助理理解需求并委派领域助理，结合政策检索与业务工具完成任务；修改类操作先暂停，等待用户确认。重点展示后端编排、检索与服务设计，前端正在施工中（ing）。", en: "A multi-agent travel assistant covering flights, hotels, car rentals, and excursions. A primary assistant delegates tasks to specialists using policy retrieval and business tools, pausing sensitive operations for user approval. Backend-focused; frontend under construction (ing)." } }
];

galleryWorks[0].note = {
  zh: "上海七牛信息技术有限公司 · 产品架构部 · 产品架构实习生<br>2026-05 ～ 2026-09<br><strong>五人小组组长 · 架构设计与 Agent 核心实现</strong>",
  en: "Qiniu · Product Architecture Intern<br>May–Sep 2026<br><strong>Team lead of five · Architecture & core Agent implementation</strong>"
};

galleryWorks.push({
  id: "cloud-mail",
  title: { zh: "Gdemoni Mail · 自建邮箱", en: "Gdemoni Mail · Self-hosted email" },
  color: "#91aa82",
  summary: { zh: "基于开源 Cloud Mail，用自己的域名搭建并维护的邮箱服务。提供 @zshgdemoni.me 邮箱，用于日常收发邮件、接收账号验证邮件和体验新工具。目前开放 50 人邀请体验，有需要也欢迎联系我。", en: "An email service I deployed and maintain on my own domain using open-source Cloud Mail. An @zshgdemoni.me address for everyday email, account verification, and exploring tools. Invitation access is limited to 50 people; contact me if interested." }
});

galleryWorks.push({
  id: "under-construction",
  title: { zh: "新项目 · 施工中", en: "New project · In progress" },
  color: "#91aa82",
  summary: { zh: "该项目正在玩命施工中。", en: "Working like crazy on this project." }
});

function renderAskioContribution(zh) {
  const items = zh ? [
    ["可视化排查链路", "将排障过程建模为有向调查图（根节点 → 排查节点 → 故障域），支持分叉、汇聚与路径推进。自主决策 Agent 在图上游走，拆解问题、调用指标 / 日志 / Trace 数据源工具；信息缺失时补充提问，用户可随时打断纠偏。"],
    ["结构化经验沉淀与召回", "将完成的调查按「故障现象 → 故障域 → 排障思路」沉淀为可复用的图结构。通过 RAG 匹配故障现象、召回历史故障域，再选取对应排障链路复用，让经验随使用不断积累。"],
    ["事件驱动架构与选型", "主导整体架构，以调查图实体变更、消息增量、工具调用和审批等事件驱动协作，经 SSE 实时推送前端。基于 NestJS + Fastify + ts-rest + Zod 构建端到端类型安全的 HTTP / SSE 合同，配合 PostgreSQL / pgvector + BullMQ / Redis 完成异步任务解耦。"]
  ] : [
    ["Visual investigation paths", "Modeled incidents as a directed graph from root to investigation nodes and fault domains, supporting branching and convergence. Implemented an autonomous Agent that decomposes problems and queries metrics, logs, and traces, with clarification questions and user interruption for course correction."],
    ["Structured experience and retrieval", "Organized completed investigations into reusable symptom → fault domain → investigation-method graphs. Used RAG to match symptoms, retrieve historical fault domains, and reuse relevant investigation paths."],
    ["Event-driven architecture", "Led an architecture driven by graph changes, message deltas, tool calls, and approvals, streamed to the frontend over SSE. Built type-safe HTTP/SSE contracts with NestJS, Fastify, ts-rest, and Zod; decoupled asynchronous tasks using PostgreSQL/pgvector and BullMQ/Redis."]
  ];
  const highlight = body => body.replace(/有向调查图|支持分叉、汇聚与路径推进|故障现象 → 故障域 → 排障思路|RAG|NestJS|Fastify|ts-rest|Zod|directed graph|branching and convergence|symptom → fault domain → investigation-method/g, term => `<mark>${term}</mark>`);
  return `<h4>${zh ? "我的主要贡献" : "My contribution"}</h4>${items.map(([title, body]) => `<p><strong>${title}：</strong>${highlight(body)}</p>`).join("")}`;
}

function renderAskioScrapbook(zh) {
  return `<aside class="askio-scrapbook" aria-label="${zh ? "实习剪贴簿" : "Internship scrapbook"}">
      <figure class="askio-photo"><button type="button" class="askio-photo-crop" data-preview-photo aria-label="${zh ? "放大查看团队合照" : "Enlarge team photo"}"><img src="/askio-team.png" alt="${zh ? "Askio 团队在会议桌旁的合照" : "The Askio team around a meeting table"}" loading="lazy" /></button><figcaption>${zh ? "一起把想法做出来" : "Building ideas together"}<small>Askio team · 2026</small></figcaption></figure>
      <figure class="askio-photo askio-office-photo"><button type="button" class="askio-photo-crop" data-preview-photo aria-label="${zh ? "放大查看办公环境" : "Enlarge workspace photo"}"><img src="/askio-office.jpg" alt="${zh ? "实习期间的办公环境" : "The internship workspace"}" loading="lazy" /></button><figcaption>${zh ? "工作日的一角" : "A corner of our workday"}<small>2026.05 — 09</small></figcaption></figure>
    </aside>`;
}

function renderEduAvatarScrapbook(zh) {
  const photos = [
    ["/eduavatar-interface.png", zh ? "数字人交互界面" : "Avatar interaction interface"],
    ["/eduavatar-workflow.png", zh ? "Agent 工作流" : "Agent workflow"]
  ];
  return `<aside class="askio-scrapbook eduavatar-screenshots" aria-label="${zh ? "EduAvatar 项目截图" : "EduAvatar screenshots"}">${photos.map(([src, label]) => `<figure class="askio-photo"><button type="button" class="askio-photo-crop" data-preview-photo data-preview-title="EduAvatar · ${label}" data-preview-note="${zh ? "项目截图 · 点击空白处或按 Esc 关闭" : "Project screenshot · Click outside or press Esc to close"}" aria-label="${zh ? "放大查看" : "Enlarge"} ${label}"><img src="${src}" alt="${label}" loading="lazy" /></button><figcaption>${label}<small>EduAvatar</small></figcaption></figure>`).join("")}</aside>`;
}

const photoDialog = document.createElement("dialog");
photoDialog.className = "garden-photo-dialog";
photoDialog.setAttribute("aria-labelledby", "garden-photo-caption");
photoDialog.innerHTML = '<form method="dialog"><button class="photo-preview-close" aria-label="关闭 / Close">×</button></form><h2 id="garden-photo-caption"></h2><div class="photo-preview-stage"><img class="photo-preview-image" alt="" /></div><p class="photo-preview-note"></p>';
document.body.append(photoDialog);
let photoTrigger;
document.addEventListener("click", event => {
  const trigger = event.target.closest("[data-preview-photo]");
  if (!trigger) return;
  const source = trigger.querySelector("img");
  photoTrigger = trigger;
  const preview = photoDialog.querySelector("img");
  preview.src = source.src;
  preview.alt = source.alt;
  const isTeam = source.getAttribute("src") === "/askio-team.png";
  const zh = currentLanguage === "zh";
  photoDialog.classList.toggle("is-team-photo", isTeam);
  photoDialog.querySelector("#garden-photo-caption").textContent = isTeam ? (zh ? "Askio · 团队合照" : "Askio · Our team") : (zh ? "Askio · 实习日常" : "Askio · At work");
  photoDialog.querySelector(".photo-preview-note").textContent = isTeam ? (zh ? "一起把想法做出来。" : "Building ideas together.") : (zh ? "工作日的一角 · 2026.05 — 09" : "A corner of our workday · May–Sep 2026");
  if (trigger.dataset.previewTitle) photoDialog.querySelector("#garden-photo-caption").textContent = trigger.dataset.previewTitle;
  if (trigger.dataset.previewNote) photoDialog.querySelector(".photo-preview-note").textContent = trigger.dataset.previewNote;
  photoDialog.classList.toggle("is-project-screenshot", Boolean(trigger.dataset.previewTitle));
  photoDialog.showModal();
});
photoDialog.addEventListener("click", event => {
  if (event.target === photoDialog) photoDialog.close();
});
photoDialog.addEventListener("close", () => {
  if (photoTrigger?.isConnected) photoTrigger.focus({ preventScroll: true });
});

function renderAskioExhibit(zh) {
  return `<article class="askio-exhibit">
    <div class="askio-exhibit-main">
    <header><h3>Askio<span>${zh ? "运维排障 AI 助手" : "AI incident investigation assistant"}</span></h3>
      <a class="askio-site-link" href="https://www.askio.site/" target="_blank" rel="noopener noreferrer">${zh ? "Askio 官网" : "Askio website"} ↗</a>
      <p class="askio-role">${galleryWorks[0].note[zh ? "zh" : "en"]}</p>
      <section class="askio-pain-points" aria-label="${zh ? "解决的痛点" : "Problems addressed"}">
        <h4>${zh ? "我们想解决什么？" : "What problems are we addressing?"}</h4>
        <ul>${(zh ? [
          "<strong>排查方向混杂：</strong>长对话里的多种猜测难以追踪，用调查图拆分、汇聚与排除方向。",
          "<strong>证据分散难验证：</strong>指标、日志和 Trace 分散在不同数据源，由 Agent 并行取证，支持人工打断纠偏。",
          "<strong>历史经验难复用：</strong>将排障链路结构化沉淀，经 RAG 召回后用当前数据重新验证。"
        ] : [
          "<strong>Tangled hypotheses:</strong> Split, converge, and rule out paths on a graph instead of losing them in a long conversation.",
          "<strong>Scattered evidence:</strong> Query metrics, logs, and traces in parallel, with human interruption and correction.",
          "<strong>Hard-to-reuse experience:</strong> Structure investigation paths, retrieve them with RAG, and revalidate with current data."
        ]).map(point => `<li>${point}</li>`).join("")}</ul>
      </section>
    </header>
    <section class="askio-contribution">${renderAskioContribution(zh)}</section>
    ${renderAskioFlow(zh)}
    </div>
  </article>`;
}

function renderAskioFlow(zh) {
  const t = (cn, en) => zh ? cn : en;
  const arrow = '<div class="askio-flow-arrow" aria-hidden="true">↓</div>';
  return `<section class="askio-map askio-flow" aria-label="${t("调查与经验复用流程示意", "Investigation and experience reuse workflow")}">
    <h4>${t("从一个现象，到下一次排查的经验", "From a symptom to reusable experience")}</h4>
    <div class="askio-flow-node askio-root">${t("用户描述现象 · 发起调查", "Describe symptoms · Start investigation")}<small>POST /messages</small></div>
    ${arrow}<div class="askio-flow-node">${t("原子创建调查聚合", "Atomically create investigation aggregate")}<small>${t("根节点 origin + 协调 Session", "Origin node + coordination Session")}</small></div>
    ${arrow}<strong>${t("经验辅助开启？", "Experience assistance enabled?")}</strong>
    <div class="askio-flow-split">
      <div class="askio-flow-node"><strong>${t("是 ↓ 召回相似经验", "Yes ↓ Retrieve similar experience")}</strong><small>${t("向量搜索根节点 → 候选故障域与调查链路", "Vector-search origins → candidate fault domains and paths")}</small><span>↓ ${t("用当前数据重新验证", "Revalidate with current data")}</span></div>
      <div class="askio-flow-node"><strong>${t("否 ↓ 不使用历史经验", "No ↓ Skip historical experience")}</strong><span>${t("直接进入 Agent 拆解", "Proceed directly to Agent analysis")}</span></div>
    </div>
    ${arrow}<div class="askio-flow-node">${t("Agent 拆解现象 → 创建并行调查节点", "Agent decomposes symptoms → parallel investigation nodes")}<small>create_node</small></div>
    ${arrow}<div class="askio-flow-node">${t("各分支并行查询证据", "Branches query evidence in parallel")}<small>metrics / logs / traces</small></div>
    ${arrow}<strong>${t("证据指向？", "What does the evidence indicate?")}</strong>
    <div class="askio-flow-split">
      <div class="askio-flow-node"><strong>${t("组合验证 ↓", "Combined validation ↓")}</strong><span>${t("建立节点间收敛关系", "Converge investigation nodes")}</span><small>create_direction</small><span>↓ ${t("确认故障域", "Confirm fault domain")}</span><small>register_fault_domain</small><span>↓ ${t("用户确认根因 → 完成调查", "User confirms root cause → Complete investigation")}</span></div>
      <div class="askio-flow-node"><strong>${t("排除无效方向", "Disprove a direction")}</strong><small>mark_node_disproven</small><span class="askio-flow-return">↩ ${t("返回创建调查节点，继续排查", "Return to investigation nodes and continue")}</span></div>
    </div>
    <div class="askio-flow-arrow">${t("完成调查后 ↓", "After completion ↓")}</div>
    <div class="askio-flow-node">${t("沉淀经验 · 异步压缩为三级结构", "Save experience · Compress into three levels asynchronously")}<small>POST /experiences → ExperienceContent</small><span>${t("故障现象 → 故障域 → 排障思路", "Symptom → fault domain → investigation method")}</span></div>
    ${arrow}<div class="askio-flow-node">${t("重建 RAG 投影 · 向量化根节点摘要", "Rebuild RAG projection · Embed root summaries")}</div>
    <p class="askio-memory">↺ ${t("供后续调查召回复用，再用当前数据验证", "Recall in future investigations and verify with fresh data")}</p>
    <small class="askio-footnote">${t("核心数据流示意 · 非产品截图", "Core data flow illustration · Not a product screenshot")}</small>
  </section>`;
}

function renderEduAvatarExhibit(zh) {
  const t = (cn, en) => zh ? cn : en;
  const arrow = '<div class="askio-flow-arrow" aria-hidden="true">↓</div>';
  return `<article class="askio-exhibit eduavatar-exhibit">
    <header><h3>EduAvatar<span>${t("师智分身 · 课程教学数字人", "An AI teaching avatar")}</span></h3>
      <p class="eduavatar-links"><a class="askio-site-link" href="https://github.com/gdemoni/EduAvatar" target="_blank" rel="noopener noreferrer">GitHub ↗</a> / <a class="askio-site-link" href="https://github.com/gdemoni/EduAvatar/wiki" target="_blank" rel="noopener noreferrer">${t("项目 Wiki", "Project Wiki")} ↗</a></p>
      <p class="eduavatar-tutorial">${t("想自己搭建一个？详细过程已整理成教程：", "Want to build it yourself? Follow the full tutorial: ")}<a class="askio-site-link" href="https://github.com/gdemoni/EduAvatar/wiki" target="_blank" rel="noopener noreferrer">${t("前往 Wiki 查看完整教程", "Read the complete Wiki tutorial")} ↗</a></p>
      <p class="askio-role">${galleryWorks[1].summary[zh ? "zh" : "en"]}</p>
    </header>
    <section class="askio-contribution"><h4>${t("让知识讲得出来，也问得下去", "Make course knowledge conversational")}</h4>
      <p><strong>${t("课程知识检索：", "Course retrieval: ")}</strong>${t("利用 <mark>FAISS + BGE</mark> 组织课程资料，先检索再生成；本地未命中时以网络搜索补充参考。", "<mark>FAISS + BGE</mark> retrieve course material before generation; web search provides a fallback when local retrieval misses.")}</p>
      <p><strong>${t("分场景教学：", "Task-aware teaching: ")}</strong>${t("<mark>LangGraph</mark> 识别讲解、解题与招呼意图。简单题直接推理，复杂题结合检索分步讲解，意图不清时追问。", "<mark>LangGraph</mark> routes explanations, problems, and greetings. Simple questions use direct reasoning, complex problems use retrieval and stepwise explanation, and unclear requests trigger clarification.")}</p>
      <p><strong>${t("从答案到数字人：", "From answer to avatar: ")}</strong>${t("将回答改写为适合朗读的短句与公式读法，经 <mark>EdgeTTS</mark> 合成语音、<mark>Wav2Lip</mark> 同步唇形，再通过 <mark>WebRTC</mark> 传到浏览器。", "Spoken-language rewriting prepares sentences and mathematical expressions for <mark>EdgeTTS</mark>. <mark>Wav2Lip</mark> synchronizes lips and <mark>WebRTC</mark> delivers audiovisual output to the browser.")}</p>
    </section>
    <section class="askio-contribution"><h4>${t("技术栈与项目强项", "Technology stack & strengths")}</h4>
      <p><strong>${t("Agent 编排 · 不止一次模型调用：", "Agent orchestration · Beyond a single model call: ")}</strong>${t("基于 <mark>Python + LangGraph + LangChain</mark>，将意图、检索上下文、信息来源与解题步骤放入共享状态，由条件路由连接不同处理节点。讲解、解题、欢迎与澄清各走对应路径，复杂题再进入检索流程。强项在于把教学决策拆成<mark>职责清晰、可追踪的多步骤工作流</mark>。", "<mark>Python, LangGraph, and LangChain</mark> coordinate shared intent, retrieved context, sources, and solution steps. Conditional routes separate explanations, problem solving, greetings, and clarification. The strength is a <mark>traceable, task-specific workflow</mark> rather than one large prompt.")}</p>
      <p><strong>${t("课程 RAG · 从资料入库到检索兜底：", "Course RAG · From ingestion to fallback: ")}</strong>${t("通过 <mark>PyPDF / Docx2txt</mark> 读取 PDF、Word 等资料，按重叠片段切分，再用 <mark>BGE 中文嵌入模型 + FAISS</mark> 建立本地向量索引。提问时先把口语重写为检索词，再查课程内容；未命中则调用 <mark>Tavily</mark> 补充搜索。重点是<mark>课程知识优先、查询重写与检索兜底</mark>，为回答提供参考依据，而不是仅依赖模型记忆。", "<mark>PyPDF / Docx2txt</mark> load course documents, overlapping chunks are embedded with <mark>BGE</mark> and indexed in <mark>FAISS</mark>. Spoken queries are rewritten for retrieval, with <mark>Tavily</mark> as a fallback. The strength is <mark>course-first retrieval, query rewriting, and fallback handling</mark>, not reliance on model memory alone.")}</p>
      <p><strong>${t("多模态集成 · 把答案变成可听、可看的讲解：", "Multimodal integration · Answers you can hear and see: ")}</strong>${t("串联 <mark>ASR → Agent → EdgeTTS → Wav2Lip → WebRTC</mark>。生成内容先做口语化处理，把公式转成读法、长段落拆成短句，再接入语音合成、唇形同步和浏览器音视频传输。强项是<mark>文本生成与播报体验之间的适配</mark>，将检索、推理和数字人输出连成完整交互链路。", "The <mark>ASR → Agent → EdgeTTS → Wav2Lip → WebRTC</mark> pipeline connects speech input to audiovisual output. Spoken-language rewriting adapts formulas and long paragraphs for narration. The strength is <mark>bridging generated text and spoken delivery</mark> across the complete interaction.")}</p>
      <p><strong>${t("模型适配 · 按场景组合能力：", "Model integration · Adaptable components: ")}</strong>${t("通过兼容接口接入 <mark>DeepSeek / 通义千问</mark>；数字人侧提供 <mark>Wav2Lip、MuseTalk、Ultralight</mark> 等渲染选项。将教学逻辑、知识检索与呈现层分开组织，便于针对运行环境选择模型与渲染方式。", "Compatible interfaces support <mark>DeepSeek / Qwen</mark>, while avatar rendering offers <mark>Wav2Lip, MuseTalk, and Ultralight</mark>. Separating teaching logic, retrieval, and presentation allows model and renderer choices for different environments.")}</p>
    </section>
    <section class="askio-map askio-flow" aria-label="${t("教学交互流程示意", "Teaching interaction workflow")}"><h4>${t("一次提问，如何变成讲解？", "How does a question become a lesson?")}</h4>
      <div class="askio-flow-node askio-root">${t("学生语音 → ASR 转文字", "Student speech → ASR transcription")}</div>
      ${arrow}<div class="askio-flow-node">${t("LangGraph · 意图识别", "LangGraph · Intent routing")}<small>${t("招呼 → 欢迎回应 / 意图不明 → 澄清提问", "Greeting → welcome / unclear intent → clarification")}</small></div>
      <div class="askio-flow-split"><div class="askio-flow-node"><strong>${t("讲解知识点 ↓", "Explain a concept ↓")}</strong><span>${t("课程检索 → 口语化讲解", "Course retrieval → spoken explanation")}</span></div><div class="askio-flow-node"><strong>${t("解答题目 ↓", "Solve a problem ↓")}</strong><span>${t("简单题直接推理 / 复杂题检索后分步解答", "Direct reasoning for simple problems / retrieval and steps for complex ones")}</span></div></div>
      <p class="askio-memory">${t("检索分支：优先本地 FAISS，未命中再网络搜索", "Retrieval paths: local FAISS first, web search on a miss")}</p>
      ${arrow}<div class="askio-flow-node">${t("口语化回答 → TTS 语音合成", "Spoken answer → TTS synthesis")}</div>
      ${arrow}<div class="askio-flow-node">${t("唇形同步 → WebRTC → 浏览器数字人播报", "Lip sync → WebRTC → avatar playback in browser")}</div>
      <small class="askio-footnote">${t("根据项目 README 与 Wiki 整理 · 流程示意，非在线演示", "Based on the project README and Wiki · Illustration, not a live demo")}</small>
    </section>
  </article>`;
}

function renderTravelScrapbook(zh) {
  const title = zh ? "多 Agent 后端工作流" : "Multi-agent backend workflow";
  return `<aside class="askio-scrapbook eduavatar-screenshots" aria-label="${title}"><figure class="askio-photo"><button type="button" class="askio-photo-crop" data-preview-photo data-preview-title="${title}" data-preview-note="${zh ? "主助理、领域助理与敏感工具审批" : "Primary assistant, specialists, and sensitive-tool approval"}" aria-label="${zh ? "放大查看工作流" : "Enlarge workflow"}"><img src="/travel-agent-workflow.png" alt="${title}" loading="lazy" /></button><figcaption>${title}<small>LangGraph · Handoffs</small></figcaption></figure></aside>`;
}

function renderTravelExhibit(zh) {
  const t = (cn, en) => zh ? cn : en;
  const sections = [
    [t("多 Agent 协作", "Multi-agent orchestration"), t("以 <mark>LangGraph + LangChain</mark> 组织 <mark>1 主 + 4 子 Agent</mark>：主助理识别意图，委派航班、酒店、租车和旅行助理。通过对话状态栈记录当前任务，子助理完成或升级时用 <mark>CompleteOrEscalate</mark> 返回主助理，衔接多轮对话。", "<mark>LangGraph + LangChain</mark> coordinate <mark>one primary and four specialist agents</mark>. A dialog stack tracks active tasks; <mark>CompleteOrEscalate</mark> returns completed or escalated work to the primary assistant.")],
    [t("工具调用与人工确认", "Tools and human approval"), t("将查询工具与修改工具分开。搜索可直接执行，改签、退票、预订或取消前通过 <mark>interrupt_before</mark> 暂停，由用户确认后继续。工具异常转成 <mark>ToolMessage</mark> 反馈给模型，使失败也能进入后续处理。", "Read-only searches run directly; changes such as booking, rescheduling, or cancellation pause at <mark>interrupt_before</mark> for user approval. Tool errors return as <mark>ToolMessage</mark> feedback for subsequent handling.")],
    [t("四阶段政策 RAG", "Four-stage policy RAG"), t("政策 FAQ 采用 <mark>BM25 + BGE 向量检索</mark>；将命中的子段落映射回父章节，补全上下文，再用 <mark>大模型重排序 + 长上下文重排</mark> 组织参考材料。兼顾关键词匹配、语义召回与政策语境。", "Policy FAQ retrieval uses <mark>BM25 and BGE vector search</mark>, maps matching chunks to parent sections for context, then applies <mark>LLM reranking and long-context reordering</mark> to organize references, combining keyword matching, semantic retrieval, and policy context.")],
    [t("FastAPI 服务与鉴权", "FastAPI service and authentication"), t("以 <mark>FastAPI + Pydantic</mark> 提供用户管理和工作流接口，采用 <mark>JWT + bcrypt</mark> 处理令牌认证与密码哈希。<mark>POST /api/graph/</mark> 接收用户输入与会话配置，执行图工作流并返回回复；敏感操作返回确认提示。", "<mark>FastAPI + Pydantic</mark> expose user and workflow endpoints, with <mark>JWT + bcrypt</mark> for authentication and password hashing. <mark>POST /api/graph/</mark> accepts input and session configuration, returning a reply or an approval prompt.")],
    [t("数据与工程分层", "Data and backend structure"), t("后端按 API、配置、数据库、图编排、工具和公共组件分层。<mark>SQLAlchemy + MySQL</mark> 管理用户数据，<mark>SQLite</mark> 存放航班等示例业务数据；通用 DAO 复用增删改查，配置、日志与异常处理集中管理。", "Separate API, configuration, persistence, graph, tool, and utility layers. <mark>SQLAlchemy + MySQL</mark> store user data; <mark>SQLite</mark> holds sample travel records. Shared DAO, configuration, logging, and exception handling support reuse.")]
  ];
  return `<article class="askio-exhibit"><header><h3>Travel Agent<span>${t("多 Agent 旅行助手", "Multi-agent travel assistant")}</span></h3><a class="askio-site-link" href="https://github.com/gdemoni/agent_ctrip_assistant" target="_blank" rel="noopener noreferrer">GitHub / README ↗</a><p class="askio-role">${galleryWorks[2].summary[zh ? "zh" : "en"]}</p><p><strong>${t("前端正在施工中（ing）", "Frontend under construction (ing)")}</strong></p></header>
    <section class="askio-contribution"><h4>${t("后端技术与设计重点", "Backend technology & design")}</h4>${sections.map(([title,body]) => `<p><strong>${title}：</strong>${body}</p>`).join("")}</section>
    <small class="askio-footnote">${t("依据 README 整理 · 示例业务数据，非真实订票服务", "Based on README · Sample business data, not a live booking service")}</small></article>`;
}

function renderCloudMailScrapbook(zh) {
  const title = zh ? "Gdemoni Mail · 邮箱登录页" : "Gdemoni Mail · Sign-in page";
  return `<aside class="askio-scrapbook eduavatar-screenshots" aria-label="${title}"><figure class="askio-photo"><button type="button" class="askio-photo-crop" data-preview-photo data-preview-title="${title}" data-preview-note="mail.zshgdemoni.me" aria-label="${zh ? "放大查看邮箱截图" : "Enlarge mailbox screenshot"}"><img src="/gdemoni-mail-login.png" alt="${title}" loading="lazy" /></button><figcaption>${zh ? "自己的域名，自己的邮箱" : "My domain, my mailbox"}<small>Gdemoni Mail</small></figcaption></figure></aside>`;
}

function renderCloudMailExhibit(zh) {
  const t = (cn, en) => zh ? cn : en;
  const work = galleryWorks.find(item => item.id === "cloud-mail");
  return `<article class="askio-exhibit"><header><h3>Gdemoni Mail<span>${t("用自己的域名，收一封信", "An inbox on my own domain")}</span></h3>
    <a class="askio-site-link" href="https://mail.zshgdemoni.me/" target="_blank" rel="noopener noreferrer">${t("打开邮箱", "Open mailbox")} ↗</a> / <a class="askio-site-link" href="https://github.com/gdemoni/cloud-mail" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
    <p class="askio-role">${work.summary[zh ? "zh" : "en"]}</p></header>
    <section class="askio-contribution"><h4>${t("从开源项目，到自己的邮箱", "From open source to my own mailbox")}</h4>
    <p><strong>${t("我的实践：", "My work: ")}</strong>${t("基于 <mark>Cloud Mail</mark> 完成自有域名部署与服务维护，让 <mark>@zshgdemoni.me</mark> 成为可以实际使用的邮箱。此项目是开源部署实践，邮件系统的基础能力来自原项目。", "I deployed and maintain <mark>Cloud Mail</mark> on my own domain, providing <mark>@zshgdemoni.me</mark> mailboxes. This is an open-source deployment project; the underlying mail system comes from the upstream project.")}</p>
    <p><strong>${t("收发与附件：", "Mail and attachments: ")}</strong>${t("Cloud Mail 支持邮件收发与附件处理，使用 <mark>Resend</mark> 发送邮件、<mark>R2</mark> 存储附件，并提供账号与权限管理。", "Cloud Mail supports email and attachments, using <mark>Resend</mark> for sending and <mark>R2</mark> for attachment storage, with account and permission management.")}</p>
    <p><strong>${t("技术底座：", "Technology: ")}</strong><mark>Cloudflare Workers + Hono + Drizzle</mark> · <mark>D1 / KV / R2</mark> · <mark>Vue 3 + Element Plus</mark>。</p>
    <h4>${t("邀请你来体验 · 限 50 人", "You're invited · Limited to 50 people")}</h4>
    <p>${t("邀请码：", "Invitation code: ")}<mark><strong>qtR8uUKQ</strong></mark></p>
    <p>${t("前往邮箱网站注册时填写邀请码即可。有需要或遇到问题，也欢迎", "Enter the invitation code when registering on the mail website. For access or questions, feel free to ")}<a class="experience-project-link" href="#contact" data-mail-contact>${t("联系我", "contact me")}</a>。</p>
    <p>${t("可用于日常账号注册与验证邮件接收。GitHub、ChatGPT 等平台是否接受该邮箱，以各平台当时的规则与实际验证结果为准；请遵守平台规则，不用于垃圾邮件、批量滥用或绕过额度限制。", "Use it for everyday registration and verification email. Acceptance by GitHub, ChatGPT, or other platforms depends on their current rules and checks. No spam, bulk abuse, or quota circumvention.")}</p>
    </section></article>`;
}

document.addEventListener("click", event => {
  const link = event.target.closest("[data-mail-contact]");
  if (!link) return;
  event.preventDefault();
  activateGardenPanel("contact");
});

function renderWorkDirectory() {
  const directory = document.querySelector("#garden-work-directory");
  if (!directory) return;
  directory.innerHTML = galleryWorks.map((work, index) => work.id ? `<li><button type="button" data-directory-work="${index}" ${index === currentWork ? 'aria-current="true"' : ""}>${work.title[ticketLanguage]}</button></li>` : "").join("");
}

function renderGallery() {
  renderWorkDirectory();
  const root = document.querySelector("#work-gallery");
  if (!root) return;
  const work = galleryWorks[currentWork];
  const zh = currentLanguage === "zh";
  root.classList.toggle("has-scrapbook", ["askio", "eduavatar", "travel-agent", "cloud-mail"].includes(work.id));
  root.innerHTML = `
    <div class="work-spread" role="region" aria-label="${zh ? "项目图片与简介" : "Project photos and introduction"}" tabindex="0">
    ${work.id === "askio" ? renderAskioScrapbook(zh) : work.id === "eduavatar" ? renderEduAvatarScrapbook(zh) : work.id === "travel-agent" ? renderTravelScrapbook(zh) : work.id === "cloud-mail" ? renderCloudMailScrapbook(zh) : ""}
    <figure class="work-frame" style="--work-accent:${work.color}">
      ${work.id === "under-construction" ? `<div class="work-construction"><p>${work.summary[currentLanguage]}</p></div>` : work.id === "cloud-mail" ? renderCloudMailExhibit(zh) : work.id === "askio" ? renderAskioExhibit(zh) : work.id === "eduavatar" ? renderEduAvatarExhibit(zh) : work.id === "travel-agent" ? renderTravelExhibit(zh) : work.cover ? `<img src="${work.cover}" alt="${work.title[currentLanguage]}" />` : `
      <div class="work-placeholder">
        <span class="work-edition">GDEMONI · SELECTED WORKS</span>
        <span class="work-placeholder-number">0${currentWork + 1}</span>
        <div class="work-placeholder-art" aria-hidden="true">${plantSVG(["experimental", "active", "stable"][currentWork])}</div>
        <strong>${work.category}</strong>
        <span>${zh ? "作品封面待添加" : "Artwork coming here"}</span>
        <small>${zh ? "布局示例 / 非真实作品" : "LAYOUT PLACEHOLDER / NOT A REAL PROJECT"}</small>
      </div>`}
    </figure>
    </div>
    <p class="work-swipe-hint">${zh ? "← 图片 · 左右滑动查看 · 简介 →" : "← Photos · Swipe to explore · Introduction →"}</p>
    <div class="work-note">
      <button type="button" class="work-note-trigger" aria-expanded="false" aria-controls="work-summary" aria-label="${zh ? "查看作品概要" : "Read work summary"}"><svg viewBox="0 0 48 56" aria-hidden="true"><path d="M5 4L42 3 44 51 4 53Z"/><path d="M13 16h20M13 25h23M13 33h17"/></svg><span>${zh ? "作品概要" : "Read note"}</span></button>
      <section class="work-summary" id="work-summary" hidden><p class="work-edition">WORK NOTE / 0${currentWork + 1}</p><h3>${work.title[currentLanguage]}</h3><p>${work.summary[currentLanguage]}</p></section>
    </div>
    <nav class="work-pagination" aria-label="${zh ? "作品切换" : "Browse works"}">
      <button type="button" data-work-step="-1" aria-label="${zh ? "上一件作品" : "Previous work"}" ${currentWork === 0 ? "disabled" : ""}>‹</button>
      <div class="work-caption" aria-live="polite"><strong>${work.title[currentLanguage]}</strong><span>0${currentWork + 1} / 0${galleryWorks.length}</span></div>
      <button type="button" data-work-step="1" aria-label="${zh ? "下一件作品" : "Next work"}" ${currentWork === galleryWorks.length - 1 ? "disabled" : ""}>›</button>
    </nav>`;
  root.querySelectorAll("[data-work-step]").forEach(button => button.addEventListener("click", () => {
    currentWork = Math.max(0, Math.min(galleryWorks.length - 1, currentWork + Number(button.dataset.workStep)));
    renderGallery();
    (root.querySelector(`[data-work-step="${button.dataset.workStep}"]:not(:disabled)`) || root.querySelector("[data-work-step]:not(:disabled)"))?.focus({ preventScroll: true });
  }));
  const note = root.querySelector(".work-note");
  const trigger = note.querySelector("button");
  const summary = note.querySelector("section");
  let pinned = false;
  const show = value => { summary.hidden = !value; trigger.setAttribute("aria-expanded", String(value)); };
  note.addEventListener("pointerenter", event => { if (event.pointerType !== "touch") show(true); });
  note.addEventListener("pointerleave", () => { if (!pinned && !note.contains(document.activeElement)) show(false); });
  trigger.addEventListener("focus", () => show(true));
  trigger.addEventListener("click", () => { pinned = !pinned; show(pinned); });
  note.addEventListener("focusout", event => { if (!pinned && !note.contains(event.relatedTarget)) show(false); });
  note.addEventListener("keydown", event => { if (event.key === "Escape") { pinned = false; show(false); } });
}

function updateSceneHeading() {
  const projects = document.body.dataset.gardenPanel === "projects";
  const heading = document.querySelector(".garden-world-heading h2");
  const kicker = document.querySelector(".garden-world-heading .section-kicker");
  const panel = document.body.dataset.gardenPanel || "about";
  const labels = { about: ["navAbout", "aboutKicker"], projects: ["navProjects", "projectsKicker"], skills: ["navSkills", "skillsKicker"], journey: ["navJourney", "journeyKicker"], contact: ["navContact", "contactKicker"], upcoming: ["navUpcoming", "upcomingKicker"] };
  const [titleKey, kickerKey] = labels[panel] || labels.about;
  if (heading) heading.textContent = dictionary[currentLanguage][titleKey];
  if (kicker) kicker.textContent = dictionary[currentLanguage][kickerKey];
}

function setLanguage(language, ticket = language) {
  ticketLanguage = ticket;
  currentLanguage = language;
  localStorage.setItem("garden-language", language);
  localStorage.setItem("garden-language-editorial", language);
  const sceneSwitcher = document.querySelector(".scene-language-switch");
  sceneSwitcher?.setAttribute("aria-label", language === "zh" ? "切换到英文" : "Switch to Chinese");
  sceneSwitcher?.setAttribute("title", language === "zh" ? "中文 → English" : "English → 中文");
  if (ticketLanguage !== language) {
    sceneSwitcher?.setAttribute("aria-label", "将英文门票翻译成中文");
    sceneSwitcher?.setAttribute("title", "点击将英文门票翻译成中文");
  }
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = dictionary[node.closest(".garden-nav-ticket, .admission-ticket") ? ticketLanguage : language][node.dataset.i18n];
    if (value !== undefined) node.innerHTML = value;
  });
  window.dispatchEvent(new CustomEvent("garden-language-change", { detail: { language } }));
  renderProjects();
  renderGallery();
  updateSceneHeading();
  const admissionLabel = document.querySelector('.ticket-action-label');
  if (admissionLabel) admissionLabel.textContent = 'Slice to enter';
  const stubInstruction = document.querySelector('.stub-instruction');
  if (stubInstruction) stubInstruction.textContent = language === 'zh' ? '点击撕下票根 · 进入花园' : 'Tear off your stub · enter the garden';
  syncTicketPaths();
  syncDoorNavigation();
}

function renderProjects() {
  const grid = document.querySelector("#project-grid");
  if (!grid) return;
  const t = dictionary[currentLanguage];
  grid.innerHTML = window.GARDEN_PROJECTS.map((project, index) => `
    <article class="project-card status-${project.status}" data-project="${project.slug}" style="--tilt:${index % 2 ? "1.1deg" : "-0.8deg"}">
      <div class="plant-stage">${plantSVG(project.status)}<span class="status-tag">${t[`status_${project.status}`]}</span></div>
      <div class="project-copy">
        <p class="project-number">PLOT ${String(index + 1).padStart(2, "0")}</p>
        <h3>${project.name[currentLanguage]}</h3>
        <p>${project.summary[currentLanguage]}</p>
        <ul class="tech-list">${project.tech.map((item) => `<li>${item}</li>`).join("")}</ul>
        <div class="project-meta"><span class="github-meta" ${project.stars === null ? "hidden" : ""}>${project.stars === null ? "" : `★ ${project.stars}`}</span><span class="license-meta">${project.license}</span></div>
        ${project.repository
          ? `<a class="project-link" href="${project.repository}" target="_blank" rel="noreferrer">${t.viewProject} · GitHub <span aria-hidden="true">↗</span></a>`
          : `<span class="project-link project-link-disabled">${t.repositoryPending} <span aria-hidden="true">·</span></span>`}
      </div>
    </article>`).join("");
  hydrateGitHubData();
}

async function hydrateGitHubData() {
  await Promise.all(window.GARDEN_PROJECTS.map(async (project) => {
    const match = project.repository.match(/^https:\/\/github\.com\/([^/]+)\/([^/#?]+)\/?$/i);
    if (!match) return;
    try {
      const response = await fetch(`https://api.github.com/repos/${match[1]}/${match[2]}`, { headers: { Accept: "application/vnd.github+json" } });
      if (!response.ok) return;
      const data = await response.json();
      const card = document.querySelector(`[data-project="${project.slug}"]`);
      if (!card) return;
      const githubMeta = card.querySelector(".github-meta");
      githubMeta.textContent = `★ ${data.stargazers_count.toLocaleString()}`;
      githubMeta.hidden = false;
      if (data.license?.spdx_id) card.querySelector(".license-meta").textContent = data.license.spdx_id;
    } catch (_) {
      // Curated project copy remains available when GitHub cannot be reached.
    }
  }));
}

document.querySelector(".mailbox-toggle")?.addEventListener("click", event => {
  const button = event.currentTarget;
  button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
});
document.querySelector(".scene-language-switch")?.addEventListener("click", () => setLanguage(ticketLanguage !== currentLanguage ? "zh" : currentLanguage === "zh" ? "en" : "zh"));

const panelIds = ["about", "projects", "journey", "skills", "contact", "upcoming"];
let activeGardenPanel = "about";
// Browsing marks belong to this visit; reopening the ticket preserves them.
const visitedGardenPaths = new Set();
let gardenStampTimer;
function scheduleGardenStamp() {
  clearTimeout(gardenStampTimer);
  if (document.hidden || !document.body.classList.contains("garden-open") || visitedGardenPaths.has(activeGardenPanel)) return;
  const path = activeGardenPanel;
  gardenStampTimer = setTimeout(() => {
    if (document.hidden || !document.body.classList.contains("garden-open") || activeGardenPanel !== path) return;
    visitedGardenPaths.add(path);
    syncTicketPaths();
  }, 2000);
}
document.addEventListener("visibilitychange", scheduleGardenStamp);
const previousDoorButton = document.querySelector(".door-previous");
const nextDoorButton = document.querySelector(".door-next");

function syncTicketPaths() {
  const zh = ticketLanguage === "zh";
  document.querySelectorAll("[data-ticket-target]").forEach((button) => {
    const id = button.dataset.ticketTarget;
    const current = id === activeGardenPanel && document.body.classList.contains("garden-open");
    const visited = visitedGardenPaths.has(id);
    button.classList.toggle("is-current", current);
    button.classList.toggle("is-visited", visited);
    if (current) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
    let status = button.querySelector(".route-state");
    if (!status) {
      status = document.createElement("span");
      status.className = "route-state";
      status.setAttribute("aria-hidden", "true");
      button.append(status);
    }
    status.textContent = current ? "→" : visited ? "✓" : "○";
    const label = current ? (zh ? "当前位置" : "Current path") : visited ? (zh ? "已浏览" : "Visited") : (zh ? "尚未浏览" : "Not visited yet");
    button.setAttribute("aria-label", `${button.querySelector("strong").textContent}, #${id}, ${label}`);
    button.title = label;
  });
  const progress = document.querySelector(".garden-path-progress");
  if (progress) progress.textContent = `${zh ? "已集章" : "Collected"} ${visitedGardenPaths.size} / ${panelIds.length}`;
  const stampTray = document.querySelector(".garden-stamps");
  if (stampTray) {
    panelIds.forEach((id, index) => {
      if (!visitedGardenPaths.has(id)) return;
      let stamp = stampTray.querySelector(`[data-stamp="${id}"]`);
      if (!stamp) {
        stamp = document.createElement("span");
        stamp.className = "garden-visit-stamp";
        stamp.dataset.stamp = id;
        stamp.innerHTML = `<b>${String(index + 1).padStart(2, "0")}</b><span></span><small>VISITED</small>`;
        stampTray.append(stamp);
      }
      const name = document.querySelector(`[data-ticket-target="${id}"] strong`).textContent;
      const stampWord = zh
        ? { about: "园丁", projects: "作品", journey: "成长", skills: "工具", contact: "来信", upcoming: "期待" }
        : { about: "HELLO", projects: "WORK", journey: "GROW", skills: "TOOLS", contact: "MAIL", upcoming: "SOON" };
      stamp.querySelector("span").textContent = stampWord[id];
      stamp.setAttribute("aria-label", `${name} · ${zh ? "已盖章" : "Stamped"}`);
    });
  }
  const legend = document.querySelector(".garden-path-legend");
  if (legend) legend.textContent = zh ? "→ 当前 · ✓ 已浏览" : "→ Here · ✓ Visited";
}

const storyboard = document.querySelector(".garden-storyboard");
let pendingPanel = null;
let panelTransitionRunning = false;
let panelTransitionVersion = 0;
let panelAnimation = null;

function resetPanelTransition() {
  panelTransitionVersion++;
  pendingPanel = null;
  panelTransitionRunning = false;
  panelAnimation?.cancel();
  panelAnimation = null;
  storyboard.inert = false;
  storyboard.removeAttribute("aria-busy");
}

async function activateGardenPanel(id = "about", updateHistory = true) {
  pendingPanel = { id: panelIds.includes(id) ? id : "about", updateHistory };
  if (panelTransitionRunning) return;
  panelTransitionRunning = true;
  const version = ++panelTransitionVersion;
  try {
    while (pendingPanel) {
      const request = pendingPanel;
      pendingPanel = null;
      const animate = request.id !== activeGardenPanel &&
        document.body.classList.contains("garden-open") &&
        !document.body.classList.contains("garden-entering") &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const moveFocus = storyboard.contains(document.activeElement);
      if (animate) {
        storyboard.inert = true;
        storyboard.setAttribute("aria-busy", "true");
        panelAnimation = storyboard.animate([
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(64px)" }
        ], { duration: 360, easing: "cubic-bezier(.4,0,.7,.3)", fill: "forwards" });
        await panelAnimation.finished;
        if (version !== panelTransitionVersion) return;
      }
      // If navigation changed during the exit, reveal the most recent choice.
      const destination = pendingPanel || request;
      pendingPanel = null;
      commitGardenPanel(destination.id, destination.updateHistory);
      panelAnimation?.cancel();
      if (animate) {
        panelAnimation = storyboard.animate([
          { opacity: 0, transform: "translateY(-18px)" },
          { opacity: 1, transform: "translateY(0)" }
        ], { duration: 420, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" });
        await panelAnimation.finished;
        if (version !== panelTransitionVersion) return;
        panelAnimation.cancel();
      }
      storyboard.inert = false;
      if (moveFocus) {
        const heading = storyboard.querySelector("h2");
        heading?.setAttribute("tabindex", "-1");
        heading?.focus({ preventScroll: true });
      }
    }
  } catch (error) {
    if (error.name !== "AbortError") throw error;
  } finally {
    if (version === panelTransitionVersion) {
      panelTransitionRunning = false;
      storyboard.inert = false;
      storyboard.removeAttribute("aria-busy");
      panelAnimation = null;
    }
  }
}

function commitGardenPanel(id = "about", updateHistory = true) {
  const nextId = panelIds.includes(id) ? id : "about";
  activeGardenPanel = nextId;
  scheduleGardenStamp();
  document.body.dataset.gardenPanel = nextId;
  updateSceneHeading();
  document.querySelectorAll(".garden-panel").forEach((panel) => {
    const isActive = panel.dataset.panel === nextId;
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
    if (isActive) panel.classList.add("is-visible");
  });
  const activeIndex = panelIds.indexOf(nextId);
  const doorRouteLabel = document.querySelector(".door-route-label");
  if (doorRouteLabel) doorRouteLabel.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(panelIds.length).padStart(2, "0")} · garden gate`;
  syncDoorNavigation();
  syncTicketPaths();
  if (updateHistory) history.replaceState(null, "", `#${nextId}`);
  window.dispatchEvent(new CustomEvent("garden-panel-change", { detail: { id: nextId } }));
  document.getElementById(nextId)?.scrollTo({ top: 0, behavior: "instant" });
}

function openGarden(targetPanel = "about") {
  if (document.body.classList.contains("garden-open") || document.body.classList.contains("garden-switching")) return;
  document.body.classList.add("garden-switching");
  const ticket = document.querySelector('.admission-ticket');
  ticket.style.setProperty('--detached-stub-height', `${document.querySelector('.enter-garden').offsetHeight}px`);
  ticket.classList.add('stub-released');
  document.querySelector(".enter-garden").setAttribute("aria-expanded", "true");
  document.querySelector(".enter-garden").disabled = true;
  const reduceEntryMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    ticket.classList.add('stub-detached');
    document.body.classList.remove("garden-switching");
    document.body.classList.add("garden-open", "garden-entering");
    const garden = document.querySelector("#garden");
    garden.removeAttribute("inert");
    garden.setAttribute("aria-hidden", "false");
    activateGardenPanel(targetPanel, true);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.setTimeout(() => {
      document.body.classList.remove("garden-entering");
      const heading = document.querySelector('.garden-world-heading h2');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
    }, reduceEntryMotion ? 0 : 900);
  }, reduceEntryMotion ? 0 : 650);
}

function closeGarden() {
  resetPanelTransition();
  document.querySelector('.admission-ticket')?.classList.remove('stub-released', 'stub-detached');
  document.body.classList.remove("garden-open", "garden-entering", "garden-switching");
  const garden = document.querySelector("#garden");
  garden.setAttribute("inert", "");
  garden.setAttribute("aria-hidden", "true");
  document.querySelector(".enter-garden").setAttribute("aria-expanded", "false");
  document.querySelector(".enter-garden").disabled = false;
  history.replaceState(null, "", "#top");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector(".enter-garden").addEventListener("click", () => openGarden("about"));
const admissionTicket = document.querySelector('.admission-ticket');
const ticketMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const resetTicketTilt = () => {
  admissionTicket?.style.setProperty('--ticket-x', '0px');
  admissionTicket?.style.setProperty('--ticket-y', '0px');
  admissionTicket?.style.setProperty('--ticket-rx', '0deg');
  admissionTicket?.style.setProperty('--ticket-ry', '0deg');
};
admissionTicket?.addEventListener('pointermove', event => {
  if (ticketMotionPreference.matches || event.pointerType === 'touch') return;
  const rect = admissionTicket.getBoundingClientRect();
  const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
  const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
  admissionTicket.style.setProperty('--ticket-x', `${x * 8}px`);
  admissionTicket.style.setProperty('--ticket-y', `${y * 3 - 3}px`);
  admissionTicket.style.setProperty('--ticket-rx', `${-y * 4}deg`);
  admissionTicket.style.setProperty('--ticket-ry', `${x * 8}deg`);
});
admissionTicket?.addEventListener('pointerleave', resetTicketTilt);
ticketMotionPreference.addEventListener('change', resetTicketTilt);
// The interior pass follows the entrance ticket, without its tear-off action.
const gardenPass = document.querySelector('.garden-nav-ticket');
let gardenPassBounds;
const resetGardenPass = () => {
  gardenPassBounds = null;
  gardenPass?.classList.remove('is-floating');
  for (const [name, value] of Object.entries({ x: '0px', y: '0px', rx: '0deg', ry: '0deg' })) {
    gardenPass?.style.setProperty(`--pass-${name}`, value);
  }
};
gardenPass?.addEventListener('pointerenter', () => {
  // Cache the resting bounds so the tilt does not chase its own moving edges.
  gardenPassBounds = gardenPass.getBoundingClientRect();
});
gardenPass?.addEventListener('pointermove', event => {
  if (ticketMotionPreference.matches || event.pointerType === 'touch') return;
  const bounds = gardenPassBounds ??= gardenPass.getBoundingClientRect();
  const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
  const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
  gardenPass.classList.add('is-floating');
  gardenPass.style.setProperty('--pass-x', `${x * 5}px`);
  gardenPass.style.setProperty('--pass-y', `${y * 2 - 5}px`);
  gardenPass.style.setProperty('--pass-rx', `${-y * 3}deg`);
  gardenPass.style.setProperty('--pass-ry', `${x * 7}deg`);
}, { passive: true });
gardenPass?.addEventListener('pointerleave', resetGardenPass);
gardenPass?.addEventListener('pointercancel', resetGardenPass);
ticketMotionPreference.addEventListener('change', resetGardenPass);
window.addEventListener('resize', resetGardenPass);
window.addEventListener('blur', resetGardenPass);
window.addEventListener("garden-panel-request", (event) => activateGardenPanel(event.detail?.id));
function projectDoorStep(direction) {
  if (activeGardenPanel !== "projects") return false;
  const nextWork = currentWork + direction;
  if (nextWork < 0 || nextWork >= galleryWorks.length) return false;
  currentWork = nextWork;
  renderGallery();
  document.querySelector("#projects")?.scrollTo({ top: 0, behavior: "instant" });
  syncDoorNavigation();
  return true;
}

function syncDoorNavigation() {
  const panelIndex = panelIds.indexOf(activeGardenPanel);
  const zh = currentLanguage === "zh";
  const previousWork = activeGardenPanel === "projects" && currentWork > 0;
  const nextWork = activeGardenPanel === "projects" && currentWork < galleryWorks.length - 1;
  if (previousDoorButton) {
    previousDoorButton.disabled = !previousWork && panelIndex <= 0;
    previousDoorButton.setAttribute("aria-label", previousWork ? (zh ? "上一件作品" : "Previous work") : (zh ? "进入上一个花园区域" : "Previous garden area"));
  }
  if (nextDoorButton) {
    nextDoorButton.disabled = !nextWork && panelIndex >= panelIds.length - 1;
    nextDoorButton.setAttribute("aria-label", nextWork ? (zh ? "下一件作品" : "Next work") : (zh ? "进入下一个花园区域" : "Next garden area"));
  }
}

previousDoorButton?.addEventListener("click", () => {
  if (projectDoorStep(-1)) return;
  const currentIndex = panelIds.indexOf(activeGardenPanel);
  if (currentIndex > 0) activateGardenPanel(panelIds[currentIndex - 1]);
});
nextDoorButton?.addEventListener("click", () => {
  if (projectDoorStep(1)) return;
  const currentIndex = panelIds.indexOf(activeGardenPanel);
  if (currentIndex < panelIds.length - 1) activateGardenPanel(panelIds[currentIndex + 1]);
});
document.querySelectorAll("[data-open-contact]").forEach((button) => {
  button.addEventListener("click", () => activateGardenPanel("contact"));
});
const wechatDialog = document.querySelector("#wechat-dialog");
document.querySelectorAll("[data-show-wechat]").forEach((button) => {
  button.addEventListener("click", () => wechatDialog.showModal());
});
wechatDialog.addEventListener("click", (event) => {
  if (event.target !== wechatDialog) return;
  const rect = wechatDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) wechatDialog.close();
});
// Delegation keeps the notebook links working after a language switch.
document.querySelector("#about").addEventListener("click", (event) => {
  const link = event.target.closest(".experience-project-link:not([data-mail-contact])");
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  activateGardenPanel("projects");
});
document.querySelectorAll("[data-ticket-target]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.ticketTarget === "projects") {
      const directory = document.querySelector("#garden-work-directory");
      directory.hidden = !directory.hidden;
      button.setAttribute("aria-expanded", String(!directory.hidden));
    }
    activateGardenPanel(button.dataset.ticketTarget);
  });
});
document.querySelector("#garden-work-directory")?.addEventListener("click", event => {
  const button = event.target.closest("[data-directory-work]");
  if (!button) return;
  currentWork = Number(button.dataset.directoryWork);
  renderGallery();
  activateGardenPanel("projects");
  document.querySelector(`[data-directory-work="${currentWork}"]`)?.focus({ preventScroll: true });
});
const gardenTicketDate = document.querySelector("#garden-ticket-date");
if (gardenTicketDate) {
  gardenTicketDate.textContent = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" })
    .format(new Date())
    .replaceAll("-", ".");
}
document.querySelector("[data-return-home]").addEventListener("click", (event) => {
  if (!document.body.classList.contains("garden-open")) return;
  event.preventDefault();
  closeGarden();
});

const foreground = document.querySelector("#garden-foreground");
drawMarkerDoor();
document.querySelectorAll(".walking-figure").forEach((old, index) => {
  const visitor = document.createElement("button");
  visitor.type = "button";
  visitor.className = `${old.className} sketch-visitor`;
  visitor.setAttribute("aria-label", "正在散步的小人，点击停留 5 秒 / Pause for 5 seconds");
  visitor.setAttribute("aria-pressed", "false");
  visitor.innerHTML = `<span class="visitor-note">${["Aha!", "Hmm…", "Look closer"][index]}</span>${markerVisitor(index)}`;
  old.replaceWith(visitor);
});
plantForeground(foreground);
animateVisitors(foreground);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach((section) => revealObserver.observe(section));

document.querySelector(".skip-link").addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector(document.body.classList.contains('garden-open') ? '.scene-language-switch' : '.enter-garden')?.focus();
});
// A saved section hash must not bypass the ticket on a fresh visit or reload.
if (panelIds.includes(window.location.hash.slice(1))) {
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}
window.addEventListener("hashchange", () => {
  const id = window.location.hash.slice(1);
  if (document.body.classList.contains("garden-open") && panelIds.includes(id)) activateGardenPanel(id, false);
});
document.querySelector("#year").textContent = new Date().getFullYear();
setLanguage("zh", "en");
