const assert=require('assert');
const fs=require('fs');
const vm=require('vm');
const contexto=vm.createContext({});
vm.runInContext(fs.readFileSync('missoes.js','utf8'),contexto);
vm.runInContext(fs.readFileSync('missoes-idiomas.js','utf8'),contexto);
const lista=contexto.criarCatalogoDeMissoesPermanentes();
contexto.CONFIG={missoes:{permanentes:lista}};
assert.equal(lista.length,100);
assert.equal(new Set(lista.map(m=>m.id)).size,100);
assert.equal(new Set(lista.map(m=>m.categoria)).size,10);
assert.equal(lista.filter(m=>m.secreta).length,10);
assert.equal(lista[9].recompensa.quantidade,5);
assert.ok(lista.slice(0,10).every(m=>m.recompensa.quantidade>=3&&m.recompensa.quantidade<=5));
assert.ok(lista.filter(m=>m.recompensa.tipo==='fragmentos').every(m=>[3,5,10,15,20,25].includes(m.recompensa.quantidade)));
for(const m of lista) {
    assert.ok(Number.isInteger(m.objetivo)&&m.objetivo>0);
    for(const idioma of ['en','es']) {
        assert.notEqual(contexto.localizarTextoDeMissao(m.descricao,idioma),m.descricao,`${m.numero}: descrição ${idioma}`);
        assert.ok(contexto.localizarTextoDeMissao(m.nome,idioma));
    }
}
assert.deepEqual(Array.from(lista.slice(10,20),m=>m.objetivo),[50,150,500,1000,2500,5000,10000,20000,35000,50000]);
assert.equal(lista[60].recompensa.id,'sentinelaDourada');
assert.equal(lista[82].recompensa.id,'alemDoLimite');
assert.equal(lista[49].propriedadeDoProgresso,'eliminacoes_torreLongoAlcance');
const html=fs.readFileSync('index.htm','utf8');
assert.ok(html.indexOf('src="missoes.js')<html.indexOf('src="game.js'));
console.log('100 missões permanentes: catálogo, metas, recompensas e idiomas validados.');
