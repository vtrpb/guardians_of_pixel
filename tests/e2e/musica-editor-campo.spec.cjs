const { test, expect } = require('@playwright/test');

const codigoDoMapa = 'GP-MAPA-1.eyJ2ZXJzYW8iOjEsIm1hcGEiOnsiaWREb01hcGFPcmlnaW5hbCI6Im1hcGEtbXZlNG94ZGEteWsxczI3Iiwibm9tZSI6ImZneCIsImNyaWFkb3IiOiJzZFxcZyIsImRlc2NyaWNhbyI6InNyZ2ZcXCIsInRlbWEiOiJjYW1wbyIsImlkRG9DYW1pbmhvIjoiemlndWV6YWd1ZSIsIm5pdmVsRGVEZWNvcmFjb2VzIjoyLCJjcmVkaXRvc0luaWNpYWlzIjoyMDAwLCJsaW1pdGVEZVRvcnJlcyI6Mywid2F2ZXMiOlt7ImdydXBvcyI6W3sidGlwbyI6Im5vcm1hbCIsInF1YW50aWRhZGUiOjV9XX0seyJncnVwb3MiOlt7InRpcG8iOiJyYXBpZG8iLCJxdWFudGlkYWRlIjo3fV19LHsiZ3J1cG9zIjpbeyJ0aXBvIjoiZWxpdGUiLCJxdWFudGlkYWRlIjo0fV19XX19.11gy770';

test('mapa Campo verde do Editor usa a trilha da Fase 1 e nunca o MP3 antigo', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true'));
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    const resultado = await page.evaluate(codigo => {
        const mapa = importarMapaPeloCodigo(codigo);
        if (!mapa) throw new Error('O código compartilhado não foi importado.');
        mapaPersonalizadoAtivo = mapa;
        faseSelecionada = CONFIG.editorDeFases.numeroInterno;
        musicaPausadaPeloJogador = false;
        selecionarTrilhaDaPartida();
        const inicial = { tema: mapa.tema, fase: faseSelecionada, pixelada: musicaPixeladaDaFase1Tocando, arquivoPausado: musica.paused };
        ajustarVolumeDaMusica(0);
        const silenciada = !musicaPixeladaDaFase1Tocando && musica.paused;
        ajustarVolumeDaMusica(50);
        const retomada = musicaPixeladaDaFase1Tocando && musica.paused;
        selecionarTrilhaDoLobby();
        return { inicial, silenciada, retomada, lobby: trilhaDoLobbyAtiva && !musicaPixeladaDaFase1Tocando && musica.paused, fonteAntiga: Boolean(musica.querySelector('source')?.getAttribute('src')) };
    }, codigoDoMapa);
    expect(resultado).toEqual({
        inicial: { tema: 'campo', fase: 101, pixelada: true, arquivoPausado: true },
        silenciada: true,
        retomada: true,
        lobby: true,
        fonteAntiga: false
    });
    await expect(page.locator('#musica source')).toHaveCount(0);
});
