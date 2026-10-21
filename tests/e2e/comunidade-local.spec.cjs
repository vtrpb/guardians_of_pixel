const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { pathToFileURL } = require('node:url');

const arquivo = path.join(os.tmpdir(), `gop-comunidade-teste-${crypto.randomUUID()}.json`);
process.env.ARQUIVO_COMUNIDADE_LOCAL = arquivo;
const { servidor } = require('../../scripts/servidor-comunidade-local.cjs');
let endereco;

test.beforeAll(async () => {
    await new Promise(resolve => servidor.listen(0, '127.0.0.1', resolve));
    endereco = `http://127.0.0.1:${servidor.address().port}`;
});

test.afterAll(async () => {
    await new Promise(resolve => servidor.close(resolve));
    if (fs.existsSync(arquivo)) fs.unlinkSync(arquivo);
});

async function abrirEditor(page) {
    await page.addInitScript(() => {
        localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1', 'true');
    });
    await page.goto(pathToFileURL(path.resolve(__dirname, '../../index.htm')).href);
    const abertura = page.getByRole('dialog');
    if (await abertura.isVisible()) await abertura.getByRole('button').first().click();
    await page.evaluate(() => eval('registrarExperiencia(1400)'));
    await page.locator('.botao-lobby-editor').click();
}

test('Comunidade separa Online em desenvolvimento e Local funcional', async ({ page }) => {
    await abrirEditor(page);
    await page.getByRole('button', { name: 'Comunidade', exact: true }).click();
    const abas = page.locator('.editor-comunidade-abas');
    await expect(abas.getByRole('button', { name: 'Local' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#endereco-comunidade-local')).toBeVisible();
    await abas.getByRole('button', { name: 'Online' }).click();
    await expect(abas.getByRole('button', { name: 'Online' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.editor-comunidade-online')).toHaveText('A Comunidade online ainda está em desenvolvimento.');
    await expect(page.locator('#endereco-comunidade-local')).toHaveCount(0);
    await expect(page.locator('#codigo-importacao-editor')).toHaveCount(0);
    await abas.getByRole('button', { name: 'Local' }).click();
    await expect(page.locator('#endereco-comunidade-local')).toBeVisible();
    await expect(page.locator('#codigo-importacao-editor')).toBeVisible();
    await page.evaluate(() => selecionarIdioma('en'));
    await page.getByRole('button', { name: 'Community', exact: true }).click();
    await page.locator('.editor-comunidade-abas').getByRole('button', { name: 'Online' }).click();
    await expect(page.locator('.editor-comunidade-online')).toHaveText('The online Community is still in development.');
    await page.evaluate(() => selecionarIdioma('es'));
    await page.getByRole('button', { name: 'Comunidad', exact: true }).click();
    await page.locator('.editor-comunidade-abas').getByRole('button', { name: 'Online' }).click();
    await expect(page.locator('.editor-comunidade-online')).toHaveText('La Comunidad online todavía está en desarrollo.');
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('dois navegadores trocam mapas pela rede local sem mudar a origem dos saves', async ({ page, browser }) => {
    await abrirEditor(page);
    await page.evaluate(() => eval(`(() => {
        const mapa = criarMapaPadraoDoEditor();
        mapa.id = 'mapa-lan-teste';
        mapa.nome = 'Mapa da rede';
        mapa.criador = 'Amigo';
        mapasCriadosNoEditor = [mapa];
        salvarMapasDoEditor();
        mostrarEditorDeFases('meus');
    })()`));
    await page.getByRole('button', { name: 'Comunidade', exact: true }).click();
    await page.locator('#endereco-comunidade-local').fill(endereco);
    await page.getByRole('button', { name: 'Conectar e atualizar' }).click();
    await expect(page.locator('.editor-rede-local')).toContainText('Servidor conectado');
    await page.getByRole('button', { name: 'Meus mapas' }).click();
    await page.getByRole('button', { name: 'Publicar e copiar código' }).click();
    await expect(page.locator('.editor-mensagem')).toContainText('Mapa publicado na Comunidade local');

    const resposta = await page.request.get(`${endereco}/api/mapas`);
    const dados = await resposta.json();
    expect(dados.mapas).toHaveLength(1);
    expect(dados.mapas[0].segredo).toBeUndefined();
    expect(fs.readFileSync(arquivo, 'utf8')).not.toContain('guardians-of-pixel-salvos');
    const sobrescrita = await page.request.post(`${endereco}/api/mapas`, { data: { codigo: dados.mapas[0].codigo } });
    expect(sobrescrita.status()).toBe(403);
    const codigoInvalido = await page.request.post(`${endereco}/api/mapas`, { data: { codigo: 'GP-MAPA-1.invalido.falso' } });
    expect(codigoInvalido.status()).toBe(400);

    const visitante = await browser.newContext();
    const outraPagina = await visitante.newPage();
    try {
        await abrirEditor(outraPagina);
        await outraPagina.getByRole('button', { name: 'Comunidade', exact: true }).click();
        await outraPagina.locator('#endereco-comunidade-local').fill(endereco);
        await outraPagina.getByRole('button', { name: 'Conectar e atualizar' }).click();
        await expect(outraPagina.locator('.editor-rede-local')).toContainText('Mapa da rede');
        await outraPagina.getByRole('button', { name: 'Adicionar à minha biblioteca' }).click();
        await expect(outraPagina.locator('.editor-mapas-grade').last()).toContainText('Mapa da rede');
        expect(await outraPagina.evaluate(() => eval('mapasImportadosNoEditor.length'))).toBe(1);

        const paginaDaRede = await visitante.newPage();
        await paginaDaRede.goto(endereco);
        await expect(paginaDaRede.locator('#mapas')).toContainText('Mapa da rede');
        await expect(paginaDaRede.locator('textarea')).toHaveValue(dados.mapas[0].codigo);

        await page.getByRole('button', { name: 'Retirar da Comunidade' }).click();
        await expect(page.locator('.editor-mensagem')).toContainText('Publicação retirada');
        expect((await (await page.request.get(`${endereco}/api/mapas`)).json()).mapas).toHaveLength(0);
        expect(await outraPagina.evaluate(() => eval('mapasImportadosNoEditor.length'))).toBe(1);

        await paginaDaRede.getByRole('button', { name: 'Atualizar mapas' }).click();
        await expect(paginaDaRede.locator('#estado')).toContainText('Ainda não há mapas');
    } finally {
        await visitante.close();
    }
});
