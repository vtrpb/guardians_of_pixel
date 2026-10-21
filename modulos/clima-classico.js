let climaDaPartida=null;
let climaVisualSuave=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
for(const t of [
 ['Clima visual suave','Gentle weather visuals','Clima visual suave'],
 ['Nevasca boreal','Boreal blizzard','Ventisca boreal'],['Dança dos vagalumes','Firefly dance','Danza de las luciérnagas'],['Vento favorável','Tailwind','Viento favorable'],
 ['Inimigos 15% mais lentos','Enemies move 15% slower','Enemigos un 15% más lentos'],
 ['Torres com 10% mais alcance','Towers gain 10% range','Torres con un 10% más de alcance'],
 ['Intervalo entre disparos 10% menor','10% shorter attack interval','Intervalo entre disparos un 10% menor'],
 ['Clima: {nome}. A cada {waves} waves: {efeito} por {segundos}s.','Weather: {nome}. Every {waves} waves: {efeito} for {segundos}s.','Clima: {nome}. Cada {waves} oleadas: {efeito} durante {segundos}s.'],
 ['{nome} em {segundos}s · {efeito}','{nome} in {segundos}s · {efeito}','{nome} en {segundos}s · {efeito}'],
 ['{nome}: {efeito} · {segundos}s restantes','{nome}: {efeito} · {segundos}s left','{nome}: {efeito} · quedan {segundos}s'],
 ['Clima calmo · próximo evento na wave {wave}','Calm weather · next event on wave {wave}','Clima tranquilo · próximo evento en la oleada {wave}']
])textoCasa(...t);

function descricaoClimaClassico(numero){
 const c=CONFIG.climaClassico,m=c.mapas[numero];if(!m)return '';
 return `<p class="classico-clima">${localizar('Clima: {nome}. A cada {waves} waves: {efeito} por {segundos}s.',{nome:localizar(m.nome),waves:c.intervaloWaves,efeito:localizar(m.efeito),segundos:c.duracaoMs/1000})}</p>`;
}
function iniciarClimaClassico(){
 const numero=mapaPersonalizadoAtivo?.classico?mapaPersonalizadoAtivo.numeroClassico:null;
 climaDaPartida=CONFIG.climaClassico.mapas[numero]?{numero,tempo:0,estado:'calmo',restante:0,ultimaWave:0}:null;
 atualizarPainelClimaClassico();
}
function encerrarClimaClassico(){climaDaPartida=null;atualizarPainelClimaClassico();}
function climaClassicoCorrespondeAoMapa(){return climaDaPartida&&mapaPersonalizadoAtivo?.classico&&mapaPersonalizadoAtivo.numeroClassico===climaDaPartida.numero;}
function multiplicadorDoClimaClassico(atributo){
 return climaClassicoCorrespondeAoMapa()&&!partidaEncerrada&&climaDaPartida.estado==='ativo'?CONFIG.climaClassico.mapas[climaDaPartida.numero][atributo]||1:1;
}
function atualizarClimaClassico(deltaMs){
 if(!climaClassicoCorrespondeAoMapa()||!jogoIniciado||jogoPausado||partidaEncerrada||document.hidden||!Number.isFinite(deltaMs)||deltaMs<0)return;
 const e=climaDaPartida,c=CONFIG.climaClassico;e.tempo+=deltaMs;
 if(e.estado==='calmo'){
  if(wave>0&&wave%c.intervaloWaves===0&&wave>e.ultimaWave){e.ultimaWave=wave;e.estado='aviso';e.restante=c.avisoMs;}
 }else{
  e.restante-=deltaMs;
  if(e.restante<=0){
   if(e.estado==='aviso'){e.estado='ativo';e.restante+=c.duracaoMs;}
   if(e.restante<=0){e.estado='calmo';e.restante=0;}
  }
 }
 atualizarPainelClimaClassico();
}
function atualizarPainelClimaClassico(){
 const painel=document.getElementById('clima-classico-partida');if(!painel)return;
 painel.hidden=!climaClassicoCorrespondeAoMapa();if(painel.hidden)return;
 const e=climaDaPartida,c=CONFIG.climaClassico,m=c.mapas[e.numero];
 const texto=e.estado==='calmo'?localizar('Clima calmo · próximo evento na wave {wave}',{wave:(Math.floor(Math.max(wave,e.ultimaWave)/c.intervaloWaves)+1)*c.intervaloWaves}):localizar(e.estado==='aviso'?'{nome} em {segundos}s · {efeito}':'{nome}: {efeito} · {segundos}s restantes',{nome:localizar(m.nome),efeito:localizar(m.efeito),segundos:Math.ceil(e.restante/1000)});
 const rotulo=document.getElementById('clima-classico-estado');if(rotulo.textContent!==texto)rotulo.textContent=texto;
 document.getElementById('clima-classico-suave').checked=climaVisualSuave;
 painel.querySelector('[data-localizar]').textContent=localizar('Clima visual suave');
}
function definirClimaSuave(suave){climaVisualSuave=Boolean(suave);atualizarPainelClimaClassico();}

function tempoDoClimaClassico(numero){return !climaVisualSuave&&climaClassicoCorrespondeAoMapa()&&climaDaPartida.numero===numero?climaDaPartida.tempo:0;}

function desenharClimaClassico(c,mapa){
 const cfg=CONFIG.climaClassico,m=cfg.mapas[mapa.numero];if(!m)return;
 const e=climaClassicoCorrespondeAoMapa()&&climaDaPartida.numero===mapa.numero?climaDaPartida:null;
 const ativo=e?.estado==='ativo'&&!partidaEncerrada,t=tempoDoClimaClassico(mapa.numero);
 c.save();
 if(m.tipo==='neblina'){
  // Faixas transparentes sob unidades e projéteis: a rota continua legível.
  for(let i=0;i<5;i++){
   const y=75+i*125+Math.sin(t/4000+i)*18,g=c.createLinearGradient(0,y-35,0,y+35);
   g.addColorStop(0,'#c7e7cb00');g.addColorStop(.5,ativo?'#c7e7cb26':'#c7e7cb16');g.addColorStop(1,'#c7e7cb00');c.fillStyle=g;c.fillRect(0,y-35,1200,70);
  }
  if(ativo){c.fillStyle='#e5f4a1';for(let i=0;i<(climaVisualSuave?12:35);i++){const x=(i*173+43)%1200,y=60+(i*97)%580+Math.sin(t/800+i)*8;c.globalAlpha=.55;c.fillRect(x,y,4,4);}}
 }else{
  const quantidade=climaVisualSuave?12:ativo?cfg.particulas:Math.floor(cfg.particulas/2);
  c.fillStyle=m.tipo==='neve'?'#ffffff':'#b6d5e3';c.globalAlpha=climaVisualSuave?.22:ativo?.6:.3;
  for(let i=0;i<quantidade;i++){
   const x=(i*173+t*(m.tipo==='neve'?.035:.065))%1200,y=(i*97+t*(m.tipo==='neve'?.045:.22))%700;
   c.fillRect(x,y,m.tipo==='neve'?4:2,m.tipo==='neve'?3:13);
  }
  if(ativo&&m.tipo==='chuva'){
   c.globalAlpha=.16;c.strokeStyle='#b9e8ed';c.lineWidth=2;
   for(let i=0;i<5;i++){const x=(i*283+t*.09)%1200,y=90+i*125;c.beginPath();c.moveTo(x-90,y);c.quadraticCurveTo(x,y-15,x+70,y+5);c.stroke();}
  }
 }
 c.restore();
}
