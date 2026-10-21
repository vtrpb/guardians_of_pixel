const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});

test('Cada um dos 31 mapas distribui três cópias de cada extra, fora da rota e com colisão',async({page})=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 const resultados=await page.evaluate(()=>obterMapasClassicos().map(m=>{
  const objetos=obterDecoracoesExtrasClassicas(m);
  mapaPersonalizadoAtivo={classico:true,numeroClassico:m.numero,tema:m.tema,nivelDeDecoracoes:2};
  return {numero:m.numero,objetos:objetos.map(d=>({...d,distancia:distanciaDosCaminhosClassicos(d.x,d.y,caminhosDoMapaClassico(m)),bloqueado:construcaoSobreDecoracao(d.x,d.y)}))};
 }));
 expect(resultados).toHaveLength(31);
 for(const m of resultados){expect(m.objetos,`mapa ${m.numero}`).toHaveLength(6);expect(new Set(m.objetos.map(d=>d.tipo)).size).toBe(2);for(const tipo of new Set(m.objetos.map(d=>d.tipo)))expect(m.objetos.filter(d=>d.tipo===tipo)).toHaveLength(3);for(const d of m.objetos){expect(d.distancia).toBeGreaterThanOrEqual(88);expect(d.bloqueado).toBe(true);}}
 expect(new Set(resultados.flatMap(m=>m.objetos.map(d=>d.tipo))).size).toBe(56);
 expect(erros).toEqual([]);
});

test('Revisão visual dos 31 cenários e dos 56 tipos de objetos',async({page})=>{
 await page.evaluate(()=>{
  const mapas=obterMapasClassicos();const painel=document.createElement('div');painel.id='revisao-cenarios';painel.style='position:absolute;inset:0;z-index:99999;background:#101827;display:grid;grid-template-columns:repeat(4,360px);color:white';
  mapas.forEach(m=>{const item=document.createElement('div'),titulo=document.createElement('p'),t=document.createElement('canvas');titulo.textContent=m.numero+' — '+m.nome;t.width=1200;t.height=700;t.style='width:360px;height:210px';desenharCenarioClassico(t.getContext('2d'),m);item.append(titulo,t);painel.append(item);});document.body.append(painel);
 });
 await page.locator('#revisao-cenarios').evaluate(el=>{el.style.bottom='auto';el.style.width='1440px';});
 await page.locator('#revisao-cenarios').screenshot({path:'artifacts/decoracoes-28-mapas.png'});
 await page.evaluate(()=>{
  const painel=document.getElementById('revisao-cenarios');painel.replaceChildren();painel.style.gridTemplateColumns='repeat(8,180px)';
  for(const [mapa,tipos] of Object.entries(DECORACOES_EXTRAS_CLASSICAS))for(const tipo of tipos){const item=document.createElement('div'),t=document.createElement('canvas'),p=document.createElement('p');t.width=180;t.height=150;const c=t.getContext('2d');c.scale(1.7,1.7);desenharObjetoExtraClassico(c,tipo,53,44);p.textContent=mapa+' '+tipo;item.append(t,p);painel.append(item);}
 });
 await page.locator('#revisao-cenarios').screenshot({path:'artifacts/decoracoes-56-objetos.png'});
 await page.evaluate(()=>{
  const painel=document.getElementById('revisao-cenarios');painel.replaceChildren();painel.style.gridTemplateColumns='repeat(4,360px)';
  for(const m of obterMapasClassicos()){
   mapaPersonalizadoAtivo={classico:true,numeroClassico:m.numero,tema:m.tema,nivelDeDecoracoes:2};
   desenharMapa();const item=document.createElement('div'),p=document.createElement('p'),t=document.createElement('canvas');p.textContent=m.numero+' — Arena';t.width=1200;t.height=700;t.style='width:360px;height:210px';t.getContext('2d').drawImage(canvas,0,0);item.append(p,t);painel.append(item);
  }
 });
 await page.locator('#revisao-cenarios').screenshot({path:'artifacts/decoracoes-28-arenas.png'});
});

async function iniciarDesafio(page){
 await page.evaluate(()=>mostrarFases(1));
 await page.locator('#ativar-desafio-campanha').check();
 await page.evaluate(()=>{fecharConteudoMenu();iniciarPartida(false);});
 for(let i=0;i<3;i++)await page.locator('#botao-continuar-cutscene-carta').click();
 await page.evaluate(()=>{definirJogoPausado(true);dinheiro=5000;selecionarTipoDeTorre('padrao');});
}
test('Desafio opcional conta construção real, salva medalha e traduz',async({page})=>{
 await iniciarDesafio(page);
 const b=await page.locator('#game').boundingBox();await page.mouse.click(b.x+100*b.width/1200,b.y+440*b.height/700);
 expect(await page.evaluate(()=>tentativaDesafioCampanha.construcoes)).toBe(1);
 await expect(page.locator('#desafio-campanha-partida')).toContainText('1/3');
 await page.evaluate(()=>{desenharMapa();desenharTorres();});
 await page.screenshot({path:'artifacts/desafio-campanha-partida.png'});
 await page.evaluate(()=>{wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();});
 await expect(page.locator('#resultado-desafio-campanha')).toContainText('Medalha conquistada');
 expect(await page.evaluate(()=>sistemaDeSalvos.espacos[sistemaDeSalvos.indiceAtivo].dados[CHAVE_DESAFIO_CAMPANHA])).toBe('true');
 await page.reload();expect(await page.evaluate(()=>medalhaDesafioCampanha())).toBe(true);
 await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 const opcao = page.locator('.desafio-campanha-opcao').filter({has:page.locator('#ativar-desafio-campanha')});
 await page.evaluate(()=>{idiomaAtual='en';mostrarFases(1);});await expect(opcao).toContainText('Medal earned');
 await page.evaluate(()=>{idiomaAtual='es';mostrarFases(1);});await expect(opcao).toContainText('Medalla conseguida');
 await page.setViewportSize({width:390,height:844});await opcao.scrollIntoViewIfNeeded();await page.screenshot({path:'artifacts/desafio-campanha-celular.png'});
});

test('Ultrapassar limite não impede combate, derrota e outros modos não dão medalha',async({page})=>{
 await iniciarDesafio(page);
 const resultado=await page.evaluate(()=>{
  for(let i=0;i<4;i++)registrarDefesaConstruidaParaConquistas('padrao');
  torres=[];const contagem=tentativaDesafioCampanha.construcoes;
  concluirDesafioDaCampanha(true);const excesso=medalhaDesafioCampanha();
  iniciarDesafioDaCampanha();concluirDesafioDaCampanha(true);const vazia=medalhaDesafioCampanha();
  registrarConstrucaoDesafioDaCampanha();concluirDesafioDaCampanha(false);const derrota=medalhaDesafioCampanha();
  mapaPersonalizadoAtivo={classico:true};iniciarDesafioDaCampanha();const classico=tentativaDesafioCampanha;
  mapaPersonalizadoAtivo=null;modoWavesInfinitas=true;iniciarDesafioDaCampanha();const infinito=tentativaDesafioCampanha;
  modoWavesInfinitas=false;faseSelecionada=2;iniciarDesafioDaCampanha();const fase2=tentativaDesafioCampanha;
  return {contagem,excesso,vazia,derrota,classico,infinito,fase2};
 });
 expect(resultado).toEqual({contagem:4,excesso:false,vazia:false,derrota:false,classico:null,infinito:null,fase2:null});
});

test('Falha ao gravar medalha reverte e permite tentar novamente',async({page})=>{
 await iniciarDesafio(page);
 await page.evaluate(()=>{registrarConstrucaoDesafioDaCampanha();window.salvarSlotOriginal=atualizarSalvoAtivo;atualizarSalvoAtivo=()=>false;wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();});
 expect(await page.evaluate(()=>medalhaDesafioCampanha())).toBe(false);
 await expect(page.locator('#resultado-desafio-campanha button')).toBeVisible();
 await page.evaluate(()=>atualizarSalvoAtivo=window.salvarSlotOriginal);
 await page.locator('#resultado-desafio-campanha button').click();
 expect(await page.evaluate(()=>medalhaDesafioCampanha())).toBe(true);
});

test('Medalha isolada por salvo e desafio desativado por padrão',async({page})=>{
 expect(await page.evaluate(()=>desafioCampanhaSelecionado)).toBe(false);
 const r=await page.evaluate(()=>{
  localStorage.setItem(CHAVE_DESAFIO_CAMPANHA,'true');const dados=capturarDadosDoSalvoAtivo();
  aplicarDadosDoSalvo({});const novo=medalhaDesafioCampanha();
  aplicarDadosDoSalvo(dados);return {novo,restaurado:medalhaDesafioCampanha()};
 });expect(r).toEqual({novo:false,restaurado:true});
});
