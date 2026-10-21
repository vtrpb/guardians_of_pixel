// Evoluções do armamento original. Coordenadas locais acompanham a mira.
function desenharRemakeDosNiveisDaTorre(c, e) {
    if (!e.remakeDaTorre) return false;
    const n = e.nivelDoRemake, cor = e.corCanhao, luz = e.corDetalhe || '#ffc8df';
    const ret = (t,x,y,w,h) => { c.fillStyle=t;c.fillRect(x,y,w,h); };
    const redondo = (t,x,y,w,h,r=3) => { c.fillStyle=t;c.beginPath();c.roundRect(x,y,w,h,r);c.fill(); };
    c.save();
    if (e.remakeDaTorre === 'padrao' || e.remakeDaTorre === 'canhaoPesado') {
        // Mesmas superf?cies simples e curvas suaves da base original.
        const pesado = e.remakeDaTorre === 'canhaoPesado';
        const final = n === 5;
        const comprimento = pesado ? (final ? 75 : 62) : (final ? 65 : 52);
        const largura = pesado ? (final ? 30 : 24) : (final ? 18 : 12);
        const larguraBocal = largura + (pesado ? 14 : 10);
        const alturaBocal = pesado ? 15 : 12;
        redondo(cor, pesado ? -19 : -12, -17, pesado ? 38 : 24, 27, 9);
        if (pesado || final) {
            const distancia = pesado ? (final ? 21 : 16) : 15;
            for (const lado of [-1, 1]) {
                redondo(cor, lado * distancia - 4, -24, 8, 29, 4);
            }
        }
        redondo(cor, -largura / 2, -comprimento + 5, largura, comprimento - 8, 5);
        redondo(cor, -larguraBocal / 2, -comprimento, larguraBocal, alturaBocal, 5);
        // A abertura usa sombra discreta, sem moldura preta nem frisos contrastantes.
        redondo('rgba(0, 0, 0, 0.28)', -largura / 2, -comprimento + 3, largura, 4, 2);
    } else if (e.remakeDaTorre === 'obliterador') {
        const comprimento = e.comprimentoCanhao + Math.max(0, n - 3) * 5;
        desenharArmamentoDoObliterador({ ...e, comprimentoCanhao: comprimento });
        if (n >= 2) {
            const avanco = n === 5 ? 14 : 8;
            ret('#24191d', -6, -comprimento - avanco, 12, avanco + 8);
            ret(cor, -3, -comprimento - avanco, 6, avanco + 12);
            ret(luz, -5, -comprimento - avanco - 3, 10, 7);
        }
        // Evoluir os mesmos tres canos finos e o suporte escuro original.
        for (const x of [-13, 0, 13]) {
            ret(cor, x - 5, -comprimento + 10, 10, 4);
            if (n >= 2) ret(luz, x - 5, -comprimento + 19, 10, 3);
            if (n >= 4) {
                const topo = -comprimento - (x === 0 ? (n === 5 ? 20 : 14) : 12);
                ret('#24191d', x - 7, topo, 14, 10);
                ret(luz, x - 5, topo + 1, 10, 5);
            }
        }
        if (n >= 3) {
            for (const lado of [-1, 1]) {
                ret('#24191d', lado * 23 - 3, -24, 6, 18);
                ret(cor, lado * 23 - 2, -22, 4, 12);
            }
        }
        if (n === 5) {
            ret(luz, -21, -18, 42, 4);
            for (const lado of [-1, 1]) {
                ret('#24191d', lado * 26 - 4, -40, 8, 26);
                ret(cor, lado * 26 - 2, -37, 4, 20);
            }
        }
    } else if (e.remakeDaTorre === 'esporos') {
        // Mesmo chapeu em degraus, caule e manchas quadradas do original.
        desenharArmamentoDeEsporos(e);
        const broto = (x, topo) => {
            ret(luz, x - 2, topo + 9, 4, 17);
            ret(cor, x - 5, topo, 10, 5);
            ret(cor, x - 8, topo + 4, 16, 7);
            ret(cor, x - 4, topo + 10, 8, 3);
            ret(e.corEsporos, x - 3, topo + 3, 4, 4);
        };
        broto(-17, -21);
        if (n >= 2) broto(18, -29);
        if (n === 3) {
            broto(8, -7);
            ret(luz, -11, -16, 22, 4);
            ret(e.corEsporos, 8, -e.alturaCogumelo + 4, 6, 5);
        }
    } else {
        // Bobina Tesla: anéis condutores, terminais e descarga entre polos.
        ret('#17243d',-9,-38,18,35);
        ret(cor,-6,-36,12,29);
        for(let i=0;i<n+2;i++)ret(luz,-12,-15-i*7,24,3);
        const topo=-45-n*5;
        ret(cor,-4,topo+7,8,18);
        redondo(luz,-11,topo,22,12,5);
        ret('#ffffff',-5,topo+2,7,3);
        if(n>=2)for(const lado of [-1,1]){
            ret('#17243d',lado*21-3,-37,6,25);
            redondo(luz,lado*21-7,-44,14,10,4);
            ret(cor,lado*21-4,-41,8,4);
        }
        if(n===3){
            c.strokeStyle=luz;c.lineWidth=2;c.beginPath();
            c.moveTo(-21,-43);c.lineTo(-13,-52);c.lineTo(-8,-47);c.lineTo(0,topo+8);
            c.lineTo(8,-47);c.lineTo(13,-52);c.lineTo(21,-43);c.stroke();
            ret(luz,-15,-7,30,4);
        }
    }
    c.restore();
    return true;
}

function desenharEvolucaoVisualDaTorre(c, e) {
    if (!(e.nivelEvolucaoVisual >= 4)) return;
    const final = e.nivelEvolucaoVisual >= 5, etapa = final ? 2 : 1;
    const cor = e.corCanhao, luz = e.corDetalhe || cor;
    const ret = (t,x,y,w,h) => { c.fillStyle=t;c.fillRect(x,y,w,h); };
    const linha = (t,pontos,largura=3) => {
        c.strokeStyle=t;c.lineWidth=largura;c.beginPath();
        pontos.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();
    };
    const cristal = (x,y,h,w,t) => {
        c.fillStyle=t;c.beginPath();c.moveTo(x,y-h);c.lineTo(x+w,y-h*.6);
        c.lineTo(x+w*.6,y);c.lineTo(x-w*.6,y);c.lineTo(x-w,y-h*.6);c.closePath();c.fill();
        linha(luz,[[x,y-h+5],[x,y-3]],2);
    };
    c.save();
    switch (e.tipoVisual) {
    case 'glacial':
        for(const lado of [-1,1])cristal(lado*18,-15,19+etapa*7,6,cor);
        if(final)cristal(0,12,19,7,luz);
        break;
    case 'esporos':
        for(const lado of [-1,1]){
            const y=lado<0?-22:-14, x=lado*17;
            ret(luz,x-2,y,4,20);ret(cor,x-8,y-7,16,8);ret(cor,x-5,y-11,10,5);
            ret(e.corEsporos||luz,x-4,y-6,3,3);
        }
        if(final){ret(luz,-2,2,4,15);ret(cor,-10,-2,20,7);ret(cor,-6,-6,12,5);}
        break;
    case 'besta': {
        const topo=-e.comprimentoBesta, w=e.larguraBesta/2;
        linha(cor,[[-w,topo+25],[-w+7,topo+17],[0,topo+24],[w-7,topo+17],[w,topo+25]],4);
        linha(luz,[[-w,topo+25],[0,topo+36],[w,topo+25]],2);
        if(final)for(const lado of [-1,1]){ret('#3a2618',lado*7-2,topo+4,4,33);ret('#f0dfaa',lado*7-1,topo-4,2,24);}
        break;
    }
    case 'raios':
        for(let i=0;i<2+etapa;i++)ret(cor,-10,-38+i*6,20,3);
        for(const lado of [-1,1]){
            ret(luz,lado*20-3,-53,6,18);ret(cor,lado*20-6,-57,12,7);
        }
        if(final)linha(luz,[[-20,-55],[-10,-63],[0,-57],[10,-63],[20,-55]],2);
        break;
    case 'lancaChamas':
        for(let i=0;i<etapa+2;i++)ret('#45484b',-9,-48+i*7,18,3);
        ret(cor,-13,-61-etapa*3,26,7);ret('#ffb23e',-8,-63-etapa*3,16,3);
        if(final)linha(e.corCombustivel||luz,[[9,-17],[18,-17],[18,10],[5,10]],5);
        break;
    case 'obliterador':
        for(const x of [-13,0,13]){
            ret('#24191d',x-6,-e.comprimentoCanhao-10,12,10);
            ret(cor,x-4,-e.comprimentoCanhao-9,8,5);
            if(final)ret(luz,x-5,-e.comprimentoCanhao+10,10,4);
        }
        break;
    case 'canhaoBlindado':
        ret('#18252e',-11,-45-etapa*5,22,14);ret(cor,-8,-43-etapa*5,16,10);
        ret('#15222a',-6,-44-etapa*5,12,3);
        for(const lado of [-1,1]){ret(e.corBase,lado*17-4,-20,8,24);ret(luz,lado*17-2,-17,4,3);}
        if(final){ret(cor,-12,-30,24,5);ret(luz,-2,-27,4,14);}
        break;
    case 'aquatica':
        // Flutuadores e amarras continuam com o material da plataforma original.
        for(const lado of [-1,1]){
            ret('#e6d9b6',lado*19-4,-15,8,31);ret('#887e60',lado*19-4,-9,8,3);
            if(final)ret('#887e60',lado*19-4,9,8,3);
        }
        if(e.torpedo){
            for(const lado of [-1,1]){ret('#edb779',lado*13-4,-30-etapa*5,8,15);ret(luz,lado*13-2,-32-etapa*5,4,5);}
            if(final){ret(cor,-4,-32,8,28);ret(luz,-2,-37,4,7);}
        }else{
            ret(cor,-3,-43-etapa*5,6,20);
            linha(luz,[[-8,-38-etapa*5],[0,-47-etapa*5],[8,-38-etapa*5]],3);
            if(final)linha(luz,[[-10,-30],[0,-37],[10,-30]],3);
        }
        break;
    case 'feixeContinuo':
        for(const lado of [-1,1]){ret(cor,lado*8-4,-33-etapa*6,8,20);ret(luz,lado*8-3,-34-etapa*6,6,5);}
        ret(luz,-3,-28,6,18);if(final)ret(cor,-11,-12,22,4);
        break;
    case 'longoAlcance':
        ret(cor,-5,-44-etapa*8,10,20);ret('#20303e',-7,-46-etapa*8,14,5);
        ret(luz,10,-29,4,12);if(final)linha(cor,[[-5,-14],[-16,4],[-21,4]],3);
        break;
    case 'perfuradora':
        for(const lado of [-1,1]){ret(cor,lado*6-3,-59-etapa*7,6,20);ret(luz,lado*6-4,-62-etapa*7,8,5);}
        for(let i=0;i<etapa+1;i++)ret(luz,-11,-48+i*9,22,3);
        break;
    case 'marcadora':
        linha(cor,[[-22,-49],[-22,-59],[22,-59],[22,-49]],3);
        ret(luz,-2,-71-etapa*4,4,14);
        if(final){linha(luz,[[-10,-69],[-10,-74],[10,-74],[10,-69]],2);ret(cor,-10,-32,20,4);}
        break;
    case 'drones':
        for(const lado of [-1,1]){
            const x=lado*21,y=final?-47:-39;
            ret(cor,x-6,y,12,9);ret(luz,x-2,y+2,4,3);
            linha(luz,[[x-10,y-2],[x+10,y-2]],2);
        }
        if(final){ret(cor,-7,-24,14,9);linha(luz,[[-12,-26],[12,-26]],2);}
        break;
    case 'correntes':
        c.strokeStyle=cor;c.lineWidth=4;
        for(let i=0;i<etapa+1;i++)c.strokeRect(-9,-64-i*8,18,7);
        if(final)for(const lado of [-1,1])linha(luz,[[lado*11,-25],[lado*21,-17],[lado*18,-8]],4);
        break;
    case 'sucata':
        ret(cor,-11,-62-etapa*6,22,12);ret('#282e2c',-6,-64-etapa*6,12,4);
        ret(e.corBase,-23,-22,13,10);ret(luz,-21,-20,3,3);
        if(final){ret(cor,10,-43,14,6);ret(luz,15,-47,5,14);}
        break;
    case 'prismatico':
        cristal(-19,-25,20+etapa*5,6,'#61c9ff');cristal(19,-25,20+etapa*5,6,'#ff5e75');
        if(final)cristal(0,-11,22,7,'#ffe15c');
        break;
    case 'varredura':
        c.strokeStyle=cor;c.lineWidth=3;c.beginPath();c.arc(0,-48,27,Math.PI*1.12,Math.PI*1.88);c.stroke();
        if(final){c.beginPath();c.arc(0,-48,32,Math.PI*1.12,Math.PI*1.88);c.stroke();}
        ret(luz,-2,-71-etapa*3,4,8);
        break;
    case 'aurora':
        cristal(-15,-10,17+etapa*4,5,cor);cristal(15,-10,17+etapa*4,5,cor);
        break;
    default: {
        // Canhão comum: conservar as formas arredondadas e a mesma paleta.
        const w=e.larguraCanhao||12,h=e.comprimentoCanhao||34;
        c.fillStyle=cor;c.beginPath();c.roundRect(-w/2-2,-h+3,w+4,8,3);c.fill();
        if(final){c.fillStyle=luz;c.beginPath();c.roundRect(-w/2-1,-h+15,w+2,4,2);c.fill();}
    }
    }
    c.restore();
}
