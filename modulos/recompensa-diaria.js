const CHAVE_CRISTAL_DIARIO='guardians-of-pixel-cristal-diario-v1';
for(const t of [
 ['Cristal diário','Daily crystal','Cristal diario'],
 ['{minimo}–{maximo} Fragmentos + {xp} XP · uma vez por dia','{minimo}–{maximo} Shards + {xp} XP · once a day','{minimo}–{maximo} Fragmentos + {xp} XP · una vez al día'],
 ['Resgatar','Claim','Recoger'],['Volte amanhã','Come back tomorrow','Vuelve mañana'],
 ['Você recebeu {fragmentos} Fragmentos e {xp} XP.','You received {fragmentos} Shards and {xp} XP.','Has recibido {fragmentos} Fragmentos y {xp} XP.'],
 ['Resgatado hoje. Renova à meia-noite do aparelho.','Claimed today. Resets at midnight on your device.','Recogido hoy. Se renueva a medianoche en tu dispositivo.'],
 ['Não foi possível salvar. Tente resgatar novamente.','Could not save. Try claiming again.','No se pudo guardar. Intenta recogerlo de nuevo.']
])textoCasa(...t);
let mensagemDoCristalDiario=null;
let resgatandoCristalDiario=false;
function diaDoCristalDiario(data=new Date()) {
 return `${data.getFullYear()}-${String(data.getMonth()+1).padStart(2,'0')}-${String(data.getDate()).padStart(2,'0')}`;
}
function cristalDiarioEstaDisponivel(){
 try {const salvo=JSON.parse(localStorage.getItem(CHAVE_CRISTAL_DIARIO)||'null');return !salvo?.dia || salvo.dia<diaDoCristalDiario();}catch{return false;}
}
function atualizarCristalDiario(){
 const botao=document.getElementById('botao-cristal-diario');if(!botao)return;
 const livre=cristalDiarioEstaDisponivel(),c=CONFIG.recompensaDiaria;
 if(mensagemDoCristalDiario?.dia!==diaDoCristalDiario())mensagemDoCristalDiario=null;
 document.getElementById('titulo-cristal-diario').textContent=localizar('Cristal diário');
 botao.disabled=!livre||resgatandoCristalDiario;botao.textContent=localizar(livre?'Resgatar':'Volte amanhã');
 botao.closest('.cristal-diario').classList.toggle('resgatado',!livre);
 document.getElementById('estado-cristal-diario').textContent=mensagemDoCristalDiario
  ? localizar(mensagemDoCristalDiario.texto,mensagemDoCristalDiario)
  : livre?localizar('{minimo}–{maximo} Fragmentos + {xp} XP · uma vez por dia',{minimo:c.fragmentosMinimos,maximo:c.fragmentosMaximos,xp:c.experiencia})
  : localizar('Resgatado hoje. Renova à meia-noite do aparelho.');
}
function concederCristalDiario(){
 if(jogoIniciado||!telaInicialJogo.hidden||menuPrincipal.hidden||!cristalDiarioEstaDisponivel())return false;
 const c=CONFIG.recompensaDiaria,fragmentos=c.fragmentosMinimos+Math.floor(Math.random()*(c.fragmentosMaximos-c.fragmentosMinimos+1)),dia=diaDoCristalDiario();
 const novoProgresso={...progressaoDeNivel,experienciaTotal:Math.min(10000000,progressaoDeNivel.experienciaTotal+c.experiencia)};
 const alteracoes={
  [CHAVE_CRISTAL_DIARIO]:JSON.stringify({dia,fragmentos,experiencia:c.experiencia}),
  [CHAVE_FRAGMENTOS_PIXEL]:String(fragmentosPixel+fragmentos),
  [CHAVE_PROGRESSAO_NIVEL]:JSON.stringify(novoProgresso)
 };
 const anteriores=new Map();
 try{
  for(const chave of Object.keys(alteracoes))anteriores.set(chave,localStorage.getItem(chave));
  for(const [chave,valor] of Object.entries(alteracoes))localStorage.setItem(chave,valor);
  if(!atualizarSalvoAtivo())throw Error('slot');
 }catch{
  for(const [chave,valor] of anteriores)try{if(valor===null)localStorage.removeItem(chave);else localStorage.setItem(chave,valor);}catch{}
  mensagemDoCristalDiario={dia,texto:'Não foi possível salvar. Tente resgatar novamente.'};atualizarCristalDiario();return false;
 }
 fragmentosPixel+=fragmentos;
 // Usa o fluxo normal de níveis somente após confirmar a gravação dos prêmios.
 registrarExperiencia(c.experiencia);
 atualizarSaldoDeFragmentos();atualizarSalvoAtivo();
 mensagemDoCristalDiario={dia,texto:'Você recebeu {fragmentos} Fragmentos e {xp} XP.',fragmentos,xp:c.experiencia};
 atualizarCristalDiario();return true;
}
async function resgatarCristalDiario(){
 if(resgatandoCristalDiario)return false;
 resgatandoCristalDiario=true;atualizarCristalDiario();
 try{return navigator.locks?await navigator.locks.request('guardians-cristal-diario',()=>concederCristalDiario()):concederCristalDiario();}
 finally{resgatandoCristalDiario=false;atualizarCristalDiario();}
}
atualizarCristalDiario();
setInterval(atualizarCristalDiario,1000);
window.addEventListener('storage',atualizarCristalDiario);
document.addEventListener('visibilitychange',atualizarCristalDiario);
