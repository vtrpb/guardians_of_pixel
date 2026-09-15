const {test,expect}=require('@playwright/test');
async function preparar(page) {
 await page.addInitScript(()=>{
  if(sessionStorage.getItem('preparouFloresta'))return;sessionStorage.setItem('preparouFloresta','true');
  localStorage.setItem('tower-defense-2-progresso-fases-v2','18');
  for(const k of ['guardians-of-pixel-capitulo-2-desbloqueado-v1','guardians-of-pixel-capitulo-3-desbloqueado-v1','guardians-of-pixel-correcao-progresso-fases-13-14-v1','guardians-of-pixel-tutorial-concluido-v1'])localStorage.setItem(k,'true');
  localStorage.setItem('guardians-of-pixel-jornada-limbo-v1',JSON.stringify({fase:'concluido',sala:'salao',x:320,y:330,desafio:true,promessaDeAjuda:true}));
 });
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await page.evaluate(()=>iniciarFlorestaSecreta());
}
async function falas(page){await page.evaluate(()=>{while(dialogoFloresta)avancarFalaFloresta();});}
// Caminha pelos corredores com as mesmas entradas e atualização do jogo.
async function andarAte(page,alvo) {
 return page.evaluate(({x,y})=>{
  pausaFloresta=false;
  for(let i=0;i<1500;i++) {
   if(dialogoFloresta)return 'dialogo';
   const origem=[Math.floor(estadoFloresta.x/32),Math.floor(estadoFloresta.y/32)],destino=[Math.floor(x/32),Math.floor(y/32)];
   const fila=[{p:origem,primeiro:null}],vistos=new Set([origem.join(',')]);let alvo={x,y};
   for(let j=0;j<fila.length;j++){
    const no=fila[j];
    if(no.p[0]===destino[0]&&no.p[1]===destino[1]){if(no.primeiro)alvo=pontoDaFloresta(no.primeiro);break;}
    for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){
     const p=[no.p[0]+a,no.p[1]+b],k=p.join(',');
     if(vistos.has(k)||!celulaLivreFloresta(...p,estadoFloresta.sala)||OBSTACULOS_FLORESTA[estadoFloresta.sala].armadilhas.some(a=>a[0]===p[0]&&a[1]===p[1]))continue;
     vistos.add(k);fila.push({p,primeiro:no.primeiro||p});
    }
   }
   const dx=alvo.x-estadoFloresta.x,dy=alvo.y-estadoFloresta.y;
   if(Math.hypot(x-estadoFloresta.x,y-estadoFloresta.y)<3){teclasFloresta.clear();return 'chegou';}
   teclasFloresta.clear();
   if(Math.abs(dx)>2)teclasFloresta.add(dx>0?'direita':'esquerda');
   if(Math.abs(dy)>2)teclasFloresta.add(dy>0?'baixo':'cima');
   atualizarFloresta(.016);
  }
  return 'bloqueado';
 },alvo);
}
test('Floresta: colisões, pausa, captura, abrigo, toque, save e acesso',async({page})=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 await preparar(page);await falas(page);
 const x=await page.evaluate(()=>estadoFloresta.x);
 await page.keyboard.down('d');await page.waitForTimeout(150);await page.keyboard.up('d');
 expect(await page.evaluate(()=>estadoFloresta.x)).toBeGreaterThan(x);
 await page.keyboard.press('Escape');
 const parado=await page.evaluate(()=>({...estadoFloresta}));
 await page.keyboard.down('d');await page.waitForTimeout(100);await page.keyboard.up('d');
 expect(await page.evaluate(()=>estadoFloresta)).toEqual(parado);
 await page.keyboard.press('Escape');
 expect(await page.evaluate(()=>{const s={...estadoFloresta};moverNaFloresta(s,-999,0);return s.x===estadoFloresta.x;})).toBe(true);
 await page.evaluate(()=>{estadoFloresta.sala=0;estadoFloresta.revelado=true;Object.assign(estadoFloresta,pontoDaFloresta(SALAS_DA_FLORESTA[0].rota[2]));perseguidorFloresta={x:estadoFloresta.x,y:estadoFloresta.y,espera:0};atualizarFloresta(.016);});
 await expect(page.locator('#floresta-fala')).toContainText('alcançou');await falas(page);
 expect(await page.evaluate(()=>estadoFloresta.revelado)).toBe(true);
 await page.evaluate(()=>{Object.assign(estadoFloresta,pontoDaFloresta(SALAS_DA_FLORESTA[0].abrigo));interagirNaFloresta();});
 expect(await page.evaluate(()=>escondidoFloresta)).toBe(true);
 await page.locator('#floresta-interagir').click();
 const seta=await page.locator('[data-floresta-direcao="baixo"]').boundingBox();
 await page.mouse.move(seta.x+seta.width/2,seta.y+seta.height/2);await page.mouse.down();
 expect(await page.evaluate(()=>teclasFloresta.has('baixo'))).toBe(true);
 await page.mouse.up();
 expect(await page.evaluate(()=>teclasFloresta.size)).toBe(0);
 await page.locator('#floresta-sair').click();await page.reload();await page.locator('#botao-jogar-menu-inicial').click();await page.evaluate(()=>iniciarFlorestaSecreta());
 expect(await page.evaluate(()=>estadoFloresta.sala)).toBe(0);
 await page.locator('#floresta-sair').click();
 expect(await page.evaluate(()=>{jornadaDoLimbo.promessaDeAjuda=false;atualizarBotaoDaFloresta();iniciarFlorestaSecreta();return florestaAtiva;})).toBe(false);
 await expect(page.locator('#botao-floresta')).toHaveCount(0);
 expect(erros).toEqual([]);
});

test('Floresta: traduções, save inválido e chave incluída nos slots',async({page})=>{
 await preparar(page);
 for(const idioma of ['en','es']) {
  await page.evaluate(id=>selecionarIdioma(id),idioma);
  await expect(page.locator('#floresta-fala')).not.toContainText('Saí pela passagem');
  await expect(page.locator('#floresta-titulo')).not.toHaveText('Ruínas na mata');
 }
 expect(await page.evaluate(()=>{salvarFloresta();return CHAVE_FLORESTA in capturarDadosDoSalvoAtivo();})).toBe(true);
 expect(await page.evaluate(()=>{
  localStorage.setItem(CHAVE_FLORESTA,JSON.stringify({sala:1,x:99999,y:-1}));
  const seguro=carregarFloresta();
  localStorage.setItem(CHAVE_FLORESTA,'{');
  return posicaoLivreNaFloresta(seguro.x,seguro.y,seguro.sala)&&carregarFloresta()===null;
 })).toBe(true);
});

test('Floresta: câmera, obstáculos, armadilhas e migração',async({page},info)=>{
 await preparar(page);await falas(page);
 const verificar=await page.evaluate(()=>{
  cancelAnimationFrame(quadroFloresta);
  const entrada={...estadoFloresta};desenharFloresta();const inicial={...cameraFloresta};
  Object.assign(estadoFloresta,pontoDaFloresta(SALAS_DA_FLORESTA[0].rota[5]));desenharFloresta();
  const seguiu=cameraFloresta.x>inicial.x&&cameraFloresta.y<inicial.y;
  const centralizado=estadoFloresta.x-cameraFloresta.x===canvasFloresta.width/2;
  const bloqueados=OBSTACULOS_FLORESTA.every((s,i)=>[...s.pedras,...s.arvores].every(([x,y])=>!celulaLivreFloresta(x,y,i)));
  estadoFloresta.armadilhasFechadas=[];
  Object.assign(estadoFloresta,pontoDaFloresta(OBSTACULOS_FLORESTA[0].armadilhas[0]));verificarArmadilhasFloresta(estadoFloresta,true);
  const preso=prisaoJogadorFloresta===CONFIG.florestaSecreta.prisaoJogador;
  const inimigo={...pontoDaFloresta(OBSTACULOS_FLORESTA[0].armadilhas[1]),espera:0};verificarArmadilhasFloresta(inimigo,false);
  const prendeInimigo=inimigo.espera===CONFIG.florestaSecreta.prisaoPerseguidor;
  salvarFloresta();const persistiu=carregarFloresta().armadilhasFechadas.length===2;
  localStorage.setItem(CHAVE_FLORESTA,JSON.stringify({sala:1,x:80,y:272,revelado:true}));
  const antigo=carregarFloresta(),inicio=pontoDaFloresta(SALAS_DA_FLORESTA[0].checkpoints[1]);
  const migrou=antigo.x===inicio.x&&antigo.y===inicio.y&&antigo.revelado;
  estadoFloresta=entrada;prisaoJogadorFloresta=0;desenharFloresta();
  return {seguiu,centralizado,bloqueados,preso,prendeInimigo,persistiu,migrou};
 });
 expect(Object.values(verificar)).toEqual(Array(7).fill(true));
 await page.screenshot({path:info.outputPath('camera-entrada.png')});
 await page.evaluate(()=>{Object.assign(estadoFloresta,pontoDaFloresta([13,29]));desenharFloresta();});
 await page.screenshot({path:info.outputPath('camera-obstaculos.png')});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:info.outputPath('camera-celular.png')});
});
