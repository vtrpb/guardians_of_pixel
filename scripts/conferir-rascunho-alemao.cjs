const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const raiz = path.resolve(__dirname, '..');
const codigo = fs.readFileSync(path.join(raiz, 'game.js'), 'utf8');
const inicio = codigo.indexOf('const TRADUCOES =');
const fim = codigo.indexOf('const CHAVES_PRINCIPAIS_POR_TEXTO', inicio);
if (inicio < 0 || fim < 0) throw new Error('Catálogo principal não encontrado.');
const portugues = vm.runInNewContext(`${codigo.slice(inicio, fim)}\nTRADUCOES['pt-BR']`);
const pasta = path.join(raiz, 'traducoes-em-preparo');
const arquivos = [
    'interface-inicial.json', 'lobby.json',
    'alemao-progresso-e-treinamento.json', 'alemao-treinamento-editor.json',
    'alemao-editor-loja.json'
];
const alemao = {};

for (const arquivo of arquivos) {
    const catalogo = JSON.parse(fs.readFileSync(path.join(pasta, arquivo), 'utf8'));
    const entradas = catalogo['de-DE'] || catalogo;
    for (const [chave, texto] of Object.entries(entradas)) {
        if (Object.hasOwn(alemao, chave)) throw new Error(`Chave duplicada: ${chave}`);
        alemao[chave] = texto;
    }
}

const variaveis = texto => [...String(texto).matchAll(/\{([^}]+)\}/g)].map(item => item[1]).sort();
for (const [chave, texto] of Object.entries(alemao)) {
    if (!Object.hasOwn(portugues, chave)) throw new Error(`Chave desconhecida: ${chave}`);
    if (!texto.trim()) throw new Error(`Texto vazio: ${chave}`);
    if (JSON.stringify(variaveis(portugues[chave])) !== JSON.stringify(variaveis(texto))) {
        throw new Error(`Variáveis diferentes: ${chave}`);
    }
}

console.log(`Alemão: ${Object.keys(alemao).length}/${Object.keys(portugues).length} chaves principais preparadas; sem chaves duplicadas ou variáveis divergentes.`);

const relatorio = path.join(raiz, 'artifacts/auditoria-idiomas/textos.json');
if (!fs.existsSync(relatorio)) require('./auditar-idiomas.cjs');
const registros = JSON.parse(fs.readFileSync(relatorio, 'utf8'));
const textosDosEventos = Object.fromEntries(registros.filter(registro => registro.grupo === 'eventos')
    .map(registro => [registro.portugues, registro]));
const eventosEmAlemao = {};
for (const arquivo of ['alemao-eventos-1.json', 'alemao-eventos-2.json', 'alemao-eventos-3.json', 'alemao-eventos-4.json', 'alemao-eventos-5.json', 'alemao-eventos-6.json', 'alemao-eventos-7.json', 'alemao-eventos-8.json', 'alemao-eventos-9.json']) {
    const entradas = JSON.parse(fs.readFileSync(path.join(pasta, arquivo), 'utf8'));
    for (const [texto, traducao] of Object.entries(entradas)) {
        if (Object.hasOwn(eventosEmAlemao, texto)) throw new Error(`Texto de evento duplicado: ${texto}`);
        if (!Object.hasOwn(textosDosEventos, texto)) throw new Error(`Texto de evento desconhecido: ${texto}`);
        if (JSON.stringify(variaveis(texto)) !== JSON.stringify(variaveis(traducao))) {
            throw new Error(`Variáveis diferentes no evento: ${texto}`);
        }
        eventosEmAlemao[texto] = traducao;
    }
}
console.log(`Eventos: ${Object.keys(eventosEmAlemao).length}/${Object.keys(textosDosEventos).length} textos preparados; sem duplicatas ou variáveis divergentes.`);

const textosLivres = registros.filter(registro => registro.grupo === 'textos livres');
const traducoesLivres = {};
for (const arquivo of Array.from({length: 67}, (_, indice) => `alemao-textos-livres-${indice + 1}.json`)) {
    const entradas = JSON.parse(fs.readFileSync(path.join(pasta, arquivo), 'utf8'));
    for (const [original, traducao] of Object.entries(entradas)) {
        if (Object.hasOwn(traducoesLivres, original)) throw new Error(`Texto livre duplicado: ${original}`);
        traducoesLivres[original] = traducao;
    }
}
const fontesLivres = new Set(textosLivres.map(registro => registro.portugues));
for (const [original, traducao] of Object.entries(traducoesLivres)) {
    if (!fontesLivres.has(original)) throw new Error(`Texto livre desconhecido: ${original}`);
    if (!traducao.trim()) throw new Error(`Tradução livre vazia: ${original}`);
    if (JSON.stringify(variaveis(original)) !== JSON.stringify(variaveis(traducao))) {
        throw new Error(`Variáveis diferentes no texto livre: ${original}`);
    }
    if (/^\s/.test(original) !== /^\s/.test(traducao)) {
        throw new Error(`Espaço inicial divergente no texto livre: ${original}`);
    }
}
const textosNovos = JSON.parse(fs.readFileSync(path.join(pasta, 'alemao-textos-novos.json'), 'utf8'));
for (const registro of textosLivres.filter(registro => !Object.hasOwn(textosNovos, registro.portugues))
    .slice(0, Object.keys(traducoesLivres).length)) {
    if (!Object.hasOwn(traducoesLivres, registro.portugues)) {
        throw new Error(`Texto livre fora de sequência: ${registro.portugues}`);
    }
}
for (const [original, traducao] of Object.entries(textosNovos)) {
    if (!fontesLivres.has(original)) throw new Error(`Texto novo desconhecido: ${original}`);
    if (Object.hasOwn(traducoesLivres, original)) throw new Error(`Texto novo duplicado: ${original}`);
    if (!traducao.trim()) throw new Error(`Tradução nova vazia: ${original}`);
    if (JSON.stringify(variaveis(original)) !== JSON.stringify(variaveis(traducao))) {
        throw new Error(`Variáveis diferentes no texto novo: ${original}`);
    }
    traducoesLivres[original] = traducao;
}
console.log(`Textos livres: ${Object.keys(traducoesLivres).length}/${textosLivres.length} preparados; sem variáveis divergentes.`);
