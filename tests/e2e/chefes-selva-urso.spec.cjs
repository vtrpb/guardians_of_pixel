const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 await page.evaluate(()=>{mostrarApresentacaoClassico();prepararPartidaClassica(101);confirmarSelecaoDeDefesas();definirJogoPausado(true);});
});
for(const tipo of ['bossSelva','bossTemperado'])test(`${tipo}: etapa moderada, aviso, pausa, fraqueza e ausência de acúmulo`,async({page},info)=>{
 const r=await page.evaluate(tipo=>{
  jogoPausado=false;partidaEncerrada=false;
  const boss={tipo,vida:501,vidaMaxima:1000,x:400,y:300,tamanho:50,velocidade:1,proximoRugidoEm:0};
  inimigos=[boss];torres=[{tipo:'padrao',nivel:0,x:450,y:300,tirosRecebidos:0,alcance:200}];tirosDosInimigos=[];
  atualizarSegundaEtapaDosChefes(16);const antes=!boss.etapaDoChefe;
  boss.vida=500;atualizarSegundaEtapaDosChefes(16);
  const etapa=boss.etapaDoChefe;
  const aviso=etapa.restante===2000&&obterVelocidadeAtualDoInimigo(boss)===1;
  jogoPausado=true;atualizarSegundaEtapaDosChefes(9000);const pausa=etapa.restante===2000;
  jogoPausado=false;boss.estaseSupremaRestante=10;atualizarSegundaEtapaDosChefes(9000);const estase=etapa.restante===2000;
  boss.estaseSupremaRestante=0;boss.atordoadoPelaTorreSismicaAte=Date.now()+1000;atualizarSegundaEtapaDosChefes(9000);const sismica=etapa.restante===2000;
  boss.atordoadoPelaTorreSismicaAte=0;atualizarSegundaEtapaDosChefes(1999);const aguardou=!etapa.ativa;
  atualizarSegundaEtapaDosChefes(1);
  const velocidade=obterVelocidadeAtualDoInimigo(boss);
  const vidaAntes=boss.vida;aplicarDanoAoInimigo(boss,100);const dano=vidaAntes-boss.vida;
  let intervalo=null;
  if(tipo==='bossTemperado'){const agora=Date.now();tentarUsarRugidoAncestral(boss,agora);intervalo=boss.proximoRugidoEm-agora;}
  boss.vida=800;atualizarSegundaEtapaDosChefes(30000);
  const unica=boss.etapaDoChefe===etapa&&obterVelocidadeAtualDoInimigo(boss)===velocidade&&boss.velocidade===1;
  const semAtaques=tirosDosInimigos.length===0&&torres[0].tirosRecebidos===0;
  // Uma unidade nova na mesma partida não herda a etapa anterior.
  const novo={...boss,vida:500,etapaDoChefe:undefined};inimigos=[novo];atualizarSegundaEtapaDosChefes(16);
  novo.vida=0;atualizarSegundaEtapaDosChefes(9000);const morte=!novo.etapaDoChefe.ativa;
  inimigos=[boss];boss.vida=400;etapa.ativa=false;etapa.restante=2000;jogoPausado=true;
  desenharMapa();desenharTorres();desenharCorpoDoInimigo(boss,350,250,100);desenharSegundaEtapaDoChefe(boss);
  return {antes,aviso,pausa,estase,sismica,aguardou,velocidade,dano,intervalo,unica,semAtaques,morte};
 },tipo);
 expect(r).toEqual({antes:true,aviso:true,pausa:true,estase:true,sismica:true,aguardou:true,velocidade:tipo==='bossSelva'?1.15:.85,dano:tipo==='bossSelva'?115:100,intervalo:tipo==='bossSelva'?null:5100,unica:true,semAtaques:true,morte:true});
 await page.locator('#game').screenshot({path:info.outputPath(`${tipo}.png`)});
});
test('Etapas novas sem torres, idiomas e transformações antigas preservadas',async({page})=>{
 const r=await page.evaluate(()=>{
  jogoPausado=false;torres=[];
  const criar=tipo=>({tipo,x:400,y:300,vida:40,vidaMaxima:100,tamanho:50,velocidade:1});
  inimigos=['bossSelva','bossTemperado'].map(criar);atualizarSegundaEtapaDosChefes(16);atualizarSegundaEtapaDosChefes(2000);
  const semAlvo=inimigos.every(i=>i.etapaDoChefe.ativa&&i.etapaDoChefe.alvo===null);
  inimigos=['bossVulcanico','bossPantano','bossPrimordial'].map(criar);atualizarSegundaEtapaDosChefes(9000);
  const preservados=inimigos.every(i=>!i.etapaDoChefe);
  const idiomas=['en','es'].map(id=>{idiomaAtual=id;return [localizar(nomeDoAtaqueDoChefe('selva')),localizar(nomeDoAtaqueDoChefe('urso'))];});
  jogoPausado=true;return {semAlvo,preservados,idiomas};
 });
 expect(r).toEqual({semAlvo:true,preservados:true,idiomas:[['Colossus: faster but vulnerable','Bear: frequent roars, slower steps'],['Coloso: más rápido, pero vulnerable','Oso: rugidos frecuentes, pasos lentos']]});
});
