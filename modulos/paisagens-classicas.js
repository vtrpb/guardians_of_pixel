// Miniatura, arena e máscara de construção compartilham os objetos sólidos.
function desenharObjetosDaPaisagemClassica(c,mapa) {
    const p=mapa.paleta,caminhos=caminhosDoMapaClassico(mapa);
    if(mapa.paisagem==='costa'){
        // A faixa abaixo da falésia é cenário inacessível, não uma área aquática jogável.
        c.fillStyle='#264e68';c.fillRect(0,625,1200,75);c.fillStyle=p[2];c.fillRect(0,615,1200,10);
        c.fillStyle='#96c7cc';for(let i=0;i<35;i++)c.fillRect(i*43%1200,638+(i*19)%57,24,3);
    }
    const candidatos=[];
    for(let i=0;i<44;i++) {
        const x=55+(i*191)%1090,y=85+(i*137)%550;
        if(distanciaDosCaminhosClassicos(x,y,caminhos)<105)continue;
        candidatos.push({x,y});
    }
    for(const {x,y} of selecionarDecoracoesEspalhadas(candidatos,CONFIG.decoracoesExtrasClassicas.limiteObjetosExclusivos)) {
        c.save();c.translate(x,y);c.fillStyle=p[5];c.fillRect(-24,8,51,12);
        if(mapa.paisagem==='celeste') {
            c.fillStyle='#e7e2f5';c.fillRect(-22,-42,44,12);c.fillRect(-15,-30,30,40);c.fillRect(-26,10,52,9);
            c.fillStyle='#a8b5da';c.fillRect(-8,-28,6,35);c.fillRect(9,-28,5,35);
            c.fillStyle='#8de4e8';c.fillRect(-7,-53,14,10);
        } else if(mapa.paisagem==='bambu') {
            for(let j=0;j<3;j++){
                const x=-22+j*20,y=j%2*14;
                c.fillStyle='#80ad67';c.fillRect(x,y-68,9,78);
                c.fillStyle='#c6d997';for(let k=0;k<4;k++)c.fillRect(x,y-58+k*18,9,3);
                c.fillStyle='#a4c77c';c.fillRect(x-13,y-40,16,5);c.fillRect(x+7,y-57,18,5);
            }
        } else if(mapa.paisagem==='sal') {
            c.fillStyle='#a99faf';c.fillRect(-30,6,60,12);
            for(let j=0;j<3;j++){
                const x=-25+j*19,h=26+(j%2)*23;
                c.fillStyle='#f9f3e6';c.fillRect(x,-h,16,h+11);c.fillRect(x+3,-h-6,10,6);
                c.fillStyle='#d6cbd8';c.fillRect(x+11,-h+4,5,h+5);
            }
        } else if(mapa.paisagem==='tundra') {
            c.fillStyle='#536d71';c.fillRect(-5,-18,10,34);
            for(let j=0;j<3;j++){c.fillStyle=j%2?'#85adb2':'#609299';c.fillRect(-24+j*6,-23-j*18,48-j*12,22);c.fillStyle='#eaf6ee';c.fillRect(-24+j*6,-23-j*18,48-j*12,7);}
        } else if(mapa.paisagem==='pantano') {
            c.fillStyle='#746651';c.fillRect(-7,-34,15,51);c.fillRect(-28,-23,29,7);c.fillRect(5,-43,25,7);
            c.fillStyle=p[5];c.fillRect(-34,-62,70,29);c.fillRect(-24,-76,44,20);
            c.fillStyle=p[4];for(let j=0;j<5;j++)c.fillRect(-31+j*14,-39,4,27+j%2*14);
            c.fillStyle='#b8d39b';c.fillRect(-17,-63,18,5);
        } else if(mapa.paisagem==='canion') {
            c.fillStyle=p[5];c.fillRect(-27,-48,53,62);c.fillStyle=p[4];c.fillRect(-24,-62,45,22);
            c.fillStyle='#f2ba81';c.fillRect(-24,-62,45,6);c.fillStyle='#693f39';c.fillRect(-27,-24,53,6);
            c.fillStyle='#c87351';c.fillRect(-20,-38,22,8);c.fillRect(-22,0,42,7);
        } else if(mapa.paisagem==='cogumelos') {
            for(let j=0;j<2;j++){
                const x=j*25-20,y=j*15;c.fillStyle='#bfced3';c.fillRect(x+4,y-27,12,43);
                c.fillStyle=j?'#67b6b2':p[4];c.fillRect(x-12,y-41,43,20);c.fillRect(x-5,y-51,28,14);
                c.fillStyle='#eedbe2';c.fillRect(x-5,y-39,6,5);c.fillRect(x+13,y-45,6,6);
                c.fillStyle=p[5];c.fillRect(x-12,y-23,43,5);
            }
        } else {
            c.fillStyle=p[5];c.fillRect(-29,-22,60,38);c.fillRect(-15,-42,37,24);
            c.fillStyle=p[4];c.fillRect(-15,-42,37,8);c.fillRect(-29,-22,24,6);
            c.fillStyle='#2d4659';c.fillRect(14,-28,8,44);c.fillStyle='#91aeb0';c.fillRect(-17,-12,7,22);
        }
        c.restore();
    }
}
function desenharPaisagemClassica(c,mapa,tempo=0) {
    const p=mapa.paleta,caminhos=caminhosDoMapaClassico(mapa);
    c.save();c.fillStyle=p[0];c.fillRect(0,0,1200,700);
    for(let i=0;i<160;i++){
        const x=(i*173+19)%1200,y=(i*97+31)%700;
        c.fillStyle=p[1];c.fillRect(x,y,24+i%4*14,9+i%3*8);
        if(distanciaDosCaminhosClassicos(x,y,caminhos)>70){c.fillStyle=p[4];c.globalAlpha=.35;c.fillRect(x+5,y+5,4,8);c.globalAlpha=1;}
    }
    for(const [cor,largura] of [[p[2],74],[p[3],58]]){
        c.strokeStyle=cor;c.lineWidth=largura;c.lineJoin='round';c.lineCap='square';
        for(const caminho of caminhos){c.beginPath();caminho.forEach((pt,i)=>i?c.lineTo(pt.x,pt.y):c.moveTo(pt.x,pt.y));c.stroke();}
    }
    c.fillStyle=p[2];c.globalAlpha=.25;
    for(const caminho of caminhos)for(let i=1;i<caminho.length;i++){
        const a=caminho[i-1],b=caminho[i],distancia=Math.hypot(b.x-a.x,b.y-a.y);
        for(let d=18;d<distancia;d+=38)c.fillRect(a.x+(b.x-a.x)*d/distancia-4,a.y+(b.y-a.y)*d/distancia-3,8,6);
    }
    c.globalAlpha=1;desenharObjetosDaPaisagemClassica(c,mapa);
    if(mapa.paisagem==='tundra') {
        c.globalAlpha=.16;c.fillStyle='#87f2d3';
        for(let i=0;i<20;i++)c.fillRect(i*64,18+Math.sin(i*.35+tempo/4000)*17,65,22);
    } else if(mapa.paisagem==='pantano'||mapa.paisagem==='cogumelos') {
        c.fillStyle=mapa.paisagem==='pantano'?'#e2ef9b':'#a7e5ed';
        for(let i=0;i<30;i++){c.globalAlpha=.35+.45*(1+Math.sin(tempo/900+i))/2;c.fillRect((i*113+51)%1200,60+(i*97)%580+Math.sin(tempo/1400+i)*8,3,3);}
    }
    c.globalAlpha=1;
    for(const caminho of caminhos){
        const a=caminho[0],b=caminho.at(-1);c.fillStyle='#22343d';c.fillRect(a.x,a.y-31,14,62);c.fillRect(b.x-39,b.y-35,39,70);
        c.fillStyle=p[4];c.fillRect(a.x+3,a.y-24,6,48);c.fillRect(b.x-30,b.y-25,25,50);c.fillStyle='#eaf3bf';c.fillRect(b.x-23,b.y-13,12,24);
    }
    c.restore();
}
for(const [pt,en,es] of [
    ['Ruínas Celestes','Celestial Ruins','Ruinas Celestes'],['Passagens sobre o céu violeta','Passages above violet skies','Pasajes sobre el cielo violeta'],
    ['Jardim de Bambu','Bamboo Garden','Jardín de Bambú'],['Trilhas entre folhas de jade','Trails among jade leaves','Senderos entre hojas de jade'],
    ['Deserto de Sal','Salt Desert','Desierto de Sal'],['Cristais brancos sob o poente','White crystals beneath the sunset','Cristales blancos bajo el atardecer'],
    ['Tundra Boreal','Boreal Tundra','Tundra Boreal'],['Entre neve e auroras','Between snow and auroras','Entre nieve y auroras'],
    ['Pântano dos Vagalumes','Firefly Swamp','Pantano de las Luciérnagas'],['Luzes sobre a trilha de turfa','Lights over the peat trail','Luces sobre el sendero de turba'],
    ['Cânion Vermelho','Red Canyon','Cañón Rojo'],['Curvas entre pilares de arenito','Bends between sandstone pillars','Curvas entre pilares de arenisca'],
    ['Jardim dos Cogumelos','Mushroom Garden','Jardín de los Hongos'],['Um jardim sob a luz das esporas','A garden beneath glowing spores','Un jardín bajo la luz de las esporas'],
    ['Costa da Tempestade','Storm Coast','Costa de la Tormenta'],['Falésias sob chuva azul','Cliffs beneath blue rain','Acantilados bajo lluvia azul']
]){TRADUCOES_FASE18.en[pt]=en;TRADUCOES_FASE18.es[pt]=es;}

for(const [pt,en,es] of [
    ['Bosque Lunar','Moonlit Grove','Bosque Lunar'],['Pedras azuis sob a lua cheia','Blue stones under the full moon','Piedras azules bajo la luna llena'],
    ['Plato das Nuvens','Cloud Plateau','Meseta de las Nubes'],['Pontes altas entre nuvens douradas','High bridges among golden clouds','Puentes altos entre nubes doradas'],
    ['Templo do Jade','Jade Temple','Templo de Jade'],['Ruinas silenciosas entre bambus','Silent ruins among bamboo','Ruinas silenciosas entre bambues'],
    ['Mar de Vidro','Glass Sea','Mar de Vidrio'],['Salinas refletindo o por do sol','Salt flats reflecting the sunset','Salinas que reflejan el atardecer']
]){TRADUCOES_FASE18.en[pt]=en;TRADUCOES_FASE18.es[pt]=es;}
