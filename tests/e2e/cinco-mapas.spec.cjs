const {test,expect}=require('@playwright/test');
const erros=new WeakMap();
test.beforeEach(async({page})=>{
 const lista=[];erros.set(page,lista);page.on('pageerror',e=>lista.push(e.message));
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});
test.afterEach(async({page})=>expect(erros.get(page)).toEqual([]));
test('Catálogo, idiomas, celular e lobby respeitam história reiniciada',async({page},info)=>{
 await page.locator('#botao-modo-classico').click();await page.locator('#botao-capitulos-mapas').click();
 expect(await page.evaluate(()=>({total:obterMapasClassicos().length,livres:obterMapasClassicos().filter(mapaClassicoEstaDesbloqueado).length}))).toEqual({total:35,livres:17});
 await expect(page.locator('.classico-paginas button')).toHaveCount(6);
 await page.locator('[data-mapa="106"] button').first().click();
 await expect(page.locator('#menu-principal')).toHaveClass(/tema-tundraBoreal/);
 expect(await page.evaluate(()=>getComputedStyle(menuPrincipal).getPropertyValue('--chao-claro').trim())).toBe('#b6cfd5');
 await page.screenshot({path:info.outputPath('novos-mapas-lobby.png')});
 await page.locator('#botao-capitulos-mapas').click();await page.getByRole('button',{name:'Próxima página',exact:true}).click();
 for(const numero of [107,108,109,110])await expect(page.locator(`[data-mapa="${numero}"] .classico-escolher-mapa`)).toBeEnabled();
 expect(await page.evaluate(()=>mapaClassicoEstaDesbloqueado(obterMapasClassicos().find(mapa=>mapa.numero===1)))).toBe(false);
 await page.screenshot({path:info.outputPath('novos-mapas-galeria.png')});
 for(const idioma of ['en','es','pt-BR']){
  await page.evaluate(id=>selecionarIdioma(id),idioma);
  expect(await page.locator('[data-mapa="107"] h3').textContent()).toBe(await page.evaluate(()=>localizar('Pântano dos Vagalumes')));
 }
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:info.outputPath('novos-mapas-celular.png'),fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.evaluate(()=>{alternarModoClassico();});expect(await page.evaluate(()=>maiorFaseConcluida)).toBe(0);
});
for(const numero of [106,107,108,109,110])test(`Mapa ${numero}: terreno, combate, vitória e medalha`,async({page},info)=>{
 await page.evaluate(numero=>{mostrarApresentacaoClassico();selecionarMapaClassico(numero);jogarClassico();confirmarSelecaoDeDefesas();definirJogoPausado(true);},numero);
 expect(await page.evaluate(()=>jogoIniciado)).toBe(true);
 const terreno=await page.evaluate(numero=>{
  const mapa=CONFIG.classico.mapasExclusivos.find(m=>m.numero===numero),rota=obterCaminhosAtuais()[0];
  const mascara=obterMascaraDeDecoracoes();let solido=null,livre=null;
  for(let y=95;y<600;y+=18)for(let x=70;x<1130;x+=18){
   if(!solido&&mascara.dados[(y*1200+x)*4+3]===255)solido={x,y};
   if(!livre&&distanciaDosCaminhosClassicos(x,y,[rota])>100&&!posicaoEhInvalidaParaCursorDeConstrucao(x,y))livre={x,y};
  }
  criarInimigo('normal');desenharCenaPausadaDoTutorial();
  return {rotaIgual:JSON.stringify(rota)===JSON.stringify(mapa.caminho),solido,livre,musica:obterPartituraOriginalDaFase()===CONFIG.audio.partiturasClassicas[mapa.numero],bloqueio:solido&&posicaoEhInvalidaParaCursorDeConstrucao(solido.x,solido.y)};
 },numero);
 expect(terreno).toMatchObject({rotaIgual:true,musica:true,bloqueio:true});expect(terreno.livre).not.toBeNull();
 const caixa=await page.locator('#game').boundingBox();
 await page.evaluate(()=>selecionarTipoDeTorre('padrao'));
 for(const p of [terreno.solido,terreno.livre])await page.mouse.click(caixa.x+p.x*caixa.width/1200,caixa.y+p.y*caixa.height/700);
 expect(await page.evaluate(()=>torres.length)).toBe(1);
 await page.evaluate(()=>desenharCenaPausadaDoTutorial());await page.locator('#game').screenshot({path:info.outputPath(`mapa-${numero}.png`)});
 if(numero===110)expect(await page.evaluate(()=>posicaoEhInvalidaParaCursorDeConstrucao(600,660))).toBe(true);
 const resultado=await page.evaluate(()=>{
  const fase=maiorFaseConcluida,fragmentos=fragmentosPixel;
  for(let i=0;i<5000&&!partidaEncerrada;i++){proximoInimigoEm=0;proximaWaveEm=1;inimigos=[];atualizarWaves();}
  return {vitoria:partidaVencida,wave,ganho:fragmentosPixel-fragmentos,faseIgual:maiorFaseConcluida===fase};
 });
 expect(resultado).toEqual({vitoria:true,wave:30,ganho:5,faseIgual:true});
 await page.evaluate(()=>voltarAoLobbyDoResultado());await expect(page.locator('#menu-principal')).toBeVisible();
 await page.reload();expect(await page.evaluate(()=>carregarProgressoClassico().vitorias)).toContain(`${numero}:normal`);
});
