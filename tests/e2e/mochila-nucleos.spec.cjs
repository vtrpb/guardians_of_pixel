const {test,expect}=require('@playwright/test');
test.beforeEach(async({page})=>{await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();await page.evaluate(()=>fecharConteudoMenu());});
test('Aba exclusiva, tres compras, migracao e persistencia por slot',async({page},info)=>{
 await page.evaluate(()=>{localStorage.setItem(CHAVE_NUCLEOS_DE_SOBRECARGA,'2');fragmentosPixel=30;mostrarLoja();});
 expect(await page.evaluate(()=>obterEstoqueDeNucleos())).toEqual({dano:2,velocidade:2,alcance:0});
 await expect(page.locator('[data-comprar-nucleo]')).toHaveCount(0);
 await page.evaluate(()=>selecionarCategoriaDaLoja('nucleos'));await expect(page.locator('[data-comprar-nucleo]')).toHaveCount(3);
 await page.locator('[data-comprar-nucleo=dano]').click();await page.evaluate(()=>cancelarCompraDaLoja());expect(await page.evaluate(()=>fragmentosPixel)).toBe(30);
 for(const t of ['dano','velocidade','alcance']){await page.locator(`[data-comprar-nucleo=${t}]`).click();await page.evaluate(()=>confirmarCompraDaLoja());}
 expect(await page.evaluate(()=>({estoque:obterEstoqueDeNucleos(),saldo:fragmentosPixel,catalogo:obterItensDaLoja().some(([id])=>obterTipoDoNucleoDaLoja(id))}))).toEqual({estoque:{dano:3,velocidade:3,alcance:1},saldo:15,catalogo:false});
 await page.screenshot({path:info.outputPath('loja.png')});await page.reload();expect(await page.evaluate(()=>obterEstoqueDeNucleos())).toEqual({dano:3,velocidade:3,alcance:1});
 expect(await page.evaluate(()=>{const antigo=atualizarSalvoAtivo;atualizarSalvoAtivo=()=>false;const ok=alterarEstoqueDeNucleos(-1,0,'alcance');atualizarSalvoAtivo=antigo;return {ok,estoque:obterQuantidadeDeNucleos('alcance')};})).toEqual({ok:false,estoque:1});
 await page.evaluate(()=>aplicarDadosDoSalvo({}));expect(await page.evaluate(()=>obterQuantidadeDeNucleos())).toBe(0);
});
test('Mochila Q, efeitos globais independentes, pausa e drops tipados',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));
 await page.evaluate(()=>{localStorage.setItem(CHAVE_NUCLEOS_DE_SOBRECARGA,JSON.stringify({dano:2,velocidade:2,alcance:2}));iniciarPartida(false);});
 for(let i=0;i<15&&await page.locator('#botao-continuar-cutscene-carta').isVisible();i++)await page.locator('#botao-continuar-cutscene-carta').click();
 await page.evaluate(()=>{concluirTutorialDaPartida(true);definirJogoPausado(true);dinheiro=5000;selecionarTipoDeTorre('padrao');});
 const r=await page.locator('#game').boundingBox();await page.mouse.click(r.x+350*r.width/1200,r.y+70*r.height/700);
 const antes=await page.evaluate(()=>{const t=torres[0];wave=1;definirJogoPausado(false);return {dano:t.dano,velocidade:t.velocidadeAtaque,alcance:t.alcance};});
 await page.keyboard.press('q');await expect(page.locator('#mochila-nucleos')).toBeVisible();
 await page.keyboard.press('q');await expect(page.locator('#mochila-nucleos')).toBeHidden();
 await page.locator('#botao-sobrecarga').click();await page.keyboard.press('Escape');await expect(page.locator('#mochila-nucleos')).toBeHidden();expect(await page.evaluate(()=>jogoPausado)).toBe(false);
 await page.keyboard.press('q');
 for(const tipo of ['dano','velocidade','alcance'])await page.locator(`[data-usar-nucleo=${tipo}]`).click();
 await page.screenshot({path:info.outputPath('mochila.png')});
 const durante=await page.evaluate(()=>{const t=torres[0];for(const tipo of Object.keys(temposDosNucleos))ativarNucleoDeSobrecarga(tipo);const novo={tipo:'padrao',nivel:0};atualizarAtributosDaTorreComBonus(novo);definirJogoPausado(true);const tempo={...temposDosNucleos};atualizarSobrecarga(5000);return {dano:t.dano,velocidade:t.velocidadeAtaque,alcance:t.alcance,novo:{dano:novo.dano,velocidade:novo.velocidadeAtaque,alcance:novo.alcance},estoque:obterEstoqueDeNucleos(),pausa:JSON.stringify(tempo)===JSON.stringify(temposDosNucleos)};});
 const atributos={dano:Math.round(antes.dano*1.35),velocidade:Math.round(antes.velocidade/1.3),alcance:Math.round(antes.alcance*1.25)};
 expect(durante).toMatchObject({...atributos,novo:atributos,estoque:{dano:1,velocidade:1,alcance:1},pausa:true});
 expect(await page.evaluate(()=>{temposDosNucleos.dano=1;temposDosNucleos.velocidade=10000;temposDosNucleos.alcance=10000;definirJogoPausado(false);atualizarSobrecarga(2);definirJogoPausado(true);return {dano:torres[0].dano,velocidade:torres[0].velocidadeAtaque,alcance:torres[0].alcance};})).toEqual({...atributos,dano:antes.dano});
 const estoque=await page.evaluate(()=>{const antigo=Math.random;try{for(const valor of [.1,.5,.9]){let primeira=true;Math.random=()=>{if(primeira){primeira=false;return 0;}return valor;};const e={tipo:'normal',x:300,y:300};tentarSoltarNucleo(e);tentarSoltarNucleo(e);}}finally{Math.random=antigo;}return obterEstoqueDeNucleos();});expect(estoque).toEqual({dano:2,velocidade:2,alcance:2});
 expect(await page.evaluate(()=>{limparSobrecargaDaPartida();return {dano:torres[0].dano,velocidade:torres[0].velocidadeAtaque,alcance:torres[0].alcance};})).toEqual(antes);
 expect(erros).toEqual([]);
});
