const assert = require("assert");
const fs = require("fs");

const html = fs.readFileSync("index.htm", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const javascript = fs.readFileSync("game.js", "utf8");
const especificacao = fs.readFileSync("docs/ESPECIFICACAO.md", "utf8");

assert.ok(html.includes('id="conteudo-menu" class="conteudo-menu"'));
assert.ok(html.includes("styles.css?v=maquina-tempo-1"));
assert.ok(html.includes("game.js?v=maquina-tempo-1"));

for (const tela of [
    "album",
    "capitulos",
    "fases",
    "tutorial",
    "loja",
    "pacoteApoiador",
    "missoes",
    "conquistas",
    "salvos"
]) {
    assert.match(javascript, new RegExp(`definirTelaDoMenuAberta\\(\\s*(["'])${tela}\\1\\s*\\)`));
}

assert.match(javascript, /const TELAS_DO_LOBBY_EM_TELA_CHEIA = new Set/);
assert.match(javascript, /classList\.toggle\("pagina-menu-aberta", telaAtualEhPagina\)/);
assert.match(javascript, /classList\.toggle\("conteudo-menu-tela-cheia", telaAtualEhPagina\)/);
assert.match(javascript, /conteudoMenu\.querySelector\("\.botao-fechar"\)\?\.focus\(\)/);
assert.match(javascript, /evento\.key === "Escape"[\s\S]*?conteudo-menu-tela-cheia[\s\S]*?fecharConteudoMenu\(\)/);
assert.match(javascript, /camadaTransicaoGlitch\.hidden = false/);
assert.match(javascript, /camadaConversaPortal\.classList\.add\("camada-conversa-senhor-tempo"\)/);

assert.match(css, /\.menu-principal \.conteudo-menu\.conteudo-menu-tela-cheia\s*\{[\s\S]*?position: fixed;/);
assert.match(css, /\.menu-principal \.conteudo-menu\.conteudo-menu-tela-cheia\s*\{[\s\S]*?inset: 0;/);
assert.match(css, /\.menu-principal \.conteudo-menu\.conteudo-menu-tela-cheia\s*\{[\s\S]*?height: 100dvh;/);
assert.match(css, /\.menu-principal \.conteudo-menu\.conteudo-menu-tela-cheia\s*\{[\s\S]*?overflow-y: auto;/);
assert.match(css, /\.menu-principal\.pagina-menu-aberta \.menu-cartao\s*\{[\s\S]*?overflow: hidden;/);

assert.match(especificacao, /### Mudança: páginas de conteúdo em tela inteira no lobby/);
assert.match(especificacao, /Capítulos.*Álbum.*Como jogar.*Loja.*Pacote Apoiador.*Missões.*Conquistas/);
assert.match(especificacao, /Missões.*missões diárias e semanais.*contador independente de 100 missões resgatadas/);
assert.doesNotMatch(especificacao, /Missões.*painel de 100 objetivos permanentes/);
assert.match(especificacao, /Configurações.*continua usando sua caixa central atual/);
assert.match(especificacao, /portal secreto mantém a transição fixa e o balão do Senhor do Tempo/i);

console.log("Páginas do lobby: tela inteira, fechamento e exceções validados.");
