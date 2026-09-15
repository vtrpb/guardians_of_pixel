const { defineConfig } = require("@playwright/test");
const urlDoServidor = `http://127.0.0.1:${process.env.PORTA_TESTES || 4173}`;

module.exports = defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: false,
    retries: 1,
    reporter: "list",
    use: {
        baseURL: urlDoServidor,
        viewport: { width: 1440, height: 1000 },
        reducedMotion: "reduce",
        trace: "on-first-retry"
    },
    webServer: {
        command: "node tests/servidor-estatico.cjs",
        url: urlDoServidor,
        reuseExistingServer: true
    }
});
