const {test,expect}=require('@playwright/test');

test('Páginas principais têm trilhas próprias; páginas de apoio mantêm lobby e silêncio',async({page})=>{
 const erros=[];page.on('pageerror',erro=>erros.push(erro.message));
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 const selecao=await page.evaluate(()=>{
  const nomes={};
  for(const id of ['loja','laboratorio','album','missoes','conquistas','supremas','eventos']){
   definirTelaDoMenuAberta(id);
   nomes[id]=obterConfiguracaoDaMusicaDoLobby().nomeInterno;
  }
  definirTelaDoMenuAberta('tutorial');
  const tutorial=obterConfiguracaoDaMusicaDoLobby()===CONFIG.audio.musicaAnteriorDoLobby;
  definirTelaDoMenuAberta(null);
  return {nomes,tutorial};
 });
 expect(Object.values(selecao.nomes)).toHaveLength(7);
 expect(new Set(Object.values(selecao.nomes)).size).toBe(7);
 expect(selecao.tutorial).toBe(true);
 await page.locator('.botao-lobby-loja').click();
 await expect.poll(()=>page.evaluate(()=>musicaDoLobbyTocando&&obterConfiguracaoDaMusicaDoLobby()===CONFIG.audio.trilhasDasTelas.loja)).toBe(true);
 expect(await page.evaluate(()=>{
  const intervalo=intervaloDaMusicaDoLobby;
  mostrarLoja();
  return intervaloDaMusicaDoLobby===intervalo;
 })).toBe(true);
 await page.evaluate(()=>ajustarVolumeDaMusica(0));
 expect(await page.evaluate(()=>musicaDoLobbyTocando)).toBe(false);
 await page.evaluate(()=>mostrarApresentacaoClassico());
 await page.locator('.classico-abrir-laboratorio').click();
 expect(await page.evaluate(()=>({tela:telaDoMenuAberta,tocando:musicaDoLobbyTocando}))).toEqual({tela:'laboratorio',tocando:false});
 await expect(page.locator('.laboratorio-resultados')).toContainText('Sem mutação');
 await page.evaluate(()=>ajustarVolumeDaMusica(40));
 await expect.poll(()=>page.evaluate(()=>musicaDoLobbyTocando&&obterConfiguracaoDaMusicaDoLobby()===CONFIG.audio.trilhasDasTelas.laboratorio)).toBe(true);
 await page.locator('.laboratorio-voltar').click();
 await expect.poll(()=>page.evaluate(()=>musicaDoLobbyTocando&&obterConfiguracaoDaMusicaDoLobby()===CONFIG.audio.musicaDoLobby)).toBe(true);
 await page.evaluate(()=>{alternarModoClassico();mostrarTutorial();});
 await expect.poll(()=>page.evaluate(()=>musicaDoLobbyTocando&&obterConfiguracaoDaMusicaDoLobby()===CONFIG.audio.musicaAnteriorDoLobby)).toBe(true);
 await page.evaluate(()=>{fecharConteudoMenu();abrirConfiguracoes();});
 expect(await page.evaluate(()=>obterConfiguracaoDaMusicaDoLobby()===CONFIG.audio.musicaAnteriorDoLobby)).toBe(true);
 expect(erros).toEqual([]);
});
