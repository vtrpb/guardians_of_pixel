const {test,expect}=require('@playwright/test');
test('Cama: bloqueio antes do fim, pensamento e retorno',async({page},info)=>{
 await page.addInitScript(()=>{
  if(sessionStorage.getItem('fixture-descanso'))return;sessionStorage.setItem('fixture-descanso','true');
  localStorage.setItem('tower-defense-2-progresso-fases-v2','18');for(const k of ['guardians-of-pixel-correcao-progresso-fases-13-14-v1','guardians-of-pixel-tutorial-concluido-v1','guardians-of-pixel-capitulo-2-desbloqueado-v1','guardians-of-pixel-capitulo-3-desbloqueado-v1'])localStorage.setItem(k,'true');
  localStorage.setItem('guardians-of-pixel-jornada-limbo-v1',JSON.stringify({fase:'concluido',promessaDeAjuda:true}));
  localStorage.setItem('guardians-of-pixel-floresta-v1',JSON.stringify({versao:3,sala:0,concluido:true}));
 });await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await page.evaluate(()=>{iniciarCasaParada();estadoFloresta.x=545;estadoFloresta.y=306;});
 await page.locator('#floresta-interagir').click();await expect(page.locator('#floresta-fala')).toContainText('Ainda não');await page.locator('#floresta-continuar').click();
 await page.evaluate(()=>{Object.assign(estadoFloresta,{historiaConcluida:true,concluido:true,passagemAberta:true,selosAtivos:3,memoriaRecuperada:true,memoriaConcluida:true,registrosFinais:['origem','retrato','radioFinal'],circuitosFinais:3});});
 await page.locator('#floresta-interagir').click();await page.evaluate(()=>desenharFloresta());await page.screenshot({path:info.outputPath('cama.png')});
 await page.locator('#floresta-continuar').click();await expect(page.locator('#floresta-fala')).toContainText('naquele primeiro encontro');
 await expect(page.locator('#floresta-secreta')).toHaveCSS('background-color','rgb(0, 0, 0)');await expect(page.locator('#floresta-canvas')).toBeHidden();
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:info.outputPath('pensamento.png')});
 await page.locator('#descanso-lobby').click();await expect(page.locator('#floresta-secreta')).toBeHidden();
 expect(await page.evaluate(()=>carregarCasaParada().historiaConcluida)).toBe(true);
});
for(const fase of [1,12])test(`Descanso: replay da fase ${fase} preserva coleção e outros slots`,async({page})=>{
 await page.addInitScript(()=>{
  if(sessionStorage.getItem('fixture-descanso'))return;sessionStorage.setItem('fixture-descanso','true');
  localStorage.setItem('tower-defense-2-progresso-fases-v2','18');for(const k of ['guardians-of-pixel-correcao-progresso-fases-13-14-v1','guardians-of-pixel-tutorial-concluido-v1','guardians-of-pixel-capitulo-2-desbloqueado-v1','guardians-of-pixel-capitulo-3-desbloqueado-v1'])localStorage.setItem(k,'true');
  localStorage.setItem('guardians-of-pixel-jornada-limbo-v1',JSON.stringify({fase:'concluido',promessaDeAjuda:true}));
  localStorage.setItem('guardians-of-pixel-floresta-v1',JSON.stringify({versao:3,sala:0,concluido:true}));
 });await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 const antes=await page.evaluate(()=>{
  iniciarCasaParada();Object.assign(estadoFloresta,{x:545,y:306,historiaConcluida:true});
  interagirNaFloresta();avancarFalaFloresta();
  return {fragmentos:fragmentosPixel,progresso:maiorFaseConcluida,album:localStorage.getItem(CHAVE_FIGURINHAS_DO_ALBUM),outros:sistemaDeSalvos.espacos.filter((_,i)=>i!==sistemaDeSalvos.indiceAtivo)};
 });
 await page.locator(fase===1?'#descanso-reiniciar':'#descanso-limbo').click();
 expect(await page.evaluate(()=>faseSelecionada)).toBe(fase);expect(await page.evaluate(()=>jogoIniciado)).toBe(true);
 expect(await page.evaluate(()=>({fragmentos:fragmentosPixel,progresso:maiorFaseConcluida,album:localStorage.getItem(CHAVE_FIGURINHAS_DO_ALBUM),outros:sistemaDeSalvos.espacos.filter((_,i)=>i!==sistemaDeSalvos.indiceAtivo)}))).toEqual({...antes,progresso:fase===12?12:0});
 expect(await page.evaluate(()=>jornadaDoLimbo===null&&localStorage.getItem(CHAVE_CASA)===null&&localStorage.getItem(CHAVE_FLORESTA)===null&&!cenaFinalIntervaloPerdidoVista)).toBe(true);
 expect(await page.evaluate(()=>Boolean(localStorage.getItem('guardians-of-pixel-historia-antes-do-reinicio-v1')))).toBe(true);
 if(fase===1)expect(await page.evaluate(()=>carregarMaiorFaseConcluida()===0&&!capitulo2Desbloqueado&&!capitulo3Desbloqueado&&!faseEstaDesbloqueada(2))).toBe(true);
 if(fase===12)expect(await page.evaluate(()=>!capitulo3Desbloqueado&&!faseEstaDesbloqueada(13)&&localStorage.getItem(CHAVE_PROGRESSO_FASES)==='12')).toBe(true);
 expect(await page.evaluate(()=>obterProgressoParaEquipamentos())).toBe(18);
});

