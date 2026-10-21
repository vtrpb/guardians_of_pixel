const {test,expect}=require('@playwright/test');
test('Esporos: desbloqueio, seleção, raio e desenhos reais',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');
 const configuracao=await page.evaluate(()=>CONFIG.torre.tipos.torreEsporos);
 expect(configuracao).toMatchObject({faseConcluidaParaDesbloqueio:4,custo:475,dano:42,raioDanoEmArea:60});
 expect(configuracao.melhorias.map(m=>[m.custo,m.dano,m.raioDanoEmArea,m.alcance,m.velocidadeAtaque].join(':')).join('|')).toBe('550:58:65:195:950|725:78:72:207:850|950:105:80:220:750');
 expect(await page.evaluate(()=>{
  maiorFaseConcluida=3;faseSelecionada=5;tipoDeTorreParaConstruir='torreEsporos';atualizarBotoesDeConstrucao();
  return {livre:torreEstaDesbloqueada('torreEsporos'),selecionada:tipoDeTorreParaConstruir,desativado:botaoTorreEsporos.disabled,texto:botaoTorreEsporos.textContent};
 })).toMatchObject({livre:false,selecionada:'padrao',desativado:true,texto:expect.stringContaining('Conclua Fase 4')});
 expect(await page.evaluate(()=>{
  faseSelecionada=4;registrarConclusaoDaFase();faseSelecionada=5;atualizarBotoesDeConstrucao();
  return {fase:maiorFaseConcluida,livre:torreEstaDesbloqueada('torreEsporos'),desativado:botaoTorreEsporos.disabled,texto:botaoTorreEsporos.textContent};
 })).toMatchObject({fase:4,livre:true,desativado:false,texto:expect.stringContaining('(475)')});
 expect(await page.evaluate(()=>{
  faseSelecionada=1;defesasSelecionadasParaPartida.add('torreEsporos');tipoDeTorreParaConstruir='torreEsporos';atualizarBotoesDeConstrucao();
  return {livre:torreEstaDesbloqueada('torreEsporos'),selecionada:tipoDeTorreParaConstruir,desativado:botaoTorreEsporos.disabled};
 })).toEqual({livre:true,selecionada:'torreEsporos',desativado:false});
 expect(await page.evaluate(()=>{
  inimigos=[{tipo:'normal',x:100,y:100,vida:100},{tipo:'normal',x:160,y:100,vida:100},{tipo:'normal',x:161,y:100,vida:100}];explosoesDosExplosivos=[];
  detonarTiroDeEsporos({alvo:inimigos[0],dano:42,raioDanoEmArea:60,duracaoExplosaoEmQuadros:22,corEsporos:'#d98aba'});
  desenharCorpoDaTorre(50,50,CONFIG.torre.tipos.torreEsporos.visualBase);
  desenharOrbeDeEsporos({x:50,y:50,corEsporos:'#d98aba'});desenharNuvemDeEsporos(explosoesDosExplosivos[0],.5,30);
  return {vidas:inimigos.map(i=>i.vida),explosoes:explosoesDosExplosivos.length,tipo:explosoesDosExplosivos[0].tipoVisual};
 })).toEqual({vidas:[58,58,100],explosoes:1,tipo:'esporos'});
});
