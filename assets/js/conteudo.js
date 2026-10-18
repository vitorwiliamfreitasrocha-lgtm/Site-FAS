// Conteudo publico da Home. Edite aqui: jogos, lojas, videos e bastidores.
// Secao sem conteudo real some sozinha (ex.: Trailers aparece quando algum
// trailer tiver `youtube`; Bastidores aparece quando WIP tiver itens).
(function () {
  'use strict';

  // Link de cada loja por jogo. Botao sem link nao aparece no site.
  // Ex.: play: 'https://play.google.com/store/apps/details?id=com.flyingapollo.raremin'
  var GAMES = [
    { id: 'fallstate', name: 'Fallstate: Claim the World', icon: '/assets/img/games/fallstate-icon.png',
      scene: null, shots: [],
      stores: { play: '', apple: '' },
      pt: { genre: 'Estratégia', tagline: 'Conquiste territórios, erga sua base e reivindique o mundo, um pedaço de cada vez.',
        desc: 'Em Fallstate você começa com uma única base e expande seu domínio pelo mapa. Gerencie recursos, fortaleça suas posições e decida quando avançar. Cada território conquistado muda o equilíbrio do mundo.',
        price: 'Grátis', priceNote: 'Com compras opcionais no app', rating: 'Classificação na loja' },
      en: { genre: 'Strategy', tagline: 'Conquer territory, raise your base and claim the world, one piece at a time.',
        desc: 'In Fallstate you start with a single base and expand your reach across the map. Manage resources, fortify your positions and choose when to push forward. Every territory you take shifts the balance of the world.',
        price: 'Free', priceNote: 'Optional in-app purchases', rating: 'Rating shown on store' } },
    { id: 'rare-minerals', name: 'Rare Minerals Inc.', icon: '/assets/img/games/rare-minerals-icon.png',
      scene: null, shots: [],
      stores: { play: '', apple: '' },
      pt: { genre: 'Idle · Tycoon', tagline: 'Perfure mais fundo, encontre gemas raras e transforme uma mina pequena em um império.',
        desc: 'Comece com uma broca simples e cave camada por camada. Descubra rubis, esmeraldas e safiras, melhore seus equipamentos e automatize a operação até ter a maior mineradora do subsolo.',
        price: 'Grátis', priceNote: 'Com anúncios e compras no app', rating: 'Classificação na loja' },
      en: { genre: 'Idle · Tycoon', tagline: 'Drill deeper, find rare gems and turn a small mine into an empire.',
        desc: 'Start with a simple drill and dig layer by layer. Uncover rubies, emeralds and sapphires, upgrade your gear and automate the operation until you run the biggest mining company underground.',
        price: 'Free', priceNote: 'Ads and in-app purchases', rating: 'Rating shown on store' } },
    { id: 'shelf-and-sell', name: 'Shelf & Sell', icon: '/assets/img/games/shelf-and-sell-icon.png',
      scene: null, shots: [],
      stores: { play: '', apple: '', steam: '' },
      pt: { genre: 'Simulação', tagline: 'Abasteça as prateleiras, defina os preços e faça a lojinha do bairro virar o maior mercado da cidade.',
        desc: 'Gerencie seu próprio mercado: organize prateleiras, escolha produtos, ajuste preços e atenda clientes. Reinvista os lucros para ampliar a loja, contratar funcionários e desbloquear novas seções.',
        price: 'Grátis', priceNote: 'Com compras opcionais no app', rating: 'Classificação na loja' },
      en: { genre: 'Simulation', tagline: 'Stock the shelves, set the prices and turn the corner shop into the biggest market in town.',
        desc: 'Run your own store: arrange shelves, pick products, tune prices and serve customers. Reinvest your profits to expand, hire staff and unlock new sections.',
        price: 'Free', priceNote: 'Optional in-app purchases', rating: 'Rating shown on store' } }
  ];
  // scene: imagem de fundo do hero, ideal 2560x1440 (16:9), JPG/WebP <= 500 KB, assunto nos 60% da direita.
  // shots: ate 3 capturas 16:9 para o modal do jogo, ex.: ['/assets/img/games/rare-1.webp'].

  var STORES = {
    play: { name: 'Google Play', mark: 'G', plat: 'Android', pt: 'Disponível no', en: 'Get it on' },
    apple: { name: 'App Store', mark: 'A', plat: 'iOS', pt: 'Baixar na', en: 'Download on the' },
    steam: { name: 'Steam', mark: 'S', plat: 'PC', pt: 'Disponível na', en: 'Available on' }
  };

  // youtube: so o ID do video (ex.: 'dQw4w9WgXcQ'). cover: capa 16:9 opcional.
  var DEVLOG = { youtube: null, cover: null, label: 'Devlog #07',
    pt: 'Construindo o Bioma Vulcânico', en: 'Building the Volcanic Biome' };
  var TRAILERS = [
    { game: 'Fallstate: Claim the World', kind: 'trailer', youtube: null, cover: null },
    { game: 'Rare Minerals Inc.', kind: 'gameplay', youtube: null, cover: null },
    { game: 'Shelf & Sell', kind: 'preview', youtube: null, cover: null }
  ];

  // Projetos publicos (secao Bastidores). Vazio = secao escondida.
  // Exemplo do design (rascunho, NAO publicado):
  // { game: 'Rare Minerals Inc.', icon: '/assets/img/games/rare-minerals-icon.png',
  //   pt: ['Versão 2.0 · Bioma Vulcânico', 'Beta'], en: ['Version 2.0 · Volcanic Biome', 'Beta'], pct: 82 },
  var WIP = [];

  window.FAS_CONTEUDO = { GAMES: GAMES, STORES: STORES, DEVLOG: DEVLOG, TRAILERS: TRAILERS, WIP: WIP };
})();
