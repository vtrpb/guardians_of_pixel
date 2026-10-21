const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});
async function iniciar(page){
 await page.evaluate(()=>{maiorFaseConcluida=5;selecionarFase(6);});
 await page.locator('#ativar-desafio-campanha-6').check();
 await page.evaluate(()=>{iniciarPartida(false);definirJogoPausado(true);});
}
test('Carroça: dano limitado por grupo, alcance, pausa, morte e reinício',async({page},info)=>{
 await iniciar(page);
 const r=await page.evaluate(()=>{
  const c=CONFIG.carrocaDaCampanha;
  inimigos=[{vida:100,x:c.x,y:c.y}];atualizarCarrocaDaCampanha(1200);const pausa=tentativaDesafioCampanha.vida;
  jogoPausado=false;atualizarCarrocaDaCampanha(1199);const aviso=tentativaDesafioCampanha.vida;
  inimigos.push({...inimigos[0]});atualizarCarrocaDaCampanha(1);const grupo=tentativaDesafioCampanha.vida;
  inimigos=[{vida:0,x:c.x,y:c.y},{vida:100,x:c.x+101,y:c.y}];atualizarCarrocaDaCampanha(1200);const fora=tentativaDesafioCampanha.vida;
  inimigos=[{vida:100,x:c.x+100,y:c.y}];atualizarCarrocaDaCampanha(1200);const borda=tentativaDesafioCampanha.vida;
  atualizarCarrocaDaCampanha(1200*25);const destruida=tentativaDesafioCampanha.vida,continua=!partidaEncerrada;
  registrarConstrucaoDesafioDaCampanha('padrao');concluirDesafioDaCampanha(true);const semMedalha=!medalhaDesafioCampanha(6);
  prepararNovaPartida();jogoPausado=true;desenharMapa();
  return {pausa,aviso,grupo,fora,borda,destruida,continua,semMedalha,reinicio:tentativaDesafioCampanha.vida,bloqueia:estaPertoDaCarroca(c.x,c.y)};
 });
 expect(r).toEqual({pausa:100,aviso:100,grupo:96,fora:96,borda:92,destruida:0,continua:true,semMedalha:true,reinicio:100,bloqueia:true});
 await page.screenshot({path:info.outputPath('carroca-desktop.png')});
});
test('Carroça: vitória, falha de salvamento, retentativa, recarga e slots',async({page})=>{
 await iniciar(page);
 await page.evaluate(()=>{
  registrarConstrucaoDesafioDaCampanha('padrao');window.salvarOriginal=atualizarSalvoAtivo;atualizarSalvoAtivo=()=>false;
  concluirDesafioDaCampanha(true);
 });
 expect(await page.evaluate(()=>medalhaDesafioCampanha(6))).toBe(false);
 await page.evaluate(()=>{atualizarSalvoAtivo=window.salvarOriginal;concluirDesafioDaCampanha(true);});
 expect(await page.evaluate(()=>medalhaDesafioCampanha(6))).toBe(true);
 await page.reload();
 expect(await page.evaluate(()=>{
  const dados=capturarDadosDoSalvoAtivo(),recarga=medalhaDesafioCampanha(6);aplicarDadosDoSalvo({});
  const novo=medalhaDesafioCampanha(6);aplicarDadosDoSalvo(dados);return [recarga,novo,medalhaDesafioCampanha(6)];
 })).toEqual([true,false,true]);
});
test('Carroça: loop real, medalha na carta e retentativa antes do lobby',async({page},info)=>{
 await iniciar(page);
 await page.evaluate(()=>{
  criarInimigo('normal');const i=inimigos[0],c=CONFIG.carrocaDaCampanha;
  i.x=c.x;i.y=c.y-70;i.velocidade=0;i.vida=100000;i.vidaMaxima=100000;
  registrarConstrucaoDesafioDaCampanha('padrao');definirJogoPausado(false);
 });
 await expect.poll(()=>page.evaluate(()=>tentativaDesafioCampanha.vida),{timeout:8000}).toBeLessThan(100);
 await page.evaluate(()=>{definirJogoPausado(true);window.salvarOriginal=atualizarSalvoAtivo;atualizarSalvoAtivo=()=>false;wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();});
 expect(await page.evaluate(()=>medalhaDesafioCampanha(6))).toBe(false);
 await expect(page.locator('#resultado-desafio-carta button')).toBeVisible();
 await page.evaluate(()=>atualizarSalvoAtivo=window.salvarOriginal);
 await page.locator('#resultado-desafio-carta button').click();
 expect(await page.evaluate(()=>medalhaDesafioCampanha(6))).toBe(true);
 await expect(page.locator('#resultado-desafio-carta')).toBeVisible();
 await expect(page.locator('#resultado-desafio-carta')).toContainText('Carroça de suprimentos');
 await expect(page.locator('#camada-cutscene-carta .carta-misteriosa')).toHaveCSS('opacity','1');
 await page.screenshot({path:info.outputPath('carroca-carta.png')});
 await page.locator('#botao-continuar-cutscene-carta').click();
 await expect(page.locator('#camada-cutscene-carta')).toBeHidden();
 expect(await page.evaluate(()=>faseSelecionada)).toBe(1);
});
test('Carroça: opção bloqueada, idiomas, celular e modos isolados',async({page},info)=>{
 await page.evaluate(()=>mostrarFases(1));await expect(page.locator('#ativar-desafio-campanha-6')).toBeDisabled();
 await page.setViewportSize({width:390,height:844});
 for(const [idioma,nome] of [['en','Supply wagon'],['es','Carro de suministros'],['pt-BR','Carroça de suprimentos']]){
  await page.evaluate(id=>{idiomaAtual=id;maiorFaseConcluida=5;mostrarFases(1);},idioma);
  await expect(page.locator('.desafio-campanha-opcao').filter({has:page.locator('#ativar-desafio-campanha-6')})).toContainText(nome);
 }
 await page.locator('#ativar-desafio-campanha-6').scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath('carroca-celular.png')});
 const r=await page.evaluate(()=>{
  faseSelecionada=6;selecionarDesafioDaCampanha(6,true);
  const testar=()=>{iniciarDesafioDaCampanha();return obterCarrocaDaCampanha()===null;};
  mapaPersonalizadoAtivo={classico:true};const classico=testar();mapaPersonalizadoAtivo={};const editor=testar();mapaPersonalizadoAtivo=null;
  modoWavesInfinitas=true;const infinito=testar();modoWavesInfinitas=false;desafioSupremoAtivo='teste';const supremo=testar();
  desafioSupremoAtivo=null;selecionarDesafioDaCampanha(6,false);return [classico,editor,infinito,supremo,testar()];
 });expect(r).toEqual([true,true,true,true,true]);
});
