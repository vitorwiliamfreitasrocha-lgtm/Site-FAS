// Pecas comuns: idioma, topo/menu, rodape, chamadas a API e escape de HTML.
(function () {
  'use strict';
  var FAS = window.FAS = {};
  var CFG = window.FAS_CONFIG || {};
  var CHAVE_LANG = 'fas-lang';

  FAS.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  // ---------- idioma ----------
  function lerLang() {
    try {
      var p = new URLSearchParams(location.search).get('lang');
      if (p === 'pt' || p === 'en') return p;
      var s = localStorage.getItem(CHAVE_LANG);
      if (s === 'pt' || s === 'en') return s;
    } catch (e) {}
    return (navigator.language || 'pt').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
  }
  FAS.lang = lerLang();
  document.documentElement.lang = FAS.lang === 'pt' ? 'pt-BR' : 'en';
  var ouvintes = [];
  FAS.aoTrocarIdioma = function (fn) { ouvintes.push(fn); };
  FAS.setLang = function (l) {
    if (l !== 'pt' && l !== 'en') return;
    FAS.lang = l;
    try { localStorage.setItem(CHAVE_LANG, l); } catch (e) {}
    try {
      var u = new URL(location.href);
      if (u.searchParams.has('lang')) { u.searchParams.set('lang', l); history.replaceState(null, '', u); }
    } catch (e) {}
    document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === l));
    });
    aplicarTextos();
    ouvintes.forEach(function (f) { f(l); });
  };

  // Dicionarios: FAS.textos(dict) junta ao comum; [data-t] / [data-t-ph] / [data-t-aria] usam a chave.
  var DIC = { pt: {}, en: {} };
  FAS.textos = function (d) {
    ['pt', 'en'].forEach(function (l) { Object.keys(d[l] || {}).forEach(function (k) { DIC[l][k] = d[l][k]; }); });
  };
  FAS.t = function (k) { var v = DIC[FAS.lang][k]; return v == null ? DIC.pt[k] : v; };
  function aplicarTextos(raiz) {
    raiz = raiz || document;
    raiz.querySelectorAll('[data-t]').forEach(function (el) { el.textContent = FAS.t(el.getAttribute('data-t')); });
    raiz.querySelectorAll('[data-t-ph]').forEach(function (el) { el.placeholder = FAS.t(el.getAttribute('data-t-ph')); });
    raiz.querySelectorAll('[data-t-aria]').forEach(function (el) { el.setAttribute('aria-label', FAS.t(el.getAttribute('data-t-aria'))); });
    var tit = document.querySelector('meta[name="fas-titulo"]');
    if (tit) document.title = FAS.t(tit.content);
  }
  FAS.aplicarTextos = aplicarTextos;

  FAS.textos({
    pt: { navGames: 'Jogos', navUser: 'Área do Usuário', navCollab: 'Área do Colaborador', terms: 'Termos de Uso',
      privacy: 'Política de Privacidade', legal: 'Legal', support: 'Suporte', openTicket: 'Abrir um ticket',
      about: 'Estúdio independente de jogos. Feito com carinho, com um pomerânia supervisionando.',
      close: 'Fechar', menu: 'Menu', rights: 'Todos os direitos reservados.',
      errRede: 'Não foi possível falar com o servidor. Tente de novo em instantes.',
      errMuitas: 'Muitas tentativas. Aguarde alguns minutos e tente de novo.' },
    en: { navGames: 'Games', navUser: 'Player Area', navCollab: 'Team Area', terms: 'Terms of Use',
      privacy: 'Privacy Policy', legal: 'Legal', support: 'Support', openTicket: 'Open a ticket',
      about: 'Independent game studio. Made with care, supervised by a pomeranian.',
      close: 'Close', menu: 'Menu', rights: 'All rights reserved.',
      errRede: 'Could not reach the server. Please try again shortly.',
      errMuitas: 'Too many attempts. Wait a few minutes and try again.' }
  });

  // ---------- topo e menu ----------
  var LOGO = '<span class="marca-icone"><img src="/assets/img/logo-apollo.png" alt="" width="118" height="66"></span>';
  FAS.marca = function (sub) {
    return '<a class="marca" href="/" aria-label="Flying Apollo Studios">' + LOGO +
      '<span class="marca-texto">Flying Apollo<br><span>' + FAS.esc(sub || 'Studios') + '</span></span></a>';
  };
  function botoesIdioma(cls) {
    return '<div class="idioma ' + (cls || '') + '" role="group" aria-label="Idioma / Language">' +
      '<button type="button" data-set-lang="pt" aria-pressed="' + (FAS.lang === 'pt') + '">PT</button>' +
      '<button type="button" data-set-lang="en" aria-pressed="' + (FAS.lang === 'en') + '">EN</button></div>';
  }
  FAS.botoesIdioma = botoesIdioma;

  FAS.montarTopo = function (el, ativo) {
    if (!el) return;
    var links = [['/#jogos', 'navGames', 'jogos'], ['/usuario/', 'navUser', 'usuario'], ['/colaborador/', 'navCollab', 'colaborador']];
    el.innerHTML = FAS.marca() +
      '<nav class="nav" aria-label="Principal">' + links.map(function (l) {
        return '<a href="' + l[0] + '" data-t="' + l[1] + '"' + (ativo === l[2] ? ' aria-current="page"' : '') + '></a>';
      }).join('') + botoesIdioma() + '</nav>' +
      '<button type="button" class="hamb" data-abrir-menu data-t-aria="menu" aria-expanded="false" aria-controls="menuMob"><span></span><span></span><span></span></button>';
    var todos = [['/', 'navGames'], ['/usuario/', 'navUser'], ['/colaborador/', 'navCollab'], ['/termos/', 'terms'], ['/privacidade/', 'privacy']];
    var menu = document.createElement('div');
    menu.className = 'menu-mob';
    menu.id = 'menuMob';
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-modal', 'true');
    menu.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center">' +
      '<span class="marca-texto">Flying Apollo<br><span>Studios</span></span>' +
      '<button type="button" class="fechar" data-fechar-menu data-t-aria="close">×</button></div>' +
      '<nav>' + todos.map(function (l, i) {
        return '<a href="' + l[0] + '"' + (i > 2 ? ' class="menor"' : '') + ' style="transition-delay:' + (i * 0.05) + 's"><span>0' + (i + 1) + '</span><em data-t="' + l[1] + '" style="font-style:normal"></em></a>';
      }).join('') + '</nav>' +
      '<div class="menu-mob-rodape">' + botoesIdioma('idioma-grande') +
      '<a href="mailto:' + FAS.esc(CFG.email) + '">' + FAS.esc(CFG.email) + '</a></div>';
    document.body.appendChild(menu);
  };

  function abrirMenu(abrir) {
    var m = document.getElementById('menuMob');
    if (!m) return;
    m.classList.toggle('aberto', abrir);
    document.querySelectorAll('[data-abrir-menu]').forEach(function (b) { b.setAttribute('aria-expanded', String(abrir)); });
    if (abrir) { var f = m.querySelector('[data-fechar-menu]'); if (f) f.focus(); }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-set-lang]');
    if (b) { FAS.setLang(b.getAttribute('data-set-lang')); return; }
    if (e.target.closest('[data-abrir-menu]')) return abrirMenu(true);
    if (e.target.closest('[data-fechar-menu]') || e.target.closest('#menuMob nav a')) return abrirMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    var m = document.getElementById('menuMob');
    if (e.key === 'Escape' && m && m.classList.contains('aberto')) abrirMenu(false);
  });
  window.matchMedia('(max-width: 760px)').addEventListener('change', function () { abrirMenu(false); });
  FAS.mobile = function () { return window.matchMedia('(max-width: 760px)').matches; };

  // ---------- rodape ----------
  FAS.montarRodape = function (el, simples) {
    if (!el) return;
    var ano = new Date().getFullYear();
    if (simples) {
      el.className = 'rodape-simples';
      el.innerHTML = '<span>© ' + ano + ' Flying Apollo Studios</span><a href="mailto:' + FAS.esc(CFG.email) + '">' + FAS.esc(CFG.email) + '</a>';
      return;
    }
    el.className = 'rodape';
    el.innerHTML =
      '<div class="rodape-sobre"><span class="marca-texto">Flying Apollo <span>Studios</span></span><span data-t="about"></span></div>' +
      '<div><span class="rotulo" data-t="legal"></span><a href="/termos/" data-t="terms"></a><a href="/privacidade/" data-t="privacy"></a></div>' +
      '<div><span class="rotulo" data-t="support"></span><a href="/usuario/" data-t="openTicket"></a>' +
      '<a class="email" href="mailto:' + FAS.esc(CFG.email) + '">' + FAS.esc(CFG.email) + '</a></div>' +
      '<div class="copy">© ' + ano + ' Flying Apollo Studios</div>';
  };

  // ---------- API ----------
  // Devolve sempre {status, dados}. status 0 = sem rede / servidor fora.
  FAS.api = function (rota, opts) {
    opts = opts || {};
    var init = { method: opts.method || 'GET', headers: {}, cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' };
    if (opts.token) init.headers.Authorization = 'Bearer ' + opts.token;
    if (opts.form) init.body = opts.form;
    else if (opts.body !== undefined) { init.headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(opts.body); }
    var ctl = window.AbortController ? new AbortController() : null;
    if (ctl) { init.signal = ctl.signal; setTimeout(function () { ctl.abort(); }, opts.timeout || 25000); }
    return fetch(CFG.api + rota, init).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) { return { status: r.status, dados: d || {} }; });
    }).catch(function () { return { status: 0, dados: {} }; });
  };

  // Sessao: jogador em localStorage (fica logado), colaborador em sessionStorage (some ao fechar a aba).
  FAS.sessao = {
    ler: function (tipo) {
      try { return (tipo === 'colab' ? sessionStorage : localStorage).getItem('fas-sessao-' + tipo); } catch (e) { return null; }
    },
    gravar: function (tipo, tok) {
      try { (tipo === 'colab' ? sessionStorage : localStorage).setItem('fas-sessao-' + tipo, tok); } catch (e) {}
    },
    apagar: function (tipo) {
      try { (tipo === 'colab' ? sessionStorage : localStorage).removeItem('fas-sessao-' + tipo); } catch (e) {}
    }
  };

  // ---------- toast ----------
  var toastT;
  FAS.toast = function (msg) {
    var el = document.getElementById('toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(function () { el.classList.remove('on'); }, 3800);
  };

  // ---------- reveal ao rolar ----------
  FAS.revelar = function () {
    var els = document.querySelectorAll('[data-reveal]:not(.revelar)');
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visto'); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    els.forEach(function (el, i) {
      el.classList.add('revelar');
      el.style.transitionDelay = ((i % 3) * 0.08) + 's';
      io.observe(el);
    });
  };

  document.addEventListener('DOMContentLoaded', function () { aplicarTextos(); });
})();
