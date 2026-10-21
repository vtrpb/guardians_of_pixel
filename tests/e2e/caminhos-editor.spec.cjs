const {test,expect}=require('@playwright/test');
test('Cinco formatos: previa, compartilhamento, rotas e chegada',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.evaluate(()=>{fecharConteudoMenu();rascunhoDoMapaNoEditor=criarMapaPadraoDoEditor();mostrarFormularioDoEditor(false);});
 const seletor=page.locator('select[onchange*="idDoCaminho"]');
 await expect(seletor.locator('option')).toHaveCount(10);
 for(const id of ['loopBifurcado','caracol','ferradura','ampulheta','muralha']){
  await seletor.selectOption(id);
  await page.locator('#previa-mapa-editor').screenshot({path:info.outputPath(id+'.png')});
  const resultado=await page.evaluate(id=>{
   const mapa={...criarMapaPadraoDoEditor(),nome:'Teste',idDoCaminho:id};
   const importado=importarMapaPeloCodigo(gerarCodigoDoMapaNoEditor(mapa));
   mapaPersonalizadoAtivo=mapa;faseSelecionada=CONFIG.editorDeFases.numeroInterno;
   const caminhos=obterCaminhosAtuais();inimigos=[];proximoIndiceDeEntrada=0;
   criarInimigo('normal');criarInimigo('normal');
   const r={id:importado?.idDoCaminho,rotas:caminhos.length,indices:inimigos.map(e=>e.indiceDoCaminho),
    bloqueios:caminhos.every(c=>estaNoCaminho(c.at(-1).x,c.at(-1).y)),
    bases:inimigos.every(e=>inimigoAtingiuTorreFinal({...e,...obterPosicaoDaTorreFinal(obterCaminhoDoInimigo(e))}))};
   // Percorrer todos os segmentos, inclusive a segunda passagem no cruzamento.
   partidaEncerrada=false;const percurso=inimigos[0];
   for(let alvo=1;alvo<caminhos[0].length-1;alvo++){
    moverInimigos(10000);
    if(percurso.alvo!==alvo+1||partidaEncerrada)throw Error('Caminho interrompido: '+id+' / '+alvo);
   }
   desenharMapa();return r;
  },id);
  expect(resultado).toEqual({id,rotas:id==='loopBifurcado'?2:1,indices:id==='loopBifurcado'?[0,1]:[0,0],bloqueios:true,bases:true});
 }
 expect(erros).toEqual([]);
});
