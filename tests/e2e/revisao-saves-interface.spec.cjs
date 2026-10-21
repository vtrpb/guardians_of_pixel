const {test,expect}=require('@playwright/test');

test('Reinício não altera campanha quando a gravação do slot falha',async({page})=>{
 await page.addInitScript(()=>{
  localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true');
  localStorage.setItem('tower-defense-2-progresso-fases-v2','18');
  localStorage.setItem('guardians-of-pixel-capitulo-2-desbloqueado-v1','true');
  localStorage.setItem('guardians-of-pixel-capitulo-3-desbloqueado-v1','true');
 });
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await page.evaluate(()=>{jornadaDoLimbo={promessaDeAjuda:false};mostrarConfrontoFinal(true);});
 for(let i=0;i<5;i++)await page.locator('#botao-continuar-cutscene-carta').click();
 const antes=await page.evaluate(()=>localStorage.getItem(CHAVE_SISTEMA_DE_SALVOS));
 await page.evaluate(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k===CHAVE_SISTEMA_DE_SALVOS)throw new DOMException('Sem espaço','QuotaExceededError');return original.call(this,k,v);};});
 await page.locator('#acoes-final-campanha button').nth(1).click();
 await expect(page.locator('#texto-cutscene-carta')).toContainText('Não foi possível salvar');
 expect(await page.evaluate(()=>({memoria:maiorFaseConcluida,gravado:carregarMaiorFaseConcluida(),capitulo:capitulo3Desbloqueado,iniciado:jogoIniciado}))).toEqual({memoria:18,gravado:18,capitulo:true,iniciado:false});
 expect(await page.evaluate(()=>localStorage.getItem(CHAVE_SISTEMA_DE_SALVOS))).toBe(antes);
});

test('Conquistas obtidas não são retiradas ao carregar um recomeço',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-recompensas-missoes-v1',JSON.stringify({skinsDesbloqueadas:[],conquistasDesbloqueadas:['mestreDoArsenal','mestreDoFliperama']})));
 await page.goto('/');
 expect(await page.evaluate(()=>['mestreDoArsenal','mestreDoFliperama'].every(conquistaEstaDesbloqueada))).toBe(true);
});

test('Álbum abre o visual base e as cinco melhorias e traduz seus detalhes',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.evaluate(()=>mostrarAlbum());
 await expect(page.locator('.album-cartao-torre')).toHaveCount(6);
 for(const nivel of [0,1,2,3,4,5]){
  await page.locator('.album-cartao-torre').nth(nivel).click();
  await expect(page.locator('.album-detalhes-painel')).toBeVisible();
  if(nivel)await expect(page.locator('.album-detalhes-painel')).toContainText('dependem das escolhas');
  await page.locator('.album-detalhes-fechar').click();
 }
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>selecionarIdioma('en'));
 await page.locator('.album-cartao-torre').nth(2).click();
 await expect(page.locator('.album-detalhes-painel')).toContainText('depend on your choices');
 await page.screenshot({path:info.outputPath('album-detalhes-celular.png')});expect(erros).toEqual([]);
});
