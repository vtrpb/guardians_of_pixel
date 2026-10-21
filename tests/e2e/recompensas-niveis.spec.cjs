const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});
test('Prêmios até 20, migração retroativa, skins reais e ausência de duplicação',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 const antes=await page.evaluate(()=>{
  // Save antigo: quatro prêmios originais já recebidos, agora no nível 20.
  progressaoDeNivel.experienciaTotal=Array.from({length:19},(_,i)=>calcularExperienciaParaProximoNivel(i+1)).reduce((a,b)=>a+b,0);
  progressaoDeNivel.historicoImportado=true;
  progressaoDeNivel.recompensasConcedidas=['skinVanguardaEsmeralda','torreRaiosPorNivel','miraCalibradaPorNivel','longoAlcancePorNivel'];
  salvarProgressaoDeNivel();return fragmentosPixel;
 });
 await page.reload();
 expect(await page.evaluate(()=>fragmentosPixel)).toBe(antes+105);
 expect(await page.evaluate(()=>progressaoDeNivel.recompensasConcedidas.length)).toBe(19);
 expect(await page.evaluate(()=>['torreMarcadora','torrePerfuradora','torreDrones'].every(t=>torreEstaDesbloqueada(t)))).toBe(true);
 expect(await page.evaluate(()=>obterSkinsDoAlbum().filter(s=>['auroraBoreal','guardiaCrepusculo'].includes(s.id)).every(s=>s.desbloqueada))).toBe(true);
 await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.evaluate(()=>mostrarAlbum());
 await page.locator('#aba-album-skins').click();
 await expect(page.locator('.album-cartao-skin').filter({hasText:'Aurora Boreal'})).toContainText('Obtida no nível 8.');
 await expect(page.locator('.album-cartao-skin').filter({hasText:'Guardiã do Crepúsculo'})).toContainText('Obtida no nível 16.');
 await page.locator('#conteudo-menu').screenshot({path:info.outputPath('album-skins-niveis-corrigidos.png')});
 await page.evaluate(()=>mostrarNiveis());
 await expect(page.locator('.nivel-recompensa')).toHaveCount(19);
 expect(await page.locator('.nivel-recompensa small').allTextContents()).toEqual(Array.from({length:19},(_,i)=>`Nível ${i+2}`));
 await page.locator('.nivel-recompensa').filter({hasText:'Skin Aurora Boreal'}).getByRole('button').click();
 expect(await page.evaluate(()=>recompensasPermanentesDasMissoes.skinTorrePadraoEquipada)).toBe('auroraBoreal');
 await page.locator('.nivel-recompensa').filter({hasText:'Skin Guardiã do Crepúsculo'}).getByRole('button').click();
 expect(await page.evaluate(()=>obterSkinEquipadaDaTorrePadrao().coresPorNivel[0].corBase)).toBe('#624187');
 await page.screenshot({path:info.outputPath('niveis-desktop.png')});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:info.outputPath('niveis-celular.png')});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.reload();expect(await page.evaluate(()=>fragmentosPixel)).toBe(antes+105);
 expect(await page.evaluate(()=>recompensasPermanentesDasMissoes.skinTorrePadraoEquipada)).toBe('guardiaCrepusculo');
 await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(2))]);
 expect(await page.evaluate(()=>progressaoDeNivel.recompensasConcedidas)).toEqual([]);
 expect(await page.evaluate(()=>recompensasPermanentesDasMissoes.skinsDesbloqueadas.includes('auroraBoreal'))).toBe(false);
 await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(1))]);
 expect(await page.evaluate(()=>fragmentosPixel)).toBe(antes+105);
 expect(await page.evaluate(()=>progressaoDeNivel.recompensasConcedidas.length)).toBe(19);
 expect(erros).toEqual([]);
});
test('Subidas graduais, compensação e traduções',async({page})=>{
 const retorno=await page.evaluate(()=>{
  progressaoDeNivel={experienciaTotal:0,historicoImportado:true,recompensasConcedidas:[]};
  fragmentosPixel=0;comprasDaLoja.add('torreMarcadora');
  registrarExperiencia(200);const nivel2=fragmentosPixel;
  registrarExperiencia(300);const nivel3=fragmentosPixel;
  registrarExperiencia(4900);const nivel10=fragmentosPixel;
  concederRecompensasDoNivelAtual();return {nivel2,nivel3,nivel10,repetido:fragmentosPixel,nivel:obterDadosDoNivel().nivel};
 });
 expect(retorno).toEqual({nivel2:0,nivel3:5,nivel10:38,repetido:38,nivel:10});
 for(const [idioma,nome,loja] of [['en','Northern Lights Skin','Use Pixel Fragments'],['es','Aspecto Aurora Boreal','Usa Fragmentos de Píxel']]){
  await page.evaluate(i=>{selecionarIdioma(i);mostrarNiveis();},idioma);
  await expect(page.locator('.nivel-recompensa').filter({hasText:nome})).toBeVisible();
  expect(await page.evaluate(()=>localizar('Use Fragmentos de Pixel para comprar equipamentos e consumíveis.'))).toContain(loja);
  expect(await page.evaluate(()=>obterSkinsDoAlbum().filter(s=>['auroraBoreal','guardiaCrepusculo'].includes(s.id)).map(s=>s.origem))).toEqual(
   idioma==='en'?['Earned at level 8.','Earned at level 16.']:['Obtenida en el nivel 8.','Obtenida en el nivel 16.']);
 }
});
