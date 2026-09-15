const { test, expect } = require('@playwright/test');

test('Sete partituras distintas preservam a Forja e as trilhas fora do escopo', async ({ page }) => {
    const erros = []; page.on('pageerror', erro => erros.push(erro.message));
    await page.goto('/'); await page.locator('#botao-jogar-menu-inicial').click();
    const dados = await page.evaluate(() => {
        const notasOriginais = tocarNotaSintetizada, ruidoOriginal = tocarRuidoSintetizado;
        const ciclos = [];
        try {
            for (const numero of [4,7,8,9,10,11,15]) {
                faseSelecionada = numero; selecionarTrilhaDaPartida();
                const c = numero === 7 ? obterConfiguracaoDaMusicaDoPantano() : obterConfiguracaoDaMusicaDaSelva();
                const eventos = [];
                tocarNotaSintetizada = (...args) => eventos.push(args.slice(0,5));
                tocarRuidoSintetizado = () => {};
                let passo = 0;
                const total = c.frases[0].length * c.ordem.length;
                for (let i=0;i<total;i++) passo = tocarPassoDaPartituraPixelada({currentTime:i*c.intervaloDoPasso/1000},c,passo,ganhoDaMusicaDaSelva);
                ciclos.push({numero,nome:c.nomeInterno,passo,total,quantidade:eventos.length,
                    valido:eventos.every(e=>Number.isFinite(e[0]) && e[0]>0 && e[2]>0 && e[4]>0),
                    assinatura:JSON.stringify(c.frases), tocando:numero===7?musicaDoPantanoTocando:musicaDaSelvaTocando});
            }
        } finally { tocarNotaSintetizada=notasOriginais; tocarRuidoSintetizado=ruidoOriginal; }
        faseSelecionada = 6; selecionarTrilhaDaPartida();
        const forja = JSON.parse(JSON.stringify(CONFIG.audio.musicaDaForja));
        const fora = [12,13,14,16].map(numero=>{
            faseSelecionada=numero; selecionarTrilhaDaPartida();
            return !obterConfiguracaoDaMusicaDaSelva().frases;
        });
        faseSelecionada=15; selecionarTrilhaDaPartida();
        alternarMusica(); const silenciou=!musicaDaSelvaTocando;
        tocarMusica(); const retomou=musicaDaSelvaTocando;
        selecionarTrilhaDoLobby();
        return {ciclos,forja,fora,silenciou,retomou,lobby:musicaDoLobbyTocando && !musicaDaSelvaTocando && !musicaDoPantanoTocando};
    });
    expect(dados.ciclos.every(c=>c.valido && c.passo===0 && c.quantidade>20 && c.tocando)).toBe(true);
    expect(new Set(dados.ciclos.map(c=>c.assinatura)).size).toBe(7);
    expect(dados.forja).toEqual({intervaloDoPasso:240,volumeRelativo:1.55,
        melodia:[164.81,196,220,207.65,164.81,233.08,220,196,146.83,174.61,207.65,196,146.83,220,196,174.61],
        baixo:[55,58.27,49,51.91],percussao:[1,.25,.7,.35,1,.4,.78,.3]});
    expect(dados.fora.every(Boolean)).toBe(true);
    expect(dados.silenciou).toBe(true);
    expect(dados.retomou).toBe(true);
    await expect.poll(() => page.evaluate(() => musicaDoLobbyTocando && !musicaDaSelvaTocando && !musicaDoPantanoTocando)).toBe(true);
    expect(erros).toEqual([]);
});

test('Renderização de ciclos completos: áudio finito, audível e sem saturação digital', async ({page}) => {
    await page.goto('/');
    const resultados = await page.evaluate(async () => {
        const original = obterContextoAudio;
        const resultados = [];
        try {
            for (const [fase,c] of Object.entries(CONFIG.audio.partiturasPorFase)) {
                const passos = c.frases[0].length*c.ordem.length;
                const segundos = passos*c.intervaloDoPasso/1000 + 5;
                const offline = new OfflineAudioContext(1,Math.ceil(segundos*22050),22050);
                obterContextoAudio = () => offline;
                const ganho = offline.createGain(); ganho.gain.value = c.volumeRelativo; ganho.connect(offline.destination);
                for (let i=0;i<passos;i++) tocarPassoDaPartituraPixelada({currentTime:i*c.intervaloDoPasso/1000},c,i,ganho);
                const buffer = await offline.startRendering();
                let pico=0,energia=0;
                for(const amostra of buffer.getChannelData(0)) { pico=Math.max(pico,Math.abs(amostra));energia+=amostra*amostra; }
                resultados.push({fase,pico,rms:Math.sqrt(energia/buffer.length)});
            }
        } finally { obterContextoAudio = original; }
        return resultados;
    });
    for (const r of resultados) {
        expect(r.pico, `fase ${r.fase}`).toBeLessThan(1);
        expect(r.rms, `fase ${r.fase}`).toBeGreaterThan(.005);
    }
});
