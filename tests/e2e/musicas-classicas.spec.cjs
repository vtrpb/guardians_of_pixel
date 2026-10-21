const {test,expect}=require('@playwright/test');

test('Campanha conserva a selecao musical no classico, incluindo Campo Verde',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 const resultado=await page.evaluate(()=>{
  const estado=()=>({flags:[trilhaDoDesertoAtiva,trilhaDoArticoAtiva,trilhaDaSelvaAtiva,trilhaDoBosqueAtiva,trilhaDaForjaAtiva,trilhaDoPantanoAtiva,trilhaDaDimensaoGlitchAtiva,trilhaPixeladaDaFase1Ativa],partitura:obterPartituraOriginalDaFase()?.nomeInterno,selva:obterConfiguracaoDaMusicaDaSelva().nomeInterno});
  return CONFIG.fases.map(fase=>{
   mapaPersonalizadoAtivo=null;faseSelecionada=fase.numero;selecionarTrilhaDaPartida();const historia=estado();
   mapaPersonalizadoAtivo={classico:true,numeroClassico:fase.numero,tema:fase.tema};faseSelecionada=CONFIG.editorDeFases.numeroInterno;selecionarTrilhaDaPartida();
   return {numero:fase.numero,historia,classico:estado(),arquivoPausado:musica.paused};
  });
 });
 for(const r of resultado)expect(r.classico,`fase ${r.numero}`).toEqual(r.historia);
 expect(resultado.find(r=>r.numero===1).classico.flags[7]).toBe(true);
 expect(resultado.find(r=>r.numero===1).arquivoPausado).toBe(true);
});

test('Dezessete trilhas exclusivas tocam, respeitam volume e param no lobby',async({page})=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 const nomes=[];
 for(const numero of [101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117]){
  nomes.push(await page.evaluate(numero=>{
   const mapa=CONFIG.classico.mapasExclusivos.find(m=>m.numero===numero);
   mapaPersonalizadoAtivo={classico:true,numeroClassico:numero,tema:mapa.tema};faseSelecionada=CONFIG.editorDeFases.numeroInterno;
   musicaPausadaPeloJogador=false;selecionarTrilhaDaPartida();
   if(!trilhaDoPantanoAtiva||!musicaDoPantanoTocando||!musica.paused)throw Error('Trilha incorreta');
   return obterConfiguracaoDaMusicaDoPantano().nomeInterno;
  },numero));
  await page.waitForTimeout(350);
 }
 expect(new Set(nomes).size).toBe(17);
 const assinaturas=await page.evaluate(()=>Object.values(CONFIG.audio.partiturasClassicas).map(partitura=>
  partitura.frases.flat().map(nota=>Array.isArray(nota)?nota.join(':'):nota).join(',')));
 expect(new Set(assinaturas).size).toBe(17);
 expect(await page.evaluate(()=>{ajustarVolumeDaMusica(0);return musicaDoPantanoTocando;})).toBe(false);
 expect(await page.evaluate(()=>{ajustarVolumeDaMusica(50);return musicaDoPantanoTocando;})).toBe(true);
 expect(await page.evaluate(()=>{selecionarTrilhaDoLobby();return musicaDoPantanoTocando;})).toBe(false);
 expect(erros).toEqual([]);
});

test('Composicoes completas geram audio sem silencio nem saturacao',async({page})=>{
 await page.goto('/');
 const medidas=await page.evaluate(async()=>{
  const resultados=[];
  for(const c of Object.values(CONFIG.audio.partiturasClassicas)){
   const passos=c.frases[0].length*c.ordem.length,duracao=passos*c.intervaloDoPasso/1000;
   const audio=new OfflineAudioContext(1,Math.ceil((duracao+2)*22050),22050);
   contextoAudio=audio;const ganho=audio.createGain();ganho.gain.value=c.volumeRelativo;ganho.connect(audio.destination);
   for(let passo=0;passo<passos;passo++)tocarPassoDaPartituraPixelada({currentTime:passo*c.intervaloDoPasso/1000},c,passo,ganho);
   const dados=(await audio.startRendering()).getChannelData(0);let pico=0,soma=0;
   for(const valor of dados){pico=Math.max(pico,Math.abs(valor));soma+=valor*valor;}
   resultados.push({nome:c.nomeInterno,pico,rms:Math.sqrt(soma/dados.length)});
  }
  return resultados;
 });
 for(const r of medidas){expect(r.pico,r.nome).toBeLessThan(1);expect(r.rms,r.nome).toBeGreaterThan(0.01);}
});

test('Cada mapa exclusivo usa no lobby sua identidade visual sem trocar a trilha do lobby',async({page})=>{
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 const resultado=await page.evaluate(()=>{
  musicaDaAberturaConcluida=true;lobbyClassicoAtivo=true;
  return CONFIG.classico.mapasExclusivos.map(mapa=>{
   mapaClassicoSelecionado=mapa.numero;atualizarLobbyClassico();
   return {numero:mapa.numero,classe:menuPrincipal.classList.contains(`tema-${mapa.tema}`),nome:obterConfiguracaoDaMusicaDoLobby().nomeInterno,esperada:CONFIG.audio.musicaDoLobby.nomeInterno,paleta:getComputedStyle(menuPrincipal).getPropertyValue('--chao-escuro')};
  });
 });
 expect(resultado).toHaveLength(17);
 expect(resultado.every(item=>item.classe&&item.paleta)).toBe(true);
 expect(new Set(resultado.map(item=>item.nome)).size).toBe(1);
 expect(resultado[0].nome).toBe(resultado[0].esperada);
});
