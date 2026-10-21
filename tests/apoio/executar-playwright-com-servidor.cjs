const { spawn } = require('node:child_process');
const http = require('node:http');
const net = require('node:net');
const path = require('node:path');

const raiz = path.resolve(__dirname, '../..');

async function escolherPorta() {
    const reserva = net.createServer();
    await new Promise((resolver, rejeitar) => reserva.once('error', rejeitar).listen(0, '127.0.0.1', resolver));
    const porta = reserva.address().port;
    await new Promise(resolver => reserva.close(resolver));
    return porta;
}

async function aguardarServidor(porta, processo) {
    for (let tentativa = 0; tentativa < 50; tentativa++) {
        if (processo.exitCode !== null) throw new Error('O servidor de testes encerrou antes de ficar pronto.');
        const pronto = await new Promise(resolver => {
            const requisicao = http.get(`http://127.0.0.1:${porta}/`, resposta => {
                resposta.resume();
                resolver(resposta.statusCode === 200);
            });
            requisicao.on('error', () => resolver(false));
        });
        if (pronto) return;
        await new Promise(resolver => setTimeout(resolver, 100));
    }
    throw new Error('O servidor de testes não ficou pronto em 5 segundos.');
}

async function executar() {
    const porta = await escolherPorta();
    const ambiente = { ...process.env, PORTA_TESTES: String(porta) };
    const servidor = spawn(process.execPath, [path.join(raiz, 'tests/servidor-estatico.cjs')], {
        cwd: raiz, env: ambiente, stdio: 'ignore', windowsHide: true
    });
    try {
        await aguardarServidor(porta, servidor);
        const argumentos = [path.join(raiz, 'node_modules/@playwright/test/cli.js'), 'test', ...process.argv.slice(2)];
        const teste = spawn(process.execPath, argumentos, { cwd: raiz, env: ambiente, stdio: 'inherit', windowsHide: true });
        const codigo = await new Promise((resolver, rejeitar) => {
            teste.once('error', rejeitar);
            teste.once('exit', resolver);
        });
        process.exitCode = codigo === 0 ? 0 : 1;
    } finally {
        servidor.kill();
    }
}

executar().catch(erro => {
    console.error(erro);
    process.exitCode = 1;
});
