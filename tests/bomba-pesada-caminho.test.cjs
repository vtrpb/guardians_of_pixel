const assert = require("assert");
const fs = require("fs");

const codigo = fs.readFileSync("game.js", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

const inicioDaConfiguracao = codigo.indexOf("bombaPesada: Object.freeze({");
const fimDaConfiguracao = codigo.indexOf("melhorias: Object.freeze([])", inicioDaConfiguracao);
const configuracaoDaBomba = codigo.slice(inicioDaConfiguracao, fimDaConfiguracao);

assert.ok(inicioDaConfiguracao >= 0 && fimDaConfiguracao > inicioDaConfiguracao);
assert.ok(configuracaoDaBomba.includes("exigeCaminho: true"));
assert.ok(codigo.includes(
    "const construcaoExigeCaminho = configuracaoDaConstrucao.exigeCaminho === true;"
));
assert.ok(codigo.includes("construcaoExigeCaminho && !estaNoCaminho(x, y)"));
assert.ok(codigo.includes("const posicaoDaBomba = construcaoEhBomba"));
assert.match(
    codigo,
    /bombasPesadas\.push\(\{\s*x: xDaConstrucao,\s*y: yDaConstrucao,/
);
assert.ok(especificacao.includes(
    "A Bomba só pode ser posicionada sobre o caminho e se encaixa no centro do trecho mais próximo"
));
assert.ok(especificacao.includes("#### Ajuste: Bomba Pesada sobre o caminho"));

console.log("Bomba Pesada: posicionamento exclusivo e centralizado no caminho validado.");
