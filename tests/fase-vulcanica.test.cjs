// Integração exige os módulos e DOM reais; mantém todas as verificações originais.
const path = require('node:path');
const {spawnSync} = require('node:child_process');
const raiz = path.resolve(__dirname, '..');
const resultado = spawnSync(process.execPath, [
    path.join(raiz, 'tests/apoio/executar-playwright-com-servidor.cjs'),
    'tests/e2e/vulcanica-integracao.spec.cjs', '--workers=1', '--retries=0'
], {cwd:raiz, encoding:'utf8'});
process.stdout.write(resultado.stdout || '');
process.stderr.write(resultado.stderr || '');
if (resultado.error) console.error(resultado.error);
process.exitCode = resultado.status === 0 ? 0 : 1;
