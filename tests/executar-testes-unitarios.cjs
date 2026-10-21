const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const diretorioDosTestes = __dirname;
const arquivos = fs.readdirSync(diretorioDosTestes)
    .filter(arquivo => arquivo.endsWith(".test.cjs"))
    .sort();

const diretorioDosResultados = path.resolve(__dirname, "../artifacts/testes-unitarios");
fs.mkdirSync(diretorioDosResultados, { recursive: true });
const resultados = [];
for (const arquivo of arquivos) {
    const resultado = spawnSync(process.execPath, [path.join(diretorioDosTestes, arquivo)], {
        cwd: path.resolve(__dirname, ".."),
        encoding: "utf8"
    });
    const passou = resultado.status === 0;
    const diagnostico = (resultado.stdout || "") + (resultado.stderr || "")
        + (resultado.error ? String(resultado.error) : "");
    fs.writeFileSync(path.join(diretorioDosResultados, `${arquivo}.log`), diagnostico);
    resultados.push({ arquivo, passou, codigoDeSaida: resultado.status });
    console.log(`${passou ? "PASSOU" : "FALHOU"} ${arquivo}`);
}

const falhas = resultados.filter(resultado => !resultado.passou).length;
fs.writeFileSync(path.join(diretorioDosResultados, "resumo.json"),
    JSON.stringify({ total: arquivos.length, aprovados: arquivos.length - falhas, falhas, resultados }, null, 2));
console.log(`${arquivos.length - falhas}/${arquivos.length} arquivos aprovados; ${falhas} falharam. Diagnósticos: artifacts/testes-unitarios/`);
process.exitCode = falhas ? 1 : 0;
