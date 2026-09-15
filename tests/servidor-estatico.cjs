const fs = require("fs");
const http = require("http");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const porta = Number(process.env.PORTA_TESTES || 4173);
const tipos = {
    ".css": "text/css; charset=utf-8",
    ".htm": "text/html; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mp3": "audio/mpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml"
};

http.createServer((requisicao, resposta) => {
    const url = new URL(requisicao.url, `http://${requisicao.headers.host}`);
    const caminhoPedido = decodeURIComponent(url.pathname === "/" ? "/index.htm" : url.pathname);
    const caminhoCompleto = path.resolve(raiz, `.${caminhoPedido}`);

    if (!caminhoCompleto.startsWith(`${raiz}${path.sep}`)) {
        resposta.writeHead(403).end("Acesso negado");
        return;
    }

    fs.readFile(caminhoCompleto, (erro, conteudo) => {
        if (erro) {
            resposta.writeHead(404).end("Arquivo não encontrado");
            return;
        }

        resposta.writeHead(200, {
            "Cache-Control": "no-store",
            "Content-Type": tipos[path.extname(caminhoCompleto)] || "application/octet-stream"
        });
        resposta.end(conteudo);
    });
}).listen(porta, "127.0.0.1", () => {
    console.log(`Guardians of Pixel disponível em http://127.0.0.1:${porta}`);
});
