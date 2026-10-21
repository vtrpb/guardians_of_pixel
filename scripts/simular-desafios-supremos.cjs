const {chromium}=require('playwright');
(async()=>{
    const browser=await chromium.launch();
    try {
        for(const tipo of process.argv[2]?[process.argv[2]]:['supremaCronarca','supremaTempestade','supremaBastiao']) {
            const page=await browser.newPage();
            await page.addInitScript(()=>{
                localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true');
                window.requestAnimationFrame=()=>0;
            });
            await page.goto('file:///'+process.cwd().replaceAll('\\','/')+'/index.htm');
            const resultado=await page.evaluate(tipo=>{
                let relogio=Date.now();Date.now=()=>relogio;
                iniciarDesafioSupremo(tipo);
                const plano=tipo==='supremaBastiao'
                    ? [['torreEsporos',280,250],['torreEsporos',540,420],['obliterador',800,300],['canhaoBlindado',100,480],['canhaoBlindado',260,480]]
                    : tipo==='supremaCronarca'
                    ? [['torreEsporos',370,280],['torreDeRaios',370,420],['obliterador',650,320],['torreGlacial',650,440],['obliterador',870,260],['torreGlacial',900,480]]
                    : [['torreEsporos',270,250],['obliterador',320,420],['torreDeRaios',280,350],['torreGlacial',540,410],['torreEsporos',590,250],['torreDeRaios',820,300]];
                const caixa=canvas.getBoundingClientRect();
                const construir=(tipo,x,y)=>{
                    selecionarTipoDeTorre(tipo);
                    canvas.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:caixa.x+x*caixa.width/1200,clientY:caixa.y+y*caixa.height/700}));
                };
                const registro=[];
                for(let passo=0;passo<120000&&!partidaEncerrada;passo++){
                    relogio+=1000/60;
                    if(passo%30===0){
                        const cercoTerminou=tipo==='supremaBastiao'&&wave===CONFIG.supremas.desafios[tipo].waves&&inimigosParaCriar===0&&!inimigos.some(i=>i.tipo==='sabotador');
                        if(tipo==='supremaBastiao') for(const torre of [...torres]) {
                            if((cercoTerminou&&torre.tipo==='canhaoBlindado')||(torre.tirosRecebidos>=7 && dinheiro>=CONFIG.torre.tipos[torre.tipo].custo)){torreSelecionada=torre;venderTorreSelecionada();}
                        }
                        for(const [tipo,x,y] of plano)if(!(cercoTerminou&&tipo==='canhaoBlindado')&&!torres.some(t=>t.x===x&&t.y===y)&&dinheiro>=CONFIG.torre.tipos[tipo].custo)construir(tipo,x,y);
                        for(const torre of [...torres].sort((a,b)=>a.nivel-b.nivel)){
                            if(tipo==='supremaBastiao') torre.modoDeAlvo=inimigos.some(i=>i.tipo==='sabotador'&&i.vida>0&&Math.hypot(torre.x-i.x,torre.y-i.y)<=torre.alcance)?'ultimo':'primeiro';
                            if(!configuracaoUsaMelhoriasEscolhidas(CONFIG.torre.tipos[torre.tipo]))continue;
                            const custo=obterCustoDaMelhoriaEscolhida(torre);
                            const cercoTerminou=wave===CONFIG.supremas.desafios[tipo].waves&&inimigosParaCriar===0&&!inimigos.some(i=>i.tipo==='sabotador');
                            const reserva=tipo==='supremaBastiao'&&wave>=3&&!cercoTerminou?500:0;
                            if(custo!==null&&dinheiro>=custo+reserva){torreSelecionada=torre;comprarMelhoriaEscolhida(['dano','velocidade','dano','velocidade','alcance'][torre.nivel]);}
                        }
                    }
                    atualizarWaves();atualizarExplosoesDosExplosivos(1);moverInimigos(1);atacarComTorres();atacarTorresComInimigos();moverTiros(1);moverTirosDosInimigos(1);
                    if(registro.at(-1)?.wave!==wave)registro.push({wave,credito:Math.round(dinheiro),torres:torres.map(t=>[t.tipo,t.nivel])});
                }
                return {tipo,wave,venceu:partidaVencida,terminou:partidaEncerrada,dinheiro,torres:torres.map(t=>({tipo:t.tipo,nivel:t.nivel,dano:t.dano,ultimo:t.ultimoTiro})),inimigos:inimigos.slice(0,2).map(i=>({tipo:i.tipo,vida:i.vida,x:i.x,y:i.y})),registro};
            },tipo);
            console.log(JSON.stringify({...resultado,registro:resultado.registro.map(r=>({wave:r.wave,credito:r.credito}))}));await page.close();
        }
    } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
