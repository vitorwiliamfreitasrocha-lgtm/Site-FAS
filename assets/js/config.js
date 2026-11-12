// Endereco da API do site (servidor HAZ, publicado pelo tailscale funnel).
// Nao e segredo: nenhuma chave fica no site. Se mudar, atualize tambem o
// connect-src da Content-Security-Policy em cada pagina .html.
window.FAS_CONFIG = {
  api: 'https://haz.tail5f7589.ts.net/fas-api',
  // servidor do JOGO (FALLSTATE): a versão web em /fallstate lê daqui ao abrir – trocar aqui não exige gerar o jogo de novo
  jogo: 'https://haz.tail5f7589.ts.net:10000',
  email: 'flyingapollostudios@gmail.com'
};
