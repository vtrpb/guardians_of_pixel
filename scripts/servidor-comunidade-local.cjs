const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');

const porta = Number(process.env.PORTA_COMUNIDADE || 4174);
const arquivo = process.env.ARQUIVO_COMUNIDADE_LOCAL || path.join(__dirname, '..', 'dados', 'comunidade-local.json');
const maximoDeMapas = 100;
const maximoDeBytes = 120_000;

function responder(resposta, status, dados) {
    resposta.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-store'
    });
    resposta.end(JSON.stringify(dados));
}

function carregarMapas() {
    try {
        const dados = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        if (erro.code === 'ENOENT') return [];
        throw erro;
    }
}

function salvarMapas(mapas) {
    fs.mkdirSync(path.dirname(arquivo), { recursive: true });
    const temporario = `${arquivo}.tmp`;
    fs.writeFileSync(temporario, JSON.stringify(mapas, null, 2), { flag: 'w' });
    fs.renameSync(temporario, arquivo);
}

function assinatura(texto) {
    let valor = 2166136261;
    for (let i = 0; i < texto.length; i++) {
        valor ^= texto.charCodeAt(i);
        valor = Math.imul(valor, 16777619);
    }
    return (valor >>> 0).toString(36);
}

function lerCodigo(codigo) {
    if (typeof codigo !== 'string' || codigo.length > maximoDeBytes) return null;
    const partes = codigo.trim().split('.');
    if (partes.length !== 3 || !/^GP-MAPA-[12]$/.test(partes[0])
        || !/^[A-Za-z0-9+/=]+$/.test(partes[1]) || assinatura(partes[1]) !== partes[2]) return null;
    try {
        const conteudo = JSON.parse(Buffer.from(partes[1], 'base64').toString('utf8'));
        const mapa = conteudo.mapa;
        if (conteudo.versao !== Number(partes[0].at(-1)) || !mapa
            || !/^[a-z0-9_-]{1,80}$/i.test(mapa.idDoMapaOriginal)
            || typeof mapa.nome !== 'string' || mapa.nome.length < 1 || mapa.nome.length > 32
            || typeof mapa.criador !== 'string' || mapa.criador.length < 1 || mapa.criador.length > 18
            || typeof mapa.descricao !== 'string' || mapa.descricao.length > 140
            || !Array.isArray(mapa.waves) || mapa.waves.length < 1 || mapa.waves.length > 20) return null;
        return { id: mapa.idDoMapaOriginal, nome: mapa.nome, criador: mapa.criador, codigo: codigo.trim() };
    } catch {
        return null;
    }
}

async function lerCorpo(requisicao) {
    let texto = '';
    for await (const parte of requisicao) {
        texto += parte;
        if (texto.length > maximoDeBytes * 2) throw new Error('Corpo grande demais');
    }
    return JSON.parse(texto);
}

const servidor = http.createServer(async (requisicao, resposta) => {
    try {
        if (requisicao.method === 'OPTIONS') return responder(resposta, 204, {});
        const rota = new URL(requisicao.url, 'http://localhost').pathname;
        const arquivosDaPagina = {
            '/': ['comunidade-local.htm', 'text/html; charset=utf-8'],
            '/comunidade-local.css': ['comunidade-local.css', 'text/css; charset=utf-8'],
            '/comunidade-local.js': ['comunidade-local.js', 'text/javascript; charset=utf-8']
        };
        if (requisicao.method === 'GET' && arquivosDaPagina[rota]) {
            const [nome, tipo] = arquivosDaPagina[rota];
            resposta.writeHead(200, { 'Content-Type': tipo, 'Cache-Control': 'no-store' });
            resposta.end(fs.readFileSync(path.join(__dirname, nome)));
            return;
        }
        if (rota === '/api/mapas' && requisicao.method === 'GET') {
            return responder(resposta, 200, { mapas: carregarMapas().map(({ segredo, ...mapa }) => mapa) });
        }
        if (rota === '/api/mapas' && requisicao.method === 'POST') {
            const corpo = await lerCorpo(requisicao);
            const novo = lerCodigo(corpo.codigo);
            if (!novo) return responder(resposta, 400, { erro: 'Código de mapa inválido.' });
            const mapas = carregarMapas();
            const indice = mapas.findIndex(mapa => mapa.id === novo.id);
            if (indice >= 0 && (!corpo.segredo || corpo.segredo !== mapas[indice].segredo)) {
                return responder(resposta, 403, { erro: 'Este mapa pertence a outra publicação.' });
            }
            if (indice < 0 && mapas.length >= maximoDeMapas) {
                return responder(resposta, 409, { erro: 'A Comunidade local atingiu o limite de mapas.' });
            }
            const segredo = indice >= 0 ? mapas[indice].segredo : crypto.randomBytes(24).toString('hex');
            const registro = { ...novo, atualizadoEm: Date.now(), segredo };
            if (indice >= 0) mapas.splice(indice, 1);
            mapas.unshift(registro);
            salvarMapas(mapas);
            return responder(resposta, 200, { id: novo.id, segredo });
        }
        if (rota.startsWith('/api/mapas/') && requisicao.method === 'DELETE') {
            const id = decodeURIComponent(rota.slice('/api/mapas/'.length));
            const corpo = await lerCorpo(requisicao);
            const mapas = carregarMapas();
            const indice = mapas.findIndex(mapa => mapa.id === id);
            if (indice < 0) return responder(resposta, 200, { removido: true });
            if (!corpo.segredo || corpo.segredo !== mapas[indice].segredo) {
                return responder(resposta, 403, { erro: 'Sem autorização para retirar o mapa.' });
            }
            mapas.splice(indice, 1);
            salvarMapas(mapas);
            return responder(resposta, 200, { removido: true });
        }
        return responder(resposta, 404, { erro: 'Rota não encontrada.' });
    } catch (erro) {
        if (erro instanceof SyntaxError || erro.message === 'Corpo grande demais') {
            return responder(resposta, 400, { erro: 'Dados inválidos.' });
        }
        console.error('Erro na Comunidade local:', erro);
        return responder(resposta, 500, { erro: 'Falha ao salvar ou ler os mapas.' });
    }
});

if (require.main === module) {
    servidor.listen(porta, '0.0.0.0', () => {
        console.log(`Comunidade local pronta na porta ${porta}. Mantenha esta janela aberta.`);
        for (const interfaces of Object.values(os.networkInterfaces())) {
            for (const endereco of interfaces || []) {
                if (endereco.family === 'IPv4' && !endereco.internal) {
                    console.log(`Endereço para os amigos: http://${endereco.address}:${porta}`);
                }
            }
        }
        console.log(`Neste computador: http://127.0.0.1:${porta}`);
    });
}

module.exports = { servidor, lerCodigo };
