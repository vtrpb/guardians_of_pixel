const {test,expect}=require('@playwright/test');
test.beforeEach(async ({page}) => {
 await page.addInitScript(() => {
  localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
  localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
 });
});
test('Lobby classico, avisos vermelhos e torres aquaticas compradas e construidas',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();await page.evaluate(()=>fecharConteudoMenu());
 await expect(page.locator('#botao-modo-classico')).not.toContainText('Em breve');
 await page.locator('#botao-modo-classico').click();await expect(page.locator('.classico-mapa')).toHaveCount(0);
 await page.locator('.botao-lobby-jogar').click();await expect(page.locator('#aviso-classico-lobby')).toHaveText('Escolha o mapa primeiro para depois jogar');
 await expect(page.locator('#aviso-classico-lobby')).toHaveCSS('color','rgb(255, 115, 115)');
 await page.locator('#botao-capitulos-mapas').click();await page.locator('[data-mapa="103"] .classico-escolher-mapa').click();
 await expect(page.locator('.classico-mapa')).toHaveCount(0);await expect(page.locator('#aviso-classico-lobby')).toBeHidden();
 await page.locator('.botao-lobby-jogar').click();await expect(page.locator('#aviso-classico-lobby')).toHaveText('Compre ou desbloqueie uma torre aquática');
 await page.screenshot({path:info.outputPath('aviso-aquatica.png')});
 await page.evaluate(()=>{fragmentosPixel=500;mostrarLoja();for(const tipo of ['boiaArpoes','torreTorpedos']){comprarItemDaLoja(tipo);confirmarCompraDaLoja();}fecharConteudoMenu();});
 await page.locator('.botao-lobby-jogar').click();
 expect(await page.evaluate(()=>selecaoDeDefesasEmEdicao.has('boiaArpoes'))).toBe(true);
 await page.evaluate(()=>{selecaoDeDefesasEmEdicao.delete('boiaArpoes');confirmarSelecaoDeDefesas();});
 await expect(page.locator('.selecao-defesas-mensagem')).toContainText('Selecione uma torre aquática');
 await page.evaluate(()=>{selecaoDeDefesasEmEdicao.add('boiaArpoes');selecaoDeDefesasEmEdicao.add('torreTorpedos');confirmarSelecaoDeDefesas();definirJogoPausado(true);dinheiro=5000;atualizarBotoesDeConstrucao();});
 const mapa=page.locator('#game'),caixa=await mapa.boundingBox();
 const clicar=async(x,y)=>mapa.click({position:{x:x*caixa.width/1200,y:y*caixa.height/700}});
 await page.locator('#botao-boia-arpoes').click();await clicar(350,70);expect(await page.evaluate(()=>torres.length)).toBe(0);
 await clicar(350,300);expect(await page.evaluate(()=>torres[0].tipo)).toBe('boiaArpoes');
 await page.evaluate(()=>selecionarTipoDeTorre('padrao'));await clicar(700,320);expect(await page.evaluate(()=>torres.length)).toBe(1);
 await clicar(700,70);expect(await page.evaluate(()=>torres.length)).toBe(2);
 await page.locator('#botao-torre-torpedos').click();await clicar(730,340);expect(await page.evaluate(()=>torres.length)).toBe(3);
 expect(await page.evaluate(()=>{
  const boia=torres[0];selecionarTorre(boia);for(const t of ['dano','velocidade','alcance'])melhorarTorreSelecionada(t);
  criarInimigo('caranguejoCoral');Object.assign(inimigos.at(-1),{x:540,y:320});atacarComTorres(Date.now()+10000);desenharCenaPausadaDoTutorial();
  return {nivel:boia.nivel,disparou:tiros.some(t=>t.tipoDaTorre==='boiaArpoes'),torpedo:tiros.some(t=>t.tipoDaTorre==='torreTorpedos')};
 })).toEqual({nivel:3,disparou:true,torpedo:true});
 await page.screenshot({path:info.outputPath('lagoa-torres.png')});
 await page.reload();expect(await page.evaluate(()=>obterTorresAquaticasDisponiveis().length)).toBe(2);
 expect(await page.evaluate(()=>terrenoPermiteDefesa('boiaArpoes',350,320))).toBe(false);
 expect(erros).toEqual([]);
});

for(const numero of [103,104,105])test(`Novo mapa ${numero}: elenco proprio e save`,async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 const tipos=await page.evaluate(numero=>{
  comprasDaLoja.add('boiaArpoes');mostrarApresentacaoClassico();prepararPartidaClassica(numero);confirmarSelecaoDeDefesas();definirJogoPausado(true);
  wave=20;const mapa=CONFIG.classico.mapasExclusivos.find(m=>m.numero===numero),tipos=Object.values(mapa.elenco);inimigos=[];
  for(const tipo of tipos)criarInimigo(tipo);inimigos.forEach((e,i)=>Object.assign(e,{x:400+i*100,y:350}));desenharCenaPausadaDoTutorial();return tipos;
 },numero);
 await page.screenshot({path:info.outputPath('mapa-elenco.png')});
 expect(await page.evaluate(tipos=>{inimigos.forEach(e=>e.vida=0);moverInimigos(0);return tipos.every(t=>inimigosDerrotadosNoAlbum.has(t));},tipos)).toBe(true);
 expect(erros).toEqual([]);
});
