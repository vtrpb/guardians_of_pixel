const {test, expect} = require('@playwright/test');
test.beforeEach(async ({page}) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
});
async function iniciar(page, fase) {
    await page.evaluate(fase => {maiorFaseConcluida=5;selecionarFase(fase);}, fase);
    await page.locator(`#ativar-desafio-campanha-${fase}`).check();
    await page.evaluate(() => {iniciarPartida(false);definirJogoPausado(true);dinheiro=10000;});
}
test('Sem explosivos: todos os tipos de mina/bomba invalidam, canhão permitido e vitória necessária', async ({page}) => {
    await iniciar(page,2);
    const r = await page.evaluate(() => {
        const explosivos = Object.entries(CONFIG.torre.tipos).filter(([,c])=>['mina','bomba'].includes(c.tipoDeItem));
        const resultados = explosivos.map(([tipo])=>{
            iniciarDesafioDaCampanha();registrarDefesaConstruidaParaConquistas(tipo);
            concluirDesafioDaCampanha(true);
            return {tipo, invalido:!medalhaDesafioCampanha(2), quantidade:tentativaDesafioCampanha.explosivos};
        });
        iniciarDesafioDaCampanha();registrarDefesaConstruidaParaConquistas('canhaoPesado');
        concluirDesafioDaCampanha(false);concluirDesafioDaCampanha(true);
        const derrota=!medalhaDesafioCampanha(2);
        iniciarDesafioDaCampanha();registrarDefesaConstruidaParaConquistas('canhaoPesado');
        wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();
        return {resultados,derrota,ganhou:medalhaDesafioCampanha(2),original:medalhaDesafioCampanha()};
    });
    expect(r.resultados.length).toBeGreaterThanOrEqual(6);
    for(const x of r.resultados){expect(x.invalido,x.tipo).toBe(true);expect(x.quantidade).toBe(1);}
    expect(r).toMatchObject({derrota:true,ganhou:true,original:false});
    await expect(page.locator('#resultado-desafio-campanha')).toContainText('Sem explosivos');
});
test('Arsenal variado: tipos únicos, sem explosivos, reinício e contagem congelada',async({page})=>{
    await iniciar(page,4);
    const r=await page.evaluate(()=>{
        ['padrao','padrao','minaTerrestre','bombaPesada'].forEach(registrarDefesaConstruidaParaConquistas);
        const repetido=tentativaDesafioCampanha.tipos.size;
        concluirDesafioDaCampanha(true);const insuficiente=!medalhaDesafioCampanha(4);
        prepararNovaPartida();jogoPausado=true;
        const reinicio=tentativaDesafioCampanha.construcoes;
        ['padrao','canhaoPesado','torreDeRaios'].forEach(registrarDefesaConstruidaParaConquistas);
        const tipos=[...tentativaDesafioCampanha.tipos];
        wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();
        registrarDefesaConstruidaParaConquistas('torreEsporos');
        return {repetido,insuficiente,reinicio,tipos,congelado:tentativaDesafioCampanha.tipos.size,ganhou:medalhaDesafioCampanha(4)};
    });
    expect(r).toEqual({repetido:1,insuficiente:true,reinicio:0,tipos:['padrao','canhaoPesado','torreDeRaios'],congelado:3,ganhou:true});
});
test('Trio veterano: compras reais, repetição na mesma torre, dinheiro insuficiente e venda',async({page})=>{
    await iniciar(page,5);
    const r=await page.evaluate(()=>{
        torres=Array.from({length:3},(_,i)=>({tipo:'padrao',nivel:0,x:200+i*70,y:440,valorInvestido:100,tirosRecebidos:0}));
        torres.forEach(t=>{atualizarAtributosDaTorreComBonus(t);registrarDefesaConstruidaParaConquistas(t.tipo);});
        torreSelecionada=torres[0];dinheiro=0;comprarMelhoriaEscolhida('dano');
        const semDinheiro=tentativaDesafioCampanha.melhorias.size;
        dinheiro=10000;comprarMelhoriaEscolhida('dano');comprarMelhoriaEscolhida('alcance');
        const repetida=tentativaDesafioCampanha.melhorias.size;
        for(const t of torres.slice(1)){torreSelecionada=t;comprarMelhoriaEscolhida('velocidade');}
        venderTorreSelecionada();
        const antes=tentativaDesafioCampanha.melhorias.size;
        wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();
        return {semDinheiro,repetida,antes,ganhou:medalhaDesafioCampanha(5)};
    });
    expect(r).toEqual({semDinheiro:0,repetida:1,antes:3,ganhou:true});
});
test('Defesas intactas: dano sem destruição, escudo, venda, perda e nova tentativa',async({page})=>{
    await iniciar(page,3);
    const r=await page.evaluate(()=>{
        const criar=()=>{const t={tipo:'padrao',nivel:0,x:250,y:440,valorInvestido:100,tirosRecebidos:0};torres.push(t);atualizarAtributosDaTorreComBonus(t);registrarDefesaConstruidaParaConquistas(t.tipo);return t;};
        const t=criar();escudoSupremoRestante=1000;atingirTorreComTiroInimigo(t);
        const escudo=t.tirosRecebidos===0;escudoSupremoRestante=0;
        atingirTorreComTiroInimigo(t);const dano=tentativaDesafioCampanha.destruidas===0;
        torreSelecionada=t;venderTorreSelecionada();const venda=tentativaDesafioCampanha.destruidas===0;
        const perdido=criar();for(let i=0;i<obterResistenciaDaTorre(perdido);i++)atingirTorreComTiroInimigo(perdido);
        const perda=tentativaDesafioCampanha.destruidas;
        concluirDesafioDaCampanha(true);const invalidou=!medalhaDesafioCampanha(3);
        prepararNovaPartida();jogoPausado=true;criar();
        wave=obterUltimaWaveDaFase();finalizarPartidaComVitoria();
        return {escudo,dano,venda,perda,invalidou,ganhou:medalhaDesafioCampanha(3)};
    });
    expect(r).toEqual({escudo:true,dano:true,venda:true,perda:1,invalidou:true,ganhou:true});
});
test('Novas medalhas: falha, retentativa, recarga e slots preservam a medalha antiga',async({page})=>{
    await iniciar(page,2);
    await page.evaluate(()=>{
        localStorage.setItem(CHAVE_DESAFIO_CAMPANHA,'true');registrarDefesaConstruidaParaConquistas('padrao');
        window.salvarOriginal=atualizarSalvoAtivo;atualizarSalvoAtivo=()=>false;
        concluirDesafioDaCampanha(true);
    });
    expect(await page.evaluate(()=>medalhaDesafioCampanha(2))).toBe(false);
    await page.evaluate(()=>atualizarSalvoAtivo=window.salvarOriginal);
    await page.locator('#resultado-desafio-campanha button').evaluate(b=>b.click());
    expect(await page.evaluate(()=>medalhaDesafioCampanha(2))).toBe(true);
    await page.reload();
    const r=await page.evaluate(()=>{
        const dados=capturarDadosDoSalvoAtivo(), recarga=medalhaDesafioCampanha(2);
        aplicarDadosDoSalvo({});const novo=medalhaDesafioCampanha(2);
        aplicarDadosDoSalvo(dados);return {recarga,novo,restaurada:medalhaDesafioCampanha(2),antiga:medalhaDesafioCampanha()};
    });
    expect(r).toEqual({recarga:true,novo:false,restaurada:true,antiga:true});
});
test('Opções por fase, bloqueio, idiomas, celular e isolamento dos outros modos',async({page},info)=>{
    await page.evaluate(()=>mostrarFases(1));
    await expect(page.locator('#ativar-desafio-campanha-2')).toBeDisabled();
    await page.evaluate(()=>{maiorFaseConcluida=5;mostrarFases(1);});
    await expect(page.locator('#ativar-desafio-campanha-2')).not.toBeChecked();
    await page.locator('#ativar-desafio-campanha-2').check();
    await expect(page.locator('#ativar-desafio-campanha-4')).not.toBeChecked();
    await page.screenshot({path:info.outputPath('desafios-desktop.png')});
    for(const [idioma,nome] of [['en','No explosives'],['es','Sin explosivos']]){
        await page.evaluate(id=>{idiomaAtual=id;mostrarFases(1);},idioma);
        await expect(page.locator('.desafio-campanha-opcao').filter({has:page.locator('#ativar-desafio-campanha-2')})).toContainText(nome);
    }
    await page.setViewportSize({width:390,height:844});
    await page.locator('#ativar-desafio-campanha-5').scrollIntoViewIfNeeded();
    await page.screenshot({path:info.outputPath('desafios-celular.png')});
    const isolados=await page.evaluate(()=>{
        faseSelecionada=2;
        const testar=()=>{iniciarDesafioDaCampanha();return tentativaDesafioCampanha===null;};
        mapaPersonalizadoAtivo={classico:true};const classico=testar();
        mapaPersonalizadoAtivo={};const editor=testar();mapaPersonalizadoAtivo=null;
        modoWavesInfinitas=true;const infinito=testar();modoWavesInfinitas=false;
        desafioSupremoAtivo='teste';const supremo=testar();desafioSupremoAtivo=null;
        faseSelecionada=6;const outraFase=testar();return {classico,editor,infinito,supremo,outraFase};
    });
    expect(isolados).toEqual({classico:true,editor:true,infinito:true,supremo:true,outraFase:true});
});
