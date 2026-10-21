const { defineConfig, chromium } = require("@playwright/test");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");
const urlDoServidor = `http://127.0.0.1:${process.env.PORTA_TESTES || 4173}`;
const idDoProjeto = crypto.createHash("sha1").update(__dirname).digest("hex").slice(0, 12);
const diretorioDosResultados = path.join(os.tmpdir(), `guardians-of-pixel-testes-${idDoProjeto}`);
const navegadorDoSistema = process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' : null;
const executavelDoNavegador = fs.existsSync(chromium.executablePath())
    ? chromium.executablePath() : navegadorDoSistema && fs.existsSync(navegadorDoSistema)
        ? navegadorDoSistema : undefined;

module.exports = defineConfig({
    testDir: "./tests/e2e",
    outputDir: diretorioDosResultados,
    fullyParallel: false,
    retries: 1,
    reporter: "list",
    use: {
        baseURL: urlDoServidor,
        viewport: { width: 1440, height: 1000 },
        reducedMotion: "reduce",
        trace: "on-first-retry",
        ...(executavelDoNavegador ? { launchOptions: { executablePath: executavelDoNavegador } } : {})
    },
    webServer: {
        command: "node tests/servidor-estatico.cjs",
        url: urlDoServidor,
        reuseExistingServer: true
    }
});
