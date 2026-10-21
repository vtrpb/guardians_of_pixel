const {test,expect}=require('@playwright/test');
test.beforeEach(async ({page}) => {
 await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
});
test('Classico: mapas livres, musica exclusiva, combate e progresso separado',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));await page.goto('/');
 await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();await page.evaluate(()=>fecharConteudoMenu());await page.locator('#botao-modo-classico').click();
 await expect(page.locator('.classico-mapa')).toHaveCount(0);
 await page.locator('#botao-capitulos-mapas').click();
 await expect(page.locator('.classico-mapa')).toHaveCount(6);
 await expect(page.locator('#botao-capitulos-mapas strong')).toHaveText('Mapas');
 await expect(page.locator('.botao-lobby-apoiador')).toBeHidden();
 expect(await page.evaluate(()=>obterConfiguracaoDaMusicaDoLobby()===CONFIG.audio.musicaDoLobby)).toBe(true);
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:info.outputPath('mapas-celular.png')});
 await page.setViewportSize({width:1440,height:1000});
 await page.locator('.classico-mapa button').first().click();
 await page.locator('.botao-lobby-jogar').click();
 await page.evaluate(()=>confirmarSelecaoDeDefesas());
 await expect(page.locator('#camada-cutscene-carta')).toBeHidden();
 const antes=await page.evaluate(()=>{definirJogoPausado(true);return {fase:maiorFaseConcluida,fragmentos:fragmentosPixel,xp:progressaoDeNivel.experienciaTotal};});
 expect(await page.evaluate(()=>{mapaPersonalizadoAtivo.modificadorClassico='ventania';const sorteio=Math.random;Math.random=()=>1;try{criarInimigo('normal');}finally{Math.random=sorteio;}desenharCenaPausadaDoTutorial();return {vida:inimigos.at(-1).vida,esperada:CONFIG.inimigo.normal.vida,waves:obterUltimaWaveDaFase(),caminhos:obterCaminhosAtuais().length};})).toMatchObject({vida:100,esperada:100,waves:30});
 await page.screenshot({path:info.outputPath('partida.png')});
 await page.evaluate(()=>{wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();finalizarPartidaComVitoria();});
 await expect(page.locator('#camada-resultado')).toBeVisible();
 expect(await page.evaluate(()=>({fase:maiorFaseConcluida,fragmentos:fragmentosPixel,xp:progressaoDeNivel.experienciaTotal}))).toEqual({fase:antes.fase,fragmentos:antes.fragmentos+5,xp:antes.xp+80});
 await page.evaluate(()=>voltarAoLobbyDoResultado());await expect(page.locator('.classico-mapa')).toHaveCount(0);
 await page.evaluate(()=>alternarModoClassico());await expect(page.locator('#botao-capitulos-mapas strong')).toHaveText('Capítulos');
 await expect(page.locator('.botao-lobby-apoiador')).toBeVisible();
 expect(await page.evaluate(()=>obterConfiguracaoDaMusicaDoLobby()===CONFIG.audio.musicaAnteriorDoLobby)).toBe(true);
 await page.reload();expect(await page.evaluate(()=>carregarProgressoClassico().vitorias)).toEqual(['101:normal']);
 expect(erros).toEqual([]);
});

test('Classico: modos novos aplicam custo, limite, inimigos Iron e preservam vitórias antigas',async({page})=>{
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.evaluate(()=>{
  localStorage.setItem(CHAVE_PROGRESSO_CLASSICO,JSON.stringify({vitorias:['101:facil','101:medio','101:dificil']}));
  mostrarApresentacaoClassico();
 });
 await expect(page.locator('.classico-dificuldades .botao')).toHaveCount(3);
 await expect(page.locator('.classico-dificuldades')).toContainText('Iron / Sobrevivência');
 const resultado=await page.evaluate(()=>{
  const legado=carregarProgressoClassico().vitorias;
  dificuldadeClassicaSelecionada='normal';prepararPartidaClassica(101);
  const normal={ondas:mapaPersonalizadoAtivo.waves.length,limite:mapaPersonalizadoAtivo.limiteDeTorres,exclusivos:mapaPersonalizadoAtivo.waves.some(w=>w.grupos.some(g=>g.tipo.startsWith('ironMapa')))};
  dificuldadeClassicaSelecionada='escasso';prepararPartidaClassica(101);
  mapaPersonalizadoAtivo.modificadorClassico='ventania';
  const escasso={ondas:mapaPersonalizadoAtivo.waves.length,limite:obterLimiteDeTorres(),custo:obterCustoAtualDaPartida(100)};
  mapaPersonalizadoAtivo.modificadorClassico='inflacao';escasso.custoComInflacao=obterCustoAtualDaPartida(100);
  dificuldadeClassicaSelecionada='iron';prepararPartidaClassica(101);
  mapaPersonalizadoAtivo.modificadorClassico='ventania';confirmarSelecaoDeDefesas();definirJogoPausado(true);
  wave=10;const sorteio=Math.random;Math.random=()=>1;try{criarInimigo('ironMapa101');}finally{Math.random=sorteio;}
  const iron={ondas:mapaPersonalizadoAtivo.waves.length,limite:obterLimiteDeTorres(),
   exclusivoNaSexta:mapaPersonalizadoAtivo.waves[5].grupos.some(g=>g.tipo==='ironMapa101'&&g.quantidade===1),
   exclusivoNaDecima:mapaPersonalizadoAtivo.waves[9].grupos.some(g=>g.tipo==='ironMapa101'&&g.quantidade===2),
   vida:inimigos.map(i=>i.vida),velocidade:inimigos.map(i=>i.velocidade)};
  inimigos.forEach(inimigo=>{inimigo.vida=0;});moverInimigos(0);
  iron.album=inimigosDerrotadosNoAlbum.has('ironMapa101');
  return {legado,normal,escasso,iron};
 });
 expect(resultado).toEqual({legado:['101:facil','101:medio','101:dificil'],
  normal:{ondas:30,limite:12,exclusivos:false},
  escasso:{ondas:30,limite:8,custo:115,custoComInflacao:129},
   iron:{ondas:40,limite:12,exclusivoNaSexta:true,exclusivoNaDecima:true,vida:[450*1.08],velocidade:[1.35*1.15],album:true}});
});

test('Classico: cada mapa Iron convoca somente seu inimigo exclusivo',async({page})=>{
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 const resultado=await page.evaluate(()=>{
  maiorFaseConcluida=18;comprasDaLoja.add('boiaArpoes');dificuldadeClassicaSelecionada='iron';
  const mapas=obterMapasClassicos(),nomes=new Set(),falhas=[];
  for(const mapa of mapas){
   prepararPartidaClassica(mapa.numero);
   const tipo=`ironMapa${mapa.numero}`,config=CONFIG.inimigo[tipo];
   if(!config||config.numeroDoMapaIron!==mapa.numero||!config.visualClassico)falhas.push(`${mapa.numero}: configuração`);
   nomes.add(config?.nome);
   const ondas=mapaPersonalizadoAtivo.waves;
   for(let i=0;i<ondas.length;i++){
    const exclusivos=ondas[i].grupos.filter(g=>g.tipo.startsWith('ironMapa')||['perseguidorDeFerro','bastiaoDeFerro'].includes(g.tipo));
    const quantidade=i>=5?Math.floor((i+1)/5):0;
    if(exclusivos.length!==(quantidade?1:0)||quantidade&&
      (exclusivos[0].tipo!==tipo||exclusivos[0].quantidade!==quantidade))falhas.push(`${mapa.numero}: wave ${i+1}`);
   }
  }
  return {mapas:mapas.length,nomes:nomes.size,falhas};
 });
 expect(resultado).toEqual({mapas:35,nomes:35,falhas:[]});
});

test('Classico: contratos temáticos concedem selos separados das medalhas',async({page})=>{
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 const resultado=await page.evaluate(()=>{
  maiorFaseConcluida=18;comprasDaLoja.add('boiaArpoes');dificuldadeClassicaSelecionada='normal';
  const jogar=(numero,construir)=>{
   prepararPartidaClassica(numero);confirmarSelecaoDeDefesas();definirJogoPausado(true);
   construir();wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();
   const estado={selo:carregarSelosClassicos().has(numero),resultado:descricaoResultado.textContent};
   voltarAoLobbyDoResultado();return estado;
  };
  const falha101=jogar(101,()=>{registrarConstrucaoDesafioClassico('padrao');registrarConstrucaoDesafioClassico('minaCorrosiva');});
  const sucesso101=jogar(101,()=>registrarConstrucaoDesafioClassico('padrao'));
   const falha103=jogar(103,()=>registrarConstrucaoDesafioClassico('padrao'));
   contratoDaMareClassicaAtivo=true;
   const semMare=jogar(103,()=>registrarConstrucaoDesafioClassico('padrao'));
   const sucesso103=jogar(103,()=>{registrarConstrucaoDesafioClassico('padrao');wave=9;iniciarProximaWave();});
  const sucesso106=jogar(106,()=>{for(const tipo of ['padrao','besta','lancaChamas'])registrarConstrucaoDesafioClassico(tipo);});
  const progresso=carregarProgressoClassico().vitorias.length;
   return {falha101:falha101.selo,sucesso101:sucesso101.selo,falha103:falha103.selo,semMare:semMare.selo,
   sucesso103:sucesso103.selo,sucesso106:sucesso106.selo,selos:[...carregarSelosClassicos()].sort(),progresso};
 });
  expect(resultado).toEqual({falha101:false,sucesso101:true,falha103:false,semMare:false,sucesso103:true,sucesso106:true,selos:[101,103,106],progresso:3});
 await page.evaluate(()=>mostrarApresentacaoClassico());
 await expect(page.locator('.classico-selo-contrato.conquistado')).toHaveCount(3);
 await page.reload();
 expect(await page.evaluate(()=>[...carregarSelosClassicos()].sort())).toEqual([101,103,106]);
});

test('Classico: mutação diária troca vida por velocidade somente nos inimigos não chefes',async({page})=>{
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 const resultado=await page.evaluate(()=>{
  dificuldadeClassicaSelecionada='normal';prepararPartidaClassica(101);mapaPersonalizadoAtivo.modificadorClassico='ventania';
  confirmarSelecaoDeDefesas();definirJogoPausado(true);
   const sorteio=Math.random;let mutado,comum,chefe,segundo;
  try{
    Math.random=()=>.1;criarInimigo('normal');mutado=inimigos.at(-1);
   Math.random=()=>.9;criarInimigo('normal');comum=inimigos.at(-1);
   Math.random=()=>.1;criarInimigo('boss');chefe=inimigos.at(-1);
    segundo=sortearMutacaoClassica('normal');
  }finally{Math.random=sorteio;}
   const diaria=obterMutacaoClassicaDoDia();
   return {tipo:mutado.mutacaoClassica,esperado:diaria.id,vida:mutado.vida,
    vidaEsperada:CONFIG.inimigo.normal.vida*diaria.vida,
    velocidade:mutado.velocidade,velocidadeEsperada:CONFIG.inimigo.normal.velocidade*diaria.velocidade,
    comum:comum.mutacaoClassica,chefe:chefe.mutacaoClassica,segundo:segundo.id,
    hoje:obterMutacaoClassicaDoDia(new Date(2026,9,13)).id,amanha:obterMutacaoClassicaDoDia(new Date(2026,9,14)).id};
 });
  expect(resultado.tipo).toBe(resultado.esperado);
  expect(resultado.vida).toBe(resultado.vidaEsperada);
  expect(resultado.velocidade).toBe(resultado.velocidadeEsperada);
  expect(resultado.comum).toBeNull();expect(resultado.chefe).toBeNull();
  expect(resultado.segundo).toBe(resultado.esperado);
  expect(resultado.hoje).not.toBe(resultado.amanha);
});

test('Clássico: laboratório simula mutação do dia e contrato da maré é opcional',async({page})=>{
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.evaluate(()=>mostrarApresentacaoClassico());
 await page.locator('.classico-abrir-laboratorio').click();
 await expect(page.locator('.laboratorio-classico')).toBeVisible();
 const nome=await page.evaluate(()=>localizar(obterMutacaoClassicaDoDia().nome));
 await expect(page.locator('.laboratorio-leitura h3')).toHaveText(nome);
 await page.locator('[data-amostra="elite"]').click();
 await page.locator('[data-modo-laboratorio="iron"]').click();
 const dados=await page.evaluate(()=>obterDadosDaAmostraClassica('elite','iron'));
 expect(await page.locator('#laboratorio-vidaMutada').innerText()).toBe(Number(dados.vidaMutada.toFixed(2)).toLocaleString('pt-BR'));
 await page.locator('.laboratorio-voltar').click();
 await expect(page.locator('.classico-mapa')).toHaveCount(6);
 await expect(page.locator('[data-mapa="103"] .classico-botao-mare')).toHaveAttribute('aria-pressed','false');
 await page.locator('[data-mapa="103"] .classico-botao-mare').click();
 await expect(page.locator('[data-mapa="103"] .classico-botao-mare')).toHaveAttribute('aria-pressed','true');
 const mare=await page.evaluate(()=>{
  comprasDaLoja.add('boiaArpoes');prepararPartidaClassica(103);
  const ativado=mapaPersonalizadoAtivo.contratoDaMareAtivo;
  confirmarSelecaoDeDefesas();definirJogoPausado(true);
  wave=9;iniciarProximaWave();
  const dez=obterMultiplicadorDaMareClassica();
  const visual=document.querySelector('.palco-jogo').classList.contains('mare-classica-ativa');
  wave=10;iniciarProximaWave();
  return {ativado,dez,visual,onze:obterMultiplicadorDaMareClassica()};
 });
 expect(mare).toEqual({ativado:true,dez:1.25,visual:true,onze:1});
});

test('Classico: Mestre clássico exige Iron em todos os mapas',async({page})=>{
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 const resultado=await page.evaluate(()=>{
  maiorFaseConcluida=18;
  const numeros=obterMapasClassicos().map(m=>m.numero);
  localStorage.setItem(CHAVE_PROGRESSO_CLASSICO,JSON.stringify({vitorias:[
   ...numeros.map(n=>`${n}:dificil`),...numeros.filter(n=>n!==101).map(n=>`${n}:iron`)
  ]}));
  const legadoNaoConcede= !conquistaEstaDesbloqueada('mestreClassico') && !carregarProgressoClassico().vitorias.includes('101:iron');
  dificuldadeClassicaSelecionada='iron';prepararPartidaClassica(101);confirmarSelecaoDeDefesas();
  wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();
  return {legadoNaoConcede,conquista:conquistaEstaDesbloqueada('mestreClassico'),vitoriaIron:carregarProgressoClassico().vitorias.includes('101:iron')};
 });
 expect(resultado).toEqual({legadoNaoConcede:true,conquista:true,vitoriaIron:true});
});

test('Classico: todos os mapas e dificuldades iniciam; premios e conquistas usam mapas distintos',async({page})=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.evaluate(()=>mostrarApresentacaoClassico());
 const resultado=await page.evaluate(()=>{
  maiorFaseConcluida=18; const campanha=maiorFaseConcluida,rotas=[];
  for(const dificuldade of Object.keys(CONFIG.classico.dificuldades))for(const fase of obterMapasClassicos()){
   dificuldadeClassicaSelecionada=dificuldade;prepararPartidaClassica(fase.numero);confirmarSelecaoDeDefesas();definirJogoPausado(true);
   criarInimigo('normal');desenharCenaPausadaDoTutorial();
   rotas.push(obterCaminhosAtuais().every(c=>c.length>1)&&inimigos.every(i=>Number.isFinite(i.vida)&&Number.isFinite(i.velocidade))&&!cutsceneDaCartaAtiva);
   wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();voltarAoLobbyDoResultado();
  }
  return {rotas,progresso:carregarProgressoClassico().vitorias.length,campanhaIgual:campanha===maiorFaseConcluida,
   premios:['iscaBlindada','canhaoBlindado'].every(t=>comprasDaLoja.has(t)),conquistas:['estreiaClassica','exploradorClassico','lendasDoClassico','mestreClassico'].every(conquistaEstaDesbloqueada)};
 });
 const totalDeVitorias=await page.evaluate(()=>obterMapasClassicos().length*Object.keys(CONFIG.classico.dificuldades).length);
 expect(resultado.rotas).toHaveLength(totalDeVitorias);expect(resultado.rotas.every(Boolean)).toBe(true);expect(resultado).toMatchObject({progresso:totalDeVitorias,campanhaIgual:true,premios:true,conquistas:true});expect(erros).toEqual([]);
});

test('Classico: Lendas do Classico exige somente os mapas exclusivos',async({page})=>{
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 const resultado=await page.evaluate(()=>{
  maiorFaseConcluida=18;lobbyClassicoAtivo=true;
  const antes=obterEstadoDaConquista('lendasDoClassico',CONFIG.conquistas.lendasDoClassico);
  for(const numero of CONFIG.classico.mapasDaConquistaLendas){
   const mapa=obterMapasClassicos().find(item=>item.numero===numero);
   prepararPartidaClassica(mapa.numero);confirmarSelecaoDeDefesas();wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();voltarAoLobbyDoResultado();
  }
  const depois=obterEstadoDaConquista('lendasDoClassico',CONFIG.conquistas.lendasDoClassico);
  return {conquista:conquistaEstaDesbloqueada('lendasDoClassico'),campanha:carregarProgressoClassico().vitorias.some(v=>Number(v.split(':')[0])===1),antes:{progresso:antes.progresso,objetivo:antes.objetivo},depois:{progresso:depois.progresso,objetivo:depois.objetivo}};
 });
 expect(resultado).toEqual({conquista:true,campanha:false,antes:{progresso:0,objetivo:8},depois:{progresso:8,objetivo:8}});
});

for (const [dificuldade, total, premio] of [['normal',30,5],['escasso',30,7],['iron',40,10]]) test(`Classico: ${dificuldade} encerra em ${total} waves e derrota sem premio`,async({page})=>{
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 const resultado=await page.evaluate(dificuldade=>{
  dificuldadeClassicaSelecionada=dificuldade;
  mostrarApresentacaoClassico();prepararPartidaClassica(101);confirmarSelecaoDeDefesas();definirJogoPausado(true);
  const antes=fragmentosPixel;finalizarPartida();const derrotaSemPremio=fragmentosPixel===antes;
  voltarAoLobbyDoResultado();prepararPartidaClassica(101);confirmarSelecaoDeDefesas();definirJogoPausado(true);
  // Acelera apenas os cronometros e remove os inimigos; usa a fila e o encerramento reais das waves.
  for(let i=0;i<5000&&!partidaEncerrada;i++){
   proximoInimigoEm=0;proximaWaveEm=1;inimigos=[];atualizarWaves();
  }
  return {derrotaSemPremio,vitoria:partidaVencida,wave,ganho:fragmentosPixel-antes};
 },dificuldade);
 expect(resultado).toEqual({derrotaSemPremio:true,vitoria:true,wave:total,ganho:premio});
});
