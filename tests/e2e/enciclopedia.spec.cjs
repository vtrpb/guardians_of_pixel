const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
});
test('Descobrir, reler sem efeitos, idiomas e celular',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.locator('#botao-enciclopedia').click();
 await expect(page.locator('.enciclopedia-contagem')).toContainText('0 de 45');
 await expect(page.locator('.enciclopedia-registro button')).toHaveCount(0);
 expect(await page.locator('#conteudo-menu').innerText()).not.toContain('PRIMEIRA HORA');
 await page.evaluate(()=>{abrirRegistroDaEnciclopedia('observatorio-origem');});
 await expect(page.locator('.enciclopedia-leitura')).toHaveCount(0);
 await page.evaluate(()=>{fecharConteudoMenu();mostrarTransmissaoProjetoRelogio();ocultarCutsceneDaCarta();wave=15;mostrarRegistroDoPontoZero('fusao');ocultarCutsceneDaCarta();});
 await page.locator('#botao-enciclopedia').click();
 await expect(page.locator('.enciclopedia-contagem')).toContainText('2 de 45');
 const antes=await page.evaluate(()=>capturarDadosDoSalvoAtivo());
 await page.locator('[data-registro="radio-projeto"]').click();
 await expect(page.locator('.enciclopedia-texto')).toContainText('Consciência temporal');
 expect(await page.evaluate(()=>capturarDadosDoSalvoAtivo())).toEqual(antes);
 for(const idioma of ['en','es','pt-BR']){
  await page.evaluate(id=>selecionarIdioma(id),idioma);
  await expect(page.locator('.enciclopedia-leitura')).toBeVisible();
  expect(await page.locator('.enciclopedia-texto').innerText()).toBe(await page.evaluate(()=>localizar(CONFIG.metropoleNeon.radio.texto)));
 }
 await page.screenshot({path:info.outputPath('leitura-desktop.png')});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:info.outputPath('leitura-celular.png')});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.locator('.enciclopedia-leitura button').click();await expect(page.locator('[data-registro="radio-projeto"]')).toBeFocused();
 await page.screenshot({path:info.outputPath('colecao-celular.png')});
 await page.keyboard.press('Escape');await expect(page.locator('#botao-enciclopedia')).toBeFocused();
 await page.reload();expect(await page.evaluate(()=>carregarRegistrosDaEnciclopedia().size)).toBe(2);
 expect(erros).toEqual([]);
});
test('Migracao conservadora, slots independentes e falha de gravacao',async({page})=>{
 await page.addInitScript(()=>{
  if(sessionStorage.getItem('enc-fixture'))return;sessionStorage.setItem('enc-fixture','1');
  localStorage.setItem('tower-defense-2-progresso-fases-v2','18');
  localStorage.setItem('guardians-of-pixel-carta-misteriosa-v1','true');
  localStorage.setItem('guardians-of-pixel-casa-parada-v1',JSON.stringify({local:'oficina',x:110,y:290,pistas:['foto']}));
 });
 await page.goto('/');
 expect(await page.evaluate(()=>[...carregarRegistrosDaEnciclopedia()].sort())).toEqual(['carta-portal','casa-foto']);
 expect(await page.evaluate(()=>{const salvar=atualizarSalvoAtivo;atualizarSalvoAtivo=()=>false;const ok=guardarRegistrosNaEnciclopedia(['casa-projeto']);atualizarSalvoAtivo=salvar;return {ok,tem:carregarRegistrosDaEnciclopedia().has('casa-projeto')};})).toEqual({ok:false,tem:false});
 await page.evaluate(()=>{modoWavesInfinitas=true;registrarTextoNaEnciclopedia(CONFIG.pontoZero.registros[0].texto);modoWavesInfinitas=false;mapaPersonalizadoAtivo={classico:true};registrarTextoNaEnciclopedia(CONFIG.pontoZero.registros[0].texto);mapaPersonalizadoAtivo=null;});
 expect(await page.evaluate(()=>carregarRegistrosDaEnciclopedia().size)).toBe(2);
 await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(2))]);
 await expect.poll(()=>page.evaluate(()=>carregarRegistrosDaEnciclopedia().size)).toBe(0);
 await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(1))]);
 await expect.poll(()=>page.evaluate(()=>carregarRegistrosDaEnciclopedia().size)).toBe(2);
});
for(const fase of [1,12])test(`Leitura na exploracao e reinicio ${fase} preservam registros`,async({page})=>{
 await page.addInitScript(()=>{
  localStorage.setItem('tower-defense-2-progresso-fases-v2','18');
  for(const k of ['guardians-of-pixel-correcao-progresso-fases-13-14-v1','guardians-of-pixel-capitulo-2-desbloqueado-v1','guardians-of-pixel-capitulo-3-desbloqueado-v1'])localStorage.setItem(k,'true');
  localStorage.setItem('guardians-of-pixel-jornada-limbo-v1',JSON.stringify({fase:'concluido',promessaDeAjuda:true}));
  localStorage.setItem('guardians-of-pixel-floresta-v1',JSON.stringify({versao:3,sala:0,concluido:true}));
 });
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await page.evaluate(()=>{guardarRegistrosNaEnciclopedia(['carta-portal']);iniciarCasaParada();conversarNaFloresta([['VOCÊ',TEXTO_MEMORIA.inscricao],['VOCÊ',FALAS_DESFECHO.origem]]);});
 expect(await page.evaluate(()=>[...carregarRegistrosDaEnciclopedia()].sort())).toEqual(['arquivo-inscricao','carta-portal']);
 await page.locator('#floresta-continuar').click();
 expect(await page.evaluate(()=>carregarRegistrosDaEnciclopedia().has('observatorio-origem'))).toBe(true);
 await page.locator('#floresta-continuar').click();
 await page.evaluate(()=>{Object.assign(estadoFloresta,{x:545,y:306,historiaConcluida:true});interagirNaFloresta();avancarFalaFloresta();});
 await page.locator(fase===1?'#descanso-reiniciar':'#descanso-limbo').click();
 expect(await page.evaluate(()=>faseSelecionada)).toBe(fase);
 expect(await page.evaluate(()=>[...carregarRegistrosDaEnciclopedia()].sort())).toEqual(['arquivo-inscricao','carta-portal','observatorio-origem']);
 expect(await page.evaluate(()=>carregarRegistrosDaEnciclopedia().has('carta-portal'))).toBe(true);
});
