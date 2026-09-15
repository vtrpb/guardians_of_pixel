const {test,expect}=require('@playwright/test');
async function preparar(page){
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await page.evaluate(()=>{
  iniciarPartida(false);while(cutsceneDaCartaAtiva)concluirCutsceneDaCarta();definirJogoPausado(true);dinheiro=10000;
  const t={tipo:'padrao',nivel:0,x:400,y:300,valorInvestido:150,anguloDaMira:0,ultimoTiro:0};
  atualizarAtributosDaTorreComBonus(t);torres=[t];selecionarTorre(t);desenharCenaPausadaDoTutorial();
 });
}
test('Cinco escolhas independentes, custos, limite, venda e visual',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));await preparar(page);
 await page.locator('#botao-melhorar').click();
 expect(await page.evaluate(()=>torreSelecionada.nivel)).toBe(0);
 await page.locator('#melhoria-dano').click();
 expect(await page.evaluate(()=>{const t=torreSelecionada;return [t.dano,t.alcance,t.velocidadeAtaque,dinheiro];})).toEqual([15,150,500,9900]);
 await page.locator('#melhoria-alcance').click();
 expect(await page.evaluate(()=>{const t=torreSelecionada;return [t.dano,t.alcance,t.velocidadeAtaque,dinheiro];})).toEqual([15,173,500,9700]);
 await page.locator('#melhoria-velocidade').click();
 expect(await page.evaluate(()=>torreSelecionada.velocidadeAtaque)).toBe(417);
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:info.outputPath('escolhas-celular.png')});
 await page.locator('#melhoria-dano').click();await page.locator('#melhoria-dano').click();
 await expect(page.locator('#melhoria-dano')).toBeDisabled();
 expect(await page.evaluate(()=>{
  const antes=dinheiro;melhorarTorreSelecionada('dano');desenharCenaPausadaDoTutorial();
  return {total:obterTotalDeMelhorias(torreSelecionada),dinheiro,antes,investido:torreSelecionada.valorInvestido,maximas:contarTorresMaximasParaMissoes()};
 })).toEqual({total:5,dinheiro:6700,antes:6700,investido:3450,maximas:1});
 await page.locator('#botao-vender').click();
 expect(await page.evaluate(()=>dinheiro)).toBe(8770);
 expect(erros).toEqual([]);
});
test('Renda por tiro, falta de dinheiro, torres especiais e Álbum',async({page})=>{
 await preparar(page);
 expect(await page.evaluate(()=>{
  criarInimigo('normal');Object.assign(inimigos.at(-1),{x:410,y:300});
  const antes=dinheiro;atacarComTorres(Date.now());return dinheiro-antes;
 })).toBe(20);
 await page.locator('#botao-melhorar').click();
 await page.evaluate(()=>{dinheiro=0;atualizarBotoesDaTorre();});
 await expect(page.locator('#melhoria-dano')).toBeDisabled();
 expect(await page.evaluate(()=>{melhorarTorreSelecionada('dano');return torreSelecionada.nivel;})).toBe(0);
 const tipos=await page.evaluate(()=>Object.entries(CONFIG.torre.tipos).filter(([,c])=>configuracaoUsaMelhoriasEscolhidas(c)).map(([t])=>t));
 expect(tipos.length).toBeGreaterThan(8);
 expect(await page.evaluate(tipos=>tipos.every(tipo=>{
  const c=CONFIG.torre.tipos[tipo],t={tipo,nivel:5,melhoriasEscolhidas:{dano:3,velocidade:1,alcance:1}};
  const a=obterConfiguracaoAtualDaTorre(t);return a.dano>c.dano&&a.alcance>c.alcance&&a.velocidadeAtaque<c.velocidadeAtaque&&Boolean(obterEstiloDaTorre(t));
 }),tipos)).toBe(true);
 expect(await page.evaluate(()=>{
  const gerador=Object.values(CONFIG.torre.tipos).find(c=>c.creditosPorWave);
  return !configuracaoUsaMelhoriasEscolhidas(gerador)&&gerador.melhorias.length===3;
 })).toBe(true);
 await page.evaluate(()=>{voltarAoLobby();mostrarAlbum();});
 expect(await page.evaluate(()=>{
  const html=criarCartoesDaTorre('padrao',CONFIG.torre.tipos.padrao);
  return html.includes('5 melhorias')&&!html.includes('data-nivel-torre="1"');
 })).toBe(true);
});
test('Waves especiais 17/18, aviso antecipado e isolamento',async({page})=>{
 await preparar(page);
 expect(await page.evaluate(()=>{
  faseSelecionada=17;wave=8;configurarWaveDoElencoExclusivo();
  const rapidos=filaDeInimigosExclusivos.filter(t=>t==='batedorDeInstantes').length;
  faseSelecionada=18;wave=19;configurarWaveDoElencoExclusivo();
  const quantidades=filaDeInimigosExclusivos.reduce((r,t)=>(r[t]=(r[t]||0)+1,r),{});
  faseSelecionada=16;const isolado=obterWaveEspecialFinal(8)===null;
  faseSelecionada=18;mapaPersonalizadoAtivo={};const editor=obterWaveEspecialFinal(8)===null;mapaPersonalizadoAtivo=null;
  return {rapidos,quantidades,isolado,editor};
 })).toEqual({rapidos:19,quantidades:{batedorDeInstantes:33,couracadoDeAmpulheta:9,tecelaoDeSegundos:7},isolado:true,editor:true});
 expect(await page.evaluate(()=>{
  faseSelecionada=17;wave=7;inimigos=[];inimigosParaCriar=0;proximaWaveEm=0;atualizarWaves();
  return proximaWaveEm>0&&obterWaveEspecialFinal(wave+1).aviso.includes('Investida');
 })).toBe(true);
});

test('Painel sobreposto mantém mapa e cliques estáveis em desktop e celular',async({page},info)=>{
 await preparar(page);
 const medir=()=>page.locator('#game').boundingBox();
 for(const tamanho of [{width:1440,height:900},{width:390,height:844},{width:844,height:390}]) {
  await page.setViewportSize(tamanho);
  await page.evaluate(()=>{document.getElementById('painel-melhorias-escolhidas').hidden=true;selecionarTorre(torres[0]);});
  const antes=await medir();
  await page.locator('#botao-melhorar').click();
  expect(await medir()).toEqual(antes);
  await expect(page.locator('#fechar-melhorias')).toBeVisible();
  await page.screenshot({path:info.outputPath(`painel-${tamanho.width}.png`)});
  await page.locator('#melhoria-dano').click();
  expect(await medir()).toEqual(antes);
  await page.locator('#fechar-melhorias').click();
  expect(await medir()).toEqual(antes);
  await page.locator('#game').click({position:{x:antes.width*400/1200,y:antes.height*300/700}});
  expect(await page.evaluate(()=>torreSelecionada===torres[0])).toBe(true);
 }
});
