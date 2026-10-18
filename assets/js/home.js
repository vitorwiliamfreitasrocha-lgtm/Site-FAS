// Home: hero com vitrine de jogos, bastidores, trailers, quem somos e newsletter.
(function () {
  'use strict';
  var C = window.FAS_CONTEUDO, GAMES = C.GAMES, STORES = C.STORES;
  var GLYPHS = '░▒▓#%&*+=<>/\\';
  var $ = function (id) { return document.getElementById(id); };

  FAS.textos({
    pt: { seeGame: 'Ver jogo', ourGames: 'Nossos jogos', hint: '← → para navegar · Enter para abrir', hintM: 'Deslize para trocar · toque para abrir',
      soon: 'Em breve', priceLabel: 'Preço', platforms: 'Plataformas', getIt: 'Onde jogar', storesSoon: 'Links das lojas em breve.', screens: 'Cenas do jogo',
      bKicker: 'Bastidores', bTitle: 'No que estamos trabalhando', bText: 'Atualizações, novos jogos e o dia a dia do estúdio. Acompanhe cada etapa até chegar no seu celular.',
      watch: 'Assistir', trKicker: 'Trailers & prévias', trTitle: 'Veja os jogos em movimento', trailer: 'Trailer', preview: 'Prévia', gameplay: 'Gameplay',
      abKicker: 'Quem somos', abTitle: 'Um estúdio pequeno, com um mascote grande',
      abText: 'A Flying Apollo Studios é um estúdio independente de jogos. Fazemos jogos para celular e PC que são fáceis de começar e difíceis de largar. O Apollo, nosso pomerânia, aprova cada build.',
      fGames: 'jogos publicados', fPlat: 'plataformas', fWip: 'projetos em andamento',
      nlTitle: 'Novidades antes de todo mundo', nlText: 'Prévias, datas de lançamento e acesso antecipado a betas. Um e-mail por mês, no máximo.',
      nlBtn: 'Inscrever', nlDone: 'Inscrito ✓', nlNote: 'Sem spam. Cancele quando quiser.', nlOk: 'Pronto! Você vai receber nossa próxima edição.',
      nlErr: 'Digite um e-mail válido.', noVideo: 'Vídeo ainda não publicado.' },
    en: { seeGame: 'View game', ourGames: 'Our games', hint: '← → to browse · Enter to open', hintM: 'Swipe to switch · tap to open',
      soon: 'Coming soon', priceLabel: 'Price', platforms: 'Platforms', getIt: 'Where to play', storesSoon: 'Store links coming soon.', screens: 'Screenshots',
      bKicker: 'Behind the scenes', bTitle: 'What we are working on', bText: 'Updates, new games and everyday life at the studio. Follow every step until it lands on your phone.',
      watch: 'Watch', trKicker: 'Trailers & previews', trTitle: 'See the games in motion', trailer: 'Trailer', preview: 'Preview', gameplay: 'Gameplay',
      abKicker: 'Who we are', abTitle: 'A small studio with a big mascot',
      abText: 'Flying Apollo Studios is an independent game studio. We make mobile and PC games that are easy to pick up and hard to put down. Apollo, our pomeranian, signs off on every build.',
      fGames: 'games released', fPlat: 'platforms', fWip: 'projects in progress',
      nlTitle: 'News before everyone else', nlText: 'Previews, release dates and early beta access. One email a month, at most.',
      nlBtn: 'Subscribe', nlDone: 'Subscribed ✓', nlNote: 'No spam. Unsubscribe anytime.', nlOk: 'Done! You will get our next issue.',
      nlErr: 'Enter a valid email.', noVideo: 'Video not published yet.' }
  });

  var ativo = 0, aberto = null, ultimoHover = 0, scr, video = null;
  var L = function () { return FAS.lang; };
  var loc = function (g) { return g[L()] || g.pt; };
  var plataformas = function (g) { return Object.keys(g.stores).map(function (s) { return STORES[s].plat; }).join(' · '); };
  var num = function (i) { return String(i + 1).padStart(2, '0') + ' / ' + String(GAMES.length).padStart(2, '0'); };
  // aspas simples: o valor vai dentro de style="..." (aspas duplas fechariam o atributo)
  var urlImg = function (u) { return "url('" + String(u).replace(/["'\\\n<>]/g, '') + "')"; };

  // ---------- hero ----------
  function montarCamadas() {
    $('heroCamadas').innerHTML = GAMES.map(function (g, i) {
      var cena = g.scene ? '<div class="hero-cena" data-i="' + i + '" style="background-image:' + urlImg(g.scene) + '"></div>' : '';
      return '<div class="hero-fundo' + (g.scene ? ' cena' : '') + '" data-i="' + i + '" style="background-image:' + urlImg(g.scene || g.icon) + '"></div>' + cena;
    }).join('');
    $('tiles').innerHTML = GAMES.map(function (g, i) {
      return '<button type="button" class="tile" role="option" data-tile="' + i + '"><span class="tile-img" style="background-image:' + urlImg(g.icon) + '"></span>' +
        '<span class="tile-nome">' + FAS.esc(g.name) + '</span></button>';
    }).join('') + '<div class="tile-breve" data-t="soon"></div>';
  }

  function pintarHero() {
    var g = GAMES[ativo], t = loc(g);
    document.querySelectorAll('#heroCamadas [data-i]').forEach(function (el) { el.classList.toggle('on', +el.getAttribute('data-i') === ativo); });
    document.querySelectorAll('[data-tile]').forEach(function (el) {
      var on = +el.getAttribute('data-tile') === ativo;
      el.classList.toggle('on', on);
      el.setAttribute('aria-selected', String(on));
    });
    $('heroNum').textContent = num(ativo);
    $('heroGenero').textContent = t.genre;
    $('heroTagline').textContent = t.tagline;
    $('heroPreco').textContent = t.price;
    $('heroPlats').textContent = plataformas(g);
    $('dica').textContent = FAS.t(FAS.mobile() ? 'hintM' : 'hint');
  }

  function decodificar(alvo) {
    clearInterval(scr);
    var f = 0, total = 18, h1 = $('heroTitulo');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { h1.textContent = alvo; return; }
    scr = setInterval(function () {
      f++;
      var rev = Math.floor((f / total) * alvo.length);
      h1.textContent = alvo.split('').map(function (c, i) {
        return i < rev || c === ' ' ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }).join('');
      if (f >= total) { clearInterval(scr); h1.textContent = alvo; }
    }, 28);
  }

  function selecionar(i) {
    i = (i + GAMES.length) % GAMES.length;
    if (i === ativo) return;
    ativo = i;
    pintarHero();
    decodificar(GAMES[i].name);
  }

  // ---------- detalhe do jogo ----------
  function abrirDetalhe(i) {
    aberto = i;
    var g = GAMES[i], t = loc(g), lojas = Object.keys(g.stores).filter(function (s) { return g.stores[s]; });
    var shots = (g.shots || []).slice(0, 3);
    $('detalhe').innerHTML =
      '<div class="detalhe-topo"><span class="kicker">' + FAS.esc(num(i)) + ' · ' + FAS.esc(t.genre) + '</span>' +
      '<button type="button" class="btn-esc" data-fechar-detalhe>ESC · ' + FAS.esc(FAS.t('close')) + '</button></div>' +
      '<div class="detalhe-grade"><div class="detalhe-arte"><div class="glow" style="background-image:' + urlImg(g.icon) + '"></div>' +
      '<div class="icone" role="img" aria-label="' + FAS.esc(g.name) + '" style="background-image:' + urlImg(g.icon) + '"></div></div>' +
      '<div class="detalhe-info"><h2 class="silk" id="detNome">' + FAS.esc(g.name) + '</h2><p>' + FAS.esc(t.desc) + '</p>' +
      '<div class="info-cards"><div><span class="rotulo">' + FAS.esc(FAS.t('priceLabel')) + '</span><b>' + FAS.esc(t.price) + '</b><small>' + FAS.esc(t.priceNote) + '</small></div>' +
      '<div><span class="rotulo">' + FAS.esc(FAS.t('platforms')) + '</span><b>' + FAS.esc(plataformas(g)) + '</b><small>' + FAS.esc(t.rating) + '</small></div></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px"><span class="rotulo">' + FAS.esc(FAS.t('getIt')) + '</span>' +
      (lojas.length ? '<div class="lojas">' + lojas.map(function (s) {
        var st = STORES[s];
        return '<a class="loja" href="' + FAS.esc(g.stores[s]) + '" target="_blank" rel="noopener"><i>' + st.mark + '</i><span><small>' +
          FAS.esc(st[L()]) + '</small><b>' + st.name + '</b></span></a>';
      }).join('') + '</div>' : '<span style="font-size:14px;color:var(--t55)">' + FAS.esc(FAS.t('storesSoon')) + '</span>') +
      '</div></div></div>' +
      (shots.length ? '<div style="margin-top:48px;display:flex;flex-direction:column;gap:14px"><span class="rotulo">' + FAS.esc(FAS.t('screens')) +
        '</span><div class="cenas">' + shots.map(function (s) { return '<div style="background-image:' + urlImg(s) + '"></div>'; }).join('') + '</div></div>' : '');
    $('detalheModal').classList.add('aberto');
    document.body.style.overflow = 'hidden';
    $('detalheModal').querySelector('[data-fechar-detalhe]').focus();
  }
  function fecharDetalhe() {
    if (aberto === null) return;
    var i = aberto;
    aberto = null;
    $('detalheModal').classList.remove('aberto');
    document.body.style.overflow = '';
    var tile = document.querySelector('[data-tile="' + i + '"]');
    if (tile) tile.focus({ preventScroll: true });
  }

  // ---------- video ----------
  function abrirVideo(titulo, yt) {
    video = true;
    $('videoTitulo').textContent = titulo;
    var tela = $('videoTela');
    tela.innerHTML = '';
    if (yt && /^[A-Za-z0-9_-]{6,20}$/.test(yt)) {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + yt + '?autoplay=1&rel=0';
      f.title = titulo;
      f.allow = 'autoplay; encrypted-media; picture-in-picture';
      f.allowFullscreen = true;
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      tela.appendChild(f);
    } else {
      tela.innerHTML = '<span class="mono" style="font-size:13px;color:var(--t55);text-align:center;padding:20px">' + FAS.esc(FAS.t('noVideo')) + '</span>';
    }
    $('videoModal').classList.add('aberto');
  }
  function fecharVideo() { video = null; $('videoModal').classList.remove('aberto'); $('videoTela').innerHTML = ''; }

  // ---------- secoes ----------
  function pintarSecoes() {
    var d = C.DEVLOG, temDevlog = !!d.youtube, wip = C.WIP || [];
    var trailers = (C.TRAILERS || []).filter(function (v) { return v.youtube; });
    var n = 1;
    $('bastidores').hidden = !(temDevlog || wip.length);
    if (!$('bastidores').hidden) {
      n++;
      $('devlog').hidden = !temDevlog;
      $('devlogRotulo').textContent = d.label;
      $('devlogTitulo').textContent = d[L()] || d.pt;
      var capa = $('devlogCapa');
      if (d.cover) { capa.className = 'capa'; capa.style.backgroundImage = urlImg(d.cover); }
      $('wip').innerHTML = wip.map(function (w) {
        var tx = w[L()] || w.pt;
        return '<div class="wip-item"><span class="icone-jogo"' + (w.icon ? ' style="background-image:' + urlImg(w.icon) + '"' : '') + '>' + (w.icon ? '' : '?') + '</span>' +
          '<span class="wip-meio"><span class="rotulo" style="letter-spacing:.1em">' + FAS.esc(w.game) + '</span><b>' + FAS.esc(tx[0]) + '</b>' +
          '<span class="barra"><i style="width:' + Math.max(0, Math.min(100, +w.pct || 0)) + '%"></i></span></span>' +
          '<span class="wip-etapa">' + FAS.esc(tx[1]) + '</span></div>';
      }).join('');
    }
    $('trailers').hidden = !trailers.length;
    if (trailers.length) {
      $('trNum').textContent = String(n++).padStart(2, '0');
      $('trailerLista').innerHTML = trailers.map(function (v, i) {
        return '<div class="trailer" data-reveal><div class="capa' + (v.cover ? '' : ' capa-vazia') + '"' + (v.cover ? ' style="background-image:' + urlImg(v.cover) + '"' : '') + '></div>' +
          '<div class="trailer-rodape"><span><span class="rotulo" style="letter-spacing:.1em">' + FAS.esc(FAS.t(v.kind)) + '</span><b>' + FAS.esc(v.game) + '</b></span>' +
          '<button type="button" class="btn-play" data-trailer="' + i + '" aria-label="' + FAS.esc(FAS.t('watch')) + '"><i></i></button></div></div>';
      }).join('');
    }
    $('abNum').textContent = String(n++).padStart(2, '0');
    $('nlNum').textContent = String(n).padStart(2, '0');
    var plats = {};
    GAMES.forEach(function (g) { Object.keys(g.stores).forEach(function (s) { plats[s] = 1; }); });
    var fatos = [[GAMES.length, 'fGames'], [Object.keys(plats).length, 'fPlat']];
    if (wip.length) fatos.push([wip.length, 'fWip']);
    $('fatos').innerHTML = fatos.map(function (f) { return '<div><b>' + f[0] + '</b><span>' + FAS.esc(FAS.t(f[1])) + '</span></div>'; }).join('');
    FAS.revelar();
  }

  // ---------- estrelas ----------
  var mouse = { x: 0.5, y: 0.5 };
  function estrelas() {
    var c = $('estrelas'), ctx = c.getContext('2d');
    if (!ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2), w, h, lista = [], rastros = [], mx = 0, my = 0, visivel = true;
    function medir() {
      w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lista = Array.from({ length: Math.round(w * h / 9000) }, function () { return { x: Math.random() * w, y: Math.random() * h, z: Math.random(), t: Math.random() * 6.28 }; });
    }
    medir();
    window.addEventListener('resize', medir);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visivel = es[0].isIntersecting; }).observe(c);
    (function tick() {
      requestAnimationFrame(tick);
      if (!visivel || document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      mx += ((mouse.x - 0.5) - mx) * 0.04; my += ((mouse.y - 0.5) - my) * 0.04;
      for (var k = 0; k < lista.length; k++) {
        var s = lista[k];
        s.x += 0.04 + s.z * 0.18; s.t += 0.02 + s.z * 0.03;
        if (s.x > w + 20) s.x = -20;
        var a = (0.25 + 0.75 * (0.5 + 0.5 * Math.sin(s.t))) * (0.3 + s.z * 0.7);
        ctx.fillStyle = s.z > 0.7 ? 'rgba(143,176,255,' + a + ')' : 'rgba(255,255,255,' + (a * 0.8) + ')';
        var tam = s.z > 0.85 ? 3 : 2;
        ctx.fillRect(Math.round(s.x - mx * 40 * s.z), Math.round(s.y - my * 30 * s.z), tam, tam);
      }
      if (Math.random() < 0.004) rastros.push({ x: Math.random() * w * 0.6, y: Math.random() * h * 0.5, l: 0 });
      rastros = rastros.filter(function (r) { return r.l < 1; });
      rastros.forEach(function (r) {
        r.l += 0.02;
        for (var j = 0; j < 10; j++) {
          ctx.fillStyle = 'rgba(255,255,255,' + ((1 - r.l) * (1 - j / 10)) + ')';
          ctx.fillRect(Math.round(r.x + r.l * 260 - j * 6), Math.round(r.y + r.l * 90 - j * 2), 2, 2);
        }
      });
    })();
  }

  // ---------- newsletter ----------
  var nlEstado = 'idle';
  function pintarNews() {
    var nota = $('nlNota'), btn = $('nlBtn');
    btn.textContent = FAS.t(nlEstado === 'done' ? 'nlDone' : 'nlBtn');
    nota.className = 'news-nota' + (nlEstado === 'done' ? ' ok' : nlEstado === 'idle' ? '' : ' erro');
    nota.textContent = nlEstado === 'done' ? FAS.t('nlOk') : nlEstado === 'error' ? FAS.t('nlErr') :
      nlEstado === 'rede' ? FAS.t('errRede') : nlEstado === 'muitas' ? FAS.t('errMuitas') : FAS.t('nlNote');
    nota.removeAttribute('data-t');
  }
  function inscrever(e) {
    e.preventDefault();
    var email = $('nlEmail').value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { nlEstado = 'error'; return pintarNews(); }
    $('nlBtn').disabled = true;
    FAS.api('/newsletter', { method: 'POST', body: { email: email, idioma: FAS.lang } }).then(function (r) {
      $('nlBtn').disabled = false;
      nlEstado = r.status === 200 ? 'done' : r.status === 400 ? 'error' : r.status === 429 ? 'muitas' : 'rede';
      pintarNews();
    });
  }

  // ---------- eventos ----------
  document.addEventListener('DOMContentLoaded', function () {
    FAS.montarTopo($('topo'), 'jogos');
    FAS.montarRodape($('rodape'));
    montarCamadas();
    $('heroTitulo').textContent = GAMES[0].name;
    pintarHero();
    pintarSecoes();
    FAS.aplicarTextos();
    pintarNews();
    estrelas();

    $('tiles').addEventListener('mouseover', function (e) {
      var b = e.target.closest('[data-tile]');
      if (!b || FAS.mobile()) return;
      ultimoHover = Date.now();
      selecionar(+b.getAttribute('data-tile'));
    });
    $('tiles').addEventListener('focusin', function (e) {
      var b = e.target.closest('[data-tile]');
      if (b && !FAS.mobile()) selecionar(+b.getAttribute('data-tile'));
    });
    $('tiles').addEventListener('click', function (e) {
      var b = e.target.closest('[data-tile]');
      if (!b) return;
      var i = +b.getAttribute('data-tile');
      ultimoHover = Date.now();
      if (FAS.mobile() && i !== ativo) return selecionar(i);   // 1o toque seleciona, 2o abre
      abrirDetalhe(i);
    });
    $('heroVer').addEventListener('click', function () { abrirDetalhe(ativo); });
    $('detalheModal').addEventListener('click', function (e) {
      if (e.target === $('detalheModal') || e.target.closest('[data-fechar-detalhe]')) fecharDetalhe();
    });
    $('videoModal').addEventListener('click', function (e) {
      if (e.target === $('videoModal') || e.target.closest('[data-fechar-video]')) fecharVideo();
    });
    $('devlogPlay').addEventListener('click', function () {
      abrirVideo(C.DEVLOG.label + ' · ' + (C.DEVLOG[L()] || C.DEVLOG.pt), C.DEVLOG.youtube);
    });
    $('trailerLista').addEventListener('click', function (e) {
      var b = e.target.closest('[data-trailer]');
      if (!b) return;
      var v = C.TRAILERS.filter(function (x) { return x.youtube; })[+b.getAttribute('data-trailer')];
      abrirVideo(v.game + ' · ' + FAS.t(v.kind), v.youtube);
    });
    $('nlForm').addEventListener('submit', inscrever);
    $('nlEmail').addEventListener('input', function () { if (nlEstado !== 'idle') { nlEstado = 'idle'; pintarNews(); } });

    window.addEventListener('keydown', function (e) {
      if (video) { if (e.key === 'Escape') fecharVideo(); return; }
      if (aberto !== null) { if (e.key === 'Escape') fecharDetalhe(); return; }
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (document.getElementById('menuMob') && document.getElementById('menuMob').classList.contains('aberto')) return;
      var noHero = window.scrollY < window.innerHeight * 0.6;
      if (!noHero) return;
      if (e.key === 'ArrowRight') { ultimoHover = Date.now(); selecionar(ativo + 1); }
      if (e.key === 'ArrowLeft') { ultimoHover = Date.now(); selecionar(ativo - 1); }
      if (e.key === 'Enter' && (e.target === document.body || e.target.closest('[data-tile]'))) { e.preventDefault(); abrirDetalhe(ativo); }
    });

    var hero = $('hero'), brilho = $('brilho');
    window.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      mouse = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
      if (e.clientY - r.top < r.height) {
        brilho.style.background = 'radial-gradient(520px circle at ' + (e.clientX - r.left) + 'px ' + (e.clientY - r.top) + 'px, rgba(61,123,255,.16), transparent 60%)';
      }
    }, { passive: true });
    var tx = 0, ty = 0;
    hero.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) { ultimoHover = Date.now(); selecionar(ativo + (dx < 0 ? 1 : -1)); }
    }, { passive: true });

    setInterval(function () {
      if (aberto === null && !video && !document.hidden && Date.now() - ultimoHover > 9000) selecionar(ativo + 1);
    }, 7000);

    window.matchMedia('(max-width: 760px)').addEventListener('change', pintarHero);
    FAS.aoTrocarIdioma(function () {
      pintarHero(); pintarSecoes(); pintarNews();
      if (aberto !== null) abrirDetalhe(aberto);
    });
  });
})();
