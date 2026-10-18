// Area do Usuario: login/cadastro do jogador, redefinicao de senha e tickets de suporte.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var JOGOS = ['Fallstate: Claim the World', 'Rare Minerals Inc.', 'Shelf & Sell'];
  var PLATS = ['Android', 'iOS', 'PC (Steam)'];
  var CATS = ['bug', 'purchase', 'account', 'other'];
  var PRIOS = ['low', 'med', 'high'];
  var ANEXO_MAX = 10 * 1024 * 1024;

  FAS.textos({
    pt: { tituloPagina: 'Área do Usuário · Flying Apollo Studios', kicker: 'Área do Usuário · Suporte', heroTitle: 'Precisa de ajuda?',
      heroText: 'Entre na sua conta para abrir um ticket com nosso time de suporte e acompanhar o status de cada pedido.',
      step1: 'Entre', step2: 'Abra um ticket', step3: 'Acompanhe', signIn: 'Entrar', signUp: 'Criar conta',
      name: 'Nome', namePh: 'Como podemos te chamar?', password: 'Senha', newPassword: 'Nova senha', forgot: 'Esqueci a senha',
      createAcc: 'Criar conta', enter: 'Entrar', sendLink: 'Enviar link', savePass: 'Salvar nova senha', backToLogin: '← Voltar para o login',
      forgotText: 'Digite o e-mail da sua conta. Se ele estiver cadastrado, enviamos um link para criar uma nova senha.',
      forgotSent: 'Se esse e-mail tiver conta, o link chega em instantes. Confira também o spam.',
      resetText: 'Escolha uma nova senha para sua conta.', resetDone: 'Senha alterada. Entre com a nova senha.',
      resetInvalid: 'Esse link expirou ou já foi usado. Peça um novo em "Esqueci a senha".',
      legalNote: 'Ao continuar, você concorda com os', termsShort: 'Termos', privacyShort: 'Privacidade',
      errLogin: 'Preencha e-mail e senha.', errCred: 'E-mail ou senha incorretos.', errName: 'Diga como podemos te chamar.',
      errEmail: 'Digite um e-mail válido.', errWeak: 'A senha precisa ter pelo menos 8 caracteres.',
      errInUse: 'Esse e-mail já tem conta. Entre ou use "Esqueci a senha".',
      hello: 'Olá', myTickets: 'Meus tickets', logout: 'Sair', newTicket: 'Novo ticket', all: 'Todos', open: 'Aberto', progress: 'Em andamento', resolved: 'Resolvido',
      yourMsg: 'Sua mensagem', timeline: 'Andamento', priority: 'Prioridade', empty: 'Nenhum ticket aqui.', attachOk: 'Print anexado',
      sentTo: 'Seu ticket é enviado ao time de suporte em', game: 'Jogo', platform: 'Plataforma', category: 'Categoria', subject: 'Assunto', subjectPh: 'Resumo do problema',
      describe: 'Descrição', describePh: 'Conte o que aconteceu, quando e o que você esperava.', attach: 'Anexar print (opcional)',
      fillAll: 'Preencha assunto e descrição.', badFile: 'O anexo precisa ser uma imagem (PNG, JPG, WEBP) de até 10 MB.', send: 'Enviar ticket', sending: 'Enviando…',
      sent: 'enviado ao suporte', received: 'Recebido', receivedN: 'Seu ticket chegou ao suporte', inProg: 'Em análise', inProgN: 'Nosso time está investigando',
      done: 'Resolvido', doneN: 'Respondido por e-mail', sessionEnd: 'Sua sessão terminou. Entre de novo.',
      cats: { bug: 'Bug', purchase: 'Compra', account: 'Conta', other: 'Outro' }, prios: { low: 'Baixa', med: 'Média', high: 'Alta' } },
    en: { tituloPagina: 'Player Area · Flying Apollo Studios', kicker: 'Player Area · Support', heroTitle: 'Need a hand?',
      heroText: 'Sign in to open a ticket with our support team and follow the status of every request.',
      step1: 'Sign in', step2: 'Open a ticket', step3: 'Follow up', signIn: 'Sign in', signUp: 'Create account',
      name: 'Name', namePh: 'What should we call you?', password: 'Password', newPassword: 'New password', forgot: 'Forgot password',
      createAcc: 'Create account', enter: 'Sign in', sendLink: 'Send link', savePass: 'Save new password', backToLogin: '← Back to sign in',
      forgotText: 'Enter your account email. If it is registered, we will send you a link to choose a new password.',
      forgotSent: 'If that email has an account, the link will arrive shortly. Check your spam folder too.',
      resetText: 'Choose a new password for your account.', resetDone: 'Password changed. Sign in with the new password.',
      resetInvalid: 'This link has expired or was already used. Request a new one under "Forgot password".',
      legalNote: 'By continuing you agree to the', termsShort: 'Terms', privacyShort: 'Privacy',
      errLogin: 'Enter your email and password.', errCred: 'Wrong email or password.', errName: 'Tell us what to call you.',
      errEmail: 'Enter a valid email.', errWeak: 'Password must be at least 8 characters.',
      errInUse: 'That email already has an account. Sign in or use "Forgot password".',
      hello: 'Hi', myTickets: 'My tickets', logout: 'Sign out', newTicket: 'New ticket', all: 'All', open: 'Open', progress: 'In progress', resolved: 'Resolved',
      yourMsg: 'Your message', timeline: 'Progress', priority: 'Priority', empty: 'No tickets here.', attachOk: 'Screenshot attached',
      sentTo: 'Your ticket goes to the support team at', game: 'Game', platform: 'Platform', category: 'Category', subject: 'Subject', subjectPh: 'Short summary',
      describe: 'Description', describePh: 'Tell us what happened, when, and what you expected.', attach: 'Attach screenshot (optional)',
      fillAll: 'Fill in subject and description.', badFile: 'The attachment must be an image (PNG, JPG, WEBP) up to 10 MB.', send: 'Send ticket', sending: 'Sending…',
      sent: 'sent to support', received: 'Received', receivedN: 'Your ticket reached support', inProg: 'Under review', inProgN: 'Our team is looking into it',
      done: 'Resolved', doneN: 'Answered by email', sessionEnd: 'Your session ended. Please sign in again.',
      cats: { bug: 'Bug', purchase: 'Purchase', account: 'Account', other: 'Other' }, prios: { low: 'Low', med: 'Medium', high: 'High' } }
  });

  var modo = 'login', resetToken = null, token = FAS.sessao.ler('jogador'), usuario = null;
  var tickets = [], filtro = 'all', expandido = null, form = novoForm(), enviando = false;
  function novoForm() { return { cat: 'bug', prio: 'med' }; }

  // ---------- login / cadastro / esqueci / redefinir ----------
  function msg(id, texto) { var el = $(id); el.textContent = texto || ''; el.hidden = !texto; }

  function pintarLogin() {
    var titulos = { login: 'enter', signup: 'createAcc', forgot: 'sendLink', reset: 'savePass' };
    document.querySelectorAll('[data-modo]').forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-modo') === modo)); });
    $('abas').hidden = modo === 'forgot' || modo === 'reset';
    $('campoNome').hidden = modo !== 'signup';
    $('campoEmail').hidden = modo === 'reset';
    $('campoSenha').hidden = modo === 'forgot';
    $('btnEsqueci').hidden = modo !== 'login';
    $('btnVoltar').hidden = !(modo === 'forgot' || modo === 'reset');
    $('rotuloSenha').textContent = FAS.t(modo === 'reset' ? 'newPassword' : 'password');
    $('senha').autocomplete = modo === 'login' ? 'current-password' : 'new-password';
    $('modoTexto').hidden = !(modo === 'forgot' || modo === 'reset');
    $('modoTexto').textContent = modo === 'forgot' ? FAS.t('forgotText') : modo === 'reset' ? FAS.t('resetText') : '';
    $('btnEntrar').textContent = FAS.t(titulos[modo]);
  }
  function irModo(m) { modo = m; msg('erroLogin'); msg('okLogin'); pintarLogin(); }

  function erroApi(r, padrao) {
    if (r.status === 0) return FAS.t('errRede');
    if (r.status === 429) return FAS.t('errMuitas');
    var e = r.dados.erro;
    return FAS.t({ email_invalido: 'errEmail', senha_fraca: 'errWeak', email_em_uso: 'errInUse', token_invalido: 'resetInvalid' }[e] || padrao);
  }

  function enviarLogin(e) {
    e.preventDefault();
    msg('erroLogin'); msg('okLogin');
    var nome = $('nome').value.trim(), email = $('email').value.trim(), senha = $('senha').value;
    var rota, corpo;
    if (modo === 'login') {
      if (!email || !senha) return msg('erroLogin', FAS.t('errLogin'));
      rota = '/auth/login'; corpo = { email: email, senha: senha };
    } else if (modo === 'signup') {
      if (!nome) return msg('erroLogin', FAS.t('errName'));
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return msg('erroLogin', FAS.t('errEmail'));
      if (senha.length < 8) return msg('erroLogin', FAS.t('errWeak'));
      rota = '/auth/signup'; corpo = { nome: nome, email: email, senha: senha };
    } else if (modo === 'forgot') {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return msg('erroLogin', FAS.t('errEmail'));
      rota = '/auth/forgot'; corpo = { email: email, idioma: FAS.lang };
    } else {
      if (senha.length < 8) return msg('erroLogin', FAS.t('errWeak'));
      rota = '/auth/reset'; corpo = { token: resetToken, senha: senha };
    }
    $('btnEntrar').disabled = true;
    FAS.api(rota, { method: 'POST', body: corpo }).then(function (r) {
      $('btnEntrar').disabled = false;
      if (modo === 'forgot') {
        if (r.status === 200) return msg('okLogin', FAS.t('forgotSent'));
        return msg('erroLogin', erroApi(r, 'errRede'));
      }
      if (modo === 'reset') {
        if (r.status === 200) { resetToken = null; $('senha').value = ''; irModo('login'); return msg('okLogin', FAS.t('resetDone')); }
        return msg('erroLogin', erroApi(r, 'resetInvalid'));
      }
      if ((r.status === 200 || r.status === 201) && r.dados.token) {
        token = r.dados.token;
        FAS.sessao.gravar('jogador', token);
        usuario = r.dados.usuario;
        $('senha').value = '';
        return entrar();
      }
      msg('erroLogin', erroApi(r, 'errCred'));
    });
  }

  function sair(motivo) {
    if (token) FAS.api('/auth/logout', { method: 'POST', body: {}, token: token });
    token = null; usuario = null; tickets = [];
    FAS.sessao.apagar('jogador');
    fecharGaveta();
    $('telaTickets').hidden = true;
    $('telaLogin').hidden = false;
    irModo('login');
    if (motivo) msg('erroLogin', motivo);
  }

  function entrar() {
    $('telaLogin').hidden = true;
    $('telaTickets').hidden = false;
    $('nomeUsuario').textContent = usuario ? usuario.nome : '';
    carregarTickets();
  }

  // ---------- tickets ----------
  function carregarTickets() {
    FAS.api('/tickets', { token: token }).then(function (r) {
      if (r.status === 401) return sair(FAS.t('sessionEnd'));
      if (r.status !== 200) { $('listaTickets').innerHTML = '<div class="vazio">' + FAS.esc(FAS.t('errRede')) + '</div>'; return; }
      tickets = r.dados.tickets || [];
      pintarTickets();
    });
  }

  function dataCurta(iso) {
    var d = new Date(String(iso).replace(/([+-]\d{2})(\d{2})$/, '$1:$2'));
    return isNaN(d) ? '' : d.toLocaleDateString(FAS.lang === 'pt' ? 'pt-BR' : 'en-US');
  }

  function pintarTickets() {
    var T = FAS.t, ordem = { open: 0, progress: 1, resolved: 2 };
    $('contadores').innerHTML = ['all', 'open', 'progress', 'resolved'].map(function (k) {
      var n = k === 'all' ? tickets.length : tickets.filter(function (x) { return x.status === k; }).length;
      return '<button type="button" data-filtro="' + k + '" aria-pressed="' + (filtro === k) + '"><span class="rotulo" style="color:rgba(255,255,255,.5)">' +
        FAS.esc(T(k)) + '</span><b>' + n + '</b></button>';
    }).join('');
    var lista = tickets.filter(function (k) { return filtro === 'all' || k.status === filtro; });
    if (!lista.length) { $('listaTickets').innerHTML = '<div class="vazio">' + FAS.esc(T('empty')) + '</div>'; return; }
    $('listaTickets').innerHTML = lista.map(function (k) {
      var nivel = ordem[k.status] || 0, aberto = expandido === k.id;
      var passos = [['received', 'receivedN'], ['inProg', 'inProgN'], ['done', 'doneN']].map(function (p, i) {
        return '<div class="passo' + (i <= nivel ? ' feito' : '') + (i === nivel ? ' atual' : '') + '"><i></i><span><span>' + FAS.esc(T(p[0])) +
          '</span><small>' + (i <= nivel ? FAS.esc(T(p[1])) : '') + '</small></span></div>';
      }).join('');
      return '<div class="ticket"><button type="button" class="ticket-linha" data-ticket="' + FAS.esc(k.id) + '" aria-expanded="' + aberto + '">' +
        '<span style="min-width:0"><span class="ticket-meta"><b>' + FAS.esc(k.id) + '</b><span>' + FAS.esc(k.game) + '</span><span>· ' +
        FAS.esc(T('cats')[k.category] || k.category) + '</span><span>· ' + FAS.esc(dataCurta(k.createdAt)) + '</span></span>' +
        '<span class="ticket-assunto">' + FAS.esc(k.subject) + '</span></span>' +
        '<span class="status ' + FAS.esc(k.status) + '">' + FAS.esc(T(k.status)) + '</span></button>' +
        (aberto ? '<div class="ticket-corpo"><div><span class="rotulo">' + FAS.esc(T('yourMsg')) + '</span><p>' + FAS.esc(k.description) + '</p>' +
          '<small>' + FAS.esc(k.platform) + ' · ' + FAS.esc(T('priority')) + ': ' + FAS.esc(T('prios')[k.priority] || k.priority) +
          (k.hasAttachment ? ' · ' + FAS.esc(T('attachOk')) : '') + '</small></div>' +
          '<div><span class="rotulo">' + FAS.esc(T('timeline')) + '</span>' + passos + '</div></div>' : '') + '</div>';
    }).join('');
  }

  // ---------- gaveta de novo ticket ----------
  function pintarForm() {
    var T = FAS.t;
    $('tCategoria').innerHTML = CATS.map(function (c) {
      return '<button type="button" data-cat="' + c + '" aria-pressed="' + (form.cat === c) + '">' + FAS.esc(T('cats')[c]) + '</button>';
    }).join('');
    $('tPrioridade').innerHTML = PRIOS.map(function (p) {
      return '<button type="button" data-prio="' + p + '" aria-pressed="' + (form.prio === p) + '">' + FAS.esc(T('prios')[p]) + '</button>';
    }).join('');
    var f = $('tArquivo').files[0];
    $('tArquivoNome').textContent = f ? f.name : T('attach');
    $('btnEnviar').textContent = T(enviando ? 'sending' : 'send');
  }
  function abrirGaveta() {
    msg('erroTicket');
    pintarForm();
    $('gaveta').classList.add('aberto');
    $('gavetaFundo').classList.add('aberto');
    setTimeout(function () { $('tJogo').focus(); }, 60);
  }
  function fecharGaveta() {
    $('gaveta').classList.remove('aberto');
    $('gavetaFundo').classList.remove('aberto');
  }

  function enviarTicket(e) {
    e.preventDefault();
    if (enviando) return;
    var assunto = $('tAssunto').value.trim(), desc = $('tDescricao').value.trim(), arq = $('tArquivo').files[0];
    if (!assunto || !desc) return msg('erroTicket', FAS.t('fillAll'));
    if (arq && (arq.size > ANEXO_MAX || !/^image\/(png|jpeg|webp|gif)$/.test(arq.type))) return msg('erroTicket', FAS.t('badFile'));
    msg('erroTicket');
    var fd = new FormData();
    fd.append('jogo', $('tJogo').value);
    fd.append('plataforma', $('tPlataforma').value);
    fd.append('categoria', form.cat);
    fd.append('prioridade', form.prio);
    fd.append('assunto', assunto);
    fd.append('descricao', desc);
    if (arq) fd.append('anexo', arq, arq.name);
    enviando = true; $('btnEnviar').disabled = true; pintarForm();
    FAS.api('/tickets', { method: 'POST', form: fd, token: token, timeout: 90000 }).then(function (r) {
      enviando = false; $('btnEnviar').disabled = false; pintarForm();
      if (r.status === 401) return sair(FAS.t('sessionEnd'));
      if (r.status !== 201) {
        var e = r.dados.erro;
        return msg('erroTicket', r.status === 429 ? FAS.t('errMuitas') : e === 'anexo_invalido' ? FAS.t('badFile') :
          e === 'campo_invalido' ? FAS.t('fillAll') : FAS.t('errRede'));
      }
      var tk = r.dados.ticket;
      tickets.unshift(tk);
      expandido = tk.id; filtro = 'all';
      form = novoForm();
      $('tAssunto').value = ''; $('tDescricao').value = ''; $('tArquivo').value = '';
      fecharGaveta();
      pintarTickets();
      FAS.toast(tk.id + ' ' + FAS.t('sent') + ' · ' + window.FAS_CONFIG.email);
    });
  }

  // ---------- inicio ----------
  document.addEventListener('DOMContentLoaded', function () {
    FAS.montarTopo($('topo'), 'usuario');
    FAS.montarRodape($('rodape'));
    $('emailSuporte').textContent = window.FAS_CONFIG.email;
    $('tJogo').innerHTML = JOGOS.map(function (j) { return '<option>' + FAS.esc(j) + '</option>'; }).join('');
    $('tPlataforma').innerHTML = PLATS.map(function (p) { return '<option>' + FAS.esc(p) + '</option>'; }).join('');

    try {
      var u = new URL(location.href), rt = u.searchParams.get('reset');
      if (rt) {
        resetToken = rt; modo = 'reset';
        u.searchParams.delete('reset');
        history.replaceState(null, '', u.pathname + u.search + u.hash);   // tira o token da barra e do historico
      }
    } catch (e) {}

    FAS.aplicarTextos();
    pintarLogin();
    if (token && !resetToken) {
      FAS.api('/auth/me', { token: token }).then(function (r) {
        if (r.status === 200) { usuario = r.dados.usuario; entrar(); }
        else { if (r.status === 401) { FAS.sessao.apagar('jogador'); token = null; } $('telaLogin').hidden = false; if (r.status === 0) msg('erroLogin', FAS.t('errRede')); }
      });
    } else {
      $('telaLogin').hidden = false;
    }

    $('formLogin').addEventListener('submit', enviarLogin);
    $('abas').addEventListener('click', function (e) { var b = e.target.closest('[data-modo]'); if (b) irModo(b.getAttribute('data-modo')); });
    $('btnEsqueci').addEventListener('click', function () { irModo('forgot'); });
    $('btnVoltar').addEventListener('click', function () { resetToken = null; irModo('login'); });
    $('btnSair').addEventListener('click', function () { sair(); });
    $('btnNovo').addEventListener('click', abrirGaveta);
    $('btnFecharGaveta').addEventListener('click', fecharGaveta);
    $('gavetaFundo').addEventListener('click', fecharGaveta);
    $('gaveta').addEventListener('submit', enviarTicket);
    $('gaveta').addEventListener('click', function (e) {
      var c = e.target.closest('[data-cat]'), p = e.target.closest('[data-prio]');
      if (c) { form.cat = c.getAttribute('data-cat'); pintarForm(); }
      if (p) { form.prio = p.getAttribute('data-prio'); pintarForm(); }
    });
    $('tArquivo').addEventListener('change', function () { msg('erroTicket'); pintarForm(); });
    ['tAssunto', 'tDescricao'].forEach(function (id) { $(id).addEventListener('input', function () { msg('erroTicket'); }); });
    $('contadores').addEventListener('click', function (e) { var b = e.target.closest('[data-filtro]'); if (b) { filtro = b.getAttribute('data-filtro'); pintarTickets(); } });
    $('listaTickets').addEventListener('click', function (e) {
      var b = e.target.closest('[data-ticket]');
      if (b) { var id = b.getAttribute('data-ticket'); expandido = expandido === id ? null : id; pintarTickets(); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharGaveta(); });
    FAS.aoTrocarIdioma(function () { pintarLogin(); pintarForm(); if (!$('telaTickets').hidden) pintarTickets(); });
  });
})();
