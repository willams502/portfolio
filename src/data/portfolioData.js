// ============================================================
//  DADOS DO JOGADOR — edite aqui para atualizar o portfólio
// ============================================================

export const HUNTER = {
  name: 'Matheus Willams',
  handle: 'willams502',
  title: 'Monarca das Sombras',
  class: 'Necromante Full-Stack',
  subclass: 'Tipo Fantasma • Afinidade Gengar',
  level: 89,
  lore: [
    'Despertou escrevendo HTML, CSS e JS em sites pequenos — e nunca mais parou de subir de nível.',
    'Passou por dezenas de dungeons de PHP até dominar Laravel, e hoje mantém ERPs e sistemas em produção de verdade.',
    'Nas horas vagas invoca bots em Python que trabalham sozinhos enquanto ele dorme. Monarca das Sombras, literalmente.',
  ],
  // radar chart (0-100)
  stats: [
    { key: 'BACK', label: 'Backend', value: 95 },
    { key: 'AUTO', label: 'Automação', value: 90 },
    { key: 'DB', label: 'Banco de Dados', value: 88 },
    { key: 'FRONT', label: 'Frontend', value: 84 },
    { key: 'DEBUG', label: 'Debug / Hotfix', value: 96 },
  ],
  equipment: [
    { slot: 'ARMA', name: 'Teclado Mecânico', bonus: '+30 velocidade de commit', rarity: 'epic' },
    { slot: 'ACESSÓRIO', name: 'Caneca de Café Infinita', bonus: '+∞ MP regen', rarity: 'legendary' },
    { slot: 'ELMO', name: 'Headset de Foco Absoluto', bonus: 'Imune a distrações', rarity: 'rare' },
    { slot: 'RELÍQUIA', name: 'Gengarita (Mega Stone)', bonus: 'Desbloqueia forma Mega', rarity: 'mythic' },
  ],
  contacts: {
    whatsapp: '5531974012890',
    whatsappDisplay: '(31) 97401-2890',
    email: 'matheus-willams-dev@outlook.com',
    linkedin: 'https://www.linkedin.com/in/matheuswillams/',
    github: 'https://github.com/willams502',
  },
};

// Gates = projetos. rank: S | A | B | C
export const GATES = [
  {
    id: 'erp',
    name: 'ERP Genial',
    subtitle: 'Laravel 13 • PHP 8.3',
    rank: 'S',
    type: 'Dungeon Corporativa',
    briefing:
      'Sistema de gestão empresarial em produção. Módulos de comissões, faturamento, geração de PDFs e integração com WhatsApp para avisos automáticos.',
    boss: 'O Hidra das Comissões — regras de cálculo que mudam a cada cliente, sem poder derrubar a produção.',
    loot: ['Laravel', 'PHP 8.3', 'MySQL', 'DomPDF', 'WhatsApp API', 'Blade'],
    status: 'EM PRODUÇÃO',
    proprietary: true, // repositório privado da empresa
  },
  {
    id: 'novacentral',
    name: 'Nova Central',
    subtitle: 'Central de Chamados',
    rank: 'A',
    type: 'Dungeon de Suporte',
    briefing:
      'Central de atendimento para clientes: abertura e interação em chamados, listagem de abertos/fechados, consulta de contratos e dashboard.',
    boss: 'O Golem dos Tickets — centenas de chamados e interações que precisam estar sempre rastreáveis.',
    loot: ['PHP', 'MySQL', 'JavaScript', 'AJAX'],
    status: 'EM OPERAÇÃO',
    github: 'https://github.com/genial-sistemas/novacentral.brinfor.com.br',
  },
  {
    id: 'adotra',
    name: 'Adotra',
    subtitle: 'Projeto Freela • Demo no ar',
    rank: 'A',
    type: 'Dungeon de Contrato',
    // TODO(Matheus): descreva o Adotra em 1-2 frases do seu jeito
    briefing:
      'Sistema web desenvolvido como freela, com painel administrativo completo. Entre com a conta de demonstração e explore à vontade.',
    boss: 'O Cliente Exigente — entregar um sistema completo, do banco ao painel, com prazo de freela.',
    loot: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    status: 'ONLINE',
    demo: 'https://adotraa.ct.ws/login.php',
    creds: { email: 'Example@adotra.com', pass: 'example123' },
    github: 'https://github.com/willams502/Adotra',
  },
  {
    id: 'catho',
    name: 'Bot Catho',
    subtitle: 'Auto-candidatura em vagas',
    rank: 'A',
    type: 'Dungeon de Automação',
    briefing:
      'Bot que varre vagas no site da Catho, identifica as compatíveis e se candidata sozinho enviando o currículo — usando um perfil real de navegador.',
    boss: 'O Guardião Anti-Bot — sites que não querem ser automatizados.',
    loot: ['Python', 'Selenium', 'Automação Web'],
    status: 'CONCLUÍDO',
    github: 'https://github.com/willams502/Bot-de-cadastro-de-vagas-catho',
  },
  {
    id: 'zap',
    name: 'Disparador Zap',
    subtitle: 'Mensagens em massa',
    rank: 'B',
    type: 'Dungeon de Automação',
    briefing: 'Bot que dispara mensagens em massa no WhatsApp a partir de uma lista de contatos.',
    boss: 'O Espectro do Ban — mandar volume sem parecer spam.',
    loot: ['Python', 'Selenium'],
    status: 'CONCLUÍDO',
    github: 'https://github.com/willams502/Bot-disparador-de-whatsapp',
  },
  {
    id: 'pdf',
    name: 'Tradutor de PDF',
    subtitle: 'PyMuPDF + Deep Translator',
    rank: 'B',
    type: 'Dungeon Utilitária',
    briefing: 'Extrai o texto de PDFs, traduz e gera um novo documento traduzido.',
    boss: 'O Mímico de Layout — PDFs que não querem ser lidos.',
    loot: ['Python', 'PyMuPDF', 'Deep Translator', 'FPDF'],
    status: 'CONCLUÍDO',
    github: 'https://github.com/willams502/Tratudor-de-PDF',
  },
  {
    id: 'snake',
    name: 'Snake',
    subtitle: 'Jogo no navegador',
    rank: 'C',
    type: 'Dungeon Clássica',
    briefing: 'O clássico jogo da cobrinha feito com HTML, CSS e JavaScript puro.',
    boss: 'A Própria Cauda.',
    loot: ['JavaScript', 'HTML', 'CSS'],
    status: 'CONCLUÍDO',
    github: 'https://github.com/willams502/Snake',
  },
];

// Exército de Sombras = stack
export const SHADOWS = [
  { name: 'Igris', tech: 'Laravel', grade: 'MARECHAL', desc: 'Cavaleiro rubro. Lidera ERPs inteiros: MVC, Eloquent, migrations, filas.', color: '#ef4444' },
  { name: 'Beru', tech: 'Python', grade: 'MARECHAL', desc: 'Rei formiga. Comanda enxames de bots, scraping e automações.', color: '#a855f7' },
  { name: 'Tank', tech: 'PHP', grade: 'ELITE', desc: 'Aguenta qualquer legado. Já carregou dezenas de sistemas nas costas.', color: '#8b5cf6' },
  { name: 'Tusk', tech: 'MySQL', grade: 'ELITE', desc: 'Mago dos dados. Modelagem, queries pesadas e relatórios.', color: '#6366f1' },
  { name: 'Kaisel', tech: 'JavaScript', grade: 'ELITE', desc: 'Wyvern veloz. Interatividade, AJAX e interfaces vivas.', color: '#eab308' },
  { name: 'Iron', tech: 'React', grade: 'CAVALEIRO', desc: 'Componentes, hooks e SPAs — incluindo este portfólio.', color: '#22d3ee' },
  { name: 'Greed', tech: 'Selenium', grade: 'CAVALEIRO', desc: 'Controla navegadores como marionetes.', color: '#10b981' },
  { name: 'Fang', tech: 'Git', grade: 'CAVALEIRO', desc: 'Branches, hotfixes e merges sem perder ninguém pelo caminho.', color: '#f97316' },
  { name: 'Jima', tech: 'HTML/CSS', grade: 'SOLDADO', desc: 'A base de tudo. Layouts responsivos e Tailwind.', color: '#ec4899' },
];

export const CHRONICLES = [
  { ch: 'I', title: 'O Primeiro Portal', text: 'Primeiros sites em HTML5, CSS3 e JS — Sitesenior, Aromas da May, Snake.' },
  { ch: 'II', title: 'O Caminho do PHP', text: 'Dezenas de repositórios de estudo: tipos, strings, funções, operadores, saídas.' },
  { ch: 'III', title: 'A Forja dos Frameworks', text: 'CodeIgniter, Laravel, desafios técnicos e projetos completos com banco.' },
  { ch: 'IV', title: 'O Despertar das Sombras', text: 'Bots em Python: Catho, WhatsApp, tradutor de PDF. Código que trabalha sozinho.' },
  { ch: 'V', title: 'Raids em Produção', text: 'ERP Genial em Laravel 13 e Nova Central — sistemas reais, usuários reais, hotfixes reais.' },
  { ch: 'VI', title: '???', text: 'Próximo capítulo: a sua guilda.', locked: true },
];
