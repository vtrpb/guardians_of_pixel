const {test,expect}=require('@playwright/test');
test('Lago da fase 1 e decoracoes bloqueiam cursor e construcao',async({page},info)=>{
 const erros=[];page.on('pageerror',e=>erros.push(e.message));await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await page.evaluate(()=>{fecharConteudoMenu();comprasDaLoja.add('boiaArpoes');defesasSelecionadasParaPartida.add('boiaArpoes');iniciarPartida(false);});
 for(let i=0;i<15&&await page.locator('#botao-continuar-cutscene-carta').isVisible();i++)await page.locator('#botao-continuar-cutscene-carta').click();
 await page.evaluate(()=>{tutorialAtivo=false;definirJogoPausado(true);dinheiro=5000;selecionarTipoDeTorre('padrao');});
 const clicar=async(x,y)=>{const r=await page.locator('#game').boundingBox();await page.mouse.click(r.x+x*r.width/1200,r.y+y*r.height/700);};
 expect(await page.evaluate(()=>posicaoEhInvalidaParaCursorDeConstrucao(680,390))).toBe(true);
 await clicar(680,390);await clicar(82,92);expect(await page.evaluate(()=>torres.length)).toBe(0);
 await page.evaluate(()=>selecionarTipoDeTorre('boiaArpoes'));
 expect(await page.evaluate(()=>posicaoEhInvalidaParaCursorDeConstrucao(680,390))).toBe(false);
 await clicar(350,70);expect(await page.evaluate(()=>torres.length)).toBe(0);
 await clicar(680,390);expect(await page.evaluate(()=>torres.map(t=>t.tipo))).toEqual(['boiaArpoes']);
 await page.evaluate(()=>selecionarTipoDeTorre('padrao'));await clicar(350,70);expect(await page.evaluate(()=>torres.length)).toBe(2);
 await page.evaluate(()=>desenharCenaPausadaDoTutorial());await page.locator('#game').screenshot({path:info.outputPath('lago-aquatica.png')});
 expect(await page.evaluate(()=>{mapaPersonalizadoAtivo={tema:'campo',nivelDeDecoracoes:0};return {agua:obterAreasDeAguaParaConstrucao().length,arvore:construcaoSobreDecoracao(82,92)};})).toEqual({agua:0,arvore:false});
 expect(erros).toEqual([]);
});
