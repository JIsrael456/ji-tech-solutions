/* ============================================================
   JI TECH SOLUTIONS — RENDERIZAÇÃO
   ------------------------------------------------------------
   Este arquivo lê os dados de js/data.js e monta a página.
   Normalmente você não precisa editar nada aqui — para mudar
   conteúdo, edite js/data.js.
============================================================ */

const STATUS_LABEL = {
  concluido: "Concluído",
  andamento: "Em andamento",
  planejado: "Planejado",
  bloqueado: "Bloqueado",
};

const STATUS_PESO = {
  concluido: 1,
  andamento: 0.5,
  planejado: 0,
  bloqueado: 0,
};

document.addEventListener("DOMContentLoaded", () => {
  preencherTextosBase();
  preencherLinks();
  renderResumoStatus();
  renderFases();
  renderStack();
  ativarMenuMobile();
  ativarRevealAoScroll();
  iniciarRelogio();
});

/* ---------- textos base (empresa / autor) ---------- */
function preencherTextosBase() {
  document.getElementById("heroNomeEmpresa").textContent = EMPRESA.nome;
  document.getElementById("heroTagline").textContent = EMPRESA.tagline;
  document.getElementById("heroDescricao").textContent = EMPRESA.descricao;
  document.getElementById("factColaboradores").textContent = `${EMPRESA.colaboradoresSimulados} colaboradores`;
  document.getElementById("factFases").textContent = FASES.length;

  document.getElementById("autorNome").textContent = AUTOR.nome;
  document.getElementById("autorCargo").textContent = AUTOR.cargo;
  document.getElementById("autorBio").textContent = AUTOR.bio;

  document.getElementById("anoAtual").textContent = new Date().getFullYear();
}

function preencherLinks() {
  const repoLinks = [document.getElementById("linkRepoHeader"), document.getElementById("linkRepoHero")];
  repoLinks.forEach((el) => { if (el) el.href = EMPRESA.repositorio; });

  document.getElementById("linkLinkedin").href = AUTOR.linkedin;
  document.getElementById("linkGithub").href = AUTOR.github;
}

/* ---------- resumo de status (hero + cards) ---------- */
function renderResumoStatus() {
  const total = FASES.length;
  const somaPeso = FASES.reduce((acc, f) => acc + STATUS_PESO[f.status], 0);
  const progresso = Math.round((somaPeso / total) * 100);

  const contagem = { concluido: 0, andamento: 0, planejado: 0, bloqueado: 0 };
  FASES.forEach((f) => contagem[f.status]++);

  // hero
  document.getElementById("heroProgressoTexto").textContent = `${progresso}%`;
  requestAnimationFrame(() => {
    document.getElementById("heroProgressoBar").style.width = `${progresso}%`;
  });

  let statusGeral = "Planejamento inicial";
  if (contagem.bloqueado > 0) statusGeral = "Atenção: fase bloqueada";
  else if (contagem.andamento > 0) statusGeral = "Implantação em andamento";
  else if (progresso === 100) statusGeral = "Todos os sistemas operacionais";
  document.getElementById("heroStatusGeral").textContent = statusGeral;

  // cards de resumo
  const cards = [
    { key: "concluido", label: "Concluídas" },
    { key: "andamento", label: "Em andamento" },
    { key: "planejado", label: "Planejadas" },
    { key: "bloqueado", label: "Bloqueadas" },
  ];

  const container = document.getElementById("statusSummary");
  container.innerHTML = cards
    .map(
      (c) => `
      <div class="summary-card st-${c.key}">
        <div class="num">${contagem[c.key]}</div>
        <div class="lbl">${c.label}</div>
      </div>`
    )
    .join("");
}

/* ---------- lista de fases ---------- */
function renderFases() {
  const container = document.getElementById("fasesLista");
  const ordenadas = [...FASES].sort((a, b) => a.ordem - b.ordem);

  container.innerHTML = ordenadas
    .map(
      (f) => `
      <div class="fase-row">
        <div class="fase-codigo">${f.codigo}</div>
        <div class="fase-main">
          <div class="fase-top">
            <span class="dot dot-${f.status}"></span>
            <span class="fase-nome">${String(f.ordem).padStart(2, "0")} · ${f.nome}</span>
            <span class="fase-categoria">${f.categoria}</span>
          </div>
          <p class="fase-desc">${f.descricao}</p>
          <div class="fase-stack">
            ${f.stack.map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
        </div>
        <div class="fase-status">
          <span class="badge st-${f.status}">${STATUS_LABEL[f.status]}</span>
          <a class="fase-link" href="${f.link}" target="_blank" rel="noopener">Ver documentação →</a>
        </div>
      </div>`
    )
    .join("");
}

/* ---------- stack tecnológico agrupado por categoria ---------- */
function renderStack() {
  const porCategoria = {};
  FASES.forEach((f) => {
    if (!porCategoria[f.categoria]) porCategoria[f.categoria] = new Set();
    f.stack.forEach((t) => porCategoria[f.categoria].add(t));
  });

  const container = document.getElementById("stackGrid");
  container.innerHTML = Object.entries(porCategoria)
    .map(
      ([categoria, techs]) => `
      <div class="stack-card">
        <h4>${categoria}</h4>
        <div class="stack-card-tags">
          ${[...techs].map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>`
    )
    .join("");
}

/* ---------- menu mobile ---------- */
function ativarMenuMobile() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  toggle.addEventListener("click", () => {
    const aberto = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(aberto));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- reveal das linhas de fase ao scrollar ---------- */
function ativarRevealAoScroll() {
  const linhas = document.querySelectorAll(".fase-row");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("in-view"), i * 40);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  linhas.forEach((el) => observer.observe(el));
}

/* ---------- relógio "última verificação" no hero ---------- */
function iniciarRelogio() {
  const el = document.getElementById("heroTimestamp");
  const atualizar = () => {
    const agora = new Date();
    el.textContent = agora.toLocaleTimeString("pt-BR", { hour12: false });
  };
  atualizar();
  setInterval(atualizar, 1000);
}