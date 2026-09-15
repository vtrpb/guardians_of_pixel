const {test,expect}=require('@playwright/test');
test('Arquivo: save antigo, enigma, lembrança e retorno à rua',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 await page.addInitScript(()=>{
  if(sessionStorage.getItem('arquivo-pronto'))return;sessionStorage.setItem('arquivo-pronto','1');
  localStorage.setItem('tower-defense-2-progresso-fases-v2','18');
  for(const k of ['guardians-of-pixel-correcao-progresso-fases-13-14-v1','guardians-of-pixel-tutorial-concluido-v1'])localStorage.setItem(k,'true');
  localStorage.setItem('guardians-of-pixel-jornada-limbo-v1',JSON.stringify({fase:'concluido',promessaDeAjuda:true}));
  localStorage.setItem('guardians-of-pixel-floresta-v1',JSON.stringify({versao:3,sala:0,concluido:true}));
  localStorage.setItem('guardians-of-pixel-casa-parada-v1',JSON.stringify({local:'oficina',x:110,y:290,concluido:true,pistas:['telefone','foto','projeto','pessoa']}));
 });
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await page.evaluate(()=>iniciarCasaParada());
 const falas=()=>page.evaluate(()=>{while(dialogoFloresta)avancarFalaFloresta();});
 async function interagir(id){await page.evaluate(id=>{const o=LUGARES_CASA[estadoFloresta.local].objetos.find(o=>o.id===id);estadoFloresta.x=o.x;estadoFloresta.y=Math.min(340,o.y+o.h/2+15);},id);await page.locator('#floresta-interagir').click();}
 expect(await page.evaluate(()=>objetosVisiveisCasa().some(o=>o.id==='arquivo'))).toBe(false);
 await interagir('projeto');await expect(page.locator('#floresta-fala')).toContainText('trava');await falas();
 await interagir('arquivo');await expect(page.locator('#floresta-titulo')).toHaveText('O arquivo sem horas');
 await interagir('caderno');await expect(page.locator('#floresta-fala')).toContainText('impede');await falas();
 await interagir('inscricao');await expect(page.locator('#floresta-fala')).toContainText('LUZ');await falas();
 await interagir('seloPonte');await expect(page.locator('#floresta-fala')).toContainText('errada');await falas();
 expect(await page.evaluate(()=>estadoFloresta.selosAtivos)).toBe(0);
 await interagir('seloLuz');await falas();await page.locator('#floresta-sair').click();
 await page.reload();await page.locator('#botao-jogar-menu-inicial').click();await page.evaluate(()=>iniciarCasaParada());
 expect(await page.evaluate(()=>estadoFloresta.selosAtivos)).toBe(1);
 for(const id of ['seloPonte','seloPorta']){await interagir(id);await falas();}
 await page.evaluate(()=>desenharFloresta());await page.screenshot({path:info.outputPath('arquivo-aberto.png')});
 await interagir('caderno');await expect(page.locator('#floresta-fala')).toContainText('madeira');
 await expect(page.locator('#floresta-dialogo .retrato-dialogo')).toBeHidden();
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>desenharFloresta());await page.screenshot({path:info.outputPath('lembranca-celular.png')});
 await falas();expect(await page.evaluate(()=>estadoFloresta.memoriaRecuperada)).toBe(true);
 await interagir('oficina');await interagir('rua');await interagir('pessoa');await expect(page.locator('#floresta-fala')).toContainText('primeira hora');await falas();
 expect(await page.evaluate(()=>carregarCasaParada().memoriaConcluida)).toBe(true);
 await expect(page.locator('#floresta-objetivo')).toContainText('observatório');
 for(const idioma of ['en','es']){await page.evaluate(id=>{selecionarIdioma(id);atualizarInterfaceFloresta();},idioma);await expect(page.locator('#floresta-objetivo')).toContainText(idioma==='en'?'observatory':'observatorio');}
 expect(erros).toEqual([]);
});
