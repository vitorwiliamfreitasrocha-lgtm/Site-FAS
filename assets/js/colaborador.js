// Area do Colaborador: login validado no servidor (HAZ) e painel interno.
// Nada aqui e segredo: todo dado vem da API, que confere a sessao a cada chamada.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var esc = FAS.esc;
  var ICONES = { 'Fallstate': '/assets/img/games/fallstate-icon.png', 'Fallstate: Claim the World': '/assets/img/games/fallstate-icon.png',
    'Rare Minerals Inc.': '/assets/img/games/rare-minerals-icon.png', 'Shelf & Sell': '/assets/img/games/shelf-and-sell-icon.png' };
  var COR_STATUS = { ok: 'st-ok', risk: 'st-risk', late: 'st-late' };

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
      admobErr: 'Não foi possível ler o AdMob agora. Tente de novo mais tarde.', stale: 'Dados do AdMob desatualizados', nextAt: 'próxima', refreshNow: '↻ Atualizar agora',
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
      admobErr: 'Could not read AdMob right now. Try again later.', stale: 'AdMob data is stale', nextAt: 'next', refreshNow: '↻ Refresh now',
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
  function linhaProjeto(p) {
    var cor = COR_STATUS[p.status] || 'st-ok', estagio = FAS.t('stages')[+p.etapa] || '';
    return '<div class="linha-proj"><span>' + esc(p.jogo) + ' <em>· ' + esc(p.titulo) + '</em></span><span class="' + cor + '">' + esc(estagio) +
      '</span><div class="barra3"><i style="width:' + pct(p.progresso) + '%;background:' + (p.status === 'risk' ? 'var(--alerta)' : p.status === 'late' ? 'var(--erro)' : 'var(--azul)') + '"></i></div></div>';
  }

  var RENDER = {
    overview: function (d) {
      var T = FAS.t, a = d.admob || {}, k = a.kpis || {}, moeda = a.moeda;
      var proj = d.projetos || [], st = { ok: 0, risk: 0, late: 0 };
      proj.forEach(function (p) { st[p.status] = (st[p.status] || 0) + 1; });
      var kpis = [];
      if (d.financas) {
        var ant = +k.receita_mes_anterior || 0, delta = ant ? Math.round(((+k.receita_mes || 0) - ant) / ant * 100) : null;
        kpis.push(kpi(T('kRev'), a.conectado ? dinheiro(k.receita_mes, moeda) : '—',
          delta === null ? '' : (delta >= 0 ? '+' : '') + delta + '% ' + T('vsLast'), delta === null ? '' : delta >= 0 ? 'sobe' : 'desce'));
        kpis.push(kpi(T('kImp'), a.conectado ? numero(k.impressoes_mes) : '—', a.conectado ? 'eCPM ' + dinheiro(k.ecpm_mes, moeda) : ''));
      }
      kpis.push(kpi(T('kProj'), String(d.projetos_ativos || 0), proj.length ? st.ok + ' ' + T('onTrack') + ' · ' + st.risk + ' ' + T('atRisk') : ''));
      kpis.push(kpi(T('kTk'), String(d.tickets.abertos), d.tickets.alta + ' ' + T('urgent'), d.tickets.alta ? 'alerta' : ''));
      var receita = d.financas ? '<div class="c-card"><div class="c-card-cab"><span>' + esc(T('revenue6m')) + '</span>' + legenda() + '</div>' +
        (a.conectado ? grafico(a.meses || [], d.compras_app_mensal || {}, moeda) : '<div class="c-vazio">' + esc(a.motivo && a.motivo !== 'nao_configurado' ? T('admobErr') : T('admobOff')) + '</div>') + '</div>' : '';
      var projetos = '<div class="c-card"><div class="c-card-cab"><span>' + esc(T('projects')) + '</span><button type="button" class="ver-tudo" data-ir="projects">' +
        esc(T('seeAll')) + ' →</button></div>' + (proj.length ? proj.slice(0, 4).map(linhaProjeto).join('') : vazio()) + '</div>';
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
      return '<div class="kpis">' + kpis.join('') + '</div><div class="grade-cards">' + receita + projetos + '</div><div class="grade-cards">' + marcos + avisos + '</div>';
    },

    projects: function (d) {
      var T = FAS.t, lista = d.projetos || [];
      if (!lista.length) return '<div class="c-card">' + vazio() + '</div>';
      return lista.map(function (p) {
        var etapa = +p.etapa || 0, cor = COR_STATUS[p.status] || 'st-ok';
        var pipe = T('stages').map(function (s, i) {
          return '<div class="' + (i < etapa ? 'feito' : i === etapa ? 'atual' : '') + '"><i></i><span>' + esc(s) + '</span></div>';
        }).join('');
        var barra = p.status === 'risk' ? 'var(--alerta)' : p.status === 'late' ? 'var(--erro)' : 'var(--azul)';
        return '<div class="projeto"><div class="projeto-cab"><div>' + iconeJogo(p.jogo) + '<div class="tits"><small>' + esc(p.jogo) + '</small><b>' + esc(p.titulo) +
          '</b></div></div><span class="pill-status ' + cor + '">' + esc(T('status')[p.status] || T('status').ok) + '</span></div>' +
          '<div class="pipeline">' + pipe + '</div><div class="projeto-info">' +
          '<div><span class="rotulo">' + esc(T('nowOn')) + '</span><span>' + esc(p.agora || '—') + '</span></div>' +
          '<div><span class="rotulo">' + esc(T('nextMilestone')) + '</span><span>' + esc(p.proximo || '—') + '</span></div>' +
          '<div><span class="rotulo">' + esc(T('lead')) + '</span><span>' + esc(p.responsavel || '—') + (p.pessoas ? ' · ' + esc(p.pessoas) + ' ' + esc(T('people')) : '') + '</span></div>' +
          '<div><span class="rotulo">' + esc(T('progress')) + ' · ' + pct(p.progresso) + '%</span><div class="barra4"><i style="width:' + pct(p.progresso) + '%;background:' + barra + '"></i></div></div>' +
          '</div></div>';
      }).join('');
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

  function rota(p, forcar) { return p === 'overview' ? '/collab/overview' : '/collab/' + p + (forcar && p === 'finance' ? '?atualizar=1' : ''); }

  function mostrar(p, forcar) {
    if (paginasVisiveis().indexOf(p) < 0) p = 'overview';
    pagina = p;
    pintarNav();
    var el = $('pagina');
    el.classList.remove('on');
    $('seloDados').hidden = true;
    var meu = ++pedido;
    var desenhar = function (d) {
      if (meu !== pedido) return;
      el.innerHTML = RENDER[p](d);
      requestAnimationFrame(function () { el.classList.add('on'); });
    };
    if (cache[p] && !forcar) { desenhar(cache[p]); return; }
    el.innerHTML = '<div class="carregando">' + esc(FAS.t('loading')) + '</div>';
    el.classList.add('on');
    FAS.api(rota(p, forcar), { token: token, timeout: 60000 }).then(function (r) {
      if (meu !== pedido) return;
      if (r.status === 401) return sair(FAS.t('sessionEnd'));
      if (r.status === 403) { el.innerHTML = '<div class="c-card"><div class="c-vazio">' + esc(FAS.t('noAccess')) + '</div></div>'; return; }
      if (r.status !== 200) { el.innerHTML = '<div class="c-card"><div class="c-vazio">' + esc(FAS.t('errRede')) + '</div></div>'; return; }
      cache[p] = r.dados;
      el.classList.remove('on');
      desenhar(r.dados);
    });
  }

  // ---------- sessao ----------
  function erro(t) { var e = $('erroLogin'); e.textContent = t || ''; e.hidden = !t; }
  function entrar() {
    $('telaLogin').hidden = true;
    $('telaApp').hidden = false;
    $('nomeColab').textContent = eu.nome;
    document.querySelectorAll('[data-iniciais]').forEach(function (el) { el.textContent = iniciais(eu.nome); });
    var h = (location.hash || '').slice(1);
    mostrar(PAGINAS.indexOf(h) >= 0 ? h : 'overview');
  }
  function sair(motivo) {
    if (token) FAS.api('/collab/logout', { method: 'POST', body: {}, token: token });
    token = null; eu = null; cache = {};
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
        if (p !== pagina) { try { history.replaceState(null, '', '#' + p); } catch (x) {} mostrar(p); window.scrollTo(0, 0); }
        return;
      }
      if (e.target.closest('[data-atualizar-admob]')) { mostrar('finance', true); return; }
      if (e.target.closest('[data-sair]')) sair();
    });
    FAS.aoTrocarIdioma(function () {
      ['marcaMob', 'marcaLat'].forEach(function (id) { $(id).innerHTML = FAS.marca(FAS.t('team')); });
      if (eu) mostrar(pagina);
    });
  });
})();
