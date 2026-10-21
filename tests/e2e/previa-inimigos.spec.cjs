const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});
test('Campanha: prévia corresponde às waves das 18 fases e duas secretas',async({page})=>{
 const resultados=await page.evaluate(()=>{
  const resultados=[];mapaPersonalizadoAtivo=null;
  for(const fase of [...Array.from({length:18},(_,i)=>i+1),CONFIG.faseSecreta.numeroInterno,CONFIG.intervaloPerdido.numeroInterno]){
   faseSelecionada=fase;wave=0;
   const previa=obterPreviaDosInimigos().filter(i=>!i.invocado).map(i=>i.tipo).sort(),reais=new Set();
   for(let n=0;n<obterUltimaWaveDaFase();n++){
    iniciarProximaWave();
    const quantidade=inimigosParaCriar;
    for(let i=0;i<quantidade;i++){proximoInimigoEm=0;atualizarWaves();reais.add(inimigos.at(-1).tipo);inimigos=[];}
   }
   resultados.push({fase,previa,reais:[...reais].sort()});
  }return resultados;
 });
 for(const r of resultados)expect(r.previa,`fase ${r.fase}`).toEqual(r.reais);
});
test('Clássico: todos os mapas e dificuldades usam as waves reais',async({page})=>{
 const r=await page.evaluate(()=>{
  maiorFaseConcluida=18;capitulo2Desbloqueado=true;capitulo3Desbloqueado=true;
  comprasDaLoja.add('boiaArpoes');
  const resultados=[];
  for(const mapa of obterMapasClassicos())for(const dificuldade of Object.keys(CONFIG.classico.dificuldades)){
   dificuldadeClassicaSelecionada=dificuldade;prepararPartidaClassica(mapa.numero);
   const esperados=[...new Set(mapaPersonalizadoAtivo.waves.flatMap(w=>w.grupos.filter(g=>g.quantidade>0).map(g=>g.tipo)))].sort();
   resultados.push({mapa:mapa.numero,dificuldade,esperados,previa:obterPreviaDosInimigos().filter(i=>!i.invocado).map(i=>i.tipo).sort()});
  }return resultados;
 });
 expect(r.length).toBe(105);for(const x of r)expect(x.previa,`${x.mapa}/${x.dificuldade}`).toEqual(x.esperados);
});
test('Lagoa e mapas do Passado trocam sabotadores por inimigos do cenário',async({page})=>{
 const resultado=await page.evaluate(()=>{
  mapaPersonalizadoAtivo=null;maiorFaseConcluida=18;comprasDaLoja.add('boiaArpoes');
  const historia=[8,10].map(numero=>{
   faseSelecionada=numero;wave=4;iniciarProximaWave();
   return {numero,sabotadores:inimigosSabotadoresParaCriar,
    substituto:numero===8?inimigosRaptorsAncestraisParaCriar:inimigosCobaiasInstaveisParaCriar,
    previa:obterPreviaDosInimigos().map(i=>i.tipo)};
  });
  const classico=[8,10,103].map(numero=>{
   dificuldadeClassicaSelecionada='normal';prepararPartidaClassica(numero);
   return {numero,tipo:mapaPersonalizadoAtivo.waves[4].grupos.find(g=>g.tipo===CONFIG.substitutosDoSabotador[numero])?.tipo,
    quantidade:mapaPersonalizadoAtivo.waves[4].grupos.find(g=>g.tipo===CONFIG.substitutosDoSabotador[numero])?.quantidade,
    temSabotador:mapaPersonalizadoAtivo.waves.some(w=>w.grupos.some(g=>g.tipo==='sabotador')),
    previa:obterPreviaDosInimigos().map(i=>i.tipo)};
  });
  return {historia,classico};
 });
 expect(resultado.historia.map(f=>({numero:f.numero,sabotadores:f.sabotadores}))).toEqual([{numero:8,sabotadores:0},{numero:10,sabotadores:0}]);
 for(const fase of resultado.historia){expect(fase.substituto).toBeGreaterThan(0);expect(fase.previa).not.toContain('sabotador');}
 expect(resultado.classico.map(f=>({numero:f.numero,tipo:f.tipo,quantidade:f.quantidade,temSabotador:f.temSabotador}))).toEqual([
  {numero:8,tipo:'raptorAncestral',quantidade:1,temSabotador:false},
  {numero:10,tipo:'cobaiaInstavel',quantidade:1,temSabotador:false},
  {numero:103,tipo:'peixeAgulha',quantidade:2,temSabotador:false}
 ]);
 for(const fase of resultado.classico){expect(fase.previa).not.toContain('sabotador');expect(fase.previa).toContain(fase.tipo);}
});
test('Retratos, dicas, idiomas e seleção preservam progresso e partida',async({page},info)=>{
 const antes=await page.evaluate(()=>{maiorFaseConcluida=14;faseSelecionada=14;return {wave,dinheiro,album:[...inimigosDerrotadosNoAlbum],save:JSON.stringify(localStorage)};});
 await page.evaluate(()=>abrirSelecaoDeDefesas());await page.locator('#previa-inimigos summary').click();
 await expect(page.locator('[data-previa-inimigo="infiltradorCamuflado"]')).toContainText('detecção');
 const depois=await page.evaluate(()=>({wave,dinheiro,album:[...inimigosDerrotadosNoAlbum],save:JSON.stringify(localStorage)}));expect(depois).toEqual(antes);
 expect(await page.locator('#previa-inimigos canvas').first().evaluate(c=>c.getContext('2d').getImageData(0,0,c.width,c.height).data.some((v,i)=>i%4===3&&v>0))).toBe(true);
 await page.screenshot({path:info.outputPath('previa-desktop.png')});
 for(const [idioma,nome] of [['en','Enemy preview'],['es','Vista previa de enemigos'],['pt-BR','Prévia dos inimigos']]){
  await page.evaluate(id=>{idiomaAtual=id;mostrarSelecaoDeDefesas();},idioma);await expect(page.locator('#previa-inimigos summary')).toContainText(nome);
 }
 await page.setViewportSize({width:390,height:844});await page.locator('#previa-inimigos').scrollIntoViewIfNeeded();
 await page.screenshot({path:info.outputPath('previa-celular.png')});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.locator('#previa-inimigos summary').focus();await page.keyboard.press('Enter');await expect(page.locator('#previa-inimigos')).not.toHaveAttribute('open');
 await page.evaluate(()=>{faseSelecionada=1;abrirSelecaoDeDefesas();});
 await page.locator('#previa-inimigos summary').click();
 await page.locator('[data-tipo-defesa="canhaoPesado"]').click();
 await expect(page.locator('#previa-inimigos')).toHaveAttribute('open');
 await page.locator('.botao-confirmar-selecao-defesas').click();
 expect(await page.evaluate(()=>jogoIniciado)).toBe(true);
});
test('Editor: sem tipos de quantidade zero, reforços indicados e nenhuma descoberta',async({page})=>{
 const dados=await page.evaluate(()=>{
  mapaPersonalizadoAtivo={nome:'Teste',waves:[{grupos:[{tipo:'bossVulcanico',quantidade:1},{tipo:'normal',quantidade:0}]}]};
  return obterPreviaDosInimigos();
 });expect(dados).toEqual([{tipo:'bossVulcanico',invocado:false},{tipo:'fragmentoDeMagma',invocado:true}]);
});
