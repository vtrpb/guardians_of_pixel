// Desenho original em canvas, compartilhado pelas miniaturas e pela partida.
function caminhosDoMapaClassico(mapa) {
    if (mapaPersonalizadoAtivo?.classico && mapa.numero === mapaPersonalizadoAtivo.numeroClassico) {
        return obterCaminhosDaRotaClassicaSelecionada(mapa,mapaPersonalizadoAtivo.rotaClassica);
    }
    if (mapa.caminho) return [mapa.caminho];
    const pontos = caminhosDasFases[mapa.numero];
    return Array.isArray(pontos[0]) ? pontos : [pontos];
}

function distanciaDosCaminhosClassicos(x, y, caminhos) {
    let menor = Infinity;
    for (const caminho of caminhos) for (let i=1;i<caminho.length;i++) {
        const a=caminho[i-1],b=caminho[i],dx=b.x-a.x,dy=b.y-a.y;
        const t=Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy||1)));
        menor=Math.min(menor,Math.hypot(x-a.x-t*dx,y-a.y-t*dy));
    }
    return menor;
}

function desenharArvoreClassica(c,x,y,morta,escala=1) {
    c.save();c.translate(x,y);c.scale(escala,escala);
    c.fillStyle=morta?'#656d7180':'#173f3980';c.fillRect(-38,8,82,19);
    c.fillStyle=morta?'#626872':'#795047';c.fillRect(-9,-35,19,59);
    c.fillStyle=morta?'#9aa2ab':'#b0796b';c.fillRect(-5,-28,5,49);
    c.fillStyle=morta?'#555f6b':'#634842';c.fillRect(-24,-42,18,9);c.fillRect(6,-51,25,9);
    const tons=morta?['#9ca5b0','#cbd1d5','#edf0e9','#ffffff']:['#af4c81','#df78a4','#ffa6c9','#ffd0de'];
    c.fillStyle=tons[0];c.fillRect(-49,-82,97,39);c.fillRect(-33,-98,65,64);
    c.fillStyle=tons[1];c.fillRect(-47,-91,41,38);c.fillRect(-10,-103,42,58);c.fillRect(28,-78,24,29);
    c.fillStyle=tons[2];c.fillRect(-33,-97,29,18);c.fillRect(-5,-110,26,19);c.fillRect(18,-92,28,21);
    c.fillStyle=tons[3];c.fillRect(-25,-97,12,6);c.fillRect(0,-105,12,6);c.fillRect(27,-89,9,5);
    c.restore();
}

function desenharCenarioClassico(c,mapa,tempo=0) {
    if(typeof tempoDoClimaClassico==='function' && CONFIG.climaClassico.mapas[mapa.numero])tempo=tempoDoClimaClassico(mapa.numero);
    desenharCenarioClassicoBase(c,mapa,tempo);
    desenharDecoracoesExtrasClassicas(c,mapa);
    if(typeof desenharClimaClassico==='function')desenharClimaClassico(c,mapa);
}

function desenharCenarioClassicoBase(c,mapa,tempo=0) {
    if(mapa.paisagem){desenharPaisagemClassica(c,mapa,tempo);return;}
    if(['lagoaCorais','valeCristais','dunasDouradas'].includes(mapa.tema)){desenharNovoBiomaClassico(c,mapa,tempo);return;}
    const novo=Boolean(mapa.caminho),morta=mapa.tema==='florestaMorta';
    const tema=temasDoMapa[mapa.tema]||temasDoMapa.campo,caminhos=caminhosDoMapaClassico(mapa);
    c.save();
    c.fillStyle=novo?(morta?'#a3aaa7':'#4b9857'):tema.terrenoBase;c.fillRect(0,0,1200,700);
    for(let y=0;y<700;y+=28)for(let x=0;x<1200;x+=28){
        const s=(x*17+y*31)%97;
        c.fillStyle=novo?(morta?(s%2?'#afb6b0':'#959f9b'):(s%2?'#58a962':'#438e52')):(s%2?tema.terrenoClaro:tema.terrenoEscuro);
        c.fillRect(x,y,28,28);
        if(novo){c.fillStyle=morta?'#d0d2c0':'#8ac577';c.fillRect(x+5+s%12,y+9,2,7);c.fillRect(x+8+s%12,y+12,2,5);}
    }
    for(const [cor,largura] of [[novo?(morta?'#626e72':'#356447'):tema.caminhoContorno,70],[novo?(morta?'#c1c2b7':'#ccae83'):tema.caminhoBase,58],[novo?(morta?'#d4d5c8':'#e8cc9a'):tema.caminhoCentro,43]]){
        c.strokeStyle=cor;c.lineWidth=largura;c.lineJoin='round';c.lineCap='square';
        for(const caminho of caminhos){c.beginPath();caminho.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.stroke();}
    }
    if(novo){
        for(let i=0;i<155;i++){
            const x=(i*137+31)%1180,y=(i*97+71)%680;
            if(distanciaDosCaminhosClassicos(x,y,caminhos)<45)continue;
            if(morta){
                c.fillStyle='#798486';c.fillRect(x,y,13,9);c.fillStyle='#c9ceca';c.fillRect(x+2,y-3,8,5);
            }else{
                c.fillStyle='#347d49';c.fillRect(x+4,y,3,12);
                c.fillStyle=i%3?'#ffe4ed':'#fff0b5';c.fillRect(x,y-4,11,5);c.fillRect(x+3,y-7,5,11);
                c.fillStyle='#e2aa60';c.fillRect(x+4,y-3,3,3);
            }
        }
        desenharArvoresDasFlorestasClassicas(c,mapa);
        if(morta){
            for(let i=0;i<5;i++){
                const y=60+i*143+Math.sin(tempo/4200+i)*17;
                const g=c.createLinearGradient(0,y-25,0,y+55);g.addColorStop(0,'#eef4f000');g.addColorStop(.5,'#eef4f03b');g.addColorStop(1,'#eef4f000');
                c.fillStyle=g;c.fillRect(0,y-25,1200,80);
            }
        }else{
            c.fillStyle='#ffd1e3';
            for(let i=0;i<42;i++){const x=(i*113+tempo*.014)%1200,y=(i*79+tempo*.008)%700;c.fillRect(x,y,6,3);}
        }
    }else{
        for(const d of obterDecoracoesBaseClassicas(mapa))desenhadoresDeDecoracao[d.tipo]?.(d,c);
    }
    for(const caminho of caminhos){
        const inicio=caminho[0],fim=caminho.at(-1);
        c.fillStyle='#173e3a';c.fillRect(inicio.x-12,inicio.y-30,25,60);c.fillStyle='#85dcce';c.fillRect(inicio.x-5,inicio.y-22,10,44);
        c.fillStyle=morta?'#4e5967':'#504859';c.fillRect(fim.x-36,fim.y-35,44,70);
        c.fillStyle=morta?'#b8d9e3':'#f4bfdd';c.fillRect(fim.x-26,fim.y-21,26,40);
        c.fillStyle='#fff0bc';c.fillRect(fim.x-20,fim.y-12,13,19);
    }
    c.restore();
}

function desenharCriaturaClassica(c,tipo,x,y,tamanho) {
    const v=CONFIG.inimigo[tipo].visualClassico;
    const r=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
    const olho=(x,y)=>{r('#253140',x,y,3,4);r('#fff4dc',x,y,1,1);};
    c.save();c.translate(x,y);c.scale(tamanho/32,tamanho/32);
    r('#152a334d',5,27,23,4);
    if(desenharCriaturaDosNovosBiomas(c,tipo)){c.restore();return;}
    if(v==='ironMapa'){
        const config=CONFIG.inimigo[tipo],pesado=config.tracoIron==='armadura',eco=config.tracoIron==='retorno';
        r('#273246',4,25,24,6);
        if(pesado){r('#35445a',2,11,28,17);r(config.cor,6,8,20,19);r('#e6e8d8',11,11,10,5);}
        else if(eco){r('#526076',8,9,16,19);r(config.cor,6,6,20,18);r('#e8e4f2',11,10,10,5);r(config.cor,9,26,5,5);r(config.cor,19,26,5,5);}
        else{r('#39495c',4,15,25,11);r(config.cor,7,10,22,14);r('#dce5dd',16,8,9,5);r('#39495c',3,25,7,5);}
        const marca=config.numeroDoMapaIron%5;
        if(marca===0){r(config.cor,5,3,5,9);r(config.cor,22,2,5,10);}
        else if(marca===1){r('#f5d985',13,1,6,9);r(config.cor,10,5,12,7);}
        else if(marca===2){r(config.cor,1,11,7,5);r(config.cor,24,8,7,7);}
        else if(marca===3){r('#dce5dd',7,3,4,8);r('#dce5dd',22,3,4,8);}
        else{r(config.cor,2,6,7,11);r(config.cor,23,6,7,11);}
        r('#f07869',11,17,3,3);r('#f07869',19,17,3,3);
    }else if(v==='ironRapido'){
        r('#39475c',2,20,28,7);r('#8da0ad',5,14,23,10);r('#c8d5d5',12,7,14,10);r('#53647c',20,2,8,9);r('#53647c',8,8,6,8);
        r('#e45658',22,13,4,3);r('#253140',4,26,7,5);r('#253140',23,26,7,5);
    }else if(v==='ironPesado'){
        r('#28354c',3,23,26,8);r('#738399',5,11,22,17);r('#aab8c0',9,5,14,19);r('#4c5b72',1,13,7,13);r('#4c5b72',24,13,7,13);
        r('#e8a55d',12,12,3,5);r('#e8a55d',18,12,3,5);r('#273449',11,26,5,5);r('#273449',20,26,5,5);
    }else if(v==='broto'){
        r('#417d4f',11,17,11,10);r('#76b36a',8,11,17,12);r('#e984b3',6,5,21,9);r('#ffcadc',11,1,11,8);olho(11,15);olho(20,15);r('#624e46',10,26,4,4);r('#624e46',20,26,4,4);
    }else if(v==='guardiao'){
        r('#543d56',6,12,22,15);r('#b75b87',8,14,18,10);r('#ee9abd',9,3,16,12);r('#ffcedf',12,0,10,5);olho(12,8);olho(21,8);r('#f6d187',3,14,8,13);r('#775247',25,9,3,20);
    }else if(v==='raposa'){
        r('#c27194',1,15,12,10);r('#ffb8d2',0,10,6,12);r('#ffdae5',10,15,17,10);r('#ed9abc',18,7,12,13);r('#704e68',19,2,4,7);r('#704e68',26,2,4,7);olho(25,11);r('#fff1e7',25,17,7,5);r('#886378',12,25,4,5);r('#886378',24,25,4,5);
    }else if(v==='anciao'||v==='rei'){
        const morto=v==='rei';r(morto?'#626f7c':'#755153',10,10,14,19);r(morto?'#aeb9ba':'#aa786f',13,13,4,14);r(morto?'#7d8c96':'#a76788',3,9,9,7);r(morto?'#7d8c96':'#a76788',23,7,7,9);
        r(morto?'#c5cdd0':'#d8669b',4,3,25,10);r(morto?'#edf0dd':'#ffb3d6',8,0,17,7);r('#e2bc6f',8,0,3,5);r('#e2bc6f',15,0,3,5);r('#e2bc6f',23,0,3,5);olho(12,16);olho(21,16);r('#353d48',7,27,8,4);r('#353d48',21,27,8,4);
    }else if(v==='espectro'){
        r('#8996a9',8,8,17,18);r('#e5e8df',10,3,13,21);r('#bdc7cf',5,18,5,9);r('#bdc7cf',23,16,5,9);r('#e5e8df',10,24,4,6);r('#e5e8df',19,24,4,5);olho(12,10);olho(19,10);
    }else if(v==='besouro'){
        for(let i=0;i<3;i++){r('#424b5f',3,11+i*6,25,3);}r('#68798a',7,6,19,22);r('#c1c9ca',10,7,13,19);r('#77899e',16,8,2,18);r('#3d4d62',11,1,11,8);olho(12,3);olho(19,3);
    }else if(v==='corvo'){
        r('#626f83',1,7,11,14);r('#a3b3c3',3,7,8,7);r('#626f83',22,7,10,14);r('#a3b3c3',24,7,8,7);r('#d7e0df',12,9,10,18);r('#7a8ea4',13,3,10,10);r('#efddae',22,7,7,4);olho(18,5);r('#586d82',13,25,7,6);
    }
    c.restore();
}

function desenharArvoresDasFlorestasClassicas(c,mapa){
 const caminhos=caminhosDoMapaClassico(mapa),morta=mapa.tema==='florestaMorta';
 const candidatos=[];
        for(let y=90;y<720;y+=125)for(let x=60;x<1200;x+=133){
            const px=x+(y%7)*9,py=y+(x%11)*3;
            if(px<1150&&py<670&&distanciaDosCaminhosClassicos(px,py-35,caminhos)>94)candidatos.push({x:px,y:py,escala:.85+((x+y)%3)*.12});
        }
 for(const d of selecionarDecoracoesEspalhadas(candidatos,CONFIG.decoracoesExtrasClassicas.limiteObjetosExclusivos))desenharArvoreClassica(c,d.x,d.y,morta,d.escala);
}
