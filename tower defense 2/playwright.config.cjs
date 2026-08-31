const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: false,
    retries: 1,
    reporter: "list",
    use: {
        baseURL: "http://127.0.0.1:4173",
        viewport: { width: 1440, height: 1000 },
        reducedMotion: "reduce",
        trace: "on-first-retry"
    },
    webServer: {
        command: "node tests/servidor-estatico.cjs",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: true
    }
});
