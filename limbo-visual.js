// Cenário nativo do canvas: nenhuma imagem externa é necessária.
// Os mesmos móveis definem o desenho e a colisão.
const LIGACOES_NOVAS_DO_CASTELO = Object.freeze({
    salao: [
        { x: 65, y: 178, nome: "Sala de estar", destino: "estar", chegadaX: 320, chegadaY: 320 },
        { x: 65, y: 302, nome: "Biblioteca", destino: "biblioteca", chegadaX: 320, chegadaY: 320 }
    ],
    andar: [{ x: 155, y: 70, nome: "Galeria", destino: "galeria", chegadaX: 320, chegadaY: 320 }],
    estar: [{ x: 320, y: 350, nome: "Voltar ao salão", destino: "salao", chegadaX: 108, chegadaY: 178 }],
    biblioteca: [{ x: 320, y: 350, nome: "Voltar ao salão", destino: "salao", chegadaX: 108, chegadaY: 302 }],
    galeria: [{ x: 320, y: 350, nome: "Voltar ao corredor", destino: "andar", chegadaX: 155, chegadaY: 112 }]
});

const MOBILIARIO_DO_CASTELO = Object.freeze({
    salao: [
        { tipo: "mesa", x: 200, y: 145, w: 240, h: 70, solido: true },
        { tipo: "aparador", x: 105, y: 77, w: 96, h: 40, solido: true },
        { tipo: "vaso", x: 495, y: 82, w: 24, h: 35, solido: true },
        { tipo: "retrato", x: 218, y: 44, w: 42, h: 51 },
        { tipo: "estandarte", x: 370, y: 41, w: 28, h: 60 },
        { tipo: "vaso", x: 488, y: 300, w: 24, h: 35, solido: true }
    ],
    andar: [
        { tipo: "estandarte", x: 235, y: 43, w: 26, h: 59 },
        { tipo: "retrato", x: 368, y: 43, w: 48, h: 55 },
        { tipo: "banco", x: 420, y: 260, w: 100, h: 28, solido: true },
        { tipo: "vaso", x: 94, y: 90, w: 24, h: 35, solido: true },
        { tipo: "aparador", x: 122, y: 263, w: 78, h: 36, solido: true }
    ],
    real: [
        { tipo: "tapete", x: 220, y: 205, w: 195, h: 98 },
        { tipo: "camaReal", x: 245, y: 75, w: 140, h: 115, solido: true },
        { tipo: "criado", x: 198, y: 114, w: 31, h: 40, solido: true },
        { tipo: "criado", x: 401, y: 114, w: 31, h: 40, solido: true },
        { tipo: "retratoCasal", x: 403, y: 94, w: 27, h: 29 },
        { tipo: "armario", x: 80, y: 82, w: 70, h: 96, solido: true },
        { tipo: "poltrona", x: 476, y: 258, w: 50, h: 60, solido: true },
        { tipo: "estandarte", x: 171, y: 43, w: 26, h: 58 }
    ],
    hospedes: [
        { tipo: "tapete", x: 252, y: 211, w: 212, h: 83 },
        { tipo: "cama", x: 390, y: 90, w: 85, h: 100, solido: true },
        { tipo: "criado", x: 492, y: 117, w: 31, h: 40, solido: true },
        { tipo: "aparador", x: 93, y: 115, w: 88, h: 40, solido: true },
        { tipo: "espelho", x: 108, y: 52, w: 48, h: 57 },
        { tipo: "retrato", x: 262, y: 48, w: 57, h: 59 },
        { tipo: "vaso", x: 535, y: 282, w: 24, h: 35, solido: true }
    ],
    varanda: [],
    estar: [
        { tipo: "tapete", x: 126, y: 170, w: 367, h: 158 },
        { tipo: "lareira", x: 268, y: 57, w: 104, h: 88, solido: true },
        { tipo: "sofa", x: 148, y: 193, w: 143, h: 59, solido: true },
        { tipo: "poltrona", x: 394, y: 191, w: 58, h: 69, solido: true },
        { tipo: "mesaBaixa", x: 268, y: 279, w: 98, h: 31, solido: true },
        { tipo: "estante", x: 82, y: 70, w: 64, h: 90, solido: true },
        { tipo: "retrato", x: 426, y: 49, w: 54, h: 64 },
        { tipo: "vaso", x: 515, y: 114, w: 24, h: 35, solido: true }
    ],
    biblioteca: [
        { tipo: "estante", x: 76, y: 65, w: 102, h: 98, solido: true },
        { tipo: "estante", x: 233, y: 65, w: 169, h: 98, solido: true },
        { tipo: "estante", x: 459, y: 65, w: 100, h: 98, solido: true },
        { tipo: "tapete", x: 200, y: 199, w: 230, h: 102 },
        { tipo: "escrivaninha", x: 235, y: 220, w: 151, h: 55, solido: true },
        { tipo: "poltrona", x: 84, y: 249, w: 52, h: 61, solido: true },
        { tipo: "globo", x: 492, y: 258, w: 34, h: 43, solido: true }
    ],
    galeria: [
        { tipo: "tapete", x: 227, y: 103, w: 185, h: 192 },
        ...[86, 204, 380, 498].map(x => ({ tipo: "retrato", x, y: 56, w: 54, h: 67 })),
        { tipo: "armadura", x: 134, y: 205, w: 43, h: 64, solido: true },
        { tipo: "armadura", x: 459, y: 205, w: 43, h: 64, solido: true },
        { tipo: "banco", x: 263, y: 261, w: 112, h: 28, solido: true }
    ]
});

function blocoVisualDoLimbo(cor, x, y, w, h) {
    contextoExploracaoLimbo.fillStyle = cor;
    contextoExploracaoLimbo.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function desenharAlvenariaDoLimbo(x, y, w, h, arena = false) {
    const c = contextoExploracaoLimbo;
    c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
    blocoVisualDoLimbo(arena ? "#433039" : "#302b3b", x, y, w, h);
    for (let linha = 0; linha < h / 14; linha++) for (let coluna = -1; coluna < w / 32 + 1; coluna++) {
        const bx = x + coluna * 32 + linha % 2 * 16, by = y + linha * 14;
        blocoVisualDoLimbo(arena ? "#806250" : "#65586b", bx + 1, by + 1, 30, 12);
        blocoVisualDoLimbo(arena ? "#a18361" : "#827288", bx + 2, by + 1, 28, 2);
        if ((linha + coluna) % 4 === 0) blocoVisualDoLimbo(arena ? "#5b4540" : "#4e435b", bx + 17, by + 5, 8, 2);
    }
    c.restore();
}

function desenharTochaDoLimbo(x, y) {
    const b = blocoVisualDoLimbo;
    b("#27202e", x - 5, y + 4, 10, 20); b("#bfa467", x - 3, y + 5, 6, 12);
    b("#bf5d34", x - 5, y - 5, 10, 12); b("#e7ad4e", x - 3, y - 8, 6, 13); b("#ffe29a", x - 1, y - 3, 3, 8);
}

function desenharPortaDoCastelo(x, y, lateral = false) {
    const c = contextoExploracaoLimbo, b = blocoVisualDoLimbo;
    c.save(); c.translate(x, y);
    if (lateral) {
        // Folha vertical vista de cima: topo e espessura em degraus pixelados.
        const sentido = x < 320 ? 1 : -1;
        for (let faixa = 0; faixa < 7; faixa++) {
            const px = sentido * faixa * 3;
            const py = -27 + faixa * 3;
            b("#211b29", px - 2, py - 3, 5, 49);
            b("#836043", px, py, 3, 39);
            b("#bd9868", px, py - 3, 3, 3);
            b("#49352e", px, py + 11, 3, 3);
            b("#49352e", px, py + 31, 3, 3);
        }
        b("#aa9596", -4, -34, 8, 9);
        b("#766475", -4, -25, 7, 43);
        b("#e0bd6c", sentido * 16, 6, 4, 5);
        c.restore();
        return;
    }
    // Profundidade do batente superior, sem inclinar o resto do cenário.
    for (let faixa = 0; faixa < 4; faixa++) b("#baa59d", -24 + faixa * 2, -36 + faixa * 2, 48, 2);
    b("#211b29", -24, -30, 48, 45);
    b("#9c8990", -23, -29, 46, 6); b("#766475", -24, -24, 6, 38); b("#766475", 18, -24, 6, 38);
    b("#543b30", -18, -23, 36, 35);
    for (let px = -16; px < 18; px += 7) b("#836043", px, -21, 5, 31);
    b("#3b3040", -17, -14, 34, 4); b("#3b3040", -17, 3, 34, 4);
    b("#e0bd6c", 8, -5, 4, 5); b("#aa9596", -24, 12, 48, 4);
    c.restore();
}

function desenharEscadaDoCastelo(x, y, descendo = false) {
    const b = blocoVisualDoLimbo;
    b("#292230", x - 35, y - 25, 70, 51);
    for (let degrau = 0; degrau < 7; degrau++) {
        const largura = descendo ? 58 - degrau * 3 : 40 + degrau * 3;
        b("#8d8291", x - largura / 2, y - 23 + degrau * 7, largura, 6);
        b("#d3c4b1", x - largura / 2, y - 23 + degrau * 7, largura, 2);
    }
    b("#6d5269", x - 35, y - 28, 6, 54); b("#6d5269", x + 29, y - 28, 6, 54);
    b("#e0c57c", x - 36, y + 22, 8, 7); b("#e0c57c", x + 28, y + 22, 8, 7);
}

function desenharPortaRetratoDoLimbo(c, x, y, w, h) {
    c.save();
    c.translate(x, y); c.scale(w / 80, h / 88);
    const b = (cor, px, py, largura, altura) => { c.fillStyle = cor; c.fillRect(px, py, largura, altura); };
    // Suporte traseiro aparente, moldura e pé apoiados na superfície.
    for (let i = 0; i < 8; i++) b("#6b4b36", 3 + i * 3, 66 - i * 4, 5, 12 + i * 3);
    b("#352736", 23, 8, 54, 75);
    b("#98713e", 19, 3, 54, 77); b("#dec18b", 22, 5, 47, 72);
    b("#72503c", 26, 10, 39, 62); b("#333044", 29, 13, 33, 56);
    b("#654367", 31, 43, 15, 24); b("#d3b575", 36, 46, 4, 21);
    b("#171520", 33, 29, 11, 15); b("#e2bd60", 32, 26, 13, 5);
    for (const px of [32, 37, 42]) b("#e2bd60", px, 23, 3, 5);
    b("#ad829d", 46, 46, 14, 21); b("#49303c", 47, 30, 12, 17);
    b("#c6a18b", 49, 32, 8, 12); b("#e2bd60", 47, 28, 12, 4);
    b("#ead29b", 48, 25, 3, 5); b("#ead29b", 55, 25, 3, 5);
    b("#98713e", 17, 78, 59, 5); b("#dec18b", 19, 78, 54, 2);
    c.restore();
}

function desenharMovelDoCastelo(m) {
    const c = contextoExploracaoLimbo, b = blocoVisualDoLimbo;
    const { x, y, w, h, tipo } = m;
    if (tipo === "retratoCasal") { desenharPortaRetratoDoLimbo(c, x, y, w, h); return; }
    if (tipo === "tapete") {
        b("#553144", x, y, w, h); b("#bc9862", x + 4, y + 4, w - 8, h - 8); b("#63364e", x + 7, y + 7, w - 14, h - 14);
        for (let px = x + 16; px < x + w - 12; px += 22) { b("#9a715f", px, y + 12, 5, 5); b("#9a715f", px, y + h - 17, 5, 5); }
        return;
    }
    if (["retrato", "espelho"].includes(tipo)) {
        b("#211923", x + 4, y + 5, w, h); b("#795531", x, y, w, h); b("#d3b271", x + 3, y + 3, w - 6, h - 6);
        b(tipo === "espelho" ? "#6c8998" : "#33394a", x + 7, y + 7, w - 14, h - 14);
        if (tipo === "espelho") { b("#b5cdd0", x + 12, y + 12, 5, h - 28); b("#8daab7", x + 19, y + 16, 4, h - 30); }
        else { b("#575268", x + 12, y + h / 2, w - 24, h / 2 - 12); b("#9994ad", x + w / 2 - 7, y + 17, 14, 18); b("#d4bf89", x + w / 2 - 8, y + 14, 16, 4); }
        return;
    }
    if (tipo === "estandarte") {
        b("#bca365", x - 4, y, w + 8, 4); b("#623453", x, y + 4, w, h - 10); b("#8d5476", x + 4, y + 5, 4, h - 15);
        b("#d8bb77", x + w / 2 - 3, y + 18, 6, 22); b("#d8bb77", x + w / 2 - 9, y + 21, 18, 5); return;
    }
    if (tipo === "vaso") {
        b("#735569", x + 3, y + h - 15, w - 6, 15); b("#b29ba4", x, y + h - 17, w, 5);
        b("#658465", x + 9, y, 6, h - 12); b("#87996b", x, y + 6, 12, 8); b("#476857", x + 13, y + 10, 12, 8); return;
    }
    if (tipo === "cama" || tipo === "camaReal") {
        b("#38282b", x + 3, y + 7, w, h); b("#886444", x, y, w, h); b("#c3a573", x + 4, y + 3, w - 8, 16);
        b("#f0e1bd", x + 7, y + 23, w - 14, h - 34); b("#fff0d5", x + 12, y + 26, w - 24, 17);
        b(tipo === "camaReal" ? "#703b74" : "#4c7487", x + 7, y + 48, w - 14, h - 57);
        b(tipo === "camaReal" ? "#9b6695" : "#7692a1", x + 11, y + 51, 7, h - 65);
        b("#c6aa73", x + 7, y + h - 17, w - 14, 4); b("#513729", x, y + h - 6, w, 6);
        for (const px of [x, x + w - 6]) { b("#c3a573", px, y - 4, 6, 15); b("#997445", px, y + h - 9, 6, 16); }
        return;
    }
    if (tipo === "sofa" || tipo === "poltrona") {
        const assento = Math.round(h * 0.52);
        const braco = 9;
        b("#2a2029", x + 4, y + h - 13, w - 8, 13);
        for (const px of [x + 7, x + w - 13]) b("#ad8555", px, y + h - 10, 6, 10);
        // Encosto alto separado do assento e da frente estofada.
        b("#513044", x + 5, y, w - 10, assento + 8);
        b("#b17b8b", x + 9, y + 3, w - 18, 5);
        b("#89536e", x + 9, y + 8, w - 18, assento - 6);
        const quantidade = tipo === "sofa" ? 3 : 1;
        const largura = (w - braco * 2) / quantidade;
        for (let i = 0; i < quantidade; i++) {
            const px = x + braco + i * largura;
            b("#633c53", px + largura / 2 - 2, y + 17, 4, 4);
            b("#422b3c", px, y + assento, largura, h - assento - 14);
            b("#b17b8b", px + 2, y + assento + 2, largura - 4, 4);
            b("#97617b", px + 2, y + assento + 6, largura - 4, h - assento - 22);
        }
        b("#643c51", x + 7, y + h - 18, w - 14, 8);
        for (const px of [x, x + w - braco]) {
            b("#513044", px, y + assento - 7, braco, h - assento - 3);
            b("#c3919d", px, y + assento - 7, braco, 5);
            b("#89536e", px + 2, y + assento - 2, braco - 4, h - assento - 12);
        }
        return;
    }
    if (tipo === "banco") {
        b("#2a2029", x + 3, y + 6, w, h); b("#795a43", x, y, w, h);
        b("#6b3d57", x + 4, y + 4, w - 8, h - 10); b("#a46c7e", x + 6, y + 4, w - 12, 10);
        for (let px = x + 8; px < x + w - 12; px += 30) { b("#8b506a", px, y + 19, Math.min(25, x + w - 8 - px), Math.max(7, h - 29)); }
        b("#c19e67", x, y + 12, 6, h - 12); b("#c19e67", x + w - 6, y + 12, 6, h - 12); return;
    }
    if (tipo === "lareira") {
        desenharAlvenariaDoLimbo(x + 22, y, w - 44, 25);
        b("#60545b", x + 5, y + 23, w - 10, h - 28);
        b("#17131c", x + 22, y + 35, w - 44, h - 44);
        b("#17131c", x + 28, y + 29, w - 56, 10);
        for (const px of [x + 8, x + w - 21]) {
            b("#a28c82", px, y + 27, 13, h - 34);
            for (let py = y + 39; py < y + h - 12; py += 13) b("#6e5d5c", px, py, 13, 3);
        }
        b("#6e5d5c", x, y + 18, w, 10);
        b("#c6b39d", x - 3, y + 15, w + 6, 7);
        b("#88716a", x + 2, y + h - 9, w - 4, 9);
        b("#b7a08a", x, y + h - 10, w, 4);
        // Toras e três línguas de fogo escalonadas, sem suavização.
        b("#583627", x + 27, y + h - 21, w - 54, 8);
        b("#a87542", x + 27, y + h - 21, 7, 7);
        b("#c18b4b", x + 36, y + h - 18, w - 68, 3);
        for (const [dx, altura] of [[31, 19], [46, 32], [61, 23]]) {
            const base = y + h - 22;
            b("#ba4d2d", x + dx, base - altura + 9, 13, altura - 9);
            b("#ed903d", x + dx + 3, base - altura + 4, 8, altura - 4);
            b("#ed903d", x + dx + 6, base - altura, 4, 7);
            b("#ffdb7e", x + dx + 4, base - 10, 5, 10);
        }
        return;
    }
    if (tipo === "armadura") {
        b("#776477", x, y + h - 15, w, 15); desenharPessoaDoCastelo(x + w / 2, y + h - 19, "guarda"); return;
    }
    if (tipo === "globo") {
        b("#ac915b", x + 4, y + h - 5, w - 8, 5); b("#ac915b", x + w / 2 - 2, y + 20, 4, h - 20);
        b("#638894", x + 3, y + 3, w - 6, 24); b("#8ca189", x + 8, y + 6, 12, 10); b("#c7ad6d", x, y + 13, w, 3); return;
    }
    // Móveis de madeira compartilham estrutura, brilho e pés.
    b("#30212a", x + 3, y + 6, w, h); b("#76513a", x, y, w, h); b("#b08a58", x + 3, y + 3, w - 6, 5);
    b("#4b3329", x + 5, y + h - 6, 6, 10); b("#4b3329", x + w - 11, y + h - 6, 6, 10);
    if (tipo === "estante") {
        for (let py = y + 13; py < y + h - 10; py += 25) {
            b("#38252b", x + 6, py, w - 12, 20);
            for (let px = x + 8; px < x + w - 10; px += 10) {
                const cores = ["#9b6763", "#76918b", "#c0a469", "#8c769b"];
                b(cores[Math.floor((px + py) / 10) % 4], px, py + 3, 7, 16); b("#d6b981", px + 1, py + 6, 5, 2);
            }
        }
    } else if (tipo === "armario") {
        b("#49322d", x + w / 2 - 2, y + 10, 4, h - 20); b("#c5a266", x + w / 2 - 9, y + h / 2, 4, 7); b("#c5a266", x + w / 2 + 5, y + h / 2, 4, 7);
    } else if (tipo === "mesa") {
        b("#cec1a1", x + 8, y + 25, w - 16, 22);
        for (let px = x + 20; px < x + w - 10; px += 40) {
            b("#665039", px, y - 24, 20, 16); b("#665039", px, y + h + 9, 20, 16);
            b("#e5d8b8", px, y + 8, 13, 8); b("#e5d8b8", px, y + h - 15, 13, 8);
            b("#cfb577", px + 18, y + 10, 3, 6);
        }
        for (const px of [x + 65, x + w - 70]) { b("#987447", px, y + 31, 12, 5); b("#e4cb9a", px + 4, y + 18, 4, 15); b("#f1bd65", px + 4, y + 15, 4, 5); }
    } else if (tipo === "criado") {
        b("#bca66a", x + 5, y + 3, w - 10, 3); b("#e8d7aa", x + 12, y - 5, 5, 12); b("#ffc76e", x + 12, y - 9, 5, 5); b("#c5aa70", x + w / 2 - 3, y + h - 13, 6, 3);
    } else if (tipo === "escrivaninha" || tipo === "mesaBaixa") {
        b("#e5d5b2", x + 14, y + 12, 29, 16); b("#967d60", x + 28, y + 12, 2, 16); b("#b4bbac", x + w - 24, y + 10, 10, 10);
    } else { // Aparadores: gavetas, louça e jarra.
        b("#54382d", x + 5, y + 17, w - 10, 3); b("#d6b776", x + w / 2 - 3, y + 25, 6, 3);
        b("#ccc0ae", x + 12, y - 8, 14, 15); b("#9f9aaa", x + w - 28, y - 3, 20, 7);
    }
}

function desenharPessoaDoCastelo(x, y, tipo = "jogador", escala = 1, passo = 0, direcao = "baixo", c = contextoExploracaoLimbo) {
    const b = (cor, x, y, largura, altura) => { c.fillStyle = cor; c.fillRect(x, y, largura, altura); };
    if (tipo === "entidade") { c.drawImage(document.getElementById("retrato-entidade-limbo"), Math.round(x - 18 * escala), Math.round(y - 42 * escala), 36 * escala, 48 * escala); return; }
    c.save(); c.translate(Math.round(x), Math.round(y)); c.scale(escala, escala);
    b("#201a28", -11, 4, 23, 5);
    const frente = direcao !== "cima", lateral = direcao === "direita" ? 2 : direcao === "esquerda" ? -2 : 0;
    b("#201c2b", -7, -1 + passo, 6, 8); b("#201c2b", 2, -1 - passo, 6, 8);
    b("#55444a", -8, 5 + passo, 7, 3); b("#55444a", 2, 5 - passo, 7, 3);
    b("#191722", -10, -27, 20, 25);
    if (tipo === "guarda") {
        desenharGuardaMedieval(c, 0, 0, 1, passo);
    } else {
        b("#396374", -8, -13, 16, 13); b("#739ca6", -6, -12, 5, 8);
        b("#ba8568", -12, -10 - passo, 4, 9); b("#ba8568", 8, -10 + passo, 4, 9);
        b("#caad70", -8, -3, 16, 3); b("#edd29f", -2, -3, 4, 3);
        b("#d4b18b", -7, -24, 14, 12); b("#ecd0a2", -6, -22, 9, 7);
        b("#46313b", -9, -28, 18, 7); b("#765047", -7, -27, 9, 3);
        b("#46313b", -9, -22, 4, 9);
        if (frente) { b("#211b28", -4 + lateral, -19, 2, 3); b("#211b28", 3 + lateral, -19, 2, 3); }
        else b("#46313b", -7, -22, 14, 9);
        b("#8e5360", -7, -13, 14, 3);
    }
    c.restore();
}

function desenharExploracaoDoCastelo() {
    const c = contextoExploracaoLimbo, b = blocoVisualDoLimbo, sala = jornadaDoLimbo.sala;
    c.imageSmoothingEnabled = false;
    b("#0d0b16", 0, 0, 640, 400);
    desenharAlvenariaDoLimbo(24, 28, 592, 352);
    b("#322d3d", 36, 64, 568, 300);
    for (let x = 36; x < 604; x += 32) for (let y = 64; y < 364; y += 28) {
        b("#494052", x, y, 31, 27); b("#40374b", x + 2, y + 2, 28, 24);
    }
    for (const x of [42, 579]) { b("#766577", x, 66, 17, 290); b("#93808b", x, 66, 4, 290); }
    if (sala !== "varanda") for (const x of [65, 565]) desenharTochaDoLimbo(x, 45);
    if (sala === "salao" || sala === "andar") desenharMovelDoCastelo({ tipo: "tapete", x: 285, y: 94, w: 70, h: 246 });
    for (const m of MOBILIARIO_DO_CASTELO[sala] || []) desenharMovelDoCastelo(m);
    for (const porta of LIGACOES_NOVAS_DO_CASTELO[sala] || []) desenharPortaDoCastelo(porta.x, porta.y, porta.x < 90);
    if (sala === "salao") {
        desenharEscadaDoCastelo(320, 67);
        desenharPortaDoCastelo(320, 350); desenharPortaDoCastelo(589, 194, true);
        desenharPessoaDoCastelo(560, 176, "guarda"); desenharPessoaDoCastelo(560, 226, "guarda");
        if (jornadaDoLimbo.fase === "manha") desenharPessoaDoCastelo(355, 334, "entidade");
        else if (tempoVisualDoCastelo < 6 && !jornadaDoLimbo.desafio) {
            const t = tempoVisualDoCastelo;
            desenharPessoaDoCastelo(t < 2 ? 470 : t < 4 ? 470 - (t - 2) * 75 : 320, t < 2 ? 255 - t * 75 : t < 4 ? 105 : 105 - (t - 4) * 25, "entidade");
        }
    } else if (sala === "andar") {
        desenharPortaDoCastelo(70, 200, true); desenharPortaDoCastelo(570, 200, true); desenharPortaDoCastelo(475, 70);
        desenharEscadaDoCastelo(320, 345, true); desenharPessoaDoCastelo(320, 120, "entidade");
    } else if (sala === "varanda") {
        b("#080810", 36, 56, 568, 162);
        b("#91828f", 36, 218, 568, 6);
        for (let x = 40; x < 605; x += 38) { b("#746579", x, 218, 6, 35); b("#b5a59e", x - 2, 216, 10, 5); }
        desenharPortaDoCastelo(320, 350);
    } else if (sala === "real" || sala === "hospedes") {
        desenharPortaDoCastelo(sala === "real" ? 320 : 120, sala === "real" ? 350 : 330);
        if (sala === "hospedes" && jornadaDoLimbo.fase === "manha") desenharPessoaDoCastelo(120, 320 - Math.min(65, tempoVisualDoCastelo * 25), "entidade");
    }
    const andando = caminhadaDoJogador.movendo && teclasDoCastelo.size > 0 && !dialogoDoCastelo && !document.hidden;
    const passo = andando ? [0, 2, 0, -2][Math.floor(caminhadaDoJogador.tempo / .12) % 4] : 0;
    desenharPessoaDoCastelo(jornadaDoLimbo.x, jornadaDoLimbo.y, "jogador", 1, passo, caminhadaDoJogador.direcao);
}

function desenharTorreDaArena(torre) {
    const c = contextoExploracaoLimbo, b = blocoVisualDoLimbo;
    c.save(); c.translate(Math.round(torre.x), Math.round(torre.y));
    b("#201925", -15, -10, 30, 25); b("#777080", -13, -8, 26, 21); b("#aaa0a1", -13, -8, 26, 4);
    b("#4a424f", -10, 5, 8, 3); b("#4a424f", 3, 9, 9, 3);
    if (torre.tipo === "canhao") {
        b("#a18455", -14, -9, 6, 15); b("#a18455", 8, -9, 6, 15);
        b("#282532", -7, -23, 14, 28); b("#606677", -5, -21, 10, 22); b("#a2a5b0", -4, -20, 3, 17); b("#17151f", -5, -23, 10, 4);
    } else if (torre.tipo === "flecha") {
        b("#a78450", -10, -13, 20, 17); b("#e0c087", -7, -12, 4, 16);
        b("#583f30", -3, -25, 6, 27); b("#d5ae68", -14, -17, 28, 4); b("#e3d3a5", -16, -15, 3, 7); b("#e3d3a5", 13, -15, 3, 7); b("#e0e5dc", -2, -27, 4, 7);
    } else {
        b("#5d7c99", -8, -17, 16, 17); b("#93d2dd", -5, -24, 10, 28); b("#d5f3e5", -2, -26, 4, 22); b("#6db1ca", -10, -13, 5, 10); b("#6db1ca", 5, -13, 5, 10);
    }
    if (torre.melhorada) { b("#e8c35a", -12, 0, 24, 3); b("#ffe5a0", 7, 7, 5, 5); }
    c.restore();
}

function desenharArenaDoLimbo() {
    const c = contextoExploracaoLimbo, b = blocoVisualDoLimbo, a = arenaDoLimbo, cfg = CONFIG.casteloDoLimbo.arena;
    b("#42303a", 0, 0, 640, 400);
    desenharAlvenariaDoLimbo(0, 0, 640, 70, true); desenharAlvenariaDoLimbo(0, 390, 640, 10, true);
    // Arquibancadas e público só no fundo: não cobrem a pista nem mudam áreas de construção.
    for (let fila = 0; fila < 2; fila++) {
        b("#29202c", 10, 8 + fila * 24, 620, 19);
        for (let lugar = 0; lugar < 42; lugar++) {
            const x = 14 + lugar * 15, y = 12 + fila * 24;
            const cores = ["#73607f", "#657c7b", "#9c7768", "#8b8064"];
            b(cores[(lugar + fila) % 4], x, y + 6, 10, 10); b("#b39c89", x + 2, y, 6, 7);
            b("#423345", x + 1, y - 1, 8, 3);
        }
        b("#b59a70", 4, 29 + fila * 24, 632, 3);
    }
    for (const x of [4, 151, 473, 625]) { b("#806655", x, 0, 11, 67); b("#b3956d", x, 0, 3, 67); }
    c.strokeStyle = "#b49569"; c.lineWidth = 34; c.lineJoin = "miter";
    c.beginPath(); cfg.caminho.forEach((p, i) => i ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y)); c.stroke();
    b("#426368", 608, 348, 28, 42); b("#8ac4ba", 612, 352, 20, 34); b("#d8e9cf", 618, 348, 8, 17);
    for (const [indice, torre] of a.torres.entries()) {
        desenharTorreDaArena(torre);
        if (torre.bloqueio > 0 || indice === a.selecionada) {
            c.strokeStyle = torre.bloqueio > 0 ? "#ba79db" : "#f7e19b"; c.lineWidth = 2; c.strokeRect(torre.x - 18, torre.y - 28, 36, 44);
        }
    }
    for (const i of a.inimigos) {
        const passo = a.pausada || dialogoDoCastelo ? 0 : [0, 2, 0, -2][Math.floor((i.x + i.y) / 6) % 4];
        desenharPessoaDoCastelo(i.x, i.y, i.tipo === "entidade" ? "entidade" : "guarda", 1, passo);
        b("#17111c", i.x - 15, i.y - 49, 30, 4); b("#a8d46a", i.x - 15, i.y - 49, 30 * i.vida / i.vidaMaxima, 4);
    }
    for (const t of a.tiros) { c.strokeStyle = t.cor; c.lineWidth = 3; c.beginPath(); c.moveTo(t.x, t.y); c.lineTo(t.alvoX, t.alvoY); c.stroke(); }
    if (jornadaDoLimbo.fase === "vitoria") { desenharPessoaDoCastelo(320, 205, "entidade"); desenharPessoaDoCastelo(370, 220); }
}

// Mesma armadura no castelo, na arena e no retrato de conversa.
function desenharGuardaMedieval(c, x, y, escala = 1, passo = 0) {
    c.save(); c.translate(Math.round(x), Math.round(y)); c.scale(escala, escala);
    const b = (cor, x, y, w, h) => { c.fillStyle = cor; c.fillRect(x, y, w, h); };
    b('#242431', -10, -28, 20, 32);
    b('#626f83', -7, -2 + passo, 6, 9); b('#a7b8c7', -6, -1 + passo, 3, 6);
    b('#626f83', 2, -2 - passo, 6, 9); b('#a7b8c7', 3, -1 - passo, 3, 6);
    b('#8396aa', -9, -14, 18, 13); b('#c4d3dc', -6, -13, 6, 9);
    b('#4c5a70', 1, -12, 6, 10); b('#b89959', -8, -3, 16, 3);
    b('#57667a', -13, -15, 8, 7); b('#c4d3dc', -12, -15, 7, 3);
    b('#57667a', 6, -15, 8, 7); b('#c4d3dc', 7, -15, 6, 3);
    b('#8a9db0', -8, -29, 16, 15); b('#c4d3dc', -6, -30, 12, 4);
    b('#303747', -7, -24, 14, 3); b('#dde5e6', -1, -28, 2, 13);
    for (const px of [-5, 3]) b('#303747', px, -19, 2, 3);
    b('#742e48', -2, -35, 5, 5); b('#b45163', -2, -35, 3, 3);
    b('#a58a57', 16, -30, 2, 36); b('#c4d3dc', 14, -34, 6, 7); b('#e5eeee', 16, -37, 2, 5);
    b('#c4d3dc', 10, -8, 5, 5);
    b('#b89959', -16, -11, 12, 14); b('#b89959', -14, 3, 8, 3);
    b('#493b6f', -14, -9, 8, 11); b('#dac58b', -11, -8, 2, 11); b('#dac58b', -13, -5, 6, 2);
    c.restore();
}
