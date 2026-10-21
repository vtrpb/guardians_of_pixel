// Dois tipos próprios por mapa. As mesmas silhuetas servem à galeria,
// à arena e à máscara de construção, sem alterar os cenários da campanha.
const DECORACOES_EXTRAS_CLASSICAS = Object.freeze({
 1:['moinho','poco'],2:['obelisco','tenda'],3:['pescaPolar','treno'],4:['totem','estatuaSerpente'],
 5:['celeiro','colmeia'],6:['fornalha','geiser'],7:['passarela','canoa'],8:['fossil','ninho'],
 9:['antena','estacaoDrone'],10:['telescopio','gerador'],11:['onibus','semaforo'],12:['ampulheta','anel'],
 13:['trincheira','radio'],14:['moldura','escadaria'],15:['estante','bancada'],16:['pedestal','esfera'],
 17:['pendulo','engrenagem'],18:['trono','estandarte'],101:['torii','lanterna'],102:['tumulo','carroca'],
 103:['ancora','naufragio'],104:['vagoneta','geodo'],105:['tapete','urnas'],106:['barracaPolar','marcoPolar'],
 107:['palafita','cestoVagalumes'],108:['ponteRochosa','carroMinerio'],109:['casaCogumelo','circuloEsporos'],
 110:['farol','boia'],111:['telescopio','pedestal'],112:['torii','lanterna'],113:['fossil','urnas']
});
const posicoesExtrasClassicas = new Map();

function selecionarDecoracoesEspalhadas(candidatos, limite) {
 if(candidatos.length<=limite)return candidatos.slice();
 const escolhidos=[candidatos[0]], restantes=candidatos.slice(1);
 while(escolhidos.length<limite&&restantes.length){
  let melhor=0,distancia=-1;
  restantes.forEach((p,i)=>{
   const d=Math.min(...escolhidos.map(q=>Math.hypot(p.x-q.x,p.y-q.y)));
   if(d>distancia){distancia=d;melhor=i;}
  });
  escolhidos.push(restantes.splice(melhor,1)[0]);
 }
 return escolhidos;
}

function obterDecoracoesBaseClassicas(mapa) {
 const grupos=new Map();
 const caminhos=caminhosDoMapaClassico(mapa);
 for(const d of decoracoesDoMapa[mapa.tema]||[]){
  if(!grupos.has(d.tipo))grupos.set(d.tipo,[]);
  grupos.get(d.tipo).push(d);
 }
 const escolhidos=new Set([...grupos.values()].flatMap(grupo=>{
  const livres=grupo.filter(d=>distanciaDosCaminhosClassicos(d.x,d.y,caminhos)>=CONFIG.decoracoesExtrasClassicas.distanciaCaminho);
  return selecionarDecoracoesEspalhadas(livres,CONFIG.decoracoesExtrasClassicas.limitePorTipoBase);
 }));
 return (decoracoesDoMapa[mapa.tema]||[]).filter(d=>escolhidos.has(d));
}

function desenharObjetoExtraClassico(c,tipo,x,y) {
 c.save();c.translate(x,y);
 const r=(cor,x,y,l,a)=>{c.fillStyle=cor;c.fillRect(x,y,l,a);};
 const p=(cor,pontos)=>{c.fillStyle=cor;c.beginPath();pontos.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();};
 const aro=(cor,x,y,raio,largura=5)=>{c.strokeStyle=cor;c.lineWidth=largura;c.beginPath();c.arc(x,y,raio,0,Math.PI*2);c.stroke();};
 const madeira='#80573e',clara='#d7ad72',pedra='#58687e',luz='#96e3eb',ouro='#edbd61';
 r('#15203050',-29,23,58,8);
 switch(tipo){
 case 'moinho':r(clara,-14,-14,28,39);p('#ad594e',[[-20,-14],[0,-32],[20,-14]]);r('#4b3d44',-5,9,10,16);r('#ece0bc',-29,-11,58,6);r('#ece0bc',-3,-34,6,48);r(madeira,-6,-14,12,12);break;
 case 'poco':r(pedra,-23,3,46,23);r('#273a50',-17,2,34,8);r(madeira,-24,-21,5,45);r(madeira,19,-21,5,45);p('#ac6248',[[-30,-19],[0,-34],[30,-19]]);r(clara,-2,-20,3,28);r('#bcc5c3',-7,6,14,9);break;
 case 'obelisco':p('#c08c53',[[-12,22],[-9,-22],[0,-34],[9,-22],[12,22]]);p('#e9ca85',[[0,-34],[9,-22],[12,22],[0,22]]);r('#8f6548',-24,22,48,8);r('#59958e',-4,-13,7,18);break;
 case 'tenda':p('#ddbd87',[[-33,25],[-4,-28],[32,25]]);p('#945c51',[[-18,25],[0,-11],[17,25]]);r('#49363e',-7,5,14,20);r(madeira,-2,-34,4,12);r('#67a7a0',2,-33,20,9);break;
 case 'pescaPolar':r('#cce3e5',-30,3,60,23);r('#609bad',-23,7,46,14);r('#294e69',-17,9,34,9);r(madeira,-27,-18,6,43);r(clara,-24,-23,38,5);r('#d8e3ce',12,-21,2,33);r('#da7e68',9,8,8,5);r('#eef3e8',-30,24,60,5);break;
 case 'treno':r('#738eac',-31,23,62,5);r(madeira,-24,6,45,12);r(madeira,-22,-14,5,34);r(clara,-18,-9,34,6);r('#9e4c61',-10,-4,24,13);r('#e4ceb0',0,-4,4,13);r('#738eac',25,13,5,12);break;
 case 'totem':r(madeira,-15,-31,30,57);r('#caa978',-20,-25,40,13);r('#577e76',-12,-5,24,14);r('#222f38',-12,-22,7,5);r('#222f38',5,-22,7,5);p('#c97654',[[-6,-15],[7,-15],[0,-6]]);r('#e6cf96',-8,15,16,5);break;
 case 'estatuaSerpente':r('#586e60',-29,22,58,9);r('#8ca187',-21,12,42,10);r('#778e75',4,-12,13,27);r('#9faf8e',-12,-27,34,17);r('#526a56',-23,-23,15,10);r('#e1c575',10,-24,5,5);r('#becc9f',8,-8,5,24);break;
 case 'celeiro':r('#9c4e42',-25,-6,50,32);p('#594844',[[-32,-5],[0,-32],[32,-5]]);r('#e2bd82',-20,-5,4,31);r('#e2bd82',16,-5,4,31);r('#433d3c',-10,8,20,18);r('#dfc397',-10,8,20,3);break;
 case 'colmeia':r(madeira,-26,-8,5,36);r(madeira,-26,-12,49,6);r('#aa803e',-9,-6,31,25);r('#dfb650',-14,0,40,8);r('#edce70',-13,11,36,7);r('#503c31',1,15,7,7);r('#b2d29a',-32,23,64,6);break;
 case 'fornalha':r('#463c50',-24,-17,48,43);r('#807183',-16,-30,13,17);r('#b76146',-18,-10,36,31);r('#2b293c',-11,-4,22,24);p('#f29544',[[-10,19],[-8,4],[0,12],[6,-1],[12,19]]);r('#ffdc83',-5,12,10,9);break;
 case 'geiser':p('#544554',[[-30,24],[-19,4],[14,2],[30,24]]);r('#dd7558',-17,4,34,8);r('#ffc27a',-5,-17,10,26);r('#ffe2a2',-9,-30,7,12);r('#ec946e',7,-24,6,9);r('#e98358',-20,-10,6,6);break;
 case 'passarela':r(madeira,-29,-14,6,43);r(madeira,23,-14,6,43);for(let i=0;i<5;i++)r('#bc9863',-31,-7+i*7,62,5);r('#547759',-25,15,8,11);break;
 case 'canoa':p('#593f39',[[-34,-4],[-20,-14],[24,-14],[34,0],[20,18],[-23,18]]);p('#aa784c',[[-25,-2],[-15,-8],[22,-8],[25,0],[16,11],[-18,11]]);r('#443e38',-4,-8,6,21);r(clara,20,-29,4,55);r('#cda56e',15,13,13,16);break;
 case 'fossil':aro('#d8cfaa',-4,0,20,7);r('#d8cfaa',12,-5,21,8);r('#d8cfaa',21,3,7,11);r('#4c5445',23,-4,5,4);for(let i=0;i<4;i++)r('#d8cfaa',-22+i*9,18,4,12);break;
 case 'ninho':p('#725640',[[-30,7],[-19,28],[22,28],[32,4],[16,-5],[-13,-7]]);for(const x of [-17,0,17]){r('#dfd4a5',x-7,-13,14,28);r('#f4edcb',x-4,-18,8,6);r('#a6ad81',x-3,-4,4,7);}r('#ac865b',-25,18,50,7);break;
 case 'antena':r(pedra,-27,21,54,9);p('#8996ac',[[-18,21],[0,-31],[18,21],[8,21],[0,-10],[-8,21]]);r(luz,-23,-16,46,5);r('#e282b2',-3,-35,6,8);r(pedra,-17,5,34,5);break;
 case 'estacaoDrone':r('#354760',-31,16,62,14);r('#64d6d0',-27,13,54,5);r('#697b95',-9,-18,18,16);r('#b4ccdb',-23,-16,46,5);r('#a596c7',-29,-24,19,4);r('#a596c7',10,-24,19,4);r('#6d819b',-22,-23,4,12);r('#6d819b',18,-23,4,12);r('#e9cb7b',-3,-11,6,5);break;
 case 'telescopio':p('#758b99',[[-24,29],[-4,-4],[4,-4],[24,29],[16,29],[0,8],[-16,29]]);p('#afc8ca',[[-26,-8],[-18,-25],[25,-6],[17,11]]);p('#415e79',[[-29,-10],[-22,-29],[-16,-26],[-24,-7]]);r('#81d9db',-24,-22,4,8);r('#d9c792',14,3,16,6);break;
 case 'gerador':r('#535d71',-29,-11,58,38);r('#8795a5',-25,-17,50,8);r('#d8b76d',-20,-7,15,25);for(let i=0;i<3;i++)r('#222f45',2,-5+i*8,22,4);r(luz,-19,-29,6,12);r('#c4778e',14,-27,6,10);break;
 case 'onibus':r('#5a7180',-33,-17,66,36);r('#c38758',-33,8,66,12);for(let i=0;i<4;i++)r('#27384c',-27+i*15,-11,11,14);r('#303642',-24,18,12,9);r('#303642',13,18,12,9);r('#c8d2cc',-7,-23,21,6);r('#737c75',24,21,12,8);break;
 case 'semaforo':r('#5a6375',-4,-24,8,51);r('#303746',-15,-32,30,39);r('#dd746c',-8,-27,16,8);r('#b79c68',-8,-16,16,8);r('#3d746d',-8,-5,16,8);r('#76829b',-19,24,38,7);break;
 case 'ampulheta':r('#917baf',-23,-32,46,7);r('#917baf',-23,24,46,7);p('#8bbdc5',[[-17,-25],[17,-25],[5,0],[17,24],[-17,24],[-5,0]]);p('#ecd08b',[[-12,-20],[12,-20],[0,-2]]);p('#ecd08b',[[-13,22],[13,22],[0,9]]);r(ouro,-2,-1,4,14);break;
 case 'anel':aro('#6f638f',0,-4,25,9);aro('#c6a7e5',0,-4,19,3);r('#887ba5',-21,22,42,8);r('#9ee8e4',-4,-12,8,16);break;
 case 'trincheira':for(let i=0;i<3;i++){r('#675d4f',-31+i*21,-12,19,17);r('#b5a17b',-31+i*21,-15,19,7);}for(let i=0;i<3;i++){r('#877558',-31+i*21,5,19,20);r('#c4af7f',-31+i*21,5,19,6);}break;
 case 'radio':r('#57694e',-24,-12,48,36);r('#303e39',-19,-7,23,23);for(let i=0;i<4;i++)r('#8d9f79',-16,-4+i*5,17,2);r('#d4c895',10,-3,8,8);r('#d4c895',10,11,8,8);r('#879178',-13,-34,3,23);r('#b0b79d',-16,-35,9,4);break;
 case 'moldura':r('#7c7386',-27,-32,54,7);r('#c4acba',-27,-32,7,62);r('#7c7386',20,-23,7,27);r('#a48b9d',-27,23,35,7);r('#c4acba',17,19,12,7);break;
 case 'escadaria':r('#585168',-30,20,60,10);r('#716783',-22,7,44,13);r('#97859b',-14,-6,28,13);r('#bba5b6',-6,-27,17,11);r('#ded0da',9,-34,17,7);break;
 case 'estante':r('#434658',-27,-32,54,61);for(let i=0;i<3;i++){r('#87949c',-23,-25+i*18,46,4);r('#668894',-20,-21+i*18,10,13);r('#a8b67a',-6,-21+i*18,8,13);r('#b5818f',6,-21+i*18,13,13);}r(ouro,-4,-5,8,11);break;
 case 'bancada':r('#506779',-28,3,7,26);r('#506779',21,3,7,26);r('#a5bec0',-33,-1,66,8);r('#6895a0',-20,-20,18,19);r('#b1e7ca',-15,-27,8,24);r('#ddc397',6,-9,23,7);r('#c2e0e5',9,-27,16,15);break;
 case 'pedestal':r('#665985',-27,22,54,8);r('#9b87b9',-14,-9,28,31);r('#c9b3d8',-23,-17,46,8);p('#ade7eb',[[0,-35],[11,-26],[0,-18],[-11,-26]]);break;
 case 'esfera':aro('#be9adf',0,-8,23,4);aro('#91cfd9',0,-8,14,4);r('#e7e1ef',-4,-12,8,8);r('#7c6c9a',-17,19,34,10);r('#bba6d2',-9,12,18,7);break;
 case 'pendulo':r('#6b627b',-28,23,56,7);r('#a29ab0',-24,-31,6,54);r('#a29ab0',18,-31,6,54);r('#d0c2d8',-28,-34,56,7);r(ouro,-2,-27,4,35);aro(ouro,0,14,9,6);break;
 case 'engrenagem':for(let i=0;i<8;i++){c.save();c.rotate(i*Math.PI/4);r('#a294b1',-5,-32,10,15);c.restore();}aro('#7b708f',0,0,23,12);aro('#dbbb82',0,0,10,5);r('#564764',-6,-6,12,12);break;
 case 'trono':r('#786183',-24,-27,48,45);r('#49334e',-17,-21,34,29);r('#c49b65',-28,-5,7,34);r('#c49b65',21,-5,7,34);r('#aa697d',-20,9,40,10);p('#d8b97f',[[-20,-28],[-24,-36],[-8,-32],[0,-38],[8,-32],[24,-36],[20,-28]]);break;
 case 'estandarte':r('#b2a1bb',-3,-36,6,66);p('#784866',[[3,-30],[28,-30],[28,9],[15,1],[3,9]]);p('#e1bc70',[[15,-25],[22,-15],[15,-5],[8,-15]]);r('#796785',-20,25,40,7);break;
 case 'torii':r('#ab555e',-23,-24,7,54);r('#ab555e',16,-24,7,54);r('#ec998c',-34,-30,68,7);r('#673c52',-31,-36,62,6);r('#da807a',-28,-15,56,6);r(ouro,-4,-23,8,9);break;
 case 'lanterna':r('#797d82',-10,-1,20,29);r('#c7c4b2',-20,23,40,7);r('#baa89e',-19,-22,38,22);r('#ffe5a0',-11,-16,22,12);p('#636875',[[-27,-22],[0,-36],[27,-22]]);r('#797d82',-2,-22,4,23);break;
 case 'tumulo':r('#647080',-23,23,46,7);r('#a3acb3',-18,-20,36,43);r('#c3c9c7',-12,-28,24,9);r('#63717e',-3,-16,6,28);r('#63717e',-11,-8,22,5);break;
 case 'carroca':r('#707172',-29,-6,52,26);r('#96968d',-26,-16,5,34);r('#96968d',17,-16,5,34);r('#acaa99',-27,-10,49,5);aro('#494f5b',-18,23,9,5);aro('#494f5b',17,23,9,5);r('#737677',23,-1,12,4);break;
 case 'ancora':aro('#90b5bd',0,-25,7,5);r('#638e9d',-3,-18,6,41);r('#9fced0',-19,-12,38,5);p('#719da9',[[-28,4],[-19,7],[-15,17],[0,23],[15,17],[19,7],[28,4],[22,22],[0,31],[-22,22]]);break;
 case 'naufragio':p('#765c4b',[[-33,0],[-22,25],[19,25],[34,0],[12,6],[-3,-1],[-13,5]]);r('#b59063',-24,12,47,5);r('#ccb782',-3,-33,5,42);p('#c6d9bc',[[2,-29],[23,-8],[2,-11]]);r('#688773',-20,19,7,9);break;
 case 'vagoneta':r('#58647b',-27,1,54,23);r('#92a3bc',-30,-5,60,9);aro('#364359',-18,27,7,5);aro('#364359',18,27,7,5);p('#ac8edf',[[-20,-5],[-12,-24],[-4,-5],[3,-31],[18,-5]]);break;
 case 'geodo':p('#686083',[[-31,9],[-18,-23],[12,-29],[31,0],[20,27],[-13,30]]);p('#aa8dcc',[[-23,7],[-13,-17],[10,-21],[23,0],[15,19],[-10,22]]);p('#e6c8ef',[[-15,9],[-7,-12],[0,9],[9,-15],[17,8],[2,18]]);break;
 case 'tapete':p('#974958',[[-31,-19],[21,-19],[32,22],[-21,22]]);p('#dfb367',[[-23,-13],[16,-13],[23,16],[-16,16]]);p('#629899',[[0,-10],[12,1],[1,13],[-12,1]]);for(let i=0;i<6;i++)r('#ead09a',-20+i*9,23,3,7);break;
 case 'urnas':for(const [x,y,s] of [[-15,3,1],[16,12,.75]]){c.save();c.translate(x,y);c.scale(s,s);r('#bd8157',-12,-14,24,30);r('#deb478',-8,-23,16,10);r('#805449',-9,-23,18,3);r('#528c84',-12,-4,24,7);c.restore();}break;
 case 'barracaPolar':p('#d58a59',[[-33,26],[-6,-29],[33,26]]);p('#edc9a0',[[-33,26],[-6,-29],[-14,26]]);r('#594f63',-4,4,17,22);r('#e5f0ea',-33,23,66,6);break;
 case 'marcoPolar':r('#64788b',-4,-32,8,59);r('#dfb470',-28,-24,56,12);r('#c07862',-22,-10,44,10);p('#e6eef0',[[-25,29],[-16,17],[0,23],[15,15],[29,29]]);r('#5a6680',-20,-20,20,4);break;
 case 'palafita':r('#776649',-23,1,6,29);r('#776649',17,1,6,29);r('#a29663',-25,-14,50,29);p('#527f6c',[[-33,-14],[0,-34],[33,-14]]);r('#394f48',-7,-2,14,17);r('#d5c87f',12,-6,7,8);break;
 case 'cestoVagalumes':r('#8e8050',-23,-12,46,37);for(let i=0;i<4;i++)r('#b8a666',-21,-9+i*10,42,3);for(let i=0;i<4;i++)r('#576750',-17+i*11,-9,3,32);aro('#a9ba73',0,-17,17,4);for(const [x,y] of [[-9,-1],[5,11],[12,-5],[-4,-24]])r('#e0f5a1',x,y,5,5);break;
 case 'ponteRochosa':p('#a16651',[[-33,29],[-33,-13],[-20,-27],[20,-27],[33,-13],[33,29],[18,29],[18,-4],[9,-12],[-9,-12],[-18,-4],[-18,29]]);r('#d99262',-24,-26,48,8);r('#bf8259',-31,9,12,7);break;
 case 'carroMinerio':r('#6c5147',-29,0,58,23);r('#b58c67',-31,-4,62,7);p('#d9ac73',[[-25,-5],[-17,-19],[-6,-10],[9,-26],[26,-5]]);aro('#433e45',-18,27,7,5);aro('#433e45',18,27,7,5);break;
 case 'casaCogumelo':r('#ddc898',-19,-6,38,32);p('#966197',[[-32,-7],[-22,-26],[0,-36],[22,-26],[32,-7]]);r('#df9fc1',-24,-18,13,6);r('#eac2c1',5,-27,11,6);r('#624c72',-7,7,14,19);r('#f3da92',12,1,6,8);break;
 case 'circuloEsporos':for(let i=0;i<7;i++){const a=i*Math.PI*2/7,x=Math.cos(a)*24,y=Math.sin(a)*19;r('#bbb99a',x-2,y-1,4,13);r('#7c91b7',x-7,y-7,14,8);r('#bfeae2',x-4,y-9,8,4);}r('#d1f4bc',-3,-4,6,6);break;
 case 'farol':p('#e0d7c4',[[-16,27],[-10,-23],[10,-23],[16,27]]);r('#ad645d',-12,-5,24,9);r('#ad645d',-15,15,30,8);r('#4c657f',-16,-31,32,10);r('#ffe5a2',-9,-29,18,6);r('#36485f',-18,-35,36,5);break;
 case 'boia':r('#ddc488',-2,-34,4,23);p('#c96a61',[[2,-32],[23,-26],[2,-20]]);r('#e2d5b2',-9,-10,18,19);r('#b65554',-16,3,32,17);r('#e1c9a0',-26,20,52,7);r('#6d9fae',-31,28,62,3);break;
 }
 c.restore();
}

function obterDecoracoesExtrasClassicas(mapa) {
 if(!mapa||!DECORACOES_EXTRAS_CLASSICAS[mapa.numero])return [];
 const rota=mapaPersonalizadoAtivo?.classico&&mapaPersonalizadoAtivo.numeroClassico===mapa.numero?mapaPersonalizadoAtivo.rotaClassica||0:0;
 const chave=`${mapa.numero}:${rota}`;
 if(posicoesExtrasClassicas.has(chave))return posicoesExtrasClassicas.get(chave);
 const cfg=CONFIG.decoracoesExtrasClassicas,caminhos=caminhosDoMapaClassico(mapa);
 const tela=document.createElement('canvas');tela.width=1200;tela.height=700;
 const c=tela.getContext('2d',{willReadFrequently:true});
 if(mapa.caminho){
  if(['cerejeiras','florestaMorta'].includes(mapa.tema))desenharArvoresDasFlorestasClassicas(c,mapa);
  else desenharObjetosDosBiomasClassicos(c,mapa);
 }else for(const d of obterDecoracoesBaseClassicas(mapa))desenhadoresDeDecoracao[d.tipo]?.(d,c);
 const pixels=c.getImageData(0,0,1200,700).data,escolhidos=[];
 const candidatos=[];
 for(let y=cfg.margem;y<700-cfg.margem;y+=20)for(let x=cfg.margem;x<1200-cfg.margem;x+=20)candidatos.push({x,y});
 // Ordem fixa por mapa: a posição nunca muda entre miniatura, arena e colisão.
 candidatos.sort((a,b)=>((a.x*137+a.y*79+mapa.numero*233)%997)-((b.x*137+b.y*79+mapa.numero*233)%997));
 for(const ponto of candidatos){
  const {x,y}=ponto,r=cfg.raioLivre;
  if(distanciaDosCaminhosClassicos(x,y,caminhos)<cfg.distanciaCaminho||escolhidos.some(d=>Math.hypot(x-d.x,y-d.y)<cfg.separacao))continue;
  const agua=mapa.agua;
  if(agua&&x+r>agua.x&&x-r<agua.x+agua.largura&&y+r>agua.y&&y-r<agua.y+agua.altura)continue;
  let livre=true;
  for(let py=y-r;livre&&py<=y+r;py+=3)for(let px=x-r;px<=x+r;px+=3)if(pixels[(py*1200+px)*4+3]>0){livre=false;break;}
  if(!livre)continue;
  escolhidos.push({...ponto,tipo:DECORACOES_EXTRAS_CLASSICAS[mapa.numero][escolhidos.length%2]});
  if(escolhidos.length===2*cfg.quantidadePorTipo)break;
 }
 posicoesExtrasClassicas.set(chave,escolhidos);return escolhidos;
}

function desenharDecoracoesExtrasClassicas(c,mapa) {
 for(const d of obterDecoracoesExtrasClassicas(mapa))desenharObjetoExtraClassico(c,d.tipo,d.x,d.y);
}
