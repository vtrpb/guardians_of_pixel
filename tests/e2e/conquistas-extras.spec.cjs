const {test,expect}=require('@playwright/test');
async function abrir(page) {
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
    await page.goto('/');expect(erros).toEqual([]);await page.locator('#botao-jogar-menu-inicial').click();
}
test('catálogo atual tem 48 ícones válidos sem revelar as 15 conquistas ocultas',async({page})=>{
    await abrir(page);
    const catalogo=await page.evaluate(async()=>{
        const ids=Object.keys(CONFIG.conquistas);
        const validas=await Promise.all(ids.map(id=>new Promise(resolve=>{
            const imagem=new Image();
            imagem.onload=()=>resolve(imagem.naturalWidth>0);
            imagem.onerror=()=>resolve(false);
            imagem.src=`assets/conquistas/${id}.svg`;
        })));
        return {total:ids.length,ocultas:Object.values(CONFIG.conquistas).filter(c=>c.secreta).length,
            imagensValidas:validas.filter(Boolean).length};
    });
    expect(catalogo).toEqual({total:48,ocultas:15,imagensValidas:48});
    await page.evaluate(()=>mostrarConquistas('ocultas'));
    await expect(page.locator('.conquista-icone')).toHaveText(Array(15).fill('?'));
});
test('20 conquistas novas: categorias, localização, limites dos Bosses e efeitos simultâneos',async({page},info)=>{
    const erros=[];page.on('pageerror',e=>erros.push(e.message));await abrir(page);
    expect(await page.evaluate(()=>({total:Object.keys(CONFIG.conquistas).length,ocultas:Object.values(CONFIG.conquistas).filter(c=>c.secreta).length}))).toEqual({total:48,ocultas:15});
    expect(await page.evaluate(()=>Object.values(criarConquistasExtras()).every(c=>['en','es'].every(id=>TRADUCOES_NOVAS_CONQUISTAS[id][c.nome]&&TRADUCOES_NOVAS_CONQUISTAS[id][c.descricao])))).toBe(true);
    const dados=await page.evaluate(()=>{
        fecharConteudoMenu();iniciarPartida();for(let i=0;i<3;i++)concluirCutsceneDaCarta();definirJogoPausado(true);
        const total=comprimentoDoCaminhoParaConquistas(obterCaminhoAtual());
        function matar(fracao,efeitos={}) {
            inimigos=[];criarInimigo(obterTipoDeBossDaFase());const alvo=inimigos[0];
            posicionarInimigoNoProgressoDoCaminho(alvo,total*fracao);Object.assign(alvo,{vida:1},efeitos);
            aplicarDanoAoInimigo(alvo,99999,1000);return alvo;
        }
        matar(.89);const antes=!conquistaEstaDesbloqueada('porUmPixel');
        matar(.91);matar(.49,{marcaExpiraEm:2000,corrosaoExpiraEm:2000,lentidaoExpiraEm:2000});
        return {antes,final:conquistaEstaDesbloqueada('porUmPixel'),metade:conquistaEstaDesbloqueada('voceNaoPassa'),efeitos:conquistaEstaDesbloqueada('controleAbsoluto')};
    });
    expect(dados).toEqual({antes:true,final:true,metade:true,efeitos:true});
    await page.evaluate(()=>{voltarAoLobby();mostrarConquistas('comuns');});
    await page.locator('#conteudo-menu').screenshot({path:info.outputPath('conquistas-novas.png')});
    expect(erros).toEqual([]);
});

test('Tentativas: última hora, perda de torre, revanche, sessões, economia e restrição de construção',async({page})=>{
    await abrir(page);
    const dados=await page.evaluate(()=>{
        fecharConteudoMenu();iniciarPartida();for(let i=0;i<3;i++)concluirCutsceneDaCarta();definirJogoPausado(true);
        const total=comprimentoDoCaminhoParaConquistas(obterCaminhoAtual());
        inimigos=[];criarInimigo('normal');const alvo=inimigos[0];posicionarInimigoNoProgressoDoCaminho(alvo,total*.95);alvo.vida=1;
        const torre={...obterPosicaoNoCaminhoPeloProgresso(total*.8),tipo:'padrao',nivel:0,tirosRecebidos:0};
        torres=[torre];registrarTorreParaConquistasExtras(torre);
        aplicarDanoAoInimigo(alvo,10000,1000,{torreOrigem:torre});
        alvo.vida=1;
        tentativaConquistasExtras.ultimoGolpeTardio=false;
        aplicarEfeitoDeQueimadura(alvo,{danoPorIntervalo:10000,intervaloEntreDanos:100,duracao:1000},1000,null,torre);
        atualizarDanoDaQueimaduraNoInimigo(alvo,1100);
        const queimadura=alvo.vida<=0&&tentativaConquistasExtras.ultimoGolpeTardio;
        for(let i=0;i<obterResistenciaDaTorre(torre);i++)atingirTorreComTiroInimigo(torre);
        terminarTentativaParaConquistas(true);
        const primeira=['naUltimaHora','viradaDeJogo','ultimaLinha','semPressa'].every(conquistaEstaDesbloqueada);
        prepararNovaPartida();dinheiro=1000;terminarTentativaParaConquistas(false);
        prepararNovaPartida();terminarTentativaParaConquistas(true);
        const segunda=['naoDestaVez','soMaisUma','verdadeiroInimigo'].every(conquistaEstaDesbloqueada);
        const sessao=partidasTerminadasNestaSessao;terminarTentativaParaConquistas(true);
        prepararNovaPartida();mapaPersonalizadoAtivo={};terminarTentativaParaConquistas(false);mapaPersonalizadoAtivo=null;
        return {primeira,segunda,queimadura,semDuplicar:partidasTerminadasNestaSessao===sessao};
    });
    expect(dados).toEqual({primeira:true,segunda:true,queimadura:true,semDuplicar:true});
});

test('Castelo: cômodos, interações, rotas e persistência sem recompensas extras',async({page},info)=>{
    await abrir(page);const saldo=await page.evaluate(()=>fragmentosPixel);
    await page.evaluate(()=>iniciarExploracaoDoCastelo());
    await page.locator('#limbo-continuar').click();await page.locator('#limbo-continuar').click();
    await page.evaluate(()=>{
        for(const sala of CONFIG.desafiosDeConquistas.salasDoCastelo)mudarSalaDoCastelo(sala);
        mudarSalaDoCastelo('real');obterInteracoesDoCastelo().find(i=>i.nome==='Examinar retrato').acao();
    });
    await page.locator('#limbo-continuar').click();
    await page.evaluate(()=>{mudarSalaDoCastelo('salao');obterInteracoesDoCastelo().find(i=>i.nome.includes('Arsenal')).acao();});
    await page.locator('#limbo-continuar').click();
    expect(await page.evaluate(()=>['silencioAbrePortas','hospedeCurioso','assuntoFamilia','limitesDoVazio'].every(conquistaEstaDesbloqueada))).toBe(true);
    expect(await page.evaluate(()=>conquistaEstaDesbloqueada('doisCaminhos'))).toBe(false);
    await page.evaluate(()=>{registrarRotaParaConquistas('verdade');sairDoCasteloParaLobby();mostrarConquistas('ocultas');});
    await page.setViewportSize({width:390,height:844});
    await page.locator('#conteudo-menu').screenshot({path:info.outputPath('conquistas-ocultas-celular.png')});
    expect(await page.evaluate(()=>fragmentosPixel)).toBe(saldo);
    await page.reload();
    expect(await page.evaluate(()=>conquistaEstaDesbloqueada('doisCaminhos'))).toBe(true);
    await Promise.all([page.waitForEvent('load'),page.evaluate(()=>trocarSalvoAtivo(2))]);
    expect(await page.evaluate(()=>conquistaEstaDesbloqueada('doisCaminhos'))).toBe(false);
});

test('Corredores: descoberta e saída são conquistas distintas',async({page})=>{
    await abrir(page);
    await page.evaluate(()=>iniciarCorredoresAmarelos());
    expect(await page.evaluate(()=>conquistaEstaDesbloqueada('cadeSaida'))).toBe(true);
    expect(await page.evaluate(()=>conquistaEstaDesbloqueada('amareloDemais'))).toBe(false);
    await page.evaluate(()=>concluirCorredoresAmarelos());
    expect(await page.evaluate(()=>conquistaEstaDesbloqueada('amareloDemais'))).toBe(true);
    expect(await page.evaluate(()=>faseAtualEhSecreta())).toBe(true);
});
