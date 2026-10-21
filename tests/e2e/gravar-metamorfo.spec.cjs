const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

test('grava o Metamorfo se transformando sobre o caminho', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    await expect(page.locator('#tela-inicial-jogo')).toBeHidden();

    const gravacao = await page.evaluate(async () => {
        jogarEvento('superBossesMetamorfos', 'facil');
        criarInimigo('metamorfo');
        const chefe = inimigos.at(-1);
        ajustarInimigoDoEvento(chefe);
        chefe.x = 670;
        chefe.y = 350;
        chefe.alvo = 7;
        chefe.proximaTransformacaoEm = 1300;
        jogoPausado = true;
        const caminho = CONFIG.eventos.caminhos.superBossesMetamorfos;
        const sobreOCaminho = caminho.some((ponto, indice) => {
            const proximo = caminho[indice + 1];
            return proximo && ponto.x === proximo.x && ponto.x === chefe.x
                && chefe.y >= Math.min(ponto.y, proximo.y)
                && chefe.y <= Math.max(ponto.y, proximo.y);
        });
        if (!sobreOCaminho) throw new Error('Metamorfo fora do caminho.');

        const video = document.createElement('canvas');
        video.width = 840;
        video.height = 720;
        const contexto = video.getContext('2d');
        contexto.imageSmoothingEnabled = false;
        const fluxo = video.captureStream(30);
        const formato = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']
            .find(tipo => MediaRecorder.isTypeSupported(tipo));
        if (!formato) throw new Error('Gravação WebM indisponível neste navegador.');
        const partes = [];
        const gravador = new MediaRecorder(fluxo, { mimeType: formato,
            videoBitsPerSecond: 2500000 });
        gravador.ondataavailable = evento => { if (evento.data.size) partes.push(evento.data); };
        const concluido = new Promise((resolve, reject) => {
            gravador.onerror = evento => reject(evento.error);
            gravador.onstop = resolve;
        });
        gravador.start();
        for (let quadro = 0; quadro < 60; quadro++) {
            tempoDoEventoMs = 1000 + quadro * 30;
            atualizarMetamorfo(chefe, 0);
            desenharMapa();
            desenharInimigos('grandes');
            desenharTorres();
            desenharInimigos('pequenos');
            desenharBarrasDosInimigosGrandes();
            contexto.drawImage(canvas, 460, 160, 420, 360, 0, 0, 840, 720);
            await new Promise(resolve => setTimeout(resolve, 33));
        }
        gravador.stop();
        await concluido;
        fluxo.getTracks().forEach(faixa => faixa.stop());
        const arquivo = new Blob(partes, { type: formato });
        const base64 = await new Promise((resolve, reject) => {
            const leitor = new FileReader();
            leitor.onload = () => resolve(String(leitor.result).split(',')[1]);
            leitor.onerror = reject;
            leitor.readAsDataURL(arquivo);
        });
        return { base64, sobreOCaminho, formaFinal: chefe.formaMetamorfo,
            duracaoCasulo: CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesMetamorfos.duracaoCasuloMs };
    });
    expect(gravacao.sobreOCaminho).toBe(true);
    expect(gravacao.formaFinal).toBe('ciano');
    expect(gravacao.duracaoCasulo).toBe(1000);
    const bytes = Buffer.from(gravacao.base64, 'base64');
    expect(bytes.length).toBeGreaterThan(10000);
    fs.writeFileSync(path.resolve('artifacts/eventos-superbosses/metamorfo-transformacao-no-caminho.webm'), bytes);
    await page.setContent('<body style="margin:0;background:#111"><video width="840" height="720" muted playsinline></video></body>');
    const duracaoDoVideo = await page.locator('video').evaluate(async (elemento, base64) => {
        elemento.src = `data:video/webm;base64,${base64}`;
        await new Promise((resolve, reject) => {
            elemento.onloadeddata = resolve;
            elemento.onerror = reject;
        });
        elemento.currentTime = 1;
        await new Promise(resolve => { elemento.onseeked = resolve; });
        return elemento.duration;
    }, gravacao.base64);
    expect(duracaoDoVideo).toBeGreaterThan(1);
    await page.locator('video').screenshot({ path: 'artifacts/eventos-superbosses/metamorfo-video-casulo-no-caminho.png' });
});
