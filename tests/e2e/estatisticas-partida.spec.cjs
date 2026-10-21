const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.evaluate(()=>{mostrarApresentacaoClassico();prepararPartidaClassica(101);confirmarSelecaoDeDefesas();definirJogoPausado(true);});
});
test('Dano real limitado à vida, área, queimadura, morte única e resumo na vitória',async({page})=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 const r=await page.evaluate(()=>{
  const novo=vida=>({tipo:'normal',x:100,y:100,vida,vidaMaxima:vida});
  const alvo=novo(100);inimigos=[alvo];
  aplicarDanoAoInimigo(alvo,70,1000,{tipoDaDefesa:'padrao'});
  aplicarDanoAoInimigo(alvo,90,1000,{tipoDaDefesa:'canhaoPesado'});
  aplicarDanoAoInimigo(alvo,90,1000,{tipoDaDefesa:'canhaoPesado'});
  inimigos=[novo(30),novo(50)];
  detonarTiroDeEsporos({alvo:inimigos[0],dano:40,raioDanoEmArea:60,tipoDaTorre:'torreEsporos'},1000);
  const queimado=novo(25);inimigos=[queimado];
  aplicarEfeitoDeQueimadura(queimado,{danoPorIntervalo:15,intervaloEntreDanos:100,duracao:500},1000,null,{tipo:'lancaChamas'});
  atualizarDanoDaQueimaduraNoInimigo(queimado,1300);
  registrarDefesaConstruidaParaConquistas('torreGlacial');torres=[];
  wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();
  return [...estatisticasDaBatalha.defesas.values()];
 });
 expect(r).toEqual([{tipo:'padrao',dano:70,derrotados:0},{tipo:'canhaoPesado',dano:30,derrotados:1},{tipo:'torreEsporos',dano:70,derrotados:1},{tipo:'lancaChamas',dano:25,derrotados:1},{tipo:'torreGlacial',dano:0,derrotados:0}]);
 await expect(page.locator('#estatisticas-resultado')).toContainText('Dano causado: 195');
 await expect(page.locator('#estatisticas-resultado')).toContainText('Inimigos derrotados: 3');
 await page.locator('#estatisticas-resultado').scrollIntoViewIfNeeded();await page.screenshot({path:'artifacts/estatisticas-vitoria-desktop.png'});
 expect(erros).toEqual([]);
});
test('Reduções, retorno do Eco e dano sem origem não distorcem ranking',async({page})=>{
 const r=await page.evaluate(()=>{
  const alvo={tipo:'normal',vida:40,vidaMaxima:40,x:200,y:200};
  aplicarDanoAoInimigo(alvo,0);aplicarDanoAoInimigo(alvo,-10);aplicarDanoAoInimigo(alvo,100);
  const eco={tipo:'ecoTemporal',vida:100,vidaMaxima:100,x:200,y:200,retornosDoEcoRealizados:0,indiceDoPonto:1,indiceDoCaminho:0};
  aplicarDanoAoInimigo(eco,1000,1000,{tipoDaDefesa:'padrao'});
  const primeira={...estatisticasDaBatalha.defesas.get('padrao')};
  const vidaRetornada=eco.vida;
  aplicarDanoAoInimigo(eco,1000,2000,{tipoDaDefesa:'padrao'});
  const blindado={tipo:'normal',vida:100,vidaMaxima:100,x:100,y:100};
  const original=obterReducaoDoEscudoParaInimigo;obterReducaoDoEscudoParaInimigo=()=>.5;
  aplicarDanoAoInimigo(blindado,60,2000,{tipoDaDefesa:'torreBesta'});obterReducaoDoEscudoParaInimigo=original;
  return {primeira,vidaRetornada,final:estatisticasDaBatalha.defesas.get('padrao'),besta:estatisticasDaBatalha.defesas.get('torreBesta'),outras:estatisticasDaBatalha.defesas.get('outras')};
 });
 expect(r.primeira).toEqual({tipo:'padrao',dano:100,derrotados:0});
 expect(r.final).toEqual({tipo:'padrao',dano:100+r.vidaRetornada,derrotados:1});
 expect(r.besta).toEqual({tipo:'torreBesta',dano:30,derrotados:0});
 expect(r.outras).toEqual({tipo:'outras',dano:40,derrotados:1});
});
test('Derrota congela resumo; repetir limpa; vazio e idiomas no celular',async({page})=>{
 await page.evaluate(()=>{aplicarDanoAoInimigo({tipo:'normal',vida:100,vidaMaxima:100},15,1000,{tipoDaDefesa:'padrao'});finalizarPartida();registrarDanoNaBatalha('padrao',999,true);mostrarEstatisticasDaBatalha();});
 await expect(page.locator('#estatisticas-resultado')).toContainText('Dano causado: 15');
 await page.setViewportSize({width:390,height:844});await page.locator('#estatisticas-resultado').scrollIntoViewIfNeeded();await page.screenshot({path:'artifacts/estatisticas-derrota-celular.png'});
 await page.locator('#botao-repetir-resultado').click();
 expect(await page.evaluate(()=>estatisticasDaBatalha.defesas.size)).toBe(0);
 await page.evaluate(()=>{definirJogoPausado(true);idiomaAtual='en';finalizarPartida();});
 await expect(page.locator('#estatisticas-resultado')).toContainText('No damage dealt this attempt.');
 await page.evaluate(()=>{idiomaAtual='es';mostrarEstatisticasDaBatalha();});
 await expect(page.locator('#estatisticas-resultado')).toContainText('Estadísticas de la partida');
 await expect(page.locator('#botao-voltar-lobby-resultado')).toBeEnabled();await page.locator('#botao-voltar-lobby-resultado').click();await expect(page.locator('#camada-resultado')).toBeHidden();
});
test('Dano de projétil mantém origem após vender a torre e explosivo aparece separado',async({page})=>{
 const r=await page.evaluate(()=>{
  const origem={tipo:'padrao',nivel:0,x:350,y:70};
  torres=[origem];registrarDefesaConstruidaParaConquistas('padrao');
  const alvo={tipo:'normal',x:400,y:70,vida:100,vidaMaxima:100};
  tiros=[{x:400,y:70,alvo,dano:20,velocidade:10,tipoDaTorre:'padrao',torreOrigem:origem}];inimigos=[alvo];torres=[];moverTiros(1);
  aplicarDanoEmArea(400,70,50,200,null,1000,'minaTerrestre');
  return [...estatisticasDaBatalha.defesas.values()];
 });expect(r).toEqual([{tipo:'padrao',dano:20,derrotados:0},{tipo:'minaTerrestre',dano:80,derrotados:1}]);
});
