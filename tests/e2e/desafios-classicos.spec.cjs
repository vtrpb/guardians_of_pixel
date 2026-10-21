const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});
test('Painel de desafios permanece clicável e cartões usam a própria altura',async({page})=>{
 await page.setViewportSize({width:1440,height:768});
 await page.evaluate(()=>mostrarApresentacaoClassico());
 await page.locator('[data-mapa="103"] .classico-desafios summary').click();
 const cartoes=await page.evaluate(()=>({
  menor:document.querySelector('[data-mapa="102"]').getBoundingClientRect().height,
  maior:document.querySelector('[data-mapa="103"]').getBoundingClientRect().height
 }));
 expect(cartoes.maior).toBeGreaterThan(cartoes.menor+100);
 await page.evaluate(()=>{prepararPartidaClassica(101);confirmarSelecaoDeDefesas();definirJogoPausado(true);});
 const verificarPainel=()=>page.evaluate(()=>{
  const mapa=document.querySelector('#game').getBoundingClientRect();
  const resumo=document.querySelector('#desafios-classicos-partida summary');
  const area=resumo.getBoundingClientRect();
  return {semSobreposicao:mapa.bottom<=area.top,
   clicavel:resumo.contains(document.elementFromPoint(area.left+80,area.top+area.height/2)),
   cursor:getComputedStyle(resumo).cursor.includes('cursor-pixel-mao.png'),alturaMapa:mapa.height};
 });
 expect(await verificarPainel()).toMatchObject({semSobreposicao:true,clicavel:true,cursor:true});
 await page.locator('#desafios-classicos-partida summary').click();
 await expect(page.locator('#desafios-classicos-partida')).toHaveAttribute('open','');
 expect(await verificarPainel()).toMatchObject({semSobreposicao:true,clicavel:true,cursor:true});
 await page.setViewportSize({width:844,height:390});
 await page.locator('#desafios-classicos-partida summary').scrollIntoViewIfNeeded();
 const horizontal=await verificarPainel();
 expect(horizontal).toMatchObject({semSobreposicao:true,clicavel:true,cursor:true});
 expect(horizontal.alturaMapa).toBeGreaterThan(300);
});
async function iniciar(page){await page.evaluate(()=>{mostrarApresentacaoClassico();prepararPartidaClassica(101);confirmarSelecaoDeDefesas();definirJogoPausado(true);dinheiro=5000;selecionarTipoDeTorre('padrao');});}
test('Construcao real, vitoria, medalhas persistentes e galeria',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));await iniciar(page);
 const b=await page.locator('#game').boundingBox();await page.mouse.click(b.x+350*b.width/1200,b.y+70*b.height/700);
 expect(await page.evaluate(()=>tentativaDesafiosClassicos.torres)).toBe(1);
 await page.locator('#desafios-classicos-partida summary').click();
 await page.screenshot({path:info.outputPath('partida.png')});
 const antes=await page.evaluate(()=>fragmentosPixel);
 await page.evaluate(()=>{wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();finalizarPartidaComVitoria();});
 expect(await page.evaluate(()=>[...carregarMedalhasClassicas()].sort())).toEqual(['101:compacta','101:especialista','101:semNucleos']);
 expect(await page.evaluate(()=>fragmentosPixel)).toBe(antes+5);
 await expect(page.locator('#descricao-resultado')).toContainText('Novas medalhas');
 await page.evaluate(()=>{voltarAoLobbyDoResultado();mostrarApresentacaoClassico();});
 await page.locator('[data-mapa="101"] .classico-desafios summary').click();
 await expect(page.locator('[data-mapa="101"] .medalha-conquistada')).toHaveCount(3);
 await page.screenshot({path:info.outputPath('mapas-desktop.png')});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:info.outputPath('mapas-celular.png')});
 await page.reload();expect(await page.evaluate(()=>carregarMedalhasClassicas().size)).toBe(3);expect(erros).toEqual([]);
});
test('Condicoes acompanham tentativa inteira, reinicio e derrota',async({page})=>{
 await iniciar(page);
 const resultado=await page.evaluate(()=>{
  for(let i=0;i<5;i++)registrarConstrucaoDesafioClassico('padrao');
  const cinco=desafiosValidosNaTentativa().map(d=>d.id);
  registrarConstrucaoDesafioClassico('padrao');
  const seis=desafiosValidosNaTentativa().map(d=>d.id);
  registrarConstrucaoDesafioClassico('canhaoPesado');
  torres=[{tipo:'padrao',nivel:0}];wave=1;definirJogoPausado(false);
  ativarNucleoDeSobrecarga('dano');const falha=tentativaDesafiosClassicos.nucleos;
  localStorage.setItem(CHAVE_NUCLEOS_DE_SOBRECARGA,JSON.stringify({dano:1,velocidade:0,alcance:0}));
  ativarNucleoDeSobrecarga('dano');definirJogoPausado(true);
  const apos=desafiosValidosNaTentativa().length;
  finalizarPartida();const derrota=carregarMedalhasClassicas().size;
  voltarAoLobbyDoResultado();prepararPartidaClassica(101);confirmarSelecaoDeDefesas();definirJogoPausado(true);
  const reinicio={torres:tentativaDesafiosClassicos.torres,nucleos:tentativaDesafiosClassicos.nucleos,tipos:tentativaDesafiosClassicos.tipos.size};
  wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();
  return {cinco,seis,falha,apos,derrota,reinicio,semConstruir:carregarMedalhasClassicas().size};
 });
 expect(resultado).toEqual({cinco:['semNucleos','compacta','especialista'],seis:['semNucleos','especialista'],falha:0,apos:0,derrota:0,reinicio:{torres:0,nucleos:0,tipos:0},semConstruir:0});
});
