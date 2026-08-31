const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const diretorioDosTestes = __dirname;
const arquivos = fs.readdirSync(diretorioDosTestes)
    .filter(arquivo => arquivo.endsWith(".test.cjs"))
    .sort();

for (const arquivo of arquivos) {
    const resultado = spawnSync(process.execPath, [path.join(diretorioDosTestes, arquivo)], {
        stdio: "inherit"
    });

    if (resultado.status !== 0) {
        process.exit(resultado.status || 1);
    }
}

console.log(`${arquivos.length} testes unitários concluídos.`);
