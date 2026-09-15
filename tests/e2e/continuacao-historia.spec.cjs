const {test,expect}=require('@playwright/test');
async function preparar(page){
 await page.addInitScript(()=>{
  if(sessionStorage.getItem('historia-pronta'))return;sessionStorage.setItem('historia-pronta','1');
  localStorage.setItem('tower-defense-2-progresso-fases-v2','18');
  for(const k of ['guardians-of-pixel-correcao-progresso-fases-13-14-v1','guardians-of-pixel-tutorial-concluido-v1'])localStorage.setItem(k,'true');
  localStorage.setItem('guardians-of-pixel-jornada-limbo-v1',JSON.stringify({fase:'concluido',promessaDeAjuda:true}));
 });await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await page.evaluate(()=>iniciarFlorestaSecreta());
 await page.evaluate(()=>{while(dialogoFloresta)avancarFalaFloresta();cancelAnimationFrame(quadroFloresta);pausaFloresta=false;});
}
test('Mapa único: sombra física, revelação sem teleporte e save',async({page},info)=>{
 await preparar(page);
 const resultado=await page.evaluate(()=>{
  const antes={...perseguidorFloresta};
  for(let i=0;i<500;i++)atualizarFloresta(.016);
  const moveu=Math.hypot(antes.x-perseguidorFloresta.x,antes.y-perseguidorFloresta.y)>20;
  const livre=posicaoLivreNaFloresta(perseguidorFloresta.x,perseguidorFloresta.y);
  Object.assign(estadoFloresta,pontoDaFloresta([25,23]));estadoFloresta.checkpoint=1;
  Object.assign(perseguidorFloresta,pontoDaFloresta([23,23]),{espera:0});
  atualizarFloresta(.016);const encontro={x:perseguidorFloresta.x,y:perseguidorFloresta.y};
  while(dialogoFloresta)avancarFalaFloresta();
  const continuo=encontro.x===perseguidorFloresta.x&&encontro.y===perseguidorFloresta.y;
  salvarFloresta();const salvo=carregarFloresta();desenharFloresta();
  return {moveu,livre,continuo,revelado:estadoFloresta.revelado,persistiu:salvo.perseguidor.x===encontro.x,salas:SALAS_DA_FLORESTA.length};
 });expect(resultado).toEqual({moveu:true,livre:true,continuo:true,revelado:true,persistiu:true,salas:1});
 await page.screenshot({path:info.outputPath('encontro-continuo.png')});
 await page.locator('#floresta-sair').click();await page.evaluate(()=>iniciarFlorestaSecreta());
 expect(await page.evaluate(()=>estadoFloresta.checkpoint)).toBe(1);
});
test('Floresta: rota inteira com obstáculos e entrada na continuação',async({page},info)=>{
 test.setTimeout(60000);const erros=[];page.on('pageerror',e=>erros.push(e.message));await preparar(page);
 const resultado=await page.evaluate(()=>{
  // Caminho mais curto em células livres, contornando as armadilhas visíveis.
  const fim=SALAS_DA_FLORESTA[0].rota.at(-1),inicio=[4,34],fila=[inicio],pais=new Map([[inicio.join(','),null]]);
  for(let i=0;i<fila.length;i++){
   const p=fila[i];if(p[0]===fim[0]&&p[1]===fim[1])break;
   for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const n=[p[0]+dx,p[1]+dy],k=n.join(',');
    if(pais.has(k)||!celulaLivreFloresta(...n,0)||OBSTACULOS_FLORESTA[0].armadilhas.some(a=>a[0]===n[0]&&a[1]===n[1]))continue;
    pais.set(k,p);fila.push(n);
   }
  }
  if(!pais.has(fim.join(',')))return 'sem rota';
  const rota=[];for(let p=fim;p;p=pais.get(p.join(',')))rota.unshift(pontoDaFloresta(p));
  let encontros=0;
  for(const alvo of rota.slice(1)){
   for(let i=0;i<200;i++){
    if(dialogoFloresta){if(dialogoFloresta.falas[0][1].includes('alcançou'))return 'capturado';encontros++;while(dialogoFloresta)avancarFalaFloresta();}
    const dx=alvo.x-estadoFloresta.x,dy=alvo.y-estadoFloresta.y;if(Math.hypot(dx,dy)<2)break;
    teclasFloresta.clear();if(Math.abs(dx)>1)teclasFloresta.add(dx>0?'direita':'esquerda');if(Math.abs(dy)>1)teclasFloresta.add(dy>0?'baixo':'cima');atualizarFloresta(.008);
    if(i===199)return 'bloqueado';
   }
  }
  teclasFloresta.clear();interagirNaFloresta();
  if(!estadoFloresta.revelado){
   for(let i=0;i<10000&&!dialogoFloresta;i++)atualizarFloresta(.016);
   if(!dialogoFloresta)return 'sombra nao chegou';encontros++;
   while(dialogoFloresta)avancarFalaFloresta();interagirNaFloresta();
  }
  desenharFloresta();return {encontros,portal:dialogoFloresta?.falas[0][1].includes('arco')};
 });expect(resultado.portal,JSON.stringify(resultado)).toBe(true);expect(resultado.encontros).toBe(1);
 await page.screenshot({path:info.outputPath('mapa-arco.png')});
 await page.evaluate(()=>{while(dialogoFloresta)avancarFalaFloresta();});
 for(let i=0;i<7;i++)await page.locator('#botao-continuar-cutscene-carta').click();
 await expect(page.locator('#floresta-titulo')).toHaveText('A casa silenciosa');expect(erros).toEqual([]);
});
test('Casa, telefone, rua e oficina: pistas, pausa, saves e traduções',async({page},info)=>{
 await preparar(page);await page.evaluate(()=>{estadoFloresta.concluido=true;salvarFloresta();fecharFloresta();iniciarCasaParada();cancelAnimationFrame(quadroFloresta);});
 expect(await page.evaluate(()=>{const inicio=estadoFloresta.x;teclasFloresta.add('direita');for(let i=0;i<20;i++)atualizarFloresta(.016);teclasFloresta.clear();return estadoFloresta.x>inicio&&!posicaoLivreCasaParada(300,130);})).toBe(true);
 async function interagir(id){await page.evaluate(id=>{const o=LUGARES_CASA[estadoFloresta.local].objetos.find(o=>o.id===id);estadoFloresta.x=o.x;estadoFloresta.y=o.y+o.h/2+16;interagirNaFloresta();},id);}
 await interagir('rua');await expect(page.locator('#floresta-fala')).toContainText('Primeiro');
 await page.evaluate(()=>avancarFalaFloresta());
 for(const id of ['relogio','desenhos','janela']){await interagir(id);await page.evaluate(()=>avancarFalaFloresta());}
 await expect(page.locator('#floresta-objetivo')).toContainText('telefone');
 await interagir('telefone');await expect(page.locator('#floresta-fala')).toContainText('Não ligue o relógio');
 await expect(page.locator('#floresta-dialogo .retrato-dialogo')).toBeHidden();await page.evaluate(()=>avancarFalaFloresta());
 await interagir('rua');await interagir('pessoa');await page.evaluate(()=>avancarFalaFloresta());
 await page.evaluate(()=>desenharFloresta());await page.screenshot({path:info.outputPath('rua.png')});
 await interagir('oficina');for(const id of ['foto','projeto']){await interagir(id);await page.evaluate(()=>avancarFalaFloresta());}
 await expect(page.locator('#floresta-objetivo')).toContainText('Pistas reunidas');
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>desenharFloresta());await page.screenshot({path:info.outputPath('oficina-celular.png')});
 await page.keyboard.press('Escape');expect(await page.evaluate(()=>pausaFloresta)).toBe(true);
 await page.locator('#floresta-sair').click();await page.reload();await page.locator('#botao-jogar-menu-inicial').click();await page.evaluate(()=>iniciarCasaParada());
 expect(await page.evaluate(()=>estadoFloresta.concluido&&estadoFloresta.local==='oficina')).toBe(true);
 for(const idioma of ['en','es']){await page.evaluate(id=>{selecionarIdioma(id);atualizarInterfaceFloresta();},idioma);await expect(page.locator('#floresta-objetivo')).toContainText(idioma==='en'?'Memory is the key':'La memoria es la llave');}
});
