// Jogo FALLSTATE (fastudios.com.br/fallstate): ao recarregar uma página interna do jogo (ex.: /fallstate/map), o GitHub Pages
// não acha o arquivo e cai neste 404. Volta para o início do jogo, que abre a tela certa sozinho (sessão salva no navegador).
if (location.pathname.indexOf('/fallstate/') === 0 && location.pathname !== '/fallstate/') location.replace('/fallstate/');
