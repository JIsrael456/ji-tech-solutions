/* ============================================================
   JI TECH SOLUTIONS — CAMADA DE DADOS
   ------------------------------------------------------------
   Este é o único arquivo que você deve precisar editar no dia a
   dia. Conforme for avançando no homelab (JIsrael456/homelab-infra),
   atualize os campos "status", "descricao" e "link" de cada fase.

   Valores válidos para "status":
     "planejado"  -> ainda não iniciado (cinza)
     "andamento"  -> em desenvolvimento (âmbar)
     "concluido"  -> finalizado e documentado (verde)
     "bloqueado"  -> pausado / dependência pendente (vermelho)

   O campo "link" pode apontar para uma pasta específica do
   repositório no GitHub, uma página do Notion, ou ficar como "#"
   até você ter o material pronto.

   Para adicionar uma nova "camada" de informação (ex: certificações
   obtidas em cada fase, ou métricas), basta acrescentar novos campos
   nos objetos abaixo — o restante do site não precisa ser tocado,
   só o template em js/script.js caso queira exibir o campo novo.
============================================================ */

const EMPRESA = {
  nome: "JI Tech Solutions",
  tagline: "Infraestrutura de TI simulada para uma operação de 50 colaboradores",
  descricao:
    "Ambiente corporativo fictício construído do zero para reproduzir os desafios reais de uma equipe de TI de pequeno/médio porte: rede, servidores, identidade, automação, nuvem e dados sob um mesmo teto.",
  repositorio: "https://github.com/JIsrael456/homelab-infra",
  colaboradoresSimulados: 50,
};

const AUTOR = {
  nome: "Jacó Israel Veras e Silva",
  cargo: "IT Assistant · Data Science (UNICSUL, conclusão em 12/2026)",
  bio:
    "Profissional de TI com experiência em IAM, Active Directory, Google Workspace, segurança de endpoint (Ivanti), SQL e Power BI. Este projeto documenta a construção de um ambiente corporativo completo como estudo de caso para vagas em Auditoria de TI, Governança de Dados e Infraestrutura/Cloud.",
  linkedin: "https://www.linkedin.com/in/jaco-israel",
  github: "https://github.com/JIsrael456",
};

const FASES = [
  {
    ordem: 1,
    codigo: "NET",
    nome: "Infraestrutura de Rede",
    categoria: "Rede",
    status: "andamento",
    descricao:
      "Topologia de rede corporativa: VLANs, roteamento inter-redes, segmentação por departamento e regras de firewall perimetral.",
    stack: ["VLAN", "Firewall", "Roteamento", "Subnetting"],
    link: "https://github.com/JIsrael456/homelab-infra/tree/main/fase-01-rede",
  },
  {
    ordem: 2,
    codigo: "AD",
    nome: "Windows Server (AD / DNS / DHCP / GPO)",
    categoria: "Identidade",
    status: "andamento",
    descricao:
      "Domínio Active Directory com estrutura de OUs por departamento, políticas de grupo, DNS interno e escopos DHCP segmentados.",
    stack: ["Active Directory", "DNS", "DHCP", "GPO"],
    link: "#",
  },
  {
    ordem: 3,
    codigo: "WKS",
    nome: "Windows Client",
    categoria: "Endpoint",
    status: "planejado",
    descricao:
      "Provisionamento e hardening de estações de trabalho, ingresso no domínio e aplicação de políticas de segurança de endpoint.",
    stack: ["Windows 11", "Hardening", "Ingresso em domínio"],
    link: "#",
  },
  {
    ordem: 4,
    codigo: "LNX",
    nome: "Linux",
    categoria: "Servidores",
    status: "planejado",
    descricao:
      "Servidores Linux para serviços internos: administração via shell, gerenciamento de pacotes, usuários e permissões.",
    stack: ["Ubuntu Server", "SSH", "systemd"],
    link: "#",
  },
  {
    ordem: 5,
    codigo: "DKR",
    nome: "Docker",
    categoria: "Containers",
    status: "planejado",
    descricao:
      "Conteinerização de serviços internos e orquestração básica com Docker Compose para simular cargas de trabalho isoladas.",
    stack: ["Docker", "Docker Compose"],
    link: "#",
  },
  {
    ordem: 6,
    codigo: "SQL",
    nome: "Bancos de Dados / SQL",
    categoria: "Dados",
    status: "planejado",
    descricao:
      "Modelagem de banco relacional, consultas analíticas e rotinas de auditoria de dados — base para os dashboards de Power BI.",
    stack: ["SQL Server", "T-SQL", "Modelagem de dados"],
    link: "#",
  },
  {
    ordem: 7,
    codigo: "PS1",
    nome: "Automação PowerShell",
    categoria: "Automação",
    status: "planejado",
    descricao:
      "Scripts de automação para criação de usuários, relatórios de AD e tarefas administrativas recorrentes.",
    stack: ["PowerShell", "AD Module"],
    link: "#",
  },
  {
    ordem: 8,
    codigo: "SH",
    nome: "Automação Shell Script",
    categoria: "Automação",
    status: "planejado",
    descricao:
      "Scripts Bash para monitoramento básico, backups e rotinas de manutenção dos servidores Linux do ambiente.",
    stack: ["Bash", "Cron"],
    link: "#",
  },
  {
    ordem: 9,
    codigo: "GCP",
    nome: "Google Cloud",
    categoria: "Cloud",
    status: "planejado",
    descricao:
      "Extensão do ambiente on-premises para a nuvem: máquinas virtuais, redes VPC e um data warehouse em BigQuery.",
    stack: ["Compute Engine", "VPC", "BigQuery"],
    link: "#",
  },
  {
    ordem: 10,
    codigo: "BI",
    nome: "Power BI Dashboards",
    categoria: "Dados",
    status: "planejado",
    descricao:
      "Painéis analíticos consumindo os dados gerados pelo ambiente: segurança, capacidade e indicadores operacionais.",
    stack: ["Power BI", "DAX"],
    link: "#",
  },
  {
    ordem: 11,
    codigo: "MON",
    nome: "Monitoramento",
    categoria: "Observabilidade",
    status: "planejado",
    descricao:
      "Stack de observabilidade com Grafana e Prometheus para acompanhar a saúde de toda a infraestrutura simulada em tempo real.",
    stack: ["Grafana", "Prometheus"],
    link: "#",
  },
];
