const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>{
  if(sessionStorage.getItem('preparou18'))return;sessionStorage.setItem('preparou18','true');
  localStorage.setItem('tower-defense-2-progresso-fases-v2','17');
  for(const k of ['guardians-of-pixel-capitulo-2-desbloqueado-v1','guardians-of-pixel-capitulo-3-desbloqueado-v1','guardians-of-pixel-correcao-progresso-fases-13-14-v1','guardians-of-pixel-tutorial-concluido-v1'])localStorage.setItem(k,'true');
 });
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
});
test('Fase 18: acesso, combate, habilidades, derrota normal e traduções',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 expect(await page.evaluate(()=>faseEstaDesbloqueada(18))).toBe(true);
 await page.evaluate(()=>{selecionarFase(18);fecharConteudoMenu();iniciarPartida(false);});
 await expect(page.locator('#texto-cutscene-carta')).toContainText('relógio gigantesco');
 await page.keyboard.press('Escape');expect(await page.evaluate(()=>jogoPausado)).toBe(true);
 for(let i=0;i<8;i++)await page.locator('#botao-continuar-cutscene-carta').click();
 expect(await page.evaluate(()=>jogoPausado)).toBe(false);
 const dados=await page.evaluate(()=>{
  definirJogoPausado(true);wave=19;iniciarProximaWave();
  criarInimigo('senhorDoTempo');const boss=inimigos.at(-1);
  torres=[{tipo:'flecha',x:boss.x+20,y:boss.y},{tipo:'flecha',x:boss.x+30,y:boss.y}];
  boss.vida=boss.vidaMaxima*.2;ativarConvocacaoDoInimigo(boss,Date.now());
  return {tipo:obterTipoDeBossDaFase(),fila:filaDeInimigosExclusivos.at(-1),convocacoes:boss.convocacoesRealizadas,reforcos:inimigos.filter(i=>i.tipo==='couracadoDeAmpulheta').length,seladas:torres.every(t=>t.estaseTemporalExpiraEm>Date.now())};
 });
 expect(dados).toEqual({tipo:'senhorDoTempo',fila:'senhorDoTempo',convocacoes:3,reforcos:3,seladas:true});
 await page.evaluate(()=>{torres=[];desenharCenaPausadaDoTutorial();});
 await page.screenshot({path:info.outputPath('mapa18.png')});
 await page.evaluate(()=>finalizarPartida());await expect(page.locator('#camada-resultado')).toBeVisible();
 await expect(page.locator('#camada-cutscene-carta')).toBeHidden();
 expect(await page.evaluate(()=>['en','es'].every(id=>{selecionarIdioma(id);return [...CONFIG.confrontoFinal.introducao,...CONFIG.confrontoFinal.final,...CONFIG.confrontoFinal.ajuda,...CONFIG.confrontoFinal.tragedia].every(e=>localizar(e.texto)!==e.texto);}))).toBe(true);
 expect(erros).toEqual([]);
});
for(const promessa of [false,true])test(`Fase 18: final com promessa ${promessa}, save e retorno`,async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 await page.evaluate(p=>{selecionarFase(18);fecharConteudoMenu();iniciarPartida(false);ocultarCutsceneDaCarta();jornadaDoLimbo={fase:'concluido',sala:'salao',x:320,y:330,desafio:true,promessaDeAjuda:p};salvarJornadaDoLimbo();wave=20;finalizarPartidaComVitoria();},promessa);
 const saldo=await page.evaluate(()=>fragmentosPixel);
 expect(await page.evaluate(()=>conquistaEstaDesbloqueada('esseEOFim')||conquistaEstaDesbloqueada('finalmenteEmCasa'))).toBe(false);
 await page.setViewportSize({width:390,height:844});
 const total=promessa?8:5;
 for(let i=0;i<total;i++) {
  if(i===3||i===total-1)await page.screenshot({path:info.outputPath(`final-${i}.png`)});
  await page.locator('#botao-continuar-cutscene-carta').click();
 }
 expect(await page.evaluate(p=>conquistaEstaDesbloqueada(p?'finalmenteEmCasa':'esseEOFim')&&!conquistaEstaDesbloqueada(p?'esseEOFim':'finalmenteEmCasa'),promessa)).toBe(true);
 if(promessa) await expect(page.locator('#floresta-secreta')).toBeVisible();
 else await expect(page.locator('#acoes-final-campanha')).toHaveAttribute('data-final','tragico');
 await page.evaluate(()=>finalizarPartidaComVitoria());expect(await page.evaluate(()=>fragmentosPixel)).toBe(saldo);
 if(promessa) await page.locator('#floresta-sair').click();
 else await page.getByRole('button',{name:'Voltar ao lobby',exact:true}).click();
 if(!promessa)await expect(page.locator('#camada-cutscene-carta')).toBeHidden();
 await page.reload();
 expect(await page.evaluate(p=>conquistaEstaDesbloqueada(p?'finalmenteEmCasa':'esseEOFim'),promessa)).toBe(true);
 expect(await page.evaluate(()=>({fase:maiorFaseConcluida,promessa:jornadaDoLimbo.promessaDeAjuda}))).toEqual({fase:18,promessa});
 expect(erros).toEqual([]);
});

for(const fase of [1,12])test('Escolhas do final tragico: fase '+fase,async({page},info)=>{
 const equipamentos=await page.evaluate(()=>{maiorFaseConcluida=18;salvarProgressoDasFases();jornadaDoLimbo={promessaDeAjuda:false};mostrarConfrontoFinal(true);return obterTiposDeDefesa().filter(torreEstaDesbloqueada);});
 for(let i=0;i<5;i++)await page.locator('#botao-continuar-cutscene-carta').click();
 await expect(page.locator('#acoes-final-campanha button')).toHaveCount(3);
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:info.outputPath('escolhas-tragico.png')});
 const botao=page.locator('#acoes-final-campanha button').nth(fase===1?0:1);
 await botao.click();
 await expect.poll(()=>page.evaluate(()=>jogoIniciado)).toBe(true);
 expect(await page.evaluate(()=>faseSelecionada)).toBe(fase);
 expect(await page.evaluate(()=>maiorFaseConcluida)).toBe(fase===1?0:12);
 expect(await page.evaluate(()=>conquistaEstaDesbloqueada('esseEOFim'))).toBe(true);
 await expect(page.locator('#acoes-final-campanha')).toHaveCount(0);
 expect(await page.evaluate(()=>obterTiposDeDefesa().filter(torreEstaDesbloqueada))).toEqual(equipamentos);
 await page.reload();
 expect(await page.evaluate(()=>maiorFaseConcluida)).toBe(fase===1?0:12);
 expect(await page.evaluate(()=>obterTiposDeDefesa().filter(torreEstaDesbloqueada))).toEqual(equipamentos);
});
