const { chromium } = require('@playwright/test');
const fs = require('node:fs');
(async () => {
    const navegador = await chromium.launch();
    const pagina = await navegador.newPage({ viewport: { width: 800, height: 900 } });
    await pagina.setContent('<video muted style="height:880px;max-width:100%"></video>');
    const dados = fs.readFileSync(process.argv[2]).toString('base64');
    const duracao = await pagina.evaluate(async dados => {
        const video = document.querySelector('video');
        video.src = 'data:video/mp4;base64,' + dados;
        await new Promise((ok, falha) => { video.onloadeddata = ok; video.onerror = falha; });
        return video.duration;
    }, dados);
    console.log({ duracao });
    for (const fracao of [0.35, 0.6, 0.65, 0.85]) {
        await pagina.evaluate(async tempo => {
            const video = document.querySelector('video');
            await new Promise(ok => { video.onseeked = ok; video.currentTime = tempo; });
        }, duracao * fracao);
        await pagina.locator('video').screenshot({ path: `test-results/video-${fracao}.png` });
    }
    await navegador.close();
})();
