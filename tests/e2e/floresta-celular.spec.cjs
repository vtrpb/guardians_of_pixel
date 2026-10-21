const {test,expect}=require('@playwright/test');
test('Atalho único e floresta ampliada no celular',async({page},info)=>{
 await page.setViewportSize({width:390,height:844});
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 await page.addInitScript(()=>{
  localStorage.setItem('tower-defense-2-progresso-fases-v2','18');
  for(const k of ['guardians-of-pixel-correcao-progresso-fases-13-14-v1','guardians-of-pixel-tutorial-concluido-v1'])localStorage.setItem(k,'true');
  localStorage.setItem('guardians-of-pixel-jornada-limbo-v1',JSON.stringify({fase:'concluido',promessaDeAjuda:true}));
 });await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#botao-floresta, #botao-casa-parada')).toHaveCount(0);
 await expect(page.locator('#botao-rever-final18')).toHaveCount(0);await page.evaluate(()=>reverFinalDaFase18());
 for(let i=0;i<8;i++)await page.locator('#botao-continuar-cutscene-carta').click();
 await page.evaluate(()=>{while(dialogoFloresta)avancarFalaFloresta();desenharFloresta();});
 const mapa=await page.locator('#floresta-canvas').boundingBox();expect(mapa.height).toBeGreaterThan(450);
 expect(await page.evaluate(()=>canvasFloresta.width)).toBe(320);
 const controles=await page.locator('#floresta-controles').boundingBox();expect(controles.y+controles.height).toBeLessThanOrEqual(844);
 await page.screenshot({path:info.outputPath('floresta-celular.png')});
 const antes=await page.evaluate(()=>estadoFloresta.x);
 await page.locator('[data-floresta-direcao="direita"]').dispatchEvent('pointerdown',{pointerId:1});
 await page.waitForTimeout(150);await page.locator('[data-floresta-direcao="direita"]').dispatchEvent('pointerup',{pointerId:1});
 // Teclado também continua usando coordenadas do mundo depois do zoom.
 await page.keyboard.down('d');await page.waitForTimeout(150);await page.keyboard.up('d');
 expect(await page.evaluate(()=>estadoFloresta.x)).toBeGreaterThan(antes);
 await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>desenharFloresta());
 expect(await page.evaluate(()=>canvasFloresta.width)).toBe(640);
 await page.evaluate(()=>{estadoFloresta.concluido=true;salvarFloresta();});await page.locator('#floresta-sair').click();
 await expect(page.locator('#botao-rever-final18')).toHaveCount(0);await page.evaluate(()=>reverFinalDaFase18());for(let i=0;i<8;i++)await page.locator('#botao-continuar-cutscene-carta').click();
 await expect(page.locator('#floresta-titulo')).toHaveText('A casa silenciosa');expect(erros).toEqual([]);
});
