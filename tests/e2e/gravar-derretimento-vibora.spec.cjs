const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

test('grava a Víbora abrindo a boca, jorrando ácido e derretendo a torre', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
        localStorage.setItem('guardians-of-pixel-abertura-v1', 'true');
    });
    await page.goto('/');
    await page.locator('#botao-jogar-menu-inicial').click();
    const videoEmBase64 = await page.evaluate(async () => {
        jogarEvento('superBossesAcidos', 'medio');
        wave = 20;
        criarInimigo('viboraAcida');
        const chefe = inimigos.at(-1);
        chefe.x = 350;
        chefe.y = 130;
        chefe.alvo = 4;
        chefe.proximoAtaqueDeEventoEm = 0;
        chefe.proximoAtaqueSecundarioEm = 999999;
        const torre = criarTorreNaPartida('padrao', 455, 165);
        torre.tirosRecebidos = obterResistenciaDaTorre(torre) - 3;
        tempoDoEventoMs = 1000;
        atualizarAtaquesDosSuperBosses();
        if (cuspesAcidosDoEvento.length !== 1) throw new Error('A Víbora não iniciou o cuspe.');
        jogoPausado = true;

        const inicio = cuspesAcidosDoEvento[0].inicio;
        const duracaoDoCuspe = CONFIG.eventos.ataquesEspeciaisSuperBoss.superBossesAcidos.tempoDoCuspeMs;
        const video = document.createElement('canvas');
        video.width = 900;
        video.height = 660;
        const contexto = video.getContext('2d');
        contexto.imageSmoothingEnabled = false;
        const fluxo = video.captureStream(30);
        const formato = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']
            .find(tipo => MediaRecorder.isTypeSupported(tipo));
        if (!formato) throw new Error('Gravação WebM indisponível neste navegador.');
        const partes = [];
        const gravador = new MediaRecorder(fluxo, { mimeType: formato,
            videoBitsPerSecond: 3000000 });
        gravador.ondataavailable = evento => { if (evento.data.size) partes.push(evento.data); };
        const concluido = new Promise((resolve, reject) => {
            gravador.onerror = evento => reject(evento.error);
            gravador.onstop = resolve;
        });
        gravador.start();
        let impactoAplicado = false;
        for (let quadro = 0; quadro < 92; quadro++) {
            tempoDoEventoMs = inicio + Math.max(0, (quadro - 6) * 25);
            if (!impactoAplicado && tempoDoEventoMs >= inicio + duracaoDoCuspe) {
                atualizarAtaquesDosSuperBosses();
                if (torresDerretendoDoEvento.length !== 1) throw new Error('A torre não derreteu.');
                impactoAplicado = true;
            }
            desenharMapa();
            desenharInimigos('grandes');
            desenharTorres();
            desenharInimigos('pequenos');
            desenharBarrasDosInimigosGrandes();
            desenharMecanicaDoEvento();
            contexto.drawImage(canvas, 300, 20, 300, 220, 0, 0, 900, 660);
            await new Promise(resolve => setTimeout(resolve, 33));
        }
        gravador.stop();
        await concluido;
        fluxo.getTracks().forEach(faixa => faixa.stop());
        const arquivo = new Blob(partes, { type: formato });
        return await new Promise((resolve, reject) => {
            const leitor = new FileReader();
            leitor.onload = () => resolve(String(leitor.result).split(',')[1]);
            leitor.onerror = reject;
            leitor.readAsDataURL(arquivo);
        });
    });
    const destino = path.resolve('artifacts/eventos-superbosses/vibora-jorro-acido-v3.webm');
    const video = Buffer.from(videoEmBase64, 'base64');
    expect(video.length).toBeGreaterThan(10000);
    fs.writeFileSync(destino, video);
    await page.setContent('<body style="margin:0;background:#111"><video width="900" height="660" autoplay muted playsinline></video></body>');
    await page.locator('video').evaluate((elemento, base64) => {
        elemento.src = `data:video/webm;base64,${base64}`;
        elemento.play();
    }, videoEmBase64);
    await page.waitForTimeout(1650);
    await page.locator('video').screenshot({ path: 'artifacts/eventos-superbosses/vibora-video-v3-jato.png' });
    await page.waitForTimeout(650);
    await page.locator('video').screenshot({ path: 'artifacts/eventos-superbosses/vibora-video-v3-derretimento.png' });
});
