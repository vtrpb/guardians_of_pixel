const { test, expect } = require('@playwright/test');

test('Trilhas antigas ganham respostas inéditas e completam os ciclos sem notas inválidas', async ({page}) => {
    const erros=[]; page.on('pageerror',e=>erros.push(e.message));
    await page.goto('/'); await page.locator('#botao-jogar-menu-inicial').click();
    const ciclos=await page.evaluate(()=>{
        const notaOriginal=tocarNotaSintetizada, ruidoOriginal=tocarRuidoSintetizado;
        const ciclos=[];
        try {
            for (const [fase, nome, tocar, campo] of [
                [1,'musicaPixeladaDaFase1',tocarPassoDaMusicaPixeladaDaFase1,'melodia'],
                [2,'musicaDoDeserto',tocarPassoDaMusicaDoDeserto,'melodia'],
                [3,'musicaDoArtico',tocarPassoDaMusicaDoArtico,'melodia'],
                [5,'musicaDoBosque',tocarPassoDaMusicaDoBosque,'melodia'],
                [12,'musicaDoPontoZero',tocarPassoDaMusicaDaSelva,'melodia'],
                [13,'musicaDaLinhaTemporal',tocarPassoDaMusicaDaSelva,'pulsoDoPresente'],
                [14,'musicaDaEraApagada',tocarPassoDaMusicaDaSelva,'melodia'],
                [16,'musicaDoPontoZero',tocarPassoDaMusicaDaSelva,'melodia'],
                [99,'musicaDaDimensaoGlitch',tocarPassoDaMusicaDaDimensaoGlitch,'melodia'],
                [100,'musicaDoIntervaloPerdido',tocarPassoDaMusicaDaSelva,'melodia']
            ]) {
                faseSelecionada=fase; selecionarTrilhaDaPartida();
                const c=CONFIG.audio[nome], eventos=[];
                tocarNotaSintetizada=(...a)=>eventos.push(a);
                tocarRuidoSintetizado=(...a)=>{ if(a.slice(0,4).some(v=>!Number.isFinite(v))) throw Error('ruído inválido'); };
                for(let i=0;i<c[campo].length;i++) tocar();
                const quarto=c[campo].length/4;
                ciclos.push({fase,segundos:c[campo].length*c.intervaloDoPasso/1000,
                    diferente:JSON.stringify(c[campo].slice(0,quarto))!==JSON.stringify(c[campo].slice(quarto,quarto*2)),
                    valido:eventos.length>0 && eventos.every(a=>a.slice(0,3).every(Number.isFinite) && Number.isFinite(a[4]) && Number.isFinite(a[6]??a[0]))});
            }
            return ciclos;
        } finally { tocarNotaSintetizada=notaOriginal; tocarRuidoSintetizado=ruidoOriginal; selecionarTrilhaDoLobby(); }
    });
    for(const ciclo of ciclos) {
        expect(ciclo.valido,`${ciclo.fase}`).toBe(true);
        expect(ciclo.diferente,`${ciclo.fase}`).toBe(true);
        expect(ciclo.segundos).toBeGreaterThan(15);
    }
    expect(erros).toEqual([]);
});
