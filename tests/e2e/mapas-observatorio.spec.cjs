const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});
test('Campo de treinamento somente no Clássico, com controles e segredos acessíveis',async({page},info)=>{
 const antes=await page.locator('#menu-principal').evaluate(e=>getComputedStyle(e).backgroundImage);
 await expect(page.locator('.campo-treinamento-classico')).toBeHidden();
 await page.locator('#botao-modo-classico').click();
 await expect(page.locator('.campo-treinamento-classico')).toBeVisible();
 await page.screenshot({path:info.outputPath('treinamento-desktop.png')});
 await page.locator('#botao-capitulos-mapas').click();
 await expect(page.locator('.classico-apresentacao')).toContainText('17 cenários');
 await page.evaluate(()=>{paginaClassica=1;mostrarApresentacaoClassico();});
 await expect(page.locator('.classico-mapa')).toContainText(['Pântano dos Vagalumes','Cânion Vermelho','Jardim dos Cogumelos','Costa da Tempestade','Ruínas Celestes','Jardim de Bambu']);
 await page.evaluate(()=>{paginaClassica=2;mostrarApresentacaoClassico();});
 await expect(page.locator('.classico-mapa').first()).toContainText('Deserto de Sal');
 await page.evaluate(()=>fecharConteudoMenu());
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:info.outputPath('treinamento-celular.png')});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.locator('[data-segredo-lobby="bilhete"]').click();
 await expect(page.locator('#dialogo-segredo-lobby')).toBeVisible();await page.keyboard.press('Escape');
 await page.locator('#botao-modo-classico').click();
 await expect(page.locator('.campo-treinamento-classico')).toBeHidden();
 expect(await page.locator('#menu-principal').evaluate(e=>getComputedStyle(e).backgroundImage)).toBe(antes);
});
for(const numero of [111,112,113])test(`Mapa ${numero}: rota, combate, dificuldades, medalha e retorno`,async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 await page.locator('#botao-modo-classico').click();
 const configuracao=await page.evaluate(numero=>{
  const m=obterMapasClassicos().find(m=>m.numero===numero);
  const waves=Object.keys(CONFIG.classico.dificuldades).map(d=>{
   dificuldadeClassicaSelecionada=d;prepararPartidaClassica(numero);
   return mapaPersonalizadoAtivo.waves.length;
  });
  return {total:obterMapasClassicos().length,livre:mapaClassicoEstaDesbloqueado(m),inicio:m.caminho[0],fim:m.caminho.at(-1),waves,extras:obterDecoracoesExtrasClassicas(m).length};
 },numero);
 expect(configuracao).toMatchObject({total:35,livre:true,waves:[30,30,40],extras:6});
 expect(configuracao.inicio.x).toBe(0);expect(configuracao.fim.x).toBe(1200);
 await page.evaluate(numero=>{
  dificuldadeClassicaSelecionada='normal';prepararPartidaClassica(numero);confirmarSelecaoDeDefesas();definirJogoPausado(true);
  criarInimigo('normal');criarInimigo('boss');
  const m=CONFIG.classico.mapasExclusivos.find(m=>m.numero===numero);
  inimigos[0].x=m.caminho[0].x;inimigos[0].y=m.caminho[0].y;
  desenharCenaPausadaDoTutorial();
 },numero);
 await page.locator('#game').screenshot({path:info.outputPath(`mapa-${numero}.png`)});
 const resultado=await page.evaluate(()=>{
  const antes=inimigos[0].x;moverInimigos(1);const andou=inimigos[0].x>antes;
  const campanha=maiorFaseConcluida;wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();
  return {andou,campanhaIgual:campanha===maiorFaseConcluida,medalha:carregarProgressoClassico().vitorias.includes(mapaPersonalizadoAtivo.numeroClassico+':normal')};
 });
 expect(resultado).toEqual({andou:true,campanhaIgual:true,medalha:true});
 await page.evaluate(()=>voltarAoLobbyDoResultado());
 await expect(page.locator('.campo-treinamento-classico')).toBeVisible();
 await page.reload();expect(await page.evaluate(n=>carregarProgressoClassico().vitorias.includes(n+':normal'),numero)).toBe(true);
 expect(erros).toEqual([]);
});

test('Campo acompanha o bioma e mantém equipamentos, botões e retorno da História',async({page},info)=>{
 await page.locator('#botao-modo-classico').click();
 const cores=[];
 for(const numero of [101,102,103,104,105,106,107,108,109,110,111,112,113]){
  await page.evaluate(n=>selecionarMapaClassico(n),numero);
  await expect(page.locator('.campo-treinamento-classico')).toBeVisible();
  await expect(page.locator('.treino-alvo')).toHaveCount(2);
  await expect(page.locator('.treino-torre')).toHaveCount(2);
  const cor=await page.locator('.treino-arvore').first().evaluate(e=>getComputedStyle(e,'::after').backgroundColor);
  const borda=await page.locator('.icone-jogar').evaluate(e=>getComputedStyle(e).borderTopColor);
  expect(borda).toBe(cor);cores.push(cor);
  if([101,106,104].includes(numero))await page.screenshot({path:info.outputPath(`campo-${numero}.png`)});
 }
 expect(new Set(cores).size).toBeGreaterThanOrEqual(11);
 await page.evaluate(()=>selecionarMapaClassico(101));
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:info.outputPath('campo-rosa-celular.png')});
 await page.locator('.botao-lobby-jogar').click();
 await expect(page.locator('.selecao-defesas-layout')).toBeVisible();
});
