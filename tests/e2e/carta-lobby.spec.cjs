const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
});
for(const largura of [1440,390])test(`Fase 6: carta volta ao lobby e portal é voluntário em ${largura}px`,async({page})=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 await page.setViewportSize({width:largura,height:900});await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.evaluate(()=>{maiorFaseConcluida=5;faseSelecionada=6;iniciarPartida();finalizarPartidaComVitoria();});
 await expect(page.locator('#camada-cutscene-carta')).toBeVisible();await expect(page.locator('#texto-cutscene-carta')).toContainText('Você está pronto');
 expect(await page.evaluate(()=>({fase:maiorFaseConcluida,portal:podeEntrarNaFaseSecreta(),capitulo:capitulo2Desbloqueado}))).toEqual({fase:6,portal:true,capitulo:false});
 await page.locator('#botao-continuar-cutscene-carta').click();await expect(page.locator('#camada-cutscene-carta')).toBeHidden();
 expect(await page.evaluate(()=>({jogo:jogoIniciado,teleporte:teleporteGlitchEmAndamento,lobby:!menuPrincipal.classList.contains('oculto'),fase:faseSelecionada}))).toEqual({jogo:false,teleporte:false,lobby:true,fase:1});
 expect(await page.locator('[id*="vila"]').count()).toBe(0);
 expect(await page.evaluate(()=>({registro:carregarRegistrosDaEnciclopedia().has('carta-portal'),musica:trilhaDoLobbyAtiva}))).toEqual({registro:true,musica:true});
 await page.screenshot({path:`artifacts/carta-retorno-lobby-${largura}.png`});
 await page.locator('#portal-fase-secreta').click();
 expect(await page.evaluate(()=>faseSecretaDescoberta)).toBe(true);expect(await page.evaluate(()=>capitulo2Desbloqueado)).toBe(false);
 expect(erros).toEqual([]);
});
test('Progresso antigo migra todos os slots sem perder campanha ou outros registros',async({page})=>{
 await page.addInitScript(()=>{
  if(sessionStorage.getItem('migracao-fixture'))return;sessionStorage.setItem('migracao-fixture','1');
  const dados={'tower-defense-2-progresso-fases-v2':'6','guardians-of-pixel-vila-relogios-v1':'{"defesaConcluida":false}','guardians-of-pixel-enciclopedia-v1':'["vila-relogio","vila-chegada","carta-portal","casa-foto"]'};
  for(const [k,v]of Object.entries(dados))localStorage.setItem(k,v);
  localStorage.setItem('guardians-of-pixel-salvos-v1',JSON.stringify({versao:1,indiceAtivo:0,espacos:[{criadoEm:1,atualizadoEm:1,dados},{criadoEm:2,atualizadoEm:2,dados:{...dados,'tower-defense-2-progresso-fases-v2':'12'}},null]}));
 });
 await page.goto('/');
 expect(await page.evaluate(()=>localStorage.getItem('guardians-of-pixel-vila-relogios-v1'))).toBe(null);
 expect(await page.evaluate(()=>[...carregarRegistrosDaEnciclopedia()].sort())).toEqual(['carta-portal','casa-foto']);
 expect(await page.evaluate(()=>podeEntrarNaFaseSecreta())).toBe(true);
 expect(await page.evaluate(()=>sistemaDeSalvos.espacos.filter(Boolean).every(s=>!Object.keys(s.dados).some(k=>k.includes('vila'))&&!s.dados['guardians-of-pixel-enciclopedia-v1'].includes('vila-')))).toBe(true);
 await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(2))]);expect(await page.evaluate(()=>maiorFaseConcluida)).toBe(12);
 expect(await page.evaluate(()=>[...carregarRegistrosDaEnciclopedia()].sort())).toEqual(['carta-portal','casa-foto']);
});
test('Portal continua bloqueado antes da Fase 6',async({page})=>{
 await page.goto('/');expect(await page.evaluate(()=>{maiorFaseConcluida=5;return podeEntrarNaFaseSecreta();})).toBe(false);
 expect(await page.evaluate(()=>CATALOGO_ENCICLOPEDIA.length)).toBe(45);
 expect(await page.evaluate(()=>document.querySelectorAll('script[src*="vila"],link[href*="vila"]').length)).toBe(0);
});
