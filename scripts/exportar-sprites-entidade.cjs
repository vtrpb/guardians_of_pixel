const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('@playwright/test');

async function exportarSpritesDaEntidade() {
    const raiz = path.resolve(__dirname, '..');
    const navegador = await chromium.launch();
    try {
        const pagina = await navegador.newPage();
        await pagina.goto(pathToFileURL(path.join(raiz, 'index.htm')).href);
        await pagina.waitForFunction(() =>
            typeof desenharRetratoDaEntidadeDoLimbo === 'function'
            && !!document.querySelector('.retrato-entidade-abertura')
        );
        const sprites = await pagina.evaluate(async () => {
            const retrato = document.createElement('canvas');
            retrato.width = 96;
            retrato.height = 128;
            desenharRetratoDaEntidadeDoLimbo(retrato.getContext('2d'));
            const personagemNoMapa = document.createElement('canvas');
            personagemNoMapa.width = 36;
            personagemNoMapa.height = 48;
            const contextoDoMapa = personagemNoMapa.getContext('2d');
            contextoDoMapa.imageSmoothingEnabled = false;
            contextoDoMapa.drawImage(retrato, 0, 0, 36, 48);

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('width', '18');
            svg.setAttribute('height', '22');
            svg.setAttribute('viewBox', '120 129 18 22');
            svg.setAttribute('shape-rendering', 'crispEdges');
            const posicao = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            posicao.setAttribute('transform', 'translate(0 -12)');
            const silhueta = document.querySelector('.retrato-entidade-abertura').cloneNode(true);
            silhueta.removeAttribute('hidden');
            posicao.append(silhueta);
            svg.append(posicao);
            const textoSvg = new XMLSerializer().serializeToString(svg);

            const imagem = new Image();
            imagem.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(textoSvg)}`;
            await imagem.decode();
            const abertura = document.createElement('canvas');
            abertura.width = 18;
            abertura.height = 22;
            abertura.getContext('2d').drawImage(imagem, 0, 0);

            return {
                retratoPng: retrato.toDataURL('image/png').split(',')[1],
                mapaPng: personagemNoMapa.toDataURL('image/png').split(',')[1],
                aberturaPng: abertura.toDataURL('image/png').split(',')[1],
                aberturaSvg: textoSvg
            };
        });
        const diretorioDeSaida = path.join(raiz, 'artifacts', 'sprites-entidade');
        fs.mkdirSync(diretorioDeSaida, { recursive: true });
        fs.writeFileSync(path.join(diretorioDeSaida, 'entidade-dialogo-96x128.png'), Buffer.from(sprites.retratoPng, 'base64'));
        fs.writeFileSync(path.join(diretorioDeSaida, 'entidade-mapa-36x48.png'), Buffer.from(sprites.mapaPng, 'base64'));
        fs.writeFileSync(path.join(diretorioDeSaida, 'entidade-abertura-18x22.png'), Buffer.from(sprites.aberturaPng, 'base64'));
        fs.writeFileSync(path.join(diretorioDeSaida, 'entidade-abertura-18x22.svg'), sprites.aberturaSvg);
        console.log('Sprites da entidade exportados em artifacts/sprites-entidade/.');
    } finally {
        await navegador.close();
    }
}

exportarSpritesDaEntidade().catch(erro => {
    console.error(erro);
    process.exitCode = 1;
});
