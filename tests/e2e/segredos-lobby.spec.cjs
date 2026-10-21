const {test,expect}=require('@playwright/test');
test.use({hasTouch:true});
test.beforeEach(async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});
test('Três objetos, conclusão persistente, releitura e nenhuma recompensa',async({page})=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 const antes=await page.evaluate(()=>({fragmentos:fragmentosPixel,fase:maiorFaseConcluida,xp:localStorage.getItem(CHAVE_PROGRESSAO_NIVEL)}));
 await page.screenshot({path:'artifacts/segredos-lobby-desktop.png'});
 for(const id of ['bussola','bilhete','cristal','cristal']){
  await page.locator(`[data-segredo-lobby="${id}"]`).click();await expect(page.locator('#dialogo-segredo-lobby')).toBeVisible();
  if(id==='cristal')await expect(page.locator('#conclusao-segredo-lobby')).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.locator(`[data-segredo-lobby="${id}"]`)).toBeFocused();
 }
 expect(await page.evaluate(()=>[...carregarRegistrosDaEnciclopedia()].sort())).toEqual(['lobby-bilhete','lobby-bussola','lobby-cristal','lobby-marcas']);
 expect(await page.evaluate(()=>({fragmentos:fragmentosPixel,fase:maiorFaseConcluida,xp:localStorage.getItem(CHAVE_PROGRESSAO_NIVEL)}))).toEqual(antes);
 await page.reload();await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.locator('[data-segredo-lobby="bussola"]').click();await expect(page.locator('#estado-segredo-lobby')).toContainText('3/3');await page.locator('#ler-segredo-lobby').click();
 await expect(page.locator('.enciclopedia-texto')).toContainText('A agulha aponta');
 await page.evaluate(()=>mostrarEnciclopedia('lobby-marcas'));await expect(page.locator('.enciclopedia-texto')).toContainText('Uma direção');expect(erros).toEqual([]);
});
test('Erro de gravação mantém pista sem marcar descoberta e permite retentativa',async({page})=>{
 await page.evaluate(()=>{window.salvarOriginalSegredo=atualizarSalvoAtivo;atualizarSalvoAtivo=()=>false;});
 await page.locator('[data-segredo-lobby="cristal"]').click();await expect(page.locator('#estado-segredo-lobby')).toContainText('Não foi possível salvar');
 expect(await page.evaluate(()=>carregarRegistrosDaEnciclopedia().size)).toBe(0);
 await expect(page.locator('#ler-segredo-lobby')).toBeHidden();
 await page.evaluate(()=>atualizarSalvoAtivo=window.salvarOriginalSegredo);await page.locator('#salvar-segredo-lobby').click();await expect(page.locator('#estado-segredo-lobby')).toContainText('1/3');
 await expect(page.locator('#salvar-segredo-lobby')).toBeHidden();
});
test('Clássico, toque, idiomas, foco e isolamento entre slots',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(()=>{selecionarIdioma('en');alternarModoClassico();});
 await page.locator('[data-segredo-lobby="bilhete"]').tap();await expect(page.locator('#titulo-segredo-lobby')).toHaveText('Unsigned note');
 await page.screenshot({path:'artifacts/segredo-lobby-celular.png'});
 await page.keyboard.press('Tab');expect(await page.evaluate(()=>document.getElementById('dialogo-segredo-lobby').contains(document.activeElement))).toBe(true);
 await page.keyboard.press('Escape');await page.evaluate(()=>selecionarIdioma('es'));await page.locator('[data-segredo-lobby="cristal"]').click();await expect(page.locator('#texto-segredo-lobby')).toContainText('Dentro del cristal');
 await page.locator('#fechar-segredo-lobby').click();
 await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(2))]);expect(await page.evaluate(()=>carregarRegistrosDaEnciclopedia().size)).toBe(0);
 await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(1))]);expect(await page.evaluate(()=>carregarRegistrosDaEnciclopedia().size)).toBe(2);
});
test('Abertura e partida bloqueiam descoberta por chamada direta',async({page})=>{
 await page.reload();await page.evaluate(()=>examinarSegredoDoLobby('bussola'));expect(await page.evaluate(()=>carregarRegistrosDaEnciclopedia().size)).toBe(0);
 await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.evaluate(()=>{mostrarApresentacaoClassico();prepararPartidaClassica(101);confirmarSelecaoDeDefesas();definirJogoPausado(true);examinarSegredoDoLobby('bussola');});
 await expect(page.locator('#dialogo-segredo-lobby')).toBeHidden();expect(await page.evaluate(()=>carregarRegistrosDaEnciclopedia().size)).toBe(0);
});

test('Objetos discretos separados do cabeçalho e sem cobrir controles',async({page})=>{
 for(const largura of [1440,390]){
  await page.setViewportSize({width:largura,height:900});
  const objetos=page.locator('[data-segredo-lobby]');
  for(const objeto of await objetos.all()){
   await expect(objeto).toHaveCSS('background-color','rgba(0, 0, 0, 0)');await expect(objeto).toHaveCSS('border-top-width','0px');
   expect(await objeto.getAttribute('title')).toBeNull();
   const livre=await objeto.evaluate(el=>{
    const a=el.getBoundingClientRect();
    const controles=[...document.querySelectorAll('#menu-principal button:not([data-segredo-lobby])')];
    return controles.every(b=>{const r=b.getBoundingClientRect();return !r.width||!r.height||a.right<=r.left||a.left>=r.right||a.bottom<=r.top||a.top>=r.bottom;});
   });expect(livre).toBe(true);
  }
  expect(await page.locator('.lobby-topo [data-segredo-lobby]').count()).toBe(0);
  await page.screenshot({path:`artifacts/segredos-escondidos-${largura}.png`});
 }
 await page.locator('#botao-enciclopedia').click();await expect(page.locator('.segredos-lobby')).toBeHidden();
});
