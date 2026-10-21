const {test,expect}=require('@playwright/test');
test('Fase vulcânica: configuração, waves, Titã e Obliterador reais',async({page})=>{
 await page.goto('/');
 const dados=await page.evaluate(()=>{
  const fase=CONFIG.fases.find(f=>f.numero===6),c=caminhosDasFases[6];
  maiorFaseConcluida=4;const antes=torreEstaDesbloqueada('obliterador');maiorFaseConcluida=5;const depois=torreEstaDesbloqueada('obliterador');
  faseSelecionada=6;wave=19;iniciarProximaWave();
  return {tema:fase.tema,limite:CONFIG.torre.limitesPorFase[6],musica:[CONFIG.audio.musicaDaForja.intervaloDoPasso,CONFIG.audio.musicaDaForja.volumeRelativo],
   comprimento:c.slice(1).reduce((s,p,i)=>s+Math.hypot(p.x-c[i].x,p.y-c[i].y),0),incremento:CONFIG.inimigo.bossVulcanico.incrementoVidaPorAparicao,
   fragmentos:[5,10,20].map(calcularQuantidadeDeFragmentosDoTita),desbloqueio:[antes,depois],waves:[inimigosMorcegosDeFogoParaCriar,inimigosLagartosVulcanicosParaCriar,inimigosGolemsDeMagmaParaCriar,inimigosChefesParaCriar]};
 });
 expect(dados).toEqual({tema:'vulcanica',limite:15,musica:[240,1.55],comprimento:3050,incremento:0,fragmentos:[2,3,5],desbloqueio:[false,true],waves:[5,4,3,1]});
 const combate=await page.evaluate(()=>{
  inimigos=[];wave=5;criarInimigo('bossVulcanico');const tita=inimigos[0];aplicarDanoAoInimigo(tita,2000,1000);
  const primeira=[tita.vida,tita.formaDeErupcao,inimigos.filter(i=>i.tipo==='fragmentoDeMagma').length,obterVelocidadeAtualDoInimigo(tita,1001)];
  aplicarDanoAoInimigo(tita,100,1002);const segunda=[tita.vida,inimigos.filter(i=>i.tipo==='fragmentoDeMagma').length];
  inimigos=[{tipo:'normal',indiceDoCaminho:0,x:80,y:350,alvo:1,vida:1000,vidaMaxima:1000,tamanho:20,velocidade:1.5,cor:'red'}];
  torres=[{x:20,y:350,tipo:'obliterador',nivel:0,dano:34,alcance:230,velocidadeAtaque:1600,velocidadeTiro:13,ultimoTiro:0,modoDeAlvo:'primeiro'}];
  tiros=[];dinheiro=0;atacarComTorres(2000);
  desenharCorpoDaTorre(50,50,CONFIG.torre.tipos.obliterador.visualBase);desenharCorpoDoInimigo(tita,0,0,tita.tamanho*2);
  return {primeira,segunda,danos:[CONFIG.torre.tipos.obliterador.dano,...CONFIG.torre.tipos.obliterador.melhorias.map(m=>m.dano)],tiros:tiros.map(t=>t.dano),recompensa:dinheiro===obterRecompensaPorTiro()};
 });
 expect(combate).toEqual({primeira:[1120,true,2,1.05*1.65],segunda:[1020,2],danos:[34,47,63,86],tiros:[34,34,34],recompensa:true});
});
