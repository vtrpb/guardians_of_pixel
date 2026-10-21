const CHAVE_DESAFIO_CAMPANHA='guardians-of-pixel-desafio-campanha-v1';
let desafioCampanhaSelecionado=false,tentativaDesafioCampanha=null;
const desafiosCampanhaSelecionados = new Set();
const TEXTOS_DESAFIOS_CAMPANHA = {
 carroca: ['Carroça de suprimentos', 'Proteja a carroça parada à beira da rota até vencer. Inimigos próximos causam dano à carga. Se ela for destruída, a fase continua, mas a medalha é perdida.'],
 limite: ['Defesa enxuta', 'Desafio opcional: vença a Fase 1 com até {limite} construções. Torres, minas e bombas contam; vender não devolve vagas. Prêmio: medalha, sem bônus de combate.'],
 semExplosivos: ['Sem explosivos', 'Vença sem construir minas ou bombas. Torres com ataques explosivos são permitidas.'],
 intactas: ['Defesas intactas', 'Vença sem nenhuma torre destruída pelos inimigos. Vender é permitido.'],
 tipos: ['Arsenal variado', 'Vença após construir pelo menos {limite} tipos diferentes de torre. Minas e bombas não contam.'],
 melhorias: ['Trio veterano', 'Vença após aprimorar {limite} torres diferentes pelo menos uma vez. Repetir melhorias na mesma torre conta só uma vez.']
};
for(const t of [
 ['Carroça de suprimentos','Supply wagon','Carro de suministros'],
 ['Proteja a carroça parada à beira da rota até vencer. Inimigos próximos causam dano à carga. Se ela for destruída, a fase continua, mas a medalha é perdida.','Protect the wagon parked beside the route until victory. Nearby enemies damage its cargo. If destroyed, the stage continues, but the medal is lost.','Protege el carro junto a la ruta hasta ganar. Los enemigos cercanos dañan su carga. Si es destruido, la fase continúa, pero se pierde la medalla.'],
 ['Resistência da carroça: {quantidade}/{limite}','Wagon health: {quantidade}/{limite}','Resistencia del carro: {quantidade}/{limite}'],
 ['Sem explosivos','No explosives','Sin explosivos'],
 ['Defesas intactas','Intact defenses','Defensas intactas'],
 ['Arsenal variado','Varied arsenal','Arsenal variado'],
 ['Trio veterano','Veteran trio','Trío veterano'],
 ['Vença sem construir minas ou bombas. Torres com ataques explosivos são permitidas.','Win without building mines or bombs. Towers with explosive attacks are allowed.','Gana sin construir minas ni bombas. Se permiten torres con ataques explosivos.'],
 ['Vença sem nenhuma torre destruída pelos inimigos. Vender é permitido.','Win without any tower destroyed by enemies. Selling is allowed.','Gana sin que los enemigos destruyan ninguna torre. Se permite vender.'],
 ['Vença após construir pelo menos {limite} tipos diferentes de torre. Minas e bombas não contam.','Win after building at least {limite} different tower types. Mines and bombs do not count.','Gana tras construir al menos {limite} tipos diferentes de torre. Minas y bombas no cuentan.'],
 ['Vença após aprimorar {limite} torres diferentes pelo menos uma vez. Repetir melhorias na mesma torre conta só uma vez.','Win after upgrading {limite} different towers at least once. Repeated upgrades to the same tower count only once.','Gana tras mejorar {limite} torres distintas al menos una vez. Repetir mejoras en la misma torre cuenta solo una vez.'],
 ['Prêmio: medalha, sem bônus de combate.','Reward: a medal, with no combat bonus.','Premio: medalla, sin bono de combate.'],
 ['Tipos de torre: {quantidade}/{limite}','Tower types: {quantidade}/{limite}','Tipos de torre: {quantidade}/{limite}'],
 ['Torres aprimoradas: {quantidade}/{limite}','Upgraded towers: {quantidade}/{limite}','Torres mejoradas: {quantidade}/{limite}'],
 ['Minas e bombas construídas: {quantidade}','Mines and bombs built: {quantidade}','Minas y bombas construidas: {quantidade}'],
 ['Torres destruídas: {quantidade}','Towers destroyed: {quantidade}','Torres destruidas: {quantidade}'],
 ['Desafio invalidado; você pode continuar a fase normalmente.','Challenge invalidated; you can continue the stage normally.','Desafío invalidado; puedes continuar la fase normalmente.'],
 ['Defesa enxuta','Lean defense','Defensa reducida'],
 ['Desafio opcional: vença a Fase 1 com até {limite} construções. Torres, minas e bombas contam; vender não devolve vagas. Prêmio: medalha, sem bônus de combate.','Optional challenge: win Stage 1 with up to {limite} builds. Towers, mines and bombs count; selling does not restore slots. Reward: a medal, with no combat bonus.','Desafío opcional: gana la Fase 1 con hasta {limite} construcciones. Torres, minas y bombas cuentan; vender no devuelve plazas. Premio: medalla, sin bono de combate.'],
 ['Participar deste desafio','Join this challenge','Participar en este desafío'],['Medalha conquistada','Medal earned','Medalla conseguida'],
 ['Construções: {quantidade}/{limite}','Builds: {quantidade}/{limite}','Construcciones: {quantidade}/{limite}'],
 ['Limite ultrapassado; você pode continuar a fase normalmente.','Limit exceeded; you can continue the stage normally.','Límite superado; puedes continuar la fase normalmente.'],
 ['Vença a fase para conquistar a medalha.','Win the stage to earn the medal.','Gana la fase para conseguir la medalla.'],
 ['Desafio não concluído nesta tentativa.','Challenge not completed this attempt.','Desafío no completado en este intento.'],
 ['Não foi possível salvar a medalha. Tentar novamente','Could not save the medal. Try again','No se pudo guardar la medalla. Intentar de nuevo']
])textoCasa(...t);
function obterDesafioDaCampanha(fase = faseSelecionada) {
 const c = CONFIG.desafioDaCampanha;
 return fase === c.fase ? {regra:'limite',quantidade:c.limiteConstrucoes} : c.objetivos[fase];
}
function chaveDaMedalhaDaCampanha(fase) {
 return fase === CONFIG.desafioDaCampanha.fase ? CHAVE_DESAFIO_CAMPANHA : `${CHAVE_DESAFIO_CAMPANHA}-fase-${fase}`;
}
function medalhaDesafioCampanha(fase = CONFIG.desafioDaCampanha.fase){try{return localStorage.getItem(chaveDaMedalhaDaCampanha(fase))==='true';}catch{return false;}}
function selecionarDesafioDaCampanha(fase, ativo) {
 if (fase === CONFIG.desafioDaCampanha.fase) desafioCampanhaSelecionado = ativo;
 else if (ativo) desafiosCampanhaSelecionados.add(fase);
 else desafiosCampanhaSelecionados.delete(fase);
}
function criarOpcaoDesafioDaCampanha(fase){
 const c = obterDesafioDaCampanha(fase); if (!c) return '';
 const [nome, descricao] = TEXTOS_DESAFIOS_CAMPANHA[c.regra];
 const ativo = fase === CONFIG.desafioDaCampanha.fase ? desafioCampanhaSelecionado : desafiosCampanhaSelecionados.has(fase);
 const id = fase === CONFIG.desafioDaCampanha.fase ? 'ativar-desafio-campanha' : `ativar-desafio-campanha-${fase}`;
 return `<aside class="desafio-campanha-opcao"><strong>◇ ${localizar(nome)}</strong><p>${localizar(descricao,{limite:c.quantidade})}${c.regra==='limite'?'':' '+localizar('Prêmio: medalha, sem bônus de combate.')}</p><label><input id="${id}" type="checkbox" ${ativo?'checked':''} ${faseEstaDesbloqueada(fase)?'':'disabled'} onchange="selecionarDesafioDaCampanha(${fase},this.checked)"> ${localizar('Participar deste desafio')}</label>${medalhaDesafioCampanha(fase)?`<p>★ ${localizar('Medalha conquistada')}</p>`:''}</aside>`;
}
function iniciarDesafioDaCampanha(){
 const c = obterDesafioDaCampanha(), ativo = faseSelecionada === CONFIG.desafioDaCampanha.fase ? desafioCampanhaSelecionado : desafiosCampanhaSelecionados.has(faseSelecionada);
 tentativaDesafioCampanha=c&&ativo&&!mapaPersonalizadoAtivo&&!modoWavesInfinitas&&!desafioSupremoAtivo?{fase:faseSelecionada,...c,construcoes:0,explosivos:0,destruidas:0,tipos:new Set(),melhorias:new Set(),salva:false}:null;
 if(tentativaDesafioCampanha?.regra==='carroca') Object.assign(tentativaDesafioCampanha,{vida:CONFIG.carrocaDaCampanha.vida,quantidade:CONFIG.carrocaDaCampanha.vida,ataqueMs:0});
 document.getElementById('resultado-desafio-campanha').hidden=true;atualizarDesafioDaCampanha();
}
function desafioDaCampanhaAceitaProgresso() {
 return tentativaDesafioCampanha && !tentativaDesafioCampanha.encerrada && !partidaEncerrada;
}
function registrarConstrucaoDesafioDaCampanha(tipo){
 if(!desafioDaCampanhaAceitaProgresso())return;
 const t = tentativaDesafioCampanha, c = CONFIG.torre.tipos[tipo];
 t.construcoes++;
 if(c?.tipoDeItem==='mina'||c?.tipoDeItem==='bomba') t.explosivos++;
 else if(c) t.tipos.add(tipo);
 atualizarDesafioDaCampanha();
}
function registrarMelhoriaDesafioDaCampanha(torre) {
 if(!desafioDaCampanhaAceitaProgresso()||!torre||!torres.includes(torre))return;
 tentativaDesafioCampanha.melhorias.add(torre); atualizarDesafioDaCampanha();
}
function registrarTorreDestruidaDesafioDaCampanha() {
 if(!desafioDaCampanhaAceitaProgresso())return;
 tentativaDesafioCampanha.destruidas++; atualizarDesafioDaCampanha();
}
function objetivoDoDesafioFoiCumprido(t) {
 if(t.construcoes<1)return false;
 switch(t.regra) {
  case 'carroca': return t.vida>0;
  case 'limite': return t.construcoes<=t.quantidade;
  case 'semExplosivos': return t.explosivos===0;
  case 'intactas': return t.destruidas===0;
  case 'tipos': return t.tipos.size>=t.quantidade;
  case 'melhorias': return t.melhorias.size>=t.quantidade;
  default: return false;
 }
}
function atualizarDesafioDaCampanha(){
 const painel=document.getElementById('desafio-campanha-partida'),t=tentativaDesafioCampanha; painel.hidden=!t;if(!t)return;
 const contagem = {
  carroca:['Resistência da carroça: {quantidade}/{limite}',t.vida],
  limite:['Construções: {quantidade}/{limite}',t.construcoes],
  semExplosivos:['Minas e bombas construídas: {quantidade}',t.explosivos],
  intactas:['Torres destruídas: {quantidade}',t.destruidas],
  tipos:['Tipos de torre: {quantidade}/{limite}',t.tipos.size],
  melhorias:['Torres aprimoradas: {quantidade}/{limite}',t.melhorias.size]
 }[t.regra];
 const invalido=t.regra==='semExplosivos'&&t.explosivos>0||t.regra==='intactas'&&t.destruidas>0||t.regra==='carroca'&&t.vida<=0;
 const estado=t.regra==='limite'&&t.construcoes>t.quantidade?'Limite ultrapassado; você pode continuar a fase normalmente.':invalido?'Desafio invalidado; você pode continuar a fase normalmente.':'Vença a fase para conquistar a medalha.';
 painel.textContent=`◇ ${localizar(TEXTOS_DESAFIOS_CAMPANHA[t.regra][0])} · ${localizar(contagem[0],{quantidade:contagem[1],limite:t.quantidade})} · ${localizar(estado)}`;
}
function concluirDesafioDaCampanha(vitoria,painel=document.getElementById('resultado-desafio-campanha')){
 const t=tentativaDesafioCampanha;
 painel.hidden=!t; if(!t)return;
 if(!t.encerrada){t.cumprido=vitoria&&objetivoDoDesafioFoiCumprido(t);t.encerrada=true;}
 painel.replaceChildren();
 if(!t.cumprido){painel.textContent=localizar('Desafio não concluído nesta tentativa.');return;}
 const chave=chaveDaMedalhaDaCampanha(t.fase);
 let anterior;
 try{
  anterior=localStorage.getItem(chave);
  if(!t.salva&&!medalhaDesafioCampanha(t.fase)){
   localStorage.setItem(chave,'true');
   if(!atualizarSalvoAtivo())throw Error('slot');
  }
  t.salva=true;painel.textContent=`★ ${localizar(TEXTOS_DESAFIOS_CAMPANHA[t.regra][0])} · ${localizar('Medalha conquistada')}`;
 }catch{
  if(anterior!==undefined)try{if(anterior===null)localStorage.removeItem(chave);else localStorage.setItem(chave,anterior);}catch{}
  const b=document.createElement('button');b.type='button';b.className='botao';b.textContent=localizar('Não foi possível salvar a medalha. Tentar novamente');b.onclick=()=>concluirDesafioDaCampanha(true,painel);painel.append(b);
 }
}
