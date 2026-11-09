// Area do Colaborador: login validado no servidor (HAZ) e painel interno.
// Nada aqui e segredo: todo dado vem da API, que confere a sessao a cada chamada.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var esc = FAS.esc;
  var ICONES = { 'Fallstate': '/assets/img/games/fallstate-icon.png', 'Fallstate: Claim the World': '/assets/img/games/fallstate-icon.png',
    'Rare Minerals Inc.': '/assets/img/games/rare-minerals-icon.png', 'Shelf & Sell': '/assets/img/games/shelf-and-sell-icon.png' };

  FAS.textos({
    pt: { tituloPagina: 'Área do Colaborador · Flying Apollo Studios', back: 'Voltar ao site', collabArea: 'Área do Colaborador', login: 'Login', password: 'Senha',
      enter: 'Entrar', errLogin: 'Login ou senha incorretos.', errVazio: 'Preencha login e senha.',
      loginNote: 'Acesso restrito. As credenciais são fornecidas pelo estúdio. Problemas para entrar? Fale com flyingapollostudios@gmail.com',
      team: 'Equipe', logout: 'Sair', sessionEnd: 'Sua sessão terminou. Entre de novo.',
      overview: 'Visão geral', projects: 'Projetos', finance: 'Finanças', teamNav: 'Equipe', roadmap: 'Roadmap', notices: 'Avisos',
      revenue6m: 'Receita · últimos 6 meses', ads: 'Anúncios', iap: 'Compras no app', seeAll: 'Ver tudo', nextMilestones: 'Próximos marcos',
      nowOn: 'Agora', nextMilestone: 'Próximo marco', lead: 'Responsável', people: 'pessoas', progress: 'Progresso',
      adsVsIap: 'Anúncios vs. compras no app', byPlatform: 'Receita de anúncios por plataforma', costs: 'Custos do mês', byGame: 'Por app · acumulado do ano',
      game: 'App', platform: 'Plataforma', impressions: 'Impressões', revenue: 'Receita', cost: 'Custo',
      todayLbl: 'Hoje', status: { ok: 'No prazo', risk: 'Em risco', late: 'Atrasado' },
      stages: ['Conceito', 'Protótipo', 'Produção', 'Alpha', 'Beta', 'Lançamento', 'Live ops'],
      kRev: 'Anúncios · mês', kImp: 'Impressões · mês', kProj: 'Projetos ativos', kTk: 'Tickets abertos', kYear: 'Anúncios · ano',
      kEcpm: 'eCPM · mês', kClicks: 'Cliques · mês', kCost: 'Custos · ano', kProfit: 'Lucro · ano',
      vsLast: 'vs. mês anterior', urgent: 'de prioridade alta', ytd: 'Jan até hoje', margin: 'margem', perThousand: 'por mil impressões',
      onTrack: 'no prazo', atRisk: 'em risco', late: 'atrasado(s)',
      admobOff: 'AdMob ainda não conectado. No PC de administração, rode: python configurar_segredos.py admob --client-json <arquivo>',
      admobErr: 'Não foi possível ler o AdMob agora. Tente de novo mais tarde.', stale: 'Dados do AdMob desatualizados',
      lojaSt: { nao_publicado: 'Não publicado', em_desenvolvimento: 'Em desenvolvimento', teste_interno: 'Teste interno', teste_fechado: 'Teste fechado',
        teste_aberto: 'Teste aberto', em_revisao: 'Em revisão', publicado: 'Publicado', removido: 'Removido' },
      startedAt: 'Início do projeto', curVersion: 'Versão atual', pkg: 'Pacote', openStore: 'Abrir na loja ↗', history: 'Histórico',
      addEntries: 'Adicionar registros', dateLbl: 'Data', previewBtn: 'Pré-visualizar', saveEntries: 'Salvar registros',
      pasteHelp: 'Cole a lista do que foi feito. Uma linha por item, começando com "-". Recue (tab) para subitens. Termine com (OK) ou (NOK).',
      appendOnly: 'Registros não podem ser editados nem apagados depois de salvos. Para corrigir, adicione um registro novo.',
      editData: 'Editar dados', saveData: 'Salvar dados', cancel: 'Cancelar', backProjects: '← Projetos', entriesN: 'registros',
      pendingN: 'pendentes', lastUpd: 'última atualização', noEntries: 'Nenhum registro ainda.', savedN: 'registro(s) salvo(s)',
      changedLbl: 'alterou', noChange: 'Nada mudou.', changesSaved: 'alteração(ões) salva(s) e registrada(s) no histórico', previewOf: 'Prévia', willSave: 'serão salvos em',
      errEntries: 'Não entendi a lista. Use uma linha por item começando com "-".',
      errBadDate: 'Data inválida (não pode ser futura).', errBadLink: 'Link inválido: use um endereço que comece com https://', errSave: 'Não foi possível salvar.',
      rdBtn: 'Projeto reditus', rdGoal: 'Meta', rdOf: 'de', rdMissing: 'Faltam', rdDone: 'Meta atingida!', rdMonths: 'Depósitos por mês',
      rdAdd: 'Adicionar depósito', rdDate: 'Data', rdValue: 'Valor (R$)', rdDesc: 'Descrição (opcional)', rdFile: 'Comprovante (PDF ou imagem, até 10 MB)',
      rdSave: 'Salvar depósito', rdOpen: 'Abrir', rdDownload: 'Baixar', rdAttach: '+ Anexar', rdRemove: 'Remover',
      rdConfirm: 'Remover este depósito das contas? O valor sai do total.', rdEmpty: 'Nenhum depósito ainda.', rdViewOnly: 'Somente visualização: apenas o responsável lança valores.',
      rdErrValue: 'Digite um valor válido, como 1.500,00.', rdErrFile: 'O comprovante precisa ser PDF, PNG, JPG ou WEBP, com até 10 MB.', rdErrDate: 'Data inválida (não pode ser futura).',
      rdErrPerm: 'Só o responsável pode alterar o Projeto reditus.', rdErrLink: 'Não foi possível abrir o arquivo.', rdSaved: 'Depósito salvo', rdRemoved: 'Depósito removido', rdAttached: 'Comprovante anexado', nextAt: 'próxima', refreshNow: '↻ Atualizar agora',
      admobLive: 'AdMob · atualizado', empty: 'Nada cadastrado ainda.', emptyHint: 'Edite C:\\FastudiosAPI\\dados\\painel.json no HAZ.',
      noData: 'Sem dados', loading: 'Carregando…', noAccess: 'Seu acesso não inclui finanças.' },
    en: { tituloPagina: 'Team Area · Flying Apollo Studios', back: 'Back to site', collabArea: 'Team Area', login: 'Login', password: 'Password',
      enter: 'Sign in', errLogin: 'Wrong login or password.', errVazio: 'Enter your login and password.',
      loginNote: 'Restricted access. Credentials are issued by the studio. Trouble signing in? Contact flyingapollostudios@gmail.com',
      team: 'Team', logout: 'Sign out', sessionEnd: 'Your session ended. Please sign in again.',
      overview: 'Overview', projects: 'Projects', finance: 'Finance', teamNav: 'Team', roadmap: 'Roadmap', notices: 'Notices',
      revenue6m: 'Revenue · last 6 months', ads: 'Ads', iap: 'In-app purchases', seeAll: 'See all', nextMilestones: 'Upcoming milestones',
      nowOn: 'Now', nextMilestone: 'Next milestone', lead: 'Lead', people: 'people', progress: 'Progress',
      adsVsIap: 'Ads vs. in-app purchases', byPlatform: 'Ad revenue by platform', costs: 'Costs this month', byGame: 'By app · year to date',
      game: 'App', platform: 'Platform', impressions: 'Impressions', revenue: 'Revenue', cost: 'Cost',
      todayLbl: 'Today', status: { ok: 'On track', risk: 'At risk', late: 'Delayed' },
      stages: ['Concept', 'Prototype', 'Production', 'Alpha', 'Beta', 'Launch', 'Live ops'],
      kRev: 'Ads · month', kImp: 'Impressions · month', kProj: 'Active projects', kTk: 'Open tickets', kYear: 'Ads · year',
      kEcpm: 'eCPM · month', kClicks: 'Clicks · month', kCost: 'Costs · year', kProfit: 'Profit · year',
      vsLast: 'vs. last month', urgent: 'high priority', ytd: 'Jan to date', margin: 'margin', perThousand: 'per thousand impressions',
      onTrack: 'on track', atRisk: 'at risk', late: 'delayed',
      admobOff: 'AdMob not connected yet. On the admin PC, run: python configurar_segredos.py admob --client-json <file>',
      admobErr: 'Could not read AdMob right now. Try again later.', stale: 'AdMob data is stale',
      lojaSt: { nao_publicado: 'Not published', em_desenvolvimento: 'In development', teste_interno: 'Internal test', teste_fechado: 'Closed test',
        teste_aberto: 'Open test', em_revisao: 'In review', publicado: 'Published', removido: 'Removed' },
      startedAt: 'Project start', curVersion: 'Current version', pkg: 'Package', openStore: 'Open in store ↗', history: 'History',
      addEntries: 'Add entries', dateLbl: 'Date', previewBtn: 'Preview', saveEntries: 'Save entries',
      pasteHelp: 'Paste the list of what was done. One line per item, starting with "-". Indent (tab) for sub-items. End with (OK) or (NOK).',
      appendOnly: 'Entries cannot be edited or deleted once saved. To correct something, add a new entry.',
      editData: 'Edit details', saveData: 'Save details', cancel: 'Cancel', backProjects: '← Projects', entriesN: 'entries',
      pendingN: 'pending', lastUpd: 'last update', noEntries: 'No entries yet.', savedN: 'entry(ies) saved',
      changedLbl: 'changed', noChange: 'Nothing changed.', changesSaved: 'change(s) saved and logged in the history', previewOf: 'Preview', willSave: 'will be saved on',
      errEntries: 'Could not read the list. Use one line per item starting with "-".',
      errBadDate: 'Invalid date (cannot be in the future).', errBadLink: 'Invalid link: use an address starting with https://', errSave: 'Could not save.',
      rdBtn: 'Projeto reditus', rdGoal: 'Goal', rdOf: 'of', rdMissing: 'Remaining', rdDone: 'Goal reached!', rdMonths: 'Deposits by month',
      rdAdd: 'Add deposit', rdDate: 'Date', rdValue: 'Amount (R$)', rdDesc: 'Description (optional)', rdFile: 'Receipt (PDF or image, up to 10 MB)',
      rdSave: 'Save deposit', rdOpen: 'Open', rdDownload: 'Download', rdAttach: '+ Attach', rdRemove: 'Remove',
      rdConfirm: 'Remove this deposit from the totals? The amount leaves the total.', rdEmpty: 'No deposits yet.', rdViewOnly: 'View only: only the owner can add amounts.',
      rdErrValue: 'Enter a valid amount, such as 1,500.00 or 1500.', rdErrFile: 'The receipt must be a PDF, PNG, JPG or WEBP up to 10 MB.', rdErrDate: 'Invalid date (cannot be in the future).',
      rdErrPerm: 'Only the owner can change Projeto reditus.', rdErrLink: 'Could not open the file.', rdSaved: 'Deposit saved', rdRemoved: 'Deposit removed', rdAttached: 'Receipt attached', nextAt: 'next', refreshNow: '↻ Refresh now',
      admobLive: 'AdMob · updated', empty: 'Nothing here yet.', emptyHint: 'Edit C:\\FastudiosAPI\\dados\\painel.json on HAZ.',
      noData: 'No data', loading: 'Loading…', noAccess: 'Your access does not include finance.' }
  });

  var token = FAS.sessao.ler('colab'), eu = null, pagina = 'overview', cache = {}, pedido = 0;
  var PAGINAS = ['overview', 'projects', 'finance', 'team', 'roadmap', 'notices'];
  var TIT = { overview: 'overview', projects: 'projects', finance: 'finance', team: 'teamNav', roadmap: 'roadmap', notices: 'notices' };

  // ---------- formatos ----------
  var loc = function () { return FAS.lang === 'pt' ? 'pt-BR' : 'en-US'; };
  function dinheiro(v, moeda) {
    v = +v || 0;
    var m = moeda || 'BRL', abs = Math.abs(v);
    if (abs >= 1000) {
      return new Intl.NumberFormat(loc(), { style: 'currency', currency: m, maximumFractionDigits: 1, minimumFractionDigits: 1 })
        .format(v / 1000).replace(/\s?$/, '') + 'k';
    }
    return new Intl.NumberFormat(loc(), { style: 'currency', currency: m }).format(v);
  }
  function numero(v) {
    v = +v || 0;
    return v >= 1000 ? (v / 1000).toLocaleString(loc(), { maximumFractionDigits: 1 }) + 'k' : v.toLocaleString(loc());
  }
  function mesCurto(ym) {
    var p = String(ym).split('-'), d = new Date(+p[0], (+p[1] || 1) - 1, 1);
    var s = d.toLocaleDateString(loc(), { month: 'short' }).replace('.', '');
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function dataCurta(s) {
    if (!s) return '';
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) { var p = s.slice(0, 10).split('-'); return FAS.lang === 'pt' ? p[2] + '/' + p[1] : p[1] + '/' + p[2]; }
    return String(s);
  }
  function plataforma(p) { return { ANDROID: 'Android', IOS: 'iOS' }[String(p || '').toUpperCase()] || p; }
  function iniciais(nome) { return String(nome || '?').trim().split(/\s+/).map(function (x) { return x[0]; }).join('').slice(0, 2).toUpperCase(); }
  function pct(v) { return Math.max(0, Math.min(100, +v || 0)); }
  function vazio() { return '<div class="c-vazio">' + esc(FAS.t('empty')) + ' <code>' + esc(FAS.t('emptyHint')) + '</code></div>'; }
  function iconeJogo(jogo, cls) {
    var i = ICONES[jogo];
    return '<span class="icone-jogo ' + (cls || '') + '"' + (i ? ' style="background-image:url(&quot;' + i + '&quot;)"' : '') + '>' + (i ? '' : '?') + '</span>';
  }
  function iconeDe(j, cls) {
    var i = j.icone && /^\/assets\/img\/[\w\/.-]+$/.test(j.icone) ? j.icone : null;
    return '<span class="icone-jogo ' + (cls || '') + '"' + (i ? ' style="background-image:url(&quot;' + i + '&quot;)"' : '') + '>' +
      (i ? '' : esc(iniciais(j.nome))) + '</span>';
  }
  var LOJAS = [['play', 'Google Play'], ['apple', 'App Store'], ['steam', 'Steam']];
  function classeLoja(st) { return st === 'publicado' ? 'loja-pub' : st === 'nao_publicado' || !st ? 'loja-nao' : st === 'removido' ? 'loja-rem' : 'loja-and'; }
  function pillLoja(nome, st) { return '<span class="loja-pill ' + classeLoja(st) + '">' + esc(nome) + ' · ' + esc((FAS.t('lojaSt') || {})[st] || st) + '</span>'; }
  function lojasDo(j, todas) {
    return LOJAS.filter(function (l) { return todas ? l[0] !== 'steam' || (j.steam_status && j.steam_status !== 'nao_publicado') : j[l[0] + '_status'] && j[l[0] + '_status'] !== 'nao_publicado'; })
      .map(function (l) { return pillLoja(l[1], j[l[0] + '_status']); }).join('');
  }
  function dataLonga(s) {
    if (!s || !/^\d{4}-\d{2}-\d{2}/.test(s)) return s || '—';
    var p = s.slice(0, 10).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString(loc(), { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '');
  }
  function hojeISO() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function linhaJogo(j) {
    return '<button type="button" class="linha-jogo" data-ir="projects/' + esc(j.slug) + '">' + iconeDe(j, 'mini') +
      '<span><b>' + esc(j.nome) + '</b><small>v' + esc(j.versao || '—') + (j.ultima_data ? ' · ' + esc(FAS.t('lastUpd')) + ' ' + esc(dataCurta(j.ultima_data)) : '') +
      '</small></span><span class="linha-jogo-dir">' + (j.pendentes ? '<span class="st-nok">' + j.pendentes + ' NOK</span>' : '') + '</span></button>';
  }
  function itemRegistro(e) {
    var st = e.status ? '<span class="reg-st reg-' + esc(e.status) + '">' + esc(e.status === 'andamento' ? '…' : e.status.toUpperCase()) + '</span>' : '<span class="reg-st reg-sem">·</span>';
    return '<li>' + st + '<div><span>' + esc(e.texto) + '</span>' +
      ((e.itens || []).length ? '<ul>' + e.itens.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') + '</div></li>';
  }
  function kpi(rotulo, valor, nota, classe) {
    return '<div class="kpi"><span>' + esc(rotulo) + '</span><b>' + esc(valor) + '</b><small class="' + (classe || '') + '">' + esc(nota || '') + '</small></div>';
  }

  // ---------- grafico de barras empilhadas ----------
  function grafico(meses, iapMap, moeda, alto) {
    if (!meses.length) return '<div class="c-vazio">' + esc(FAS.t('noData')) + '</div>';
    var linhas = meses.map(function (m) { var ads = +m.receita || 0, iap = +(iapMap[m.mes] || 0); return { mes: m.mes, ads: ads, iap: iap, tot: ads + iap }; });
    var max = Math.max.apply(null, linhas.map(function (l) { return l.tot; })) || 1;
    return '<div class="grafico' + (alto ? ' alto' : '') + '">' + linhas.map(function (l) {
      var h = l.tot ? Math.max(3, Math.round(l.tot / max * 100 - 18)) : 0;
      return '<div><small>' + esc(dinheiro(l.tot, moeda)) + '</small><div class="coluna" style="height:' + h + '%">' +
        (l.iap ? '<div class="iap" style="flex:' + l.iap + '"></div>' : '') + (l.ads ? '<div class="ads" style="flex:' + l.ads + '"></div>' : '') +
        '</div><small class="mes">' + esc(mesCurto(l.mes)) + '</small></div>';
    }).join('') + '</div>';
  }
  function legenda() {
    return '<span class="legenda"><span><i></i>' + esc(FAS.t('ads')) + '</span><span><i class="branco"></i>' + esc(FAS.t('iap')) + '</span></span>';
  }
  function avisoAdmob(a) {
    if (a && a.conectado) return '';
    var t = a && a.motivo && a.motivo !== 'nao_configurado' ? FAS.t('admobErr') : FAS.t('admobOff');
    return '<div class="c-card"><div class="c-vazio">' + esc(t) + '</div></div>';
  }
  function seloAdmob(a) {
    var s = $('seloDados');
    if (!a || !a.conectado) { s.hidden = true; return; }
    s.hidden = false;
    s.className = 'selo' + (a.desatualizado ? ' alerta' : '');
    var hora = function (iso) {
      var d = iso ? new Date(iso.replace(/([+-]\d{2})(\d{2})$/, '$1:$2')) : null;
      return d && !isNaN(d) ? d.toLocaleTimeString(loc(), { hour: '2-digit', minute: '2-digit' }) : '';
    };
    s.textContent = a.desatualizado ? FAS.t('stale') :
      FAS.t('admobLive') + ' ' + hora(a.atualizado_em) + (a.proxima_em ? ' · ' + FAS.t('nextAt') + ' ' + hora(a.proxima_em) : '');
  }

  // ---------- paginas ----------
  var RENDER = {
    overview: function (d) {
      var T = FAS.t, a = d.admob || {}, k = a.kpis || {}, moeda = a.moeda;
      var jogos = d.jogos || [], pend = jogos.reduce(function (n, j) { return n + (j.pendentes || 0); }, 0);
      var kpis = [];
      if (d.financas) {
        var ant = +k.receita_mes_anterior || 0, delta = ant ? Math.round(((+k.receita_mes || 0) - ant) / ant * 100) : null;
        kpis.push(kpi(T('kRev'), a.conectado ? dinheiro(k.receita_mes, moeda) : '—',
          delta === null ? '' : (delta >= 0 ? '+' : '') + delta + '% ' + T('vsLast'), delta === null ? '' : delta >= 0 ? 'sobe' : 'desce'));
        kpis.push(kpi(T('kImp'), a.conectado ? numero(k.impressoes_mes) : '—', a.conectado ? 'eCPM ' + dinheiro(k.ecpm_mes, moeda) : ''));
      }
      kpis.push(kpi(T('kProj'), String(d.projetos_ativos || 0), pend ? pend + ' ' + T('pendingN') + ' (NOK)' : '', pend ? 'alerta' : ''));
      kpis.push(kpi(T('kTk'), String(d.tickets.abertos), d.tickets.alta + ' ' + T('urgent'), d.tickets.alta ? 'alerta' : ''));
      var receita = d.financas ? '<div class="c-card"><div class="c-card-cab"><span>' + esc(T('revenue6m')) + '</span>' + legenda() + '</div>' +
        (a.conectado ? grafico(a.meses || [], d.compras_app_mensal || {}, moeda) : '<div class="c-vazio">' + esc(a.motivo && a.motivo !== 'nao_configurado' ? T('admobErr') : T('admobOff')) + '</div>') + '</div>' : '';
      var projetos = '<div class="c-card"><div class="c-card-cab"><span>' + esc(T('projects')) + '</span><button type="button" class="ver-tudo" data-ir="projects">' +
        esc(T('seeAll')) + ' →</button></div>' + (jogos.length ? jogos.map(linhaJogo).join('') : vazio()) + '</div>';
      var marcos = '<div class="c-card" style="gap:6px"><span class="tit" style="margin-bottom:8px">' + esc(T('nextMilestones')) + '</span>' +
        ((d.marcos || []).length ? d.marcos.map(function (m) {
          return '<div class="linha-simples"><span class="mono">' + esc(dataCurta(m.data)) + '</span><span>' + esc(m.titulo) + '</span></div>';
        }).join('') : vazio()) + '</div>';
      var avisos = '<div class="c-card" style="gap:6px"><div class="c-card-cab" style="margin-bottom:8px"><span>' + esc(T('notices')) +
        '</span><button type="button" class="ver-tudo" data-ir="notices">' + esc(T('seeAll')) + ' →</button></div>' +
        ((d.avisos || []).length ? d.avisos.map(function (n) {
          return '<div class="linha-aviso"><b>' + esc(n.titulo) + '</b><small>' + esc(n.autor) + ' · ' + esc(dataCurta(n.data)) + '</small></div>';
        }).join('') : vazio()) + '</div>';
      seloAdmob(d.financas ? a : null);
      return '<div class="kpis">' + kpis.join('') + '</div>' + blocoReditus() + '<div class="grade-cards">' + receita + projetos + '</div><div class="grade-cards">' + marcos + avisos + '</div>';
    },

    projects: function (d) {
      var T = FAS.t, lista = d.jogos || [];
      if (!lista.length) return '<div class="c-card"><div class="c-vazio">' + esc(T('empty')) + '</div></div>';
      return '<div class="jogos-grade">' + lista.map(function (j) {
        return '<button type="button" class="jogo-card" data-ir="projects/' + esc(j.slug) + '">' + iconeDe(j, 'grande') +
          '<b>' + esc(j.nome) + '</b><small class="mono">v' + esc(j.versao || '—') + '</small>' +
          '<span class="lojas-linha">' + (lojasDo(j) || pillLoja('Google Play', j.play_status)) + '</span>' +
          '<small>' + (j.registros || 0) + ' ' + esc(T('entriesN')) + (j.pendentes ? ' · <span class="st-nok">' + j.pendentes + ' NOK</span>' : '') +
          (j.ultima_data ? ' · ' + esc(dataCurta(j.ultima_data)) : '') + '</small></button>';
      }).join('') + '</div>';
    },

    jogo: function (d) {
      var T = FAS.t, j = d.jogo, regs = d.registros || [], ST = T('lojaSt') || {};
      var info = [[T('startedAt'), dataLonga(j.criado_em)], [T('curVersion'), j.versao || '—'], [T('pkg'), j.pacote || '—']];
      var lojas = LOJAS.map(function (l) {
        var st = j[l[0] + '_status'], url = j[l[0] + '_url'];
        if (l[0] === 'steam' && (!st || st === 'nao_publicado') && !url) return '';
        return '<div class="info-loja"><span class="rotulo">' + esc(l[1]) + '</span>' + pillLoja(l[1], st) +
          (url && /^https:\/\//.test(url) ? '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(T('openStore')) + '</a>' : '') + '</div>';
      }).join('');
      var porDia = {}, dias = [];
      regs.forEach(function (r) { if (!porDia[r.data]) { porDia[r.data] = []; dias.push(r.data); } porDia[r.data].push(r); });
      var valorAlt = function (campo, v) { return /_status$/.test(campo || '') ? (ST[v] || v || '—') : (v || '—'); };
      var hist = dias.length ? dias.map(function (dia) {
        var itens = porDia[dia], autores = {};
        itens.forEach(function (r) { autores[r.autor] = 1; });
        var normais = itens.filter(function (r) { return r.tipo === 'registro'; }), alts = itens.filter(function (r) { return r.tipo === 'alteracao'; });
        return '<section class="dia"><header><span class="mono">' + esc(dataLonga(dia)) + '</span><small>' + esc(Object.keys(autores).join(', ')) + '</small></header>' +
          (normais.length ? '<ul class="regs">' + normais.map(itemRegistro).join('') + '</ul>' : '') +
          alts.map(function (r) {
            var x = r.itens || [];
            return '<div class="reg-alt">' + esc(r.autor) + ' ' + esc(T('changedLbl')) + ' <b>' + esc(r.texto) + '</b>: ' +
              esc(valorAlt(x[0], x[1])) + ' → ' + esc(valorAlt(x[0], x[2])) + '</div>';
          }).join('') + '</section>';
      }).join('') : '<div class="c-vazio">' + esc(T('noEntries')) + '</div>';
      var opcoes = function (atual) {
        return (d.status_loja || []).map(function (o) { return '<option value="' + o + '"' + (o === atual ? ' selected' : '') + '>' + esc(ST[o] || o) + '</option>'; }).join('');
      };
      var campos = [['nome', 'Nome', j.nome, 'text'], ['versao', T('curVersion'), j.versao, 'text'], ['criado_em', T('startedAt'), j.criado_em, 'date'], ['pacote', T('pkg'), j.pacote, 'text']];
      var editar = d.admin ? '<form class="c-card form-dados" id="formDados" hidden novalidate><span class="tit">' + esc(T('editData')) + '</span><div class="dados-grade">' +
        campos.map(function (c) {
          return '<label class="campo">' + esc(c[1]) + '<input class="input" name="' + c[0] + '" type="' + c[3] + '" value="' + esc(c[2] || '') + '" maxlength="120"></label>';
        }).join('') +
        LOJAS.map(function (l) {
          return '<label class="campo">' + esc(l[1]) + '<select class="input" name="' + l[0] + '_status">' + opcoes(j[l[0] + '_status']) + '</select></label>' +
            '<label class="campo">' + esc(l[1]) + ' · link<input class="input" name="' + l[0] + '_url" type="url" placeholder="https://" value="' + esc(j[l[0] + '_url'] || '') + '" maxlength="300"></label>';
        }).join('') + '</div><span class="erro-msg" id="erroDados" hidden></span>' +
        '<div class="acoes-form"><button type="button" class="btn btn-contorno" data-cancelar-dados>' + esc(T('cancel')) + '</button>' +
        '<button type="submit" class="btn btn-branco">' + esc(T('saveData')) + '</button></div></form>' : '';
      var exemplo = '- Sistema de alianças (OK)&#10;&#9;- Criar ou entrar em alianças&#10;- Correção na compra do ouro (NOK)';
      var nRegs = regs.filter(function (r) { return r.tipo === 'registro'; }).length;
      return '<div><button type="button" class="ver-tudo" data-ir="projects" style="padding:0">' + esc(T('backProjects')) + '</button></div>' +
        '<div class="jogo-cab">' + iconeDe(j, 'enorme') + '<div><h2 class="silk">' + esc(j.nome) + '</h2><span class="lojas-linha">' + lojasDo(j, true) + '</span></div>' +
        (d.admin ? '<button type="button" class="btn btn-contorno" data-editar-dados>' + esc(T('editData')) + '</button>' : '') + '</div>' +
        '<div class="c-card"><div class="jogo-info">' + info.map(function (x) { return '<div><span class="rotulo">' + esc(x[0]) + '</span><b>' + esc(x[1]) + '</b></div>'; }).join('') +
        lojas + '</div></div>' + editar +
        '<form class="c-card" id="formRegistro" data-slug="' + esc(j.slug) + '" novalidate><span class="tit">' + esc(T('addEntries')) + '</span>' +
        '<span class="c-vazio" style="padding:0">' + esc(T('pasteHelp')) + '</span>' +
        '<label class="campo" style="max-width:220px">' + esc(T('dateLbl')) + '<input class="input" type="date" name="data" value="' + hojeISO() + '" max="' + hojeISO() + '"></label>' +
        '<textarea class="input" name="texto" rows="8" maxlength="30000" placeholder="' + exemplo + '"></textarea>' +
        '<div id="previaRegistro"></div><span class="erro-msg" id="erroRegistro" role="alert" hidden></span>' +
        '<small style="color:var(--t45)">' + esc(T('appendOnly')) + '</small>' +
        '<div class="acoes-form"><button type="button" class="btn btn-contorno" data-previa>' + esc(T('previewBtn')) + '</button>' +
        '<button type="submit" class="btn btn-branco">' + esc(T('saveEntries')) + '</button></div></form>' +
        '<div class="c-card"><span class="tit">' + esc(T('history')) + ' · ' + nRegs + ' ' + esc(T('entriesN')) + '</span>' + hist + '</div>';
    },

    finance: function (d) {
      var T = FAS.t, a = d.admob || {}, k = a.kpis || {}, m = d.manual || {}, moeda = a.moeda;
      seloAdmob(a);
      var html = avisoAdmob(a);
      if (d.pode_atualizar && a.conectado) {
        html = '<div style="display:flex;justify-content:flex-end;margin-bottom:-12px"><button type="button" class="ver-tudo" data-atualizar-admob>' +
          esc(T('refreshNow')) + '</button></div>' + html;
      }
      var custoAno = +m.custos_ano || 0, receitaAno = +k.receita_ano || 0;
      var iapAno = 0, ano = String(new Date().getFullYear());
      Object.keys(m.compras_app_mensal || {}).forEach(function (mm) { if (mm.indexOf(ano) === 0) iapAno += +m.compras_app_mensal[mm] || 0; });
      var kp = [kpi(T('kYear'), a.conectado ? dinheiro(receitaAno, moeda) : '—', T('ytd')),
        kpi(T('kRev'), a.conectado ? dinheiro(k.receita_mes, moeda) : '—', ''),
        kpi(T('kEcpm'), a.conectado ? dinheiro(k.ecpm_mes, moeda) : '—', T('perThousand')),
        kpi(T('kImp'), a.conectado ? numero(k.impressoes_mes) : '—', a.conectado ? numero(k.cliques_mes) + ' ' + T('kClicks').split(' ')[0].toLowerCase() : '')];
      if (custoAno) {
        var lucro = receitaAno + iapAno - custoAno, base = receitaAno + iapAno;
        kp.push(kpi(T('kCost'), dinheiro(custoAno, moeda), T('ytd')));
        kp.push(kpi(T('kProfit'), dinheiro(lucro, moeda), base ? Math.round(lucro / base * 100) + '% ' + T('margin') : '', lucro >= 0 ? 'sobe' : 'desce'));
      }
      html += '<div class="kpis">' + kp.join('') + '</div>';

      var plats = a.por_plataforma || [], totP = plats.reduce(function (s, p) { return s + p.receita; }, 0) || 1;
      var cores = ['var(--azul)', '#fff', 'var(--azul-claro)', 'rgba(255,255,255,.4)'];
      var custos = m.custos_mes || [], maxC = Math.max.apply(null, custos.map(function (c) { return +c.valor || 0; }).concat([1]));
      html += '<div class="grade-cards"><div class="c-card" style="gap:18px"><div class="c-card-cab"><span>' + esc(T('adsVsIap')) + '</span>' + legenda() + '</div>' +
        (a.conectado ? grafico(a.meses || [], m.compras_app_mensal || {}, moeda, true) : '<div class="c-vazio">' + esc(T('noData')) + '</div>') + '</div>' +
        '<div class="c-card" style="gap:20px"><span class="tit">' + esc(T('byPlatform')) + '</span>' +
        (plats.length ? '<div class="plat-barra">' + plats.map(function (p, i) {
          return '<div style="width:' + (p.receita / totP * 100) + '%;background:' + cores[i % cores.length] + '"></div>';
        }).join('') + '</div>' + plats.map(function (p, i) {
          return '<div class="plat-linha"><i style="background:' + cores[i % cores.length] + '"></i><span>' + esc(p.nome) + '</span><span class="mono">' +
            Math.round(p.receita / totP * 100) + '%</span><span class="mono">' + esc(dinheiro(p.receita, moeda)) + '</span></div>';
        }).join('') : '<div class="c-vazio">' + esc(T('noData')) + '</div>') +
        (custos.length ? '<span class="tit" style="margin-top:10px">' + esc(T('costs')) + '</span>' + custos.map(function (c) {
          return '<div class="custo"><div><span>' + esc(c.nome) + '</span><span class="mono">' + esc(dinheiro(c.valor, moeda)) + '</span></div>' +
            '<div class="trilho"><i style="width:' + Math.round((+c.valor || 0) / maxC * 100) + '%"></i></div></div>';
        }).join('') : '') + '</div></div>';

      var apps = a.por_app || [], custoJogo = m.custos_por_jogo || {}, temCusto = Object.keys(custoJogo).length > 0;
      if (apps.length) {
        html += '<div class="tabela-card"><div class="tit">' + esc(T('byGame')) + '</div><table class="tabela"><thead><tr><th>' + esc(T('game')) + '</th><th>' +
          esc(T('platform')) + '</th><th>' + esc(T('impressions')) + '</th><th>' + esc(T('revenue')) + '</th><th>eCPM</th>' +
          (temCusto ? '<th>' + esc(T('cost')) + '</th><th>ROI</th>' : '') + '</tr></thead><tbody>' + apps.map(function (p) {
            var c = +custoJogo[p.app] || 0, roi = c ? (p.receita - c) / c : null;
            return '<tr><td>' + esc(p.app) + '</td><td class="fraco">' + esc(plataforma(p.plataforma)) + '</td><td>' + esc(numero(p.impressoes)) + '</td><td>' +
              esc(dinheiro(p.receita, moeda)) + '</td><td>' + esc(dinheiro(p.ecpm, moeda)) + '</td>' +
              (temCusto ? '<td class="fraco">' + (c ? esc(dinheiro(c, moeda)) : '—') + '</td><td class="' + (roi === null ? 'fraco' : roi >= 0 ? 'pos' : 'neg') + '">' +
                (roi === null ? '—' : (roi > 0 ? '+' : '') + Math.round(roi * 100) + '%') + '</td>' : '') + '</tr>';
          }).join('') + '</tbody></table></div>';
      }
      return html;
    },

    team: function (d) {
      var lista = d.equipe || [];
      if (!lista.length) return '<div class="c-card">' + vazio() + '</div>';
      return '<div class="equipe">' + lista.map(function (m, i) {
        return '<div class="membro"><span class="avatar' + (i % 3 === 1 ? ' c1' : i % 3 === 2 ? ' c2' : '') + '">' + esc(iniciais(m.nome)) + '</span>' +
          '<div><b>' + esc(m.nome) + '</b><small>' + esc(m.cargo || '') + '</small></div><span class="mono">' + esc(m.projeto || '') + '</span></div>';
      }).join('') + '</div>';
    },

    roadmap: function (d) {
      var itens = (d.roadmap && d.roadmap.itens) || [], T = FAS.t;
      if (!itens.length) return '<div class="c-card">' + vazio() + '</div>';
      var hoje = new Date(), ini = new Date(hoje.getFullYear(), hoje.getMonth(), 1), fim = new Date(hoje.getFullYear(), hoje.getMonth() + 6, 1);
      var span = fim - ini, pos = function (s) { var t = new Date(s + 'T00:00:00'); return isNaN(t) ? 0 : Math.max(0, Math.min(1, (t - ini) / span)); };
      var meses = [];
      for (var i = 0; i < 6; i++) {
        var dm = new Date(ini.getFullYear(), ini.getMonth() + i, 1);
        var s = mesCurto(dm.getFullYear() + '-' + (dm.getMonth() + 1));
        meses.push(i === 0 || dm.getMonth() === 0 ? s + ' ' + String(dm.getFullYear()).slice(2) : s);
      }
      var tipos = { ok: 'rm-ok', risk: 'rm-risk', live: 'rm-live', plan: 'rm-plan' };
      return '<div class="roadmap"><div><div class="rm-linha"><span></span><div class="rm-meses">' + meses.map(function (m) { return '<span>' + esc(m) + '</span>'; }).join('') +
        '</div></div>' + itens.map(function (r) {
          var a = pos(r.inicio), b = pos(r.fim);
          return '<div class="rm-linha rm-item"><span>' + esc(r.titulo) + '<small>' + esc(r.jogo || '') + '</small></span><div class="rm-trilho">' +
            (b > a ? '<div class="rm-barra ' + (tipos[r.tipo] || 'rm-plan') + '" style="left:' + (a * 100) + '%;width:' + ((b - a) * 100) + '%">' + esc(r.tag || '') + '</div>' : '') +
            '</div></div>';
        }).join('') + '<div class="rm-linha"><span></span><div class="rm-hoje"><div style="left:' + (pos(hoje.toISOString().slice(0, 10)) * 100) +
        '%"><i></i>' + esc(T('todayLbl')) + '</div></div></div></div></div>';
    },

    notices: function (d) {
      var lista = d.avisos || [];
      if (!lista.length) return '<div class="c-card">' + vazio() + '</div>';
      return '<div class="avisos">' + lista.map(function (n) {
        return '<article class="aviso"><span class="mono">' + esc(dataCurta(n.data)) + '</span><div><span class="aviso-tit"><b>' + esc(n.titulo) + '</b>' +
          (n.tag ? '<span>' + esc(n.tag) + '</span>' : '') + '</span><p>' + esc(n.texto) + '</p><small>' + esc(n.autor || '') + '</small></div></article>';
      }).join('') + '</div>';
    }
  };

  // ---------- navegacao ----------
  function paginasVisiveis() { return PAGINAS.filter(function (p) { return p !== 'finance' || (eu && eu.financas); }); }
  function pintarNav() {
    var nav = paginasVisiveis();
    $('navLat').innerHTML = nav.map(function (p) {
      return '<button type="button" data-ir="' + p + '"' + (p === pagina ? ' aria-current="page"' : '') + '><i></i>' + esc(FAS.t(TIT[p])) + '</button>';
    }).join('');
    $('abasMob').innerHTML = nav.map(function (p) {
      return '<button type="button" data-ir="' + p + '"' + (p === pagina ? ' aria-current="page"' : '') + '>' + esc(FAS.t(TIT[p])) + '</button>';
    }).join('');
    $('tituloPag').textContent = FAS.t(TIT[pagina]);
    $('hoje').textContent = new Date().toLocaleDateString(loc(), { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function rota(p, forcar) {
    if (p.indexOf('projects/') === 0) return '/collab/jogos/' + encodeURIComponent(p.slice(9));
    return p === 'overview' ? '/collab/overview' : '/collab/' + p + (forcar && p === 'finance' ? '?atualizar=1' : '');
  }

  function mostrar(p, forcar) {
    var sub = /^projects\/[a-z0-9][a-z0-9-]{1,40}$/.test(p);
    if (!sub && paginasVisiveis().indexOf(p) < 0) p = 'overview';
    pagina = sub ? 'projects' : p;
    pintarNav();
    var el = $('pagina');
    el.classList.remove('on');
    $('seloDados').hidden = true;
    var meu = ++pedido;
    var desenhar = function (d) {
      if (meu !== pedido) return;
      el.innerHTML = RENDER[sub ? 'jogo' : p](d);
      if (p === 'overview' && reditusAberto) carregarReditus();
      requestAnimationFrame(function () { el.classList.add('on'); });
    };
    if (cache[p] && !forcar) { desenhar(cache[p]); return; }
    el.innerHTML = '<div class="carregando">' + esc(FAS.t('loading')) + '</div>';
    el.classList.add('on');
    FAS.api(rota(p, forcar), { token: token, timeout: 60000 }).then(function (r) {
      if (meu !== pedido) return;
      if (r.status === 401) return sair(FAS.t('sessionEnd'));
      if (r.status === 404 && sub) return mostrar('projects');
      if (r.status === 403) { el.innerHTML = '<div class="c-card"><div class="c-vazio">' + esc(FAS.t('noAccess')) + '</div></div>'; return; }
      if (r.status !== 200) { el.innerHTML = '<div class="c-card"><div class="c-vazio">' + esc(FAS.t('errRede')) + '</div></div>'; return; }
      cache[p] = r.dados;
      el.classList.remove('on');
      desenhar(r.dados);
    });
  }

  // ---------- registros e dados do jogo ----------
  function msgEm(id, t) { var el = $(id); if (el) { el.textContent = t || ''; el.hidden = !t; } }
  function erroDe(r, padrao) {
    var e = r.dados && r.dados.erro;
    if (r.status === 0) return FAS.t('errRede');
    if (r.status === 429) return FAS.t('errMuitas');
    return FAS.t({ texto_vazio: 'errEntries', itens_demais: 'errEntries', subitens_demais: 'errEntries', data_invalida: 'errBadDate',
      link_invalido: 'errBadLink' }[e] || padrao);
  }
  function enviarRegistros(previa) {
    var f = $('formRegistro');
    if (!f) return;
    var slug = f.getAttribute('data-slug'), texto = f.texto.value, data = f.data.value;
    msgEm('erroRegistro');
    if (!texto.trim()) return msgEm('erroRegistro', FAS.t('errEntries'));
    f.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
    FAS.api('/collab/jogos/' + encodeURIComponent(slug) + '/registros', { method: 'POST', token: token, body: { texto: texto, data: data, previa: !!previa } })
      .then(function (r) {
        f.querySelectorAll('button').forEach(function (b) { b.disabled = false; });
        if (r.status === 401) return sair(FAS.t('sessionEnd'));
        if (previa) {
          if (r.status !== 200) return msgEm('erroRegistro', erroDe(r, 'errEntries'));
          $('previaRegistro').innerHTML = '<div class="previa"><span class="rotulo">' + esc(FAS.t('previewOf')) + ' · ' + r.dados.previa.length + ' ' +
            esc(FAS.t('entriesN')) + ' ' + esc(FAS.t('willSave')) + ' ' + esc(dataLonga(r.dados.data)) + '</span><ul class="regs">' +
            r.dados.previa.map(itemRegistro).join('') + '</ul></div>';
          return;
        }
        if (r.status !== 201) return msgEm('erroRegistro', erroDe(r, 'errSave'));
        delete cache['projects']; delete cache['overview']; delete cache['projects/' + slug];
        FAS.toast(r.dados.adicionados + ' ' + FAS.t('savedN'));
        mostrar('projects/' + slug, true);
      });
  }
  function enviarDados() {
    var f = $('formDados'), slug = $('formRegistro').getAttribute('data-slug'), corpo = {};
    Array.prototype.forEach.call(f.elements, function (el) { if (el.name) corpo[el.name] = el.value; });
    msgEm('erroDados');
    FAS.api('/collab/jogos/' + encodeURIComponent(slug) + '/dados', { method: 'POST', token: token, body: corpo }).then(function (r) {
      if (r.status === 401) return sair(FAS.t('sessionEnd'));
      if (r.status !== 200) return msgEm('erroDados', erroDe(r, 'errSave'));
      delete cache['projects']; delete cache['overview'];
      FAS.toast(r.dados.alteracoes ? r.dados.alteracoes + ' ' + FAS.t('changesSaved') : FAS.t('noChange'));
      mostrar('projects/' + slug, true);
    });
  }
  document.addEventListener('submit', function (e) {
    if (e.target.id === 'formRegistro') { e.preventDefault(); enviarRegistros(false); }
    if (e.target.id === 'formDados') { e.preventDefault(); enviarDados(); }
    if (e.target.id === 'formReditus') { e.preventDefault(); salvarDeposito(e.target); }
  });
  document.addEventListener('change', function (e) {
    if (e.target.matches && e.target.matches('[data-rd-anexar]')) anexarComprovante(e.target);
  });

  // ---------- Projeto Reditus ----------
  // O servidor decide quem pode lancar (pode_editar); aqui so se escondem os controles.
  var reditusAberto = false, pedidoReditus = 0, ANEXO_MAX = 10 * 1024 * 1024;
  var PIXELS_MOEDAS = ['......KKKK......', '....KKYYYYKK....', '...KYWWYYYYOK...', '...KYWYOOYYOK...', '...KYYYOYYYOK...', '...KYYYOOYYOK...',
    '...KYYYYOYYOK...', '....KKOOOOKK....', '......KKKK......', '..KKKKKKKKKKKK..', '.KYWWYYYYYYYOOK.', '.KOOOOOOOOOOOOK.', '.KKKKKKKKKKKKKK.',
    '.KYWWYYYYYYYOOK.', '.KOOOOOOOOOOOOK.', '..KKKKKKKKKKKK..'];
  var COR_PIXEL = { K: '#7A4A00', Y: '#FFD27A', O: '#F0A030', W: '#FFF4CC' };
  function iconeMoedas() {
    var r = '';
    PIXELS_MOEDAS.forEach(function (linha, y) {
      linha.split('').forEach(function (c, x) { if (COR_PIXEL[c]) r += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + COR_PIXEL[c] + '"/>'; });
    });
    return '<svg class="rd-moedas" viewBox="0 0 16 16" width="40" height="40" shape-rendering="crispEdges" aria-hidden="true">' + r + '</svg>';
  }
  function blocoReditus() {
    return '<section class="reditus"><button type="button" class="rd-btn" data-reditus-toggle aria-expanded="' + reditusAberto + '" aria-controls="reditusPainel">' +
      iconeMoedas() + '<span class="silk">' + esc(FAS.t('rdBtn')) + '</span><i class="rd-seta" aria-hidden="true"></i></button>' +
      '<div id="reditusPainel"' + (reditusAberto ? '' : ' hidden') + '></div></section>';
  }
  function reais(c) { return new Intl.NumberFormat(loc(), { style: 'currency', currency: 'BRL' }).format((+c || 0) / 100); }
  function dataNum(s) { var p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString(loc(), { day: '2-digit', month: '2-digit', year: 'numeric' }); }
  function mesLongo(ym) {
    var p = String(ym).split('-'), t = new Date(+p[0], +p[1] - 1, 1).toLocaleDateString(loc(), { month: 'long', year: 'numeric' });
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  function centavosDe(txt) {
    var s = String(txt || '').replace(/[R$\s]/gi, '');
    if (s.indexOf(',') >= 0) s = s.replace(/\./g, '').replace(',', '.');
    else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
    if (!/^\d+(\.\d{1,2})?$/.test(s)) return null;
    var p = s.split('.'), c = parseInt(p[0], 10) * 100 + parseInt(((p[1] || '') + '00').slice(0, 2), 10);
    return c > 0 ? c : null;
  }
  function barraReditus(d) {
    var deps = d.depositos, n = deps.length, GAP = 26, H = Math.max(480, n * GAP + 60), meta = d.meta_centavos, escala = Math.max(meta, d.total_centavos);
    var alto = function (c) { return Math.round(c / escala * H); };
    var alvo = deps.map(function (x) { return alto(x.acumulado_centavos); }), rot = alvo.slice(), i;
    for (i = 1; i < n; i++) if (rot[i] < rot[i - 1] + GAP) rot[i] = rot[i - 1] + GAP;
    if (n && rot[n - 1] > H - 10) rot[n - 1] = H - 10;
    for (i = n - 2; i >= 0; i--) if (rot[i] > rot[i + 1] - GAP) rot[i] = rot[i + 1] - GAP;
    var riscos = alvo.map(function (y) { return '<i class="rd-risco" style="bottom:' + y + 'px"></i>'; }).join('');
    var ligas = alvo.map(function (y, k) { return '<polyline points="0,' + (H - y) + ' 12,' + (H - y) + ' 30,' + (H - rot[k]) + ' 42,' + (H - rot[k]) + '"/>'; }).join('');
    var rotulos = deps.map(function (x, k) {
      return '<div class="rd-rot" style="bottom:' + (rot[k] - 10) + 'px"><b>' + esc(dataNum(x.data)) + '</b><span>+' + esc(reais(x.valor_centavos)) + '</span></div>';
    }).join('');
    var linhaMeta = d.total_centavos > meta ? '<i class="rd-risco rd-risco-meta" style="bottom:' + alto(meta) + 'px"></i>' : '';
    return '<div class="rd-termo" style="height:' + H + 'px"><div class="rd-tubo"><div class="rd-fill' + (d.atingida ? ' rd-cheio' : '') + '" data-rd-altura="' +
      alto(d.total_centavos) + '"></div>' + riscos + linhaMeta + '</div><svg class="rd-ligas" width="42" height="' + H + '" aria-hidden="true">' + ligas + '</svg><div class="rd-rots">' + rotulos + '</div></div>';
  }
  function anexoHtml(a) {
    return '<span class="rd-anexo"><span title="' + esc(a.nome) + '">' + esc(a.nome) + '</span><button type="button" class="ver-tudo" data-rd-abrir="' + a.id + '">' + esc(FAS.t('rdOpen')) +
      '</button><button type="button" class="ver-tudo" data-rd-baixar="' + a.id + '">' + esc(FAS.t('rdDownload')) + '</button></span>';
  }
  function mesesReditus(d) {
    var T = FAS.t;
    if (!d.meses.length) return '<div class="c-vazio">' + esc(T('rdEmpty')) + '</div>';
    var maior = Math.max.apply(null, d.meses.map(function (m) { return m.total_centavos; }));
    return d.meses.map(function (m) {
      var linhas = d.depositos.filter(function (x) { return x.data.slice(0, 7) === m.mes; }).reverse().map(function (x) {
        return '<div class="rd-dep"><div class="rd-dep-topo"><span class="mono">' + esc(dataNum(x.data)) + '</span><b>' + esc(reais(x.valor_centavos)) + '</b>' +
          (d.pode_editar ? '<label class="ver-tudo rd-anexar">' + esc(T('rdAttach')) + '<input type="file" class="so-leitor" accept="application/pdf,image/png,image/jpeg,image/webp" data-rd-anexar="' + x.id + '"></label>' +
            '<button type="button" class="ver-tudo rd-remover" data-rd-remover="' + x.id + '">' + esc(T('rdRemove')) + '</button>' : '') + '</div>' +
          (x.descricao ? '<small>' + esc(x.descricao) + '</small>' : '') + x.anexos.map(anexoHtml).join('') + '</div>';
      }).join('');
      return '<div class="rd-mes"><div class="rd-mes-cab"><span>' + esc(mesLongo(m.mes)) + '</span><b>' + esc(reais(m.total_centavos)) + '</b></div>' +
        '<div class="rd-mes-barra"><i style="width:' + Math.round(m.total_centavos / maior * 100) + '%"></i></div>' + linhas + '</div>';
    }).join('');
  }
  function formReditus() {
    var T = FAS.t;
    return '<form class="rd-form" id="formReditus" novalidate><span class="tit">' + esc(T('rdAdd')) + '</span><div class="rd-form-grade">' +
      '<label class="campo">' + esc(T('rdDate')) + '<input class="input" type="date" name="data" value="' + hojeISO() + '" max="' + hojeISO() + '"></label>' +
      '<label class="campo">' + esc(T('rdValue')) + '<input class="input" name="valor" inputmode="decimal" autocomplete="off" maxlength="20"></label></div>' +
      '<label class="campo">' + esc(T('rdDesc')) + '<input class="input" name="descricao" maxlength="200" autocomplete="off"></label>' +
      '<label class="campo">' + esc(T('rdFile')) + '<input class="input" type="file" name="anexo" accept="application/pdf,image/png,image/jpeg,image/webp"></label>' +
      '<span class="erro-msg" id="erroReditus" role="alert" hidden></span><div class="acoes-form"><button type="submit" class="btn btn-branco">' + esc(T('rdSave')) + '</button></div></form>';
  }
  function painelReditus(d) {
    var T = FAS.t;
    return '<div class="rd-painel' + (d.atingida ? ' rd-meta' : '') + '">' + (d.atingida ? '<canvas class="rd-fogos" aria-hidden="true"></canvas>' : '') + '<div class="rd-grade"><div class="rd-col-barra">' +
      (d.atingida ? '<div class="rd-parabens silk">' + esc(T('rdDone')) + '</div>' : '') +
      '<span class="rotulo">' + esc(T('rdGoal')) + ' ' + esc(reais(d.meta_centavos)) + '</span><div class="rd-total">' + esc(reais(d.total_centavos)) + '</div>' +
      '<small>' + String(d.percentual).replace('.', FAS.lang === 'pt' ? ',' : '.') + '%' + (d.falta_centavos ? ' · ' + esc(T('rdMissing')) + ' ' + esc(reais(d.falta_centavos)) : '') + '</small>' +
      barraReditus(d) + '</div><div class="rd-col-info">' + (d.pode_editar ? formReditus() : '<small class="rd-so-ver">' + esc(T('rdViewOnly')) + '</small>') +
      '<span class="tit">' + esc(T('rdMonths')) + '</span>' + mesesReditus(d) + '</div></div></div>';
  }
  function carregarReditus() {
    var meu = ++pedidoReditus, alvo = $('reditusPainel');
    if (!alvo) return;
    if (!alvo.firstChild) alvo.innerHTML = '<div class="carregando">' + esc(FAS.t('loading')) + '</div>';
    FAS.api('/collab/reditus', { token: token }).then(function (r) {
      var el = $('reditusPainel');
      if (meu !== pedidoReditus || !el || !reditusAberto) return;
      if (r.status === 401) return sair(FAS.t('sessionEnd'));
      if (r.status !== 200) { el.innerHTML = '<div class="c-vazio">' + esc(FAS.t('errRede')) + '</div>'; return; }
      el.innerHTML = painelReditus(r.dados);
      var fill = el.querySelector('[data-rd-altura]');
      if (fill) requestAnimationFrame(function () { requestAnimationFrame(function () { fill.style.height = fill.getAttribute('data-rd-altura') + 'px'; }); });
      var tela = el.querySelector('.rd-fogos');
      if (tela) iniciarFogos(tela);
    });
  }
  // Fogos em pixels em volta do painel, sem parar enquanto a meta estiver atingida.
  function iniciarFogos(tela) {
    var ctx = tela.getContext('2d');
    if (!ctx) return;
    var W = 0, H = 0, foguetes = [], fagulhas = [], quadro = 0;
    var CORES = ['#FFD27A', '#F0A030', '#FFFFFF', '#8FB0FF', '#3D7BFF', '#FF8A8A', '#7CE3A0'];
    function medir() {
      if (tela.clientWidth !== W || tela.clientHeight !== H) { W = tela.width = tela.clientWidth; H = tela.height = tela.clientHeight; }
    }
    function lancar() {
      var v = Math.sqrt(2 * 0.09 * H * (0.45 + Math.random() * 0.45));
      // a maioria sobe em volta da barra; alguns se espalham pelo resto do painel
      var tubo = tela.parentNode.querySelector('.rd-tubo'), base = tela.getBoundingClientRect(), r = tubo ? tubo.getBoundingClientRect() : null;
      var centro = r ? r.left - base.left + r.width / 2 : W / 4;
      var x = Math.random() < 0.75 ? centro + (Math.random() < 0.5 ? -1 : 1) * (r ? r.width / 2 : 40) * (1 + Math.random() * 3.5) : W * (0.04 + Math.random() * 0.92);
      foguetes.push({ x: Math.max(8, Math.min(W - 8, x)), y: H, vy: -v, cor: CORES[Math.floor(Math.random() * CORES.length)] });
    }
    function explodir(f) {
      var n = 34 + Math.floor(Math.random() * 18);
      for (var i = 0; i < n; i++) {
        var a = i / n * 6.283, v = 1.4 + Math.random() * 2.8;
        fagulhas.push({ x: f.x, y: f.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 1, cor: Math.random() < 0.75 ? f.cor : '#FFFFFF' });
      }
    }
    function passo() {
      medir();
      if (quadro++ % 26 === 0) { lancar(); if (Math.random() < 0.5) lancar(); }
      foguetes = foguetes.filter(function (f) { f.y += f.vy; f.vy += 0.09; if (f.vy >= -0.4) { explodir(f); return false; } return true; });
      fagulhas = fagulhas.filter(function (p) { p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.vx *= 0.985; p.vida -= 0.014; return p.vida > 0; });
    }
    function pintar() {
      ctx.clearRect(0, 0, W, H);
      foguetes.forEach(function (f) { ctx.globalAlpha = 1; ctx.fillStyle = f.cor; ctx.fillRect(Math.round(f.x / 3) * 3, Math.round(f.y / 3) * 3, 3, 6); });
      fagulhas.forEach(function (p) { ctx.globalAlpha = Math.max(0, p.vida); ctx.fillStyle = p.cor; ctx.fillRect(Math.round(p.x / 4) * 4, Math.round(p.y / 4) * 4, 4, 4); });
      ctx.globalAlpha = 1;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { for (var q = 0; q < 150; q++) passo(); pintar(); return; }
    (function laco() {
      if (!tela.isConnected) return;
      requestAnimationFrame(laco);
      if (document.hidden) return;
      passo();
      pintar();
    })();
  }
  function erroReditus(r) {
    var e = r.dados && r.dados.erro;
    if (r.status === 0) return FAS.t('errRede');
    if (r.status === 429) return FAS.t('errMuitas');
    if (r.status === 403) return FAS.t('rdErrPerm');
    return FAS.t({ valor_invalido: 'rdErrValue', data_invalida: 'rdErrDate', anexo_invalido: 'rdErrFile' }[e] || 'errSave');
  }
  function arquivoOk(a) { return !a || (a.size <= ANEXO_MAX && /^(application\/pdf|image\/(png|jpeg|webp))$/.test(a.type)); }
  function salvarDeposito(f) {
    var valor = centavosDe(f.valor.value), arq = f.anexo.files[0];
    msgEm('erroReditus');
    if (!valor) return msgEm('erroReditus', FAS.t('rdErrValue'));
    if (!arquivoOk(arq)) return msgEm('erroReditus', FAS.t('rdErrFile'));
    var fd = new FormData();
    fd.append('data', f.data.value);
    fd.append('valor_centavos', String(valor));
    fd.append('descricao', f.descricao.value);
    if (arq) fd.append('anexo', arq, arq.name);
    var botao = f.querySelector('button[type=submit]');
    botao.disabled = true;
    FAS.api('/collab/reditus/depositos', { method: 'POST', form: fd, token: token, timeout: 120000 }).then(function (r) {
      botao.disabled = false;
      if (r.status === 401) return sair(FAS.t('sessionEnd'));
      if (r.status !== 201) return msgEm('erroReditus', erroReditus(r));
      FAS.toast(FAS.t('rdSaved'));
      carregarReditus();
    });
  }
  function anexarComprovante(input) {
    var arq = input.files[0], id = input.getAttribute('data-rd-anexar');
    if (!arq) return;
    if (!arquivoOk(arq)) { input.value = ''; return FAS.toast(FAS.t('rdErrFile')); }
    var fd = new FormData();
    fd.append('anexo', arq, arq.name);
    FAS.api('/collab/reditus/depositos/' + encodeURIComponent(id) + '/anexos', { method: 'POST', form: fd, token: token, timeout: 120000 }).then(function (r) {
      if (r.status === 401) return sair(FAS.t('sessionEnd'));
      if (r.status !== 201) return FAS.toast(erroReditus(r));
      FAS.toast(FAS.t('rdAttached'));
      carregarReditus();
    });
  }
  function abrirAnexo(id, baixar) {
    // Abre a aba ainda dentro do clique (senao o navegador bloqueia como pop-up) e so depois pede o link.
    var aba = baixar ? null : window.open('about:blank', '_blank');
    if (aba) aba.opener = null;
    FAS.api('/collab/reditus/anexos/' + encodeURIComponent(id) + '/link' + (baixar ? '?baixar=1' : ''), { token: token }).then(function (r) {
      if (r.status === 401) { if (aba) aba.close(); return sair(FAS.t('sessionEnd')); }
      if (r.status !== 200 || !r.dados.url) { if (aba) aba.close(); return FAS.toast(FAS.t('rdErrLink')); }
      var url = window.FAS_CONFIG.api + r.dados.url;
      if (aba) { aba.location.replace(url); return; }
      var a = document.createElement('a');
      a.href = url; a.rel = 'noopener'; a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }
  function cliqueReditus(e) {
    var b;
    if ((b = e.target.closest('[data-reditus-toggle]'))) {
      reditusAberto = !reditusAberto;
      b.setAttribute('aria-expanded', String(reditusAberto));
      var alvo = $('reditusPainel');
      alvo.hidden = !reditusAberto;
      if (reditusAberto) carregarReditus(); else { pedidoReditus++; alvo.innerHTML = ''; }
      return true;
    }
    if ((b = e.target.closest('[data-rd-abrir]'))) { abrirAnexo(b.getAttribute('data-rd-abrir'), false); return true; }
    if ((b = e.target.closest('[data-rd-baixar]'))) { abrirAnexo(b.getAttribute('data-rd-baixar'), true); return true; }
    if ((b = e.target.closest('[data-rd-remover]'))) {
      if (window.confirm(FAS.t('rdConfirm'))) {
        FAS.api('/collab/reditus/depositos/' + encodeURIComponent(b.getAttribute('data-rd-remover')) + '/remover', { method: 'POST', body: {}, token: token }).then(function (r) {
          if (r.status === 401) return sair(FAS.t('sessionEnd'));
          if (r.status !== 200) return FAS.toast(erroReditus(r));
          FAS.toast(FAS.t('rdRemoved'));
          carregarReditus();
        });
      }
      return true;
    }
    return false;
  }

  // ---------- sessao ----------
  function erro(t) { var e = $('erroLogin'); e.textContent = t || ''; e.hidden = !t; }
  function entrar() {
    $('telaLogin').hidden = true;
    $('telaApp').hidden = false;
    $('nomeColab').textContent = eu.nome;
    document.querySelectorAll('[data-iniciais]').forEach(function (el) { el.textContent = iniciais(eu.nome); });
    var h = (location.hash || '').slice(1);
    mostrar(PAGINAS.indexOf(h) >= 0 || /^projects\/[a-z0-9-]+$/.test(h) ? h : 'overview');
  }
  function sair(motivo) {
    if (token) FAS.api('/collab/logout', { method: 'POST', body: {}, token: token });
    token = null; eu = null; cache = {}; reditusAberto = false;
    FAS.sessao.apagar('colab');
    $('pagina').innerHTML = '';
    $('telaApp').hidden = true;
    $('telaLogin').hidden = false;
    erro(motivo);
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
    $('usuario').focus();
  }
  function login(e) {
    e.preventDefault();
    var u = $('usuario').value.trim(), s = $('senha').value;
    if (!u || !s) return erro(FAS.t('errVazio'));
    erro();
    $('btnEntrar').disabled = true;
    FAS.api('/collab/login', { method: 'POST', body: { usuario: u, senha: s } }).then(function (r) {
      $('btnEntrar').disabled = false;
      $('senha').value = '';
      if (r.status === 200 && r.dados.token) {
        token = r.dados.token; eu = r.dados.colaborador;
        FAS.sessao.gravar('colab', token);
        return entrar();
      }
      erro(r.status === 0 || r.status === 503 ? FAS.t('errRede') : r.status === 429 ? FAS.t('errMuitas') : FAS.t('errLogin'));
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    $('marcaMob').innerHTML = FAS.marca(FAS.t('team'));
    $('marcaLat').innerHTML = FAS.marca(FAS.t('team'));
    $('idiomaLogin').innerHTML = FAS.botoesIdioma();
    $('idiomaApp').innerHTML = FAS.botoesIdioma();
    FAS.aplicarTextos();
    if (token) {
      FAS.api('/collab/me', { token: token }).then(function (r) {
        if (r.status === 200) { eu = r.dados.colaborador; return entrar(); }
        if (r.status === 401) FAS.sessao.apagar('colab');
        token = r.status === 401 ? null : token;
        $('telaLogin').hidden = false;
        if (r.status !== 401) erro(FAS.t('errRede'));
      });
    } else {
      $('telaLogin').hidden = false;
    }
    $('formLogin').addEventListener('submit', login);
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ir]');
      if (b) {
        var p = b.getAttribute('data-ir');
        if (p !== (location.hash || '').slice(1) || p !== pagina) { try { history.replaceState(null, '', '#' + p); } catch (x) {} mostrar(p); window.scrollTo(0, 0); }
        return;
      }
      if (e.target.closest('[data-atualizar-admob]')) { mostrar('finance', true); return; }
      if (e.target.closest('[data-editar-dados]')) { var fd = $('formDados'); if (fd) { fd.hidden = !fd.hidden; if (!fd.hidden) fd.querySelector('input').focus(); } return; }
      if (e.target.closest('[data-cancelar-dados]')) { $('formDados').hidden = true; return; }
      if (e.target.closest('[data-previa]')) { enviarRegistros(true); return; }
      if (cliqueReditus(e)) return;
      if (e.target.closest('[data-sair]')) sair();
    });
    FAS.aoTrocarIdioma(function () {
      ['marcaMob', 'marcaLat'].forEach(function (id) { $(id).innerHTML = FAS.marca(FAS.t('team')); });
      if (eu) mostrar(pagina);
    });
  });
})();
