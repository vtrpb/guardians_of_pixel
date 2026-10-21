function obterMapaAquaticoAtual(){
 if(!mapaPersonalizadoAtivo?.classico)return null;
 return CONFIG.classico.mapasExclusivos.find(m=>m.numero===mapaPersonalizadoAtivo.numeroClassico&&m.agua)||null;
}
function obterTorresAquaticasDisponiveis(){return Object.keys(CONFIG.torre.tipos).filter(t=>CONFIG.torre.tipos[t].aquatica&&torreEstaDesbloqueada(t));}
function terrenoPermiteDefesa(tipo,x,y){
 const configuracao=CONFIG.torre.tipos[tipo],areas=obterAreasDeAguaParaConstrucao();
 if(!areas.length)return !configuracao.aquatica;
 const m=CONFIG.classico.margemDaAgua;
 const dentro=areas.some(agua=>x>=agua.x+m&&x<=agua.x+agua.largura-m&&y>=agua.y+m&&y<=agua.y+agua.altura-m);
 const toca=areas.some(agua=>x+m>agua.x&&x-m<agua.x+agua.largura&&y+m>agua.y&&y-m<agua.y+agua.altura);
 return configuracao.aquatica?dentro:!toca;
}
function criarVisualDaTorreAquatica(nivel,torpedo){
 return Object.freeze({tipoVisual:'aquatica',corBase:torpedo?'#35566b':'#368f9a',corCanhao:['#d9e6d6','#9be4dc','#dab3ed','#ffe5a3'][nivel],corDetalhe:'#e7bb6a',raioBase:26,nivelVisual:nivel,torpedo});
}
function desenharArmamentoAquatico(c,estilo){
 c.fillStyle='#12394e';c.fillRect(-24,-16,48,35);c.fillStyle='#61b4b9';c.fillRect(-21,-14,42,30);
 c.fillStyle='#e6d9b6';c.fillRect(-23,-7,9,19);c.fillRect(14,-7,9,19);
 c.fillStyle=estilo.corBase;c.fillRect(-13,-12,26,25);c.fillStyle='#233c50';c.fillRect(-8,-36,16,30);
 c.fillStyle=estilo.corCanhao;c.fillRect(-5,-32,10,29);
 if(estilo.torpedo){c.fillStyle='#edb779';c.fillRect(-17,-25,8,29);c.fillRect(9,-25,8,29);}
 else{c.fillStyle=estilo.corDetalhe;c.fillRect(-13,-28,26,5);c.fillRect(-3,-41,6,12);}
 for(let i=0;i<estilo.nivelVisual;i++){c.fillStyle='#fff0b4';c.fillRect(-9+i*7,6,4,4);}
}
function criarVisualDaTorreDeBolhas(nivel){
 return Object.freeze({tipoVisual:'bolhas',corBase:'#246b87',corCanhao:'#8ce9f2',corDetalhe:'#d6fbff',raioBase:26,nivelVisual:nivel});
}
function desenharArmamentoDaTorreDeBolhas(c,estilo){
 const nivel=Math.max(estilo.nivelVisual||0,estilo.nivelEvolucaoVisual||0);
 c.fillStyle='#12394e';c.fillRect(-24,-15,48,32);
 c.fillStyle=estilo.corBase;c.fillRect(-21,-12,42,26);
 c.fillStyle='#8ce9f2';c.fillRect(-24,-4,7,12);c.fillRect(17,-4,7,12);
 c.fillStyle='#153c58';c.fillRect(-10,-34,20,38);
 c.fillStyle=estilo.corCanhao;c.fillRect(-6,-39,12,34);
 c.fillStyle=estilo.corDetalhe;c.fillRect(-9,-43,18,7);
 for(let indice=0;indice<nivel;indice++){
  const x=-17+(indice%3)*17,y=7-Math.floor(indice/3)*12;
  c.fillStyle='#d6fbff';c.fillRect(x,y,6,6);
  c.fillStyle='#4baecb';c.fillRect(x+1,y+1,2,2);
 }
 if(nivel>=4){c.fillStyle='#8ce9f2';c.fillRect(-20,-29,7,21);c.fillRect(13,-29,7,21);}
 if(nivel>=5){c.fillStyle='#d6fbff';c.fillRect(-24,-33,15,6);c.fillRect(9,-33,15,6);}
}
function desenharNovoBiomaClassico(c,mapa,tempo){
 const aquatico=Boolean(mapa.agua),cristal=mapa.tema==='valeCristais';
 const p=aquatico?['#eed8a1','#e3c68b','#3dabbc','#178398']:cristal?['#302b52','#40375f','#756da4','#c8a5e4']:['#d8a65f','#e7bc75','#b98045','#f6d590'];
 c.save();c.fillStyle=p[0];c.fillRect(0,0,1200,700);
 for(let i=0;i<300;i++){c.fillStyle=p[1];c.fillRect((i*173)%1200,(i*97)%700,27,5);}
 if(aquatico){const a=mapa.agua;c.fillStyle='#f8edc1';c.fillRect(0,a.y-9,1200,a.altura+18);c.fillStyle=p[2];c.fillRect(a.x,a.y,a.largura,a.altura);
  for(let i=0;i<130;i++){const x=(i*137+tempo*.01)%1180,y=a.y+15+(i*83)%(a.altura-30);c.fillStyle=i%3?'#7ad3d175':'#116d9360';c.fillRect(x,y,18+i%25,3);}}
 const caminhos=caminhosDoMapaClassico(mapa);
 for(const [cor,largura]of[[aquatico?'#198298':p[2],70],[aquatico?'#258eaa':p[3],54]]){
  c.strokeStyle=cor;c.lineWidth=largura;c.lineCap='square';c.lineJoin='round';
  for(const caminho of caminhos){c.beginPath();caminho.forEach((pt,i)=>i?c.lineTo(pt.x,pt.y):c.moveTo(pt.x,pt.y));c.stroke();}}
 desenharObjetosDosBiomasClassicos(c,mapa);
 if(!aquatico&&!cristal){c.fillStyle='#edce9170';for(let i=0;i<12;i++)c.fillRect((i*131+tempo*.012)%1200,(i*71)%700,67,2);}
 for(const caminho of caminhos){const a=caminho[0],b=caminho.at(-1);c.fillStyle='#193c4f';c.fillRect(a.x,a.y-30,14,60);c.fillRect(b.x-38,b.y-32,38,64);c.fillStyle='#a3e5dc';c.fillRect(b.x-28,b.y-19,20,36);}
 c.restore();
}
function desenharCriaturaDosNovosBiomas(c,tipo){
 const config=CONFIG.inimigo[tipo],v=config.visualClassico;
 const estilosExclusivos={celeste:['#4c5f9b','#d9ecf4'],bambu:['#315f4c','#d8d58a'],sal:['#9b819d','#fff0d3'],lunar:['#4d5e9b','#d9e9f4'],nuvem:['#b6c9dc','#fff0be'],jade:['#356857','#e1d18b'],vidro:['#807995','#f5d9d0'],tundra:['#6794a4','#eaf5ef'],pantano:['#456f54','#ecf19d'],canion:['#955546','#efbd7e'],cogumelo:['#765781','#f0c4dc'],costa:['#466d7c','#c9e3df']};
 if(estilosExclusivos[v]){
  const [sombra,luz]=estilosExclusivos[v],r=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);};
  if(v==='celeste'||v==='vidro'||v==='sal'){c.fillStyle=config.cor;c.beginPath();c.moveTo(16,1);c.lineTo(29,13);c.lineTo(24,29);c.lineTo(8,29);c.lineTo(3,13);c.closePath();c.fill();r(luz,13,6,5,16);}
  else if(v==='nuvem'){r(config.cor,4,12,25,13);r(config.cor,9,6,15,18);r(luz,12,9,8,5);}
  else if(v==='bambu'||v==='jade'){r(sombra,4,25,27,5);r(config.cor,9,7,14,20);r(luz,11,4,10,6);r(sombra,5,14,7,4);r(sombra,20,17,8,4);}
  else if(v==='lunar'||v==='costa'){r(config.cor,2,10,11,14);r(config.cor,20,10,11,14);r(luz,11,7,11,19);r(sombra,14,11,3,4);r(sombra,20,11,3,4);}
  else if(v==='tundra'||v==='canion'){r(sombra,3,18,28,10);r(config.cor,7,8,20,19);r(luz,11,10,12,6);r(sombra,24,17,7,7);}
  else if(v==='pantano'){r(sombra,4,23,28,6);r(config.cor,7,12,20,14);r(luz,11,7,12,9);r(sombra,11,16,3,3);r(sombra,21,16,3,3);}
  else {r(sombra,5,24,23,6);r(config.cor,8,10,17,17);r(luz,4,4,25,11);r('#f5e6d9',10,6,4,3);r('#f5e6d9',20,6,4,3);}
  if(config.bossClassico){r('#ffe994',8,0,17,4);r('#ffe994',8,0,3,7);r('#ffe994',15,0,3,6);r('#ffe994',22,0,3,7);}return true;
 }
 if(!['caranguejo','tartaruga','peixe','cristal','golem','morcego','escaravelho','tatu','serpente'].includes(v))return false;
 const r=(cor,x,y,w,h)=>{c.fillStyle=cor;c.fillRect(x,y,w,h);},cor=config.cor;
 if(v==='caranguejo'){for(let i=0;i<3;i++)r('#9b5969',3,16+i*4,27,2);r(cor,7,12,20,15);r('#ffd0a9',10,13,13,5);r(cor,0,6,7,11);r(cor,26,6,6,11);r('#20283e',10,8,3,5);r('#20283e',22,8,3,5);}
 else if(v==='tartaruga'||v==='tatu'){r('#577969',2,18,28,10);r(cor,6,7,22,20);r(v==='tatu'?'#e9c09c':'#b1e3a4',11,9,12,6);r('#637f70',15,15,3,11);r(cor,25,15,7,8);r('#172638',28,16,2,3);}
 else if(v==='peixe'){r('#567d9c',1,7,7,18);r(cor,6,11,21,10);r('#f8efe0',15,7,8,5);r(cor,26,13,6,4);r('#182c43',22,12,3,3);}
 else if(v==='cristal'){c.fillStyle=cor;c.beginPath();c.moveTo(16,1);c.lineTo(28,11);c.lineTo(25,26);c.lineTo(16,31);c.lineTo(5,23);c.lineTo(5,11);c.closePath();c.fill();r('#eceaff',13,5,4,13);r('#403955',9,17,3,3);r('#403955',21,17,3,3);}
 else if(v==='golem'){r('#494c76',4,13,26,12);r(cor,8,8,17,19);r('#e0d5f5',11,2,12,11);r('#172638',12,8,3,4);r('#172638',20,8,3,4);r(cor,7,26,7,5);r(cor,21,26,7,5);r('#7b80b4',12,17,8,6);}
 else if(v==='morcego'){r(cor,0,7,12,16);r(cor,22,7,10,16);r('#514478',4,16,8,9);r('#514478',22,16,8,9);r('#dac2ef',12,9,10,18);r('#221a39',13,13,2,3);r('#221a39',19,13,2,3);r(cor,12,4,3,7);r(cor,20,4,3,7);}
 else if(v==='escaravelho'){for(let i=0;i<3;i++)r('#785638',2,11+i*6,29,3);r(cor,7,7,20,21);r('#fff0a3',11,9,5,15);r('#997246',17,8,2,20);r('#705c43',11,1,11,8);r('#172638',12,3,3,4);r('#172638',20,3,3,4);}
 else if(v==='serpente'){r('#947149',2,20,17,7);r(cor,12,14,16,8);r(cor,21,6,10,11);r('#fbe5ac',22,7,7,5);r('#41302f',27,8,2,3);r('#e0897e',30,14,2,3);}
 if(config.bossClassico){r('#ffe994',8,0,17,4);r('#ffe994',8,0,3,7);r('#ffe994',15,0,3,6);r('#ffe994',22,0,3,7);}return true;
}
for(const [pt,en,es]of[
 ['Escolha o mapa primeiro para depois jogar','Choose a map before playing','Elige el mapa antes de jugar'],['Compre ou desbloqueie uma torre aquática','Buy or unlock an aquatic tower','Compra o desbloquea una torre acuática'],
 ['Escolha um mapa','Choose a map','Elige un mapa'],['Selecionar mapa','Select map','Seleccionar mapa'],['Selecione uma torre aquática para jogar neste mapa.','Select an aquatic tower to play this map.','Selecciona una torre acuática para jugar este mapa.'],
 ['Torre aquática: construa na água, fora da rota dos inimigos.','Aquatic tower: build in water, outside the enemy route.','Torre acuática: construye en el agua, fuera de la ruta enemiga.'],['Esta torre só pode ser construída na água.','This tower can only be built in water.','Esta torre solo se puede construir en el agua.'],['Use uma torre aquática para construir na água.','Use an aquatic tower to build in water.','Usa una torre acuática para construir en el agua.'],
 ['Boia de Arpões','Harpoon Buoy','Boya de Arpones'],['Torre de Torpedos','Torpedo Tower','Torre de Torpedos'],['Lagoa dos Corais','Coral Lagoon','Laguna de Coral'],['Marés de safira','Sapphire tides','Mareas de zafiro'],['Vale dos Cristais','Crystal Valley','Valle de Cristales'],['Brilhos sob a montanha','Gleams beneath the mountain','Destellos bajo la montaña'],['Dunas Douradas','Golden Dunes','Dunas Doradas'],['Oásis ao entardecer','Sunset oasis','Oasis al atardecer'],
 ['Caranguejo de Coral','Coral Crab','Cangrejo de Coral'],['Tartaruga de Recife','Reef Turtle','Tortuga de Arrecife'],['Peixe-agulha','Needlefish','Pez Aguja'],['Rei dos Corais','Coral King','Rey de los Corales'],['Fragmento Violeta','Violet Shard','Fragmento Violeta'],['Golem de Quartzo','Quartz Golem','Gólem de Cuarzo'],['Morcego de Ametista','Amethyst Bat','Murciélago de Amatista'],['Colosso Geodo','Geode Colossus','Coloso Geoda'],['Escaravelho Dourado','Golden Scarab','Escarabajo Dorado'],['Tatu das Dunas','Dune Armadillo','Armadillo de las Dunas'],['Serpente de Areia','Sand Snake','Serpiente de Arena'],['Soberano das Areias','Sand Sovereign','Soberano de las Arenas']
]){TRADUCOES_FASE18.en[pt]=en;TRADUCOES_FASE18.es[pt]=es;}

function desenharObjetosDosBiomasClassicos(c,mapa){
 if(mapa.paisagem){desenharObjetosDaPaisagemClassica(c,mapa);return;}
 const aquatico=Boolean(mapa.agua),cristal=mapa.tema==='valeCristais';
 const caminhos=caminhosDoMapaClassico(mapa);
 const candidatos=[];
 for(let i=0;i<60;i++){
  const x=45+(i*181)%1100,y=50+(i*113)%600;if(distanciaDosCaminhosClassicos(x,y,caminhos)<75)continue;
  candidatos.push({x,y,i});
 }
 const limite=CONFIG.decoracoesExtrasClassicas.limiteObjetosExclusivos;
 // Conservar tanto corais submersos quanto conchas da margem.
 const selecionados=aquatico
  ? [true,false].flatMap(naAgua=>selecionarDecoracoesEspalhadas(candidatos.filter(p=>(p.y>145&&p.y<550)===naAgua),limite/2))
  : selecionarDecoracoesEspalhadas(candidatos,limite);
 for(const {x,y,i} of selecionados){
  c.save();c.translate(x,y);
  if(aquatico){if(y>145&&y<550){c.fillStyle=i%2?'#ef8bb0':'#e9b069';c.fillRect(-5,-18,9,36);c.fillRect(-19,-3,37,7);c.fillRect(-20,-16,6,20);c.fillRect(13,-23,6,25);c.fillStyle='#165e69';c.fillRect(-14,18,30,8);}
   else{c.fillStyle='#fff4d7';c.fillRect(-13,-7,26,14);c.fillStyle='#cbb39c';c.fillRect(-4,-5,3,10);}}
  else if(cristal){for(let j=0;j<3;j++){const h=23+j*12;c.fillStyle=['#8a78c8','#b9a3ed','#6fc9d6'][j];c.beginPath();c.moveTo(-22+j*15,5);c.lineTo(-24+j*15,-h+9);c.lineTo(-15+j*15,-h);c.lineTo(-5+j*15,-h+9);c.lineTo(-7+j*15,5);c.closePath();c.fill();c.fillStyle='#ece6ff';c.fillRect(-16+j*15,-h+8,3,h-7);}}
  else{c.fillStyle='#a7774a';c.fillRect(-8,-8,17,42);c.fillStyle='#547c55';c.fillRect(-31,-18,62,12);c.fillRect(-20,-29,38,12);c.fillStyle='#739b60';c.fillRect(-36,-7,24,9);c.fillRect(14,-7,24,9);}
  c.restore();
 }
}
