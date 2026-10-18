// Termos e Privacidade: o texto ja esta no HTML (funciona sem JS). Aqui so o topo,
// o rodape e a escolha do documento quando o link vem com ancora (ex.: privacy.html#pt-termos).
(function () {
  'use strict';
  var TIT = { pt: { terms: 'Termos de Uso', privacy: 'Política de Privacidade' }, en: { terms: 'Terms of Use', privacy: 'Privacy Policy' } };
  var html = document.documentElement;

  function titulo() { document.title = TIT[FAS.lang][html.getAttribute('data-doc')] + ' · Flying Apollo Studios'; }

  function seguirAncora() {
    var id = decodeURIComponent((location.hash || '').slice(1));
    if (!id) return;
    var alvo = document.getElementById(id);
    if (!alvo) return;
    var bloco = alvo.closest('[data-doc-show]');
    if (!bloco) return;
    html.setAttribute('data-doc', bloco.getAttribute('data-doc-show'));
    var l = bloco.getAttribute('data-lang');
    if (l && l !== FAS.lang) FAS.setLang(l);
    titulo();
    requestAnimationFrame(function () { alvo.scrollIntoView(); });
  }

  // Ancora do sumario no idioma atual: troca para a do outro idioma se preciso
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1), alvo = document.getElementById(id);
    if (alvo) { e.preventDefault(); history.replaceState(null, '', '#' + id); seguirAncora(); }
  });

  document.addEventListener('DOMContentLoaded', function () {
    FAS.montarTopo(document.getElementById('topo'), 'legal');
    FAS.montarRodape(document.getElementById('rodape'), true);
    FAS.aplicarTextos();
    titulo();
    seguirAncora();
    window.addEventListener('hashchange', seguirAncora);
    FAS.aoTrocarIdioma(titulo);
  });
})();
