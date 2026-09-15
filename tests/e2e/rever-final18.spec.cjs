const {test,expect}=require('@playwright/test');
test('Atalho do final: acesso, sem recompensas e checkpoint preservado',async({page},info)=>{
 await page.addInitScript(()=>{
  localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true');
  localStorage.setItem('tower-defense-2-progresso-fases-v2','18');
  localStorage.setItem('guardians-of-pixel-correcao-progresso-fases-13-14-v1','true');
 });
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#botao-rever-final18')).toBeVisible();
 await page.screenshot({path:info.outputPath('botao-lobby.png')});
 const antes=await page.evaluate(()=>({fragmentos:fragmentosPixel,progresso:maiorFaseConcluida}));
 await page.locator('#botao-rever-final18').click();
 await expect(page.locator('#titulo-cutscene-carta')).toHaveText('O RELÓGIO SE PARTE');
 for(let i=0;i<4;i++)await page.locator('#botao-continuar-cutscene-carta').click();
 await page.getByRole('button',{name:'Voltar ao menu',exact:true}).click();
 await expect(page.locator('#camada-cutscene-carta')).toBeHidden();
 expect(await page.evaluate(()=>({fragmentos:fragmentosPixel,progresso:maiorFaseConcluida}))).toEqual(antes);
 await page.evaluate(()=>{
  jornadaDoLimbo={fase:'concluido',promessaDeAjuda:true};
  localStorage.setItem(CHAVE_FLORESTA,JSON.stringify({sala:1,x:176,y:112,revelado:true,concluido:false}));
 });
 await page.locator('#botao-rever-final18').click();
 for(let i=0;i<8;i++)await page.locator('#botao-continuar-cutscene-carta').click();
 await expect(page.locator('#floresta-secreta')).toBeVisible();
 expect(await page.evaluate(()=>estadoFloresta.checkpoint)).toBe(1);
 await page.locator('#floresta-sair').click();
 await page.evaluate(()=>{maiorFaseConcluida=17;atualizarBotaoDoFinalDaFase18();});
 await expect(page.locator('#botao-rever-final18')).toBeHidden();
});
