const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require('@playwright/test');

async function gerarIcone() {
    const raiz = path.resolve(__dirname, '..');
    const svg = await fs.readFile(path.join(raiz, 'assets/guardians-of-pixel.svg'), 'utf8');
    const navegador = await chromium.launch({ channel: 'msedge', headless: true });
    let imagens;
    try {
        const pagina = await navegador.newPage();
        imagens = await pagina.evaluate(async (arte) => {
            const endereco = URL.createObjectURL(new Blob([arte], { type: 'image/svg+xml' }));
            try {
                const imagem = new Image();
                imagem.src = endereco;
                await imagem.decode();
                const base = document.createElement('canvas');
                base.width = base.height = 64;
                base.getContext('2d').drawImage(imagem, 0, 0, 64, 64);
                return [32, 48, 256].map((tamanho) => {
                    const tela = document.createElement('canvas');
                    tela.width = tela.height = tamanho;
                    const contexto = tela.getContext('2d');
                    contexto.imageSmoothingEnabled = false;
                    contexto.drawImage(base, 0, 0, tamanho, tamanho);
                    return { tamanho, dados: tela.toDataURL('image/png').split(',')[1] };
                });
            } finally {
                URL.revokeObjectURL(endereco);
            }
        }, svg);
    } finally {
        await navegador.close();
    }

    const entradas = imagens.map(({ tamanho, dados }) => ({ tamanho, png: Buffer.from(dados, 'base64') }));
    const cabecalho = Buffer.alloc(6 + entradas.length * 16);
    cabecalho.writeUInt16LE(1, 2);
    cabecalho.writeUInt16LE(entradas.length, 4);
    let deslocamento = cabecalho.length;
    entradas.forEach(({ tamanho, png }, indice) => {
        const inicio = 6 + indice * 16;
        cabecalho.writeUInt8(tamanho === 256 ? 0 : tamanho, inicio);
        cabecalho.writeUInt8(tamanho === 256 ? 0 : tamanho, inicio + 1);
        cabecalho.writeUInt16LE(1, inicio + 4);
        cabecalho.writeUInt16LE(32, inicio + 6);
        cabecalho.writeUInt32LE(png.length, inicio + 8);
        cabecalho.writeUInt32LE(deslocamento, inicio + 12);
        deslocamento += png.length;
    });
    const dadosDoIcone = Buffer.concat([cabecalho, ...entradas.map(({ png }) => png)]);
    await fs.writeFile(path.join(raiz, 'assets/guardians-of-pixel.ico'), dadosDoIcone);
    await fs.writeFile(path.join(raiz, 'assets/guardians-of-pixel-atalho-2.ico'), dadosDoIcone);
    await fs.writeFile(path.join(raiz, 'artifacts/icone-jogo-revisado.png'), entradas[2].png);
    console.log('Ícone gerado em 32, 48 e 256 px.');
}

gerarIcone().catch((erro) => {
    console.error(erro);
    process.exitCode = 1;
});
