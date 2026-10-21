const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const raiz = path.resolve(__dirname, '..');
const ler = arquivo => fs.readFileSync(path.join(raiz, arquivo), 'utf8');
const codigo = ler('game.js');
const html = ler('index.htm');
const eventos = ler('modulos/eventos.js');

function avaliarTrecho(fonte, inicio, fim, expressao) {
    const posicaoInicial = fonte.indexOf(inicio);
    const posicaoFinal = fonte.indexOf(fim, posicaoInicial);
    if (posicaoInicial < 0 || posicaoFinal < 0) throw new Error(`Catálogo não encontrado: ${inicio}`);
    return vm.runInNewContext(`${fonte.slice(posicaoInicial, posicaoFinal)}\n${expressao}`, {}, { timeout: 5000 });
}

const { principais, localizados } = avaliarTrecho(
    codigo, 'const TRADUCOES =', 'let idiomaAtual =',
    '({ principais: TRADUCOES, localizados: TEXTOS_LOCALIZADOS })'
);
const dosEventos = avaliarTrecho(
    eventos, 'const TEXTOS_DOS_EVENTOS =', 'function localizarEvento(', 'TEXTOS_DOS_EVENTOS'
);
const contextoAdicional = vm.createContext({
    Image: class { constructor() { this.src = ''; } },
    window: { matchMedia: () => ({ matches: false }) },
    TELAS_DO_LOBBY_EM_TELA_CHEIA: new Set()
});
require('../tests/apoio/catalogos-idiomas.cjs').carregarCatalogosDosModulos(contextoAdicional);
const adicionais = vm.runInContext(
    '({ fase: TRADUCOES_FASE18, conquistas: TRADUCOES_NOVAS_CONQUISTAS, memoraveis: TRADUCOES_CONQUISTAS_MEMORAVEIS })',
    contextoAdicional
);
const chavesPorTexto = new Map(Object.entries(principais['pt-BR']).map(([chave, texto]) => [texto, chave]));
const textosLivres = new Set([
    ...Object.keys(localizados.en), ...Object.keys(localizados.es),
    ...Object.keys(dosEventos.en), ...Object.keys(dosEventos.es),
    ...Object.keys(adicionais.fase.en), ...Object.keys(adicionais.fase.es),
    ...Object.keys(adicionais.conquistas.en), ...Object.keys(adicionais.conquistas.es),
    ...Object.keys(adicionais.memoraveis.en), ...Object.keys(adicionais.memoraveis.es),
    ...[...codigo.matchAll(/localizar\(\s*["']([^"'\n]+)["']/g)].map(item => item[1]),
    ...[...html.matchAll(/data-localizar(?:-aria-label|-title)?="([^"]+)"/g)].map(item => item[1]),
    ...[...codigo.matchAll(/\b(?:nome|descricao|detalhe|mensagemVazia|rotulo): "([^"]+)"/g)].map(item => item[1])
]);

const variaveis = texto => [...new Set([...String(texto).matchAll(/\{([a-zA-Z_][\w]*)\}/g)].map(item => item[1]))].sort();
const iguais = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const registros = [];

function adicionar(grupo, chave, portugues, ingles, espanhol) {
    const problemas = [];
    for (const [idioma, traducao] of [['en', ingles], ['es', espanhol]]) {
        if (typeof traducao !== 'string' || !traducao.trim()) {
            problemas.push(`${idioma}: ausente`);
        } else if (!iguais(variaveis(portugues), variaveis(traducao))) {
            problemas.push(`${idioma}: variáveis ${variaveis(traducao).join(', ') || 'nenhuma'}; esperado ${variaveis(portugues).join(', ') || 'nenhuma'}`);
        }
    }
    registros.push({ grupo, chave, portugues, ingles: ingles || '', espanhol: espanhol || '', problemas });
}

for (const [chave, portugues] of Object.entries(principais['pt-BR'])) {
    adicionar('interface', chave, portugues, principais.en?.[chave], principais.es?.[chave]);
}
for (const portugues of [...textosLivres].sort((a, b) => a.localeCompare(b, 'pt-BR'))) {
    if (chavesPorTexto.has(portugues)) continue;
    const evento = Object.hasOwn(dosEventos.en, portugues) || Object.hasOwn(dosEventos.es, portugues);
    const catalogos = evento ? [dosEventos] : [adicionais.fase, adicionais.conquistas, adicionais.memoraveis, localizados];
    const obter = idioma => catalogos.find(catalogo => Object.hasOwn(catalogo[idioma] || {}, portugues))?.[idioma]?.[portugues];
    adicionar(evento ? 'eventos' : 'textos livres', '', portugues, obter('en'), obter('es'));
}

const pasta = path.join(raiz, 'artifacts', 'auditoria-idiomas');
fs.mkdirSync(pasta, { recursive: true });
const campoCsv = valor => `"${String(valor).replaceAll('"', '""')}"`;
const csv = [
    ['grupo', 'chave', 'portugues', 'ingles', 'espanhol', 'problemas'],
    ...registros.map(registro => [registro.grupo, registro.chave, registro.portugues, registro.ingles, registro.espanhol, registro.problemas.join('; ')])
].map(linha => linha.map(campoCsv).join(',')).join('\r\n');
fs.writeFileSync(path.join(pasta, 'textos.csv'), `\uFEFF${csv}\r\n`);
fs.writeFileSync(path.join(pasta, 'textos.json'), `${JSON.stringify(registros, null, 2)}\n`);

const pendencias = registros.filter(registro => registro.problemas.length);
const resumo = [
    '# Auditoria de idiomas', '',
    `Textos examinados: **${registros.length}**. Textos com pendências: **${pendencias.length}**.`,
    '',
    'Abra `textos.csv` para conferir o português, o inglês e o espanhol lado a lado.',
    'A checagem detecta ausências e variáveis diferentes. Não avalia se o sentido da tradução está correto.',
    'A lista reúne os catálogos principais, textos dos eventos, registros de módulos carregados pelo teste de idiomas e textos literais localizados em `game.js` e `index.htm`; textos dinâmicos e outros módulos ainda exigem revisão separada.',
    '', '# Pendências', ''
];
resumo.push(...(pendencias.length
    ? pendencias.map(registro => `- ${registro.grupo}${registro.chave ? ` / ${registro.chave}` : ''}: ${JSON.stringify(registro.portugues)} — ${registro.problemas.join('; ')}`)
    : ['Nenhuma nos catálogos examinados.']));
fs.writeFileSync(path.join(pasta, 'resumo.md'), `${resumo.join('\n')}\n`);
console.log(`${registros.length} textos examinados; ${pendencias.length} com pendências. Relatório: artifacts/auditoria-idiomas/`);
if (process.argv.includes('--verificar') && pendencias.length) process.exitCode = 1;
