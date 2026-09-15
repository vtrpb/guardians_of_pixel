// Arte original em coordenadas inteiras. Não lê nem incorpora imagens de references.
const fs = require('node:fs');
const path = require('node:path');
const pasta = path.join(__dirname, '..', 'assets', 'conquistas');
fs.mkdirSync(pasta, {recursive:true});
const cor = {ouro:'#ffd66b',claro:'#fff1b0',azul:'#63dbea',roxo:'#b791ef',verde:'#8fdd91',vermelho:'#f57962',branco:'#edf1ec',escuro:'#182432',aco:'#8298ad'};
const r=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${cor[c]||c}"/>`;
const p=(pontos,c)=>`<polygon points="${pontos}" fill="${cor[c]||c}"/>`;
const grupo=(x,y,s,arte)=>`<g transform="translate(${x} ${y}) scale(${s})">${arte}</g>`;
const estrela=(x,y,c='ouro')=>r(x+2,y,2,2,c)+r(x,y+2,6,2,c)+r(x+2,y+4,2,2,c);
const torre=(x,y,c='aco')=>r(x,y,3,4,c)+r(x+5,y,3,4,c)+r(x+10,y,3,4,c)+r(x,y+4,13,4,c)+r(x+2,y+8,9,12,c)+r(x+4,y+11,5,9,'escuro')+r(x-1,y+20,15,2,c);
const escudo=(x,y,c='azul')=>p(`${x},${y} ${x+14},${y} ${x+14},${y+12} ${x+10},${y+12} ${x+10},${y+16} ${x+4},${y+16} ${x+4},${y+12} ${x},${y+12}`,c)+r(x+3,y+3,8,7,'escuro')+r(x+6,y+3,2,10,'branco');
const relogio=(x,y,c='ouro')=>r(x+3,y,12,18,c)+r(x,y+3,18,12,c)+r(x+3,y+3,12,12,'escuro')+r(x+8,y+4,2,7,'branco')+r(x+8,y+9,6,2,'branco');
const coroa=(x,y,c='ouro')=>r(x,y,3,11,c)+r(x+7,y+3,3,8,c)+r(x+14,y,3,11,c)+r(x,y+8,17,5,c)+r(x+2,y+14,13,2,c)+r(x+7,y+9,3,3,'vermelho');
const moeda=(x,y)=>r(x+2,y,7,11,'ouro')+r(x,y+2,11,7,'ouro')+r(x+4,y+2,3,7,'claro');
const espada=(x,y,c='branco')=>r(x+3,y,3,14,c)+r(x,y+14,9,3,'ouro')+r(x+3,y+17,3,6,'vermelho');
const livro=(x,y,c='verde')=>r(x,y,20,16,c)+r(x+2,y+2,7,12,'branco')+r(x+11,y+2,7,12,'claro')+r(x+9,y+1,2,15,'escuro')+r(x+3,y+5,5,1,'aco')+r(x+12,y+8,5,1,'aco');
const pessoa=(x,y,c='roxo')=>r(x+2,y,5,5,'claro')+r(x,y+6,9,8,c)+r(x,y+14,3,4,c)+r(x+6,y+14,3,4,c);
const seta=(x,y,c='verde')=>r(x,y+3,10,4,c)+r(x+8,y,3,10,c)+r(x+11,y+2,2,6,c)+r(x+13,y+4,2,2,c);
const explosao=()=>p('14,3 18,3 18,8 23,6 24,10 29,10 26,15 29,20 24,21 24,27 18,24 15,29 12,24 6,26 8,20 3,18 8,14 5,9 11,10 11,5 14,7','vermelho')+p('14,9 18,9 18,12 23,12 23,17 20,17 21,22 16,21 13,24 11,19 8,18 11,14 10,12 14,12','ouro')+r(14,13,5,6,'claro')+r(12,15,9,2,'branco')+r(3,4,2,2,'ouro')+r(26,27,3,2,'vermelho');
const imagens = {
 esseEOFim:relogio(3,3,'roxo')+grupo(20,12,.65,espada(0,0))+r(3,26,17,3,'vermelho'),
 finalmenteEmCasa:p('3,15 16,3 29,15','ouro')+r(6,15,20,14,'azul')+r(13,20,6,9,'escuro')+grupo(19,13,.7,escudo(0,0,'roxo')),
 porUmPixel:torre(18,6)+r(4,23,11,3,'vermelho')+r(14,20,3,3,'ouro')+estrela(8,9,'vermelho'),
 naUltimaHora:grupo(2,3,.8,relogio(0,0))+grupo(16,12,.75,torre(0,0,'verde'))+r(15,2,3,7,'vermelho')+r(19,7,4,3,'vermelho'),
 viradaDeJogo:grupo(3,17,.55,torre(0,0,'aco'))+r(4,22,9,2,'vermelho')+seta(12,4)+estrela(17,18),
 naoDestaVez:escudo(9,8,'verde')+r(4,3,15,3,'ouro')+r(3,6,3,8,'ouro')+p('2,11 8,11 5,16','ouro'),
 voceNaoPassa:torre(10,5,'azul')+r(3,19,26,4,'vermelho')+r(5,13,3,14,'ouro')+r(25,13,3,14,'ouro'),
 controleAbsoluto:estrela(3,5,'azul')+p('22,3 19,10 24,13 28,9 25,6 24,9','vermelho')+r(12,16,8,10,'verde')+r(14,14,4,3,'branco')+r(8,12,2,2,'branco')+r(23,19,2,2,'branco'),
 ultimaLinha:r(3,25,26,3,'vermelho')+grupo(3,8,.65,torre(0,0))+grupo(19,8,.65,torre(0,0,'azul'))+r(14,17,4,8,'ouro'),
 verdadeiroInimigo:moeda(4,5)+moeda(17,10)+r(5,24,22,3,'vermelho')+r(5,21,3,9,'vermelho')+r(24,21,3,9,'vermelho'),
 soMaisUma:r(4,12,24,13,'roxo')+r(7,16,8,3,'escuro')+r(10,13,2,9,'escuro')+r(21,15,3,3,'vermelho')+r(18,20,3,3,'ouro')+estrela(4,3)+estrela(13,3)+estrela(22,3),
 semPressa:relogio(7,4,'azul')+r(5,26,20,2,'verde')+r(9,23,13,3,'verde')+r(22,22,5,4,'verde'),
 cadeSaida:r(4,4,24,3,'ouro')+r(4,7,3,20,'ouro')+r(10,10,18,3,'ouro')+r(25,13,3,15,'ouro')+r(10,13,3,9,'ouro')+r(13,19,8,3,'ouro')+r(18,13,3,6,'ouro')+r(13,25,9,3,'claro'),
 amareloDemais:r(4,4,14,24,'ouro')+r(7,7,11,21,'escuro')+r(9,9,8,16,'verde')+seta(14,12,'verde'),
 silencioAbrePortas:grupo(3,8,.75,torre(0,0,'roxo'))+grupo(19,8,.75,torre(0,0,'roxo'))+r(11,14,10,14,'aco')+r(14,19,4,9,'escuro')+estrela(13,3),
 hospedeCurioso:r(3,5,18,22,'aco')+r(6,8,12,16,'claro')+[0,1,2,3].map(i=>r(8,10+i*3,2,2,'verde')+r(12,10+i*3,4,1,'escuro')).join('')+r(22,17,5,5,'ouro')+r(24,21,2,7,'ouro')+r(26,25,3,2,'ouro'),
 assuntoFamilia:r(3,3,26,26,'ouro')+r(5,5,22,22,'roxo')+grupo(7,9,.7,pessoa(0,0,'azul'))+grupo(18,9,.7,pessoa(0,0,'vermelho'))+r(7,6,5,2,'claro')+r(18,6,5,2,'claro'),
 limitesDoVazio:grupo(2,4,.75,espada(0,0))+escudo(12,9,'aco')+r(4,26,24,3,'vermelho'),
 desafiandoCoroa:grupo(3,10,.8,espada(0,0))+grupo(22,10,.8,espada(0,0))+grupo(9,2,.8,coroa(0,0)),
 respeitoConquistado:escudo(9,11,'roxo')+coroa(8,3)+estrela(2,22)+estrela(25,21),
 promessaNoVazio:r(3,13,7,8,'roxo')+r(22,13,7,8,'azul')+p('10,14 15,11 21,14 23,17 20,21 16,23 10,19','claro')+r(12,16,7,3,'ouro')+estrela(13,3),
 doisCaminhos:r(14,19,4,10,'claro')+r(5,15,22,4,'claro')+r(5,7,4,8,'roxo')+r(23,7,4,8,'azul')+estrela(4,2,'roxo')+estrela(22,2,'azul'),
 lendaDasCemMissoes:livro(6,13,'ouro')+grupo(8,2,.9,coroa(0,0))+estrela(1,8)+estrela(26,8),
 primeiraVigilia:torre(10,8,'azul')+r(3,4,5,5,'claro')+r(6,3,4,4,'escuro')+estrela(23,3),
 guardiaoDosCincoReinos:escudo(9,11,'verde')+[0,1,2,3,4].map(i=>r(3+i*6,4,3,4,['ouro','azul','roxo','vermelho','verde'][i])).join(''),
 guardiaoDeTodosOsReinos:coroa(8,8)+r(10,25,13,3,'ouro')+[[3,3],[14,2],[26,3],[2,14],[27,14],[3,25],[14,28],[26,25]].map(([x,y])=>r(x,y,3,3,'azul')).join(''),
 mestreDoArsenal:grupo(4,3,1,espada(0,0))+r(18,5,4,22,'aco')+r(14,7,13,6,'ouro')+r(14,4,5,5,'ouro')+r(22,4,5,5,'ouro'),
 lendaDoInfinito:p('3,10 10,10 22,20 26,20 26,13 22,13 10,23 3,23 3,10 6,13 6,20 9,20 21,10 29,10 29,23 21,23 9,13 6,13','roxo')+estrela(13,3)+r(9,27,14,2,'azul'),
 cacadorDePixelsSupremo:r(5,6,22,20,'vermelho')+r(8,9,16,14,'escuro')+r(14,3,3,26,'ouro')+r(2,15,28,3,'ouro')+r(12,12,8,8,'roxo')+r(14,14,4,4,'claro'),
 alemDoLimite:r(4,23,24,4,'aco')+r(8,18,16,3,'aco')+r(12,13,8,3,'aco')+p('16,2 23,10 19,10 19,20 13,20 13,10 9,10','azul')+estrela(24,4),
 aindaEstaEsperando:r(7,3,18,26,'roxo')+r(10,6,12,20,'escuro')+r(2,9,9,3,'azul')+r(20,19,10,3,'vermelho')+r(14,12,3,3,'branco')+r(20,5,7,2,'azul'),
 osSeisGuardioes:[0,1,2,3,4,5].map(i=>grupo(3+(i%3)*10,4+Math.floor(i/3)*14,.45,torre(0,0,['ouro','azul','roxo','verde','vermelho','aco'][i]))).join(''),
 mestreDoFliperama:r(7,3,18,27,'roxo')+r(9,6,14,12,'escuro')+r(11,8,10,7,'azul')+r(7,19,18,5,'ouro')+r(11,18,2,4,'vermelho')+r(19,21,3,2,'vermelho')+r(12,26,8,2,'escuro'),
 pareORelogio:relogio(3,7,'azul')+r(21,9,3,17,'ouro')+r(27,9,3,17,'ouro')+estrela(14,2),
 demolicaoEmMassa:explosao(),
 frequencia09:r(4,10,24,17,'verde')+r(7,13,11,10,'escuro')+r(9,15,7,2,'aco')+r(9,19,7,2,'aco')+r(21,14,4,4,'ouro')+r(21,21,4,2,'claro')+r(8,5,2,5,'aco')+r(10,3,10,2,'azul')+r(23,4,3,3,'azul')
};
for(const [id,arte] of Object.entries(imagens)){
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" shape-rendering="crispEdges">${r(0,0,32,32,'escuro')}${arte}</svg>\n`;
    fs.writeFileSync(path.join(pasta,id+'.svg'),svg);
}
console.log(`${Object.keys(imagens).length} ícones originais gerados.`);
