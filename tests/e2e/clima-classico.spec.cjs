const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});
async function iniciar(page,mapa){await page.evaluate(n=>{mostrarApresentacaoClassico();prepararPartidaClassica(n);confirmarSelecaoDeDefesas();definirJogoPausado(true);},mapa);}

for(const [mapa,atributo,valor] of [[106,'velocidade',.85],[107,'alcance',1.1],[110,'intervalo',.9]]){
 test(`Mapa ${mapa}: aviso, efeito real, duração, pausa e reinício`,async({page})=>{
  const erros=[];page.on('pageerror',e=>erros.push(e.message));await iniciar(page,mapa);
  const resultado=await page.evaluate(({atributo})=>{
   const torre={tipo:'padrao',alcance:200,velocidadeAtaque:1000,x:100,y:100};
   const inimigo={tipo:'normal',vida:100,vidaMaxima:100,velocidade:2};
   const medir=()=>atributo==='velocidade'?obterVelocidadeAtualDoInimigo(inimigo):atributo==='alcance'?obterAlcanceAtualDaTorre(torre):obterIntervaloDeAtaqueAtualDaTorre(torre);
   const base=medir();jogoPausado=false;wave=3;atualizarClimaClassico(0);
   const aviso={estado:climaDaPartida.estado,multiplicador:multiplicadorDoClimaClassico(atributo)};
   atualizarClimaClassico(3999);const antes=medir();atualizarClimaClassico(1);const durante=medir();
   jogoPausado=true;const tempo=climaDaPartida.tempo;atualizarClimaClassico(50000);const pausa=climaDaPartida.tempo===tempo;
   jogoPausado=false;atualizarClimaClassico(11999);const ultimo=medir();atualizarClimaClassico(1);const depois=medir();
   atualizarClimaClassico(100);const semRepetir=climaDaPartida.estado;
   wave=6;atualizarClimaClassico(0);const novoAviso=climaDaPartida.estado;
   iniciarClimaClassico();jogoPausado=true;
   return {base,aviso,antes,durante,pausa,ultimo,depois,semRepetir,novoAviso,reinicio:climaDaPartida.estado,atributos:[torre.alcance,torre.velocidadeAtaque,inimigo.velocidade]};
  },{atributo});
  expect(resultado.aviso).toEqual({estado:'aviso',multiplicador:1});
  expect(resultado.antes).toBe(resultado.base);expect(resultado.durante).toBeCloseTo(resultado.base*valor);expect(resultado.ultimo).toBeCloseTo(resultado.base*valor);expect(resultado.depois).toBe(resultado.base);
  expect(resultado.pausa).toBe(true);expect(resultado.semRepetir).toBe('calmo');expect(resultado.novoAviso).toBe('aviso');expect(resultado.reinicio).toBe('calmo');expect(resultado.atributos).toEqual([200,1000,2]);expect(erros).toEqual([]);
 });
 test(`Mapa ${mapa}: revisão visual e movimento reduzido`,async({page})=>{
  await iniciar(page,mapa);
  expect(await page.evaluate(()=>({preferencia:matchMedia('(prefers-reduced-motion: reduce)').matches,suave:climaVisualSuave,marcado:document.getElementById('clima-classico-suave').checked}))).toEqual({preferencia:true,suave:true,marcado:true});
  await page.locator('#clima-classico-suave').uncheck();
  await page.evaluate(()=>{jogoPausado=false;wave=3;atualizarClimaClassico(0);atualizarClimaClassico(6000);jogoPausado=true;desenharMapa();desenharInterface();});
  await expect(page.locator('#clima-classico-estado')).toContainText('restantes');
  await page.screenshot({path:`artifacts/clima-${mapa}-desktop.png`});
  await page.setViewportSize({width:390,height:844});await page.locator('#clima-classico-partida').scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/clima-${mapa}-celular.png`});
  const r=await page.evaluate(()=>{const m=multiplicadorDoClimaClassico('velocidade');definirClimaSuave(true);return {tempo:tempoDoClimaClassico(climaDaPartida.numero),m,apos:multiplicadorDoClimaClassico('velocidade')};});
  expect(r.tempo).toBe(0);expect(r.apos).toBe(r.m);
 });
}
test('Galeria explica eventos; idiomas e isolamento na saída e outros mapas',async({page})=>{
 await page.evaluate(()=>{mostrarApresentacaoClassico();abrirPaginaClassica(1);});
 expect(await page.evaluate(()=>descricaoClimaClassico(106))).toContain('15%');
 await iniciar(page,106);
 const r=await page.evaluate(()=>{
  jogoPausado=false;wave=3;atualizarClimaClassico(0);atualizarClimaClassico(4000);jogoPausado=true;
  idiomaAtual='en';atualizarPainelClimaClassico();const en=document.getElementById('clima-classico-estado').textContent;
  idiomaAtual='es';atualizarPainelClimaClassico();const es=document.getElementById('clima-classico-estado').textContent;
  const mapa=mapaPersonalizadoAtivo;mapaPersonalizadoAtivo=null;const historia=multiplicadorDoClimaClassico('velocidade');
  mapaPersonalizadoAtivo={...mapa,numeroClassico:101};const outro=multiplicadorDoClimaClassico('velocidade');
  mapaPersonalizadoAtivo=mapa;partidaEncerrada=true;const final=multiplicadorDoClimaClassico('velocidade');
  voltarAoLobby();return {en,es,historia,outro,final,limpo:climaDaPartida===null};
 });
 expect(r.en).toContain('Enemies move 15% slower');expect(r.es).toContain('Enemigos un 15% más lentos');expect(r.historia).toBe(1);expect(r.outro).toBe(1);expect(r.final).toBe(1);expect(r.limpo).toBe(true);
 await expect(page.locator('#clima-classico-partida')).toBeHidden();
 await iniciar(page,101);expect(await page.evaluate(()=>climaDaPartida)).toBeNull();
});

test('Loop da partida inicia evento e aba oculta congela o relógio',async({page})=>{
 await iniciar(page,106);
 await page.evaluate(()=>{wave=3;definirJogoPausado(false);});
 await expect(page.locator('#clima-classico-estado')).toContainText('Nevasca boreal em');
 await expect(page.locator('#clima-classico-estado')).toContainText('restantes',{timeout:10000});
 const r=await page.evaluate(()=>{
  definirJogoPausado(true);const tempo=climaDaPartida.tempo;
  Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});
  jogoPausado=false;atualizarClimaClassico(20000);jogoPausado=true;
  delete document.hidden;return {tempo,apos:climaDaPartida.tempo};
 });expect(r.apos).toBe(r.tempo);
});
