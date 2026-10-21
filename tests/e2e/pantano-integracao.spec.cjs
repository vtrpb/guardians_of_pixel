const {test,expect}=require('@playwright/test');
test('Pântano: progressão, waves, Hidra e desenhos com os módulos atuais',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');
 const dados=await page.evaluate(()=>{
  const fase=CONFIG.fases.find(f=>f.numero===7),c=caminhosDasFases[7];
  const comprimento=c.slice(1).reduce((s,p,i)=>s+Math.hypot(p.x-c[i].x,p.y-c[i].y),0);
  maiorFaseConcluida=5;const antes=faseEstaDesbloqueada(7);
  maiorFaseConcluida=6;const semCapitulo=faseEstaDesbloqueada(7);
  capitulo2Desbloqueado=true;const depois=faseEstaDesbloqueada(7);
  faseSelecionada=7;wave=19;iniciarProximaWave();
  return {tema:fase.tema,descricao:fase.descricao,secreta:CONFIG.faseSecreta.numeroInterno,limites:[CONFIG.torre.limitesPorFase[7],CONFIG.torre.limitesPorFase[99]],
   musica:[CONFIG.audio.musicaDoPantano.intervaloDoPasso,CONFIG.audio.musicaDoPantano.volumeRelativo],comprimento,inicioSecreto:caminhosDasFases[99][0].y,
   desbloqueio:[antes,semCapitulo,depois],waves:[inimigosMosquitosDoBrejoParaCriar,inimigosSaposVenenososParaCriar,inimigosGuardioesDeLodoParaCriar,inimigosChefesParaCriar],
   vidas:[5,10,20].map(w=>calcularVidaDoBoss(w,'bossPantano'))};
 });
 expect(dados).toEqual({tema:'pantano',descricao:'Pântano Tóxico',secreta:99,limites:[15,12],musica:[300,3.2],comprimento:3170,inicioSecreto:590,desbloqueio:[false,false,true],waves:[5,4,3,1],vidas:[2660,2960,3560]});
 const regeneracao=await page.evaluate(()=>{
  inimigos=[];wave=5;criarInimigo('bossPantano');const hidra=inimigos[0];aplicarDanoAoInimigo(hidra,1330,1000);
  const inicial={vida:hidra.vida,ativa:hidra.regeneracaoAtiva,inicio:hidra.regeneracaoAtivadaEm};
  const cura=atualizarRegeneracaoDaHidra(hidra,60),vidaCurada=hidra.vida;
  hidra.vida=hidra.vidaMaxima-10;const limite=atualizarRegeneracaoDaHidra(hidra,60),cheia=hidra.vida===hidra.vidaMaxima;
  hidra.vida=0;const morto=atualizarRegeneracaoDaHidra(hidra,60);
  desenharCorpoDoInimigo({...hidra,vida:1800},0,0,hidra.tamanho*2);
  for(const [tipo,tamanho] of [['mosquitoDoBrejo',38],['sapoVenenoso',58],['guardiaoDeLodo',78]])desenharCorpoDoInimigo({tipo},0,0,tamanho);
  return {inicial,cura,vidaCurada,limite,cheia,morto};
 });
 expect(regeneracao).toEqual({inicial:{vida:1330,ativa:true,inicio:1000},cura:28,vidaCurada:1358,limite:10,cheia:true,morto:0});
 const detalhes=await page.evaluate(()=>['pt-BR','en','es'].map(idioma=>{
  idiomaAtual=idioma;
  return obterDetalheDoInimigoNoAlbum('bossPantano',CONFIG.inimigo.bossPantano);
 }));
 for(const detalhe of detalhes){expect(detalhe).toContain('28');expect(detalhe).not.toContain('40');expect(detalhe).not.toContain('{cura}');}
});
