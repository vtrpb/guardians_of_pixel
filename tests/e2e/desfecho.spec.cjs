const {test,expect}=require('@playwright/test');
test('Desfecho completo: pistas, libertação, fim, save e replay',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 await page.addInitScript(()=>{if(sessionStorage.getItem('final-pronto'))return;sessionStorage.setItem('final-pronto','1');
  localStorage.setItem('tower-defense-2-progresso-fases-v2','18');for(const k of ['guardians-of-pixel-correcao-progresso-fases-13-14-v1','guardians-of-pixel-tutorial-concluido-v1'])localStorage.setItem(k,'true');
  localStorage.setItem('guardians-of-pixel-jornada-limbo-v1',JSON.stringify({fase:'concluido',promessaDeAjuda:true}));
  localStorage.setItem('guardians-of-pixel-floresta-v1',JSON.stringify({versao:3,sala:0,concluido:true}));
  localStorage.setItem('guardians-of-pixel-casa-parada-v1',JSON.stringify({local:'rua',x:820,y:245,concluido:true,pistas:['telefone','foto','projeto','pessoa'],passagemAberta:true,selosAtivos:3,memoriaRecuperada:true,memoriaConcluida:true}));
 });await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await page.evaluate(()=>iniciarCasaParada());
 const antes=await page.evaluate(()=>({fragmentos:fragmentosPixel,fase:maiorFaseConcluida}));
 const falas=()=>page.evaluate(()=>{while(dialogoFloresta)avancarFalaFloresta();});
 async function interagir(id){await page.evaluate(id=>{const o=LUGARES_CASA[estadoFloresta.local].objetos.find(o=>o.id===id);estadoFloresta.x=o.x;estadoFloresta.y=Math.min(340,o.y+o.h/2+15);},id);await page.locator('#floresta-interagir').click();}
 await interagir('observatorio');await expect(page.locator('#floresta-titulo')).toContainText('primeira hora');
 await interagir('devolver');await expect(page.locator('#floresta-fala')).toContainText('registro');await falas();
 for(const id of ['origem','retrato','radioFinal']){await interagir(id);if(id==='radioFinal')await expect(page.locator('#floresta-dialogo .retrato-dialogo')).toBeHidden();await falas();}
 await interagir('cortar');await expect(page.locator('#floresta-fala')).toContainText('arriscar');await falas();
 await interagir('libertar');await expect(page.locator('#floresta-fala')).toContainText('Lina');await falas();
 await page.locator('#floresta-sair').click();await page.reload();await page.locator('#botao-jogar-menu-inicial').click();await page.evaluate(()=>iniciarCasaParada());
 expect(await page.evaluate(()=>estadoFloresta.circuitosFinais)).toBe(1);
 await interagir('cortar');await expect(page.locator('#floresta-falante')).toHaveText('SENHOR DO TEMPO');await falas();
 await page.evaluate(()=>desenharFloresta());await page.screenshot({path:info.outputPath('observatorio.png')});
 await interagir('devolver');await expect(page.locator('#floresta-fala')).toContainText('primeira hora');
 // Interromper o epílogo não conclui a história, mas conserva os circuitos.
 await page.locator('#floresta-sair').click();await page.evaluate(()=>iniciarCasaParada());
 expect(await page.evaluate(()=>estadoFloresta.historiaConcluida)).toBe(false);
 await interagir('devolver');await page.setViewportSize({width:390,height:844});await page.evaluate(()=>desenharFloresta());await page.screenshot({path:info.outputPath('epilogo-celular.png')});
 for(let i=0;i<5;i++)await page.locator('#floresta-continuar').click();await page.evaluate(()=>desenharFloresta());await page.screenshot({path:info.outputPath('fim.png')});
 await falas();expect(await page.evaluate(()=>carregarCasaParada().historiaConcluida)).toBe(true);
 await expect(page.locator('#floresta-objetivo')).toContainText('Descanse em sua cama');
 await interagir('devolver');await falas();expect(await page.evaluate(()=>({fragmentos:fragmentosPixel,fase:maiorFaseConcluida}))).toEqual(antes);
 for(const idioma of ['en','es']){await page.evaluate(id=>{selecionarIdioma(id);atualizarInterfaceFloresta();},idioma);await expect(page.locator('#floresta-objetivo')).toContainText(idioma==='en'?'Rest in your bed':'Descansa en tu cama');}
 expect(erros).toEqual([]);
});
