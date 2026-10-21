const {test,expect}=require('@playwright/test');

test('Mapas da campanha bloqueados por fase concluida; florestas livres e paginacao',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await page.evaluate(()=>mostrarApresentacaoClassico());
 await expect(page.locator('[data-mapa="101"] button')).toBeEnabled();
 await expect(page.locator('[data-mapa="102"] button')).toBeEnabled();
 await expect(page.locator('[data-mapa="1"] button')).toBeDisabled();
 expect(await page.evaluate(()=>{prepararPartidaClassica(18);return mapaPersonalizadoAtivo;})).toBe(null);
 await page.screenshot({path:info.outputPath('selecao-desktop.png')});
 await page.evaluate(()=>{localStorage.setItem('guardians-of-pixel-progresso-equipamentos-v1','18');maiorFaseConcluida=1;mostrarApresentacaoClassico();});
 await expect(page.locator('[data-mapa="1"] button')).toBeEnabled();
 await page.locator('.classico-seta').last().click();await expect(page.locator('[data-mapa="5"] button')).toBeDisabled();
 await page.locator('.classico-seta').first().click();
 await page.evaluate(()=>{selecionarIdioma('en');mostrarApresentacaoClassico();});
 await expect(page.locator('[data-mapa="101"]')).toContainText('Cherry Blossom Forest');
 await expect(page.locator('[data-mapa="1"]')).toContainText('Available');
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:info.outputPath('selecao-mobile.png')});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(erros).toEqual([]);
});

for(const numero of [101,102])test(`Floresta ${numero}: elenco, chefes, desenhos, construcao e album`,async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await page.evaluate(numero=>{mostrarApresentacaoClassico();prepararPartidaClassica(numero);confirmarSelecaoDeDefesas();definirJogoPausado(true);},numero);
 const dados=await page.evaluate(numero=>{
  const mapa=CONFIG.classico.mapasExclusivos.find(m=>m.numero===numero),tipos=Object.values(mapa.elenco);
  wave=20;inimigos=[];for(const tipo of tipos)criarInimigo(tipo);
  inimigos.forEach((inimigo,i)=>{inimigo.x=340+i*110;inimigo.y=350;});
  desenharCenaPausadaDoTutorial();
  return {tipos,validos:inimigos.every(i=>Number.isFinite(i.vida)&&i.vida>0),boss:tipoEhBoss(mapa.elenco.boss),fila:mapaPersonalizadoAtivo.waves.at(-1).grupos.map(g=>g.tipo)};
 },numero);
 expect(dados.validos&&dados.boss).toBe(true);for(const tipo of dados.tipos)expect(dados.fila).toContain(tipo);
 await page.screenshot({path:info.outputPath('floresta-elenco.png')});
 expect(await page.evaluate(()=>{const tipos=inimigos.map(i=>i.tipo);inimigos.forEach(i=>i.vida=0);moverInimigos(0);return tipos.every(t=>inimigosDerrotadosNoAlbum.has(t));})).toBe(true);
 // Construir com o clique real numa area livre do caminho.
 await page.locator('#botao-torre-padrao').count().then(async n=>{if(n)await page.locator('#botao-torre-padrao').click();else await page.evaluate(()=>selecionarTipoDeTorre('padrao'));});
 const ponto=await page.evaluate(()=>{for(let y=100;y<650;y+=40)for(let x=100;x<1100;x+=40)if(!posicaoEhInvalidaParaCursorDeConstrucao(x,y))return {x,y};});
 const caixa=await page.locator('#game').boundingBox();await page.locator('#game').click({position:{x:ponto.x*caixa.width/1200,y:ponto.y*caixa.height/700}});
 expect(await page.evaluate(()=>torres.length)).toBe(1);
 await page.reload();expect(await page.evaluate(tipos=>tipos.every(t=>inimigosDerrotadosNoAlbum.has(t)),dados.tipos)).toBe(true);
 expect(erros).toEqual([]);
});
