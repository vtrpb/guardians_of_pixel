// Resumo da tentativa atual, sem recompensas nem alterações no save.
let estatisticasDaBatalha = null;
for (const t of [
 ['Estatísticas da partida','Match statistics','Estadísticas de la partida'],
 ['Dano causado','Damage dealt','Daño causado'],['Inimigos derrotados','Enemies defeated','Enemigos derrotados'],
 ['Destaque em dano: {nome}','Damage leader: {nome}','Mayor daño: {nome}'],
 ['Defesa','Defense','Defensa'],['Derrotados','Defeated','Derrotados'],
 ['Outras fontes','Other sources','Otras fuentes'],
 ['Ainda não houve dano nesta tentativa.','No damage dealt this attempt.','Todavía no se ha causado daño en este intento.'],
 ['Agrupado por tipo de defesa, incluindo as vendidas ou destruídas. Conta apenas a vida retirada; apoio e lentidão não entram no destaque.','Grouped by defense type, including sold or destroyed defenses. Only health removed counts; support and slowing effects are not included in the leader.','Agrupado por tipo de defensa, incluidas las vendidas o destruidas. Solo cuenta la vida quitada; el apoyo y la ralentización no cuentan para el destacado.']
]) textoCasa(...t);

function iniciarEstatisticasDaBatalha() {
 estatisticasDaBatalha={defesas:new Map(),encerrada:false};
 const painel=document.getElementById('estatisticas-resultado');
 if(painel){painel.hidden=true;painel.replaceChildren();}
}
function obterRegistroDeDefesaNaBatalha(tipo) {
 if(!estatisticasDaBatalha)return null;
 const chave=CONFIG.torre.tipos[tipo]?tipo:'outras';
 if(!estatisticasDaBatalha.defesas.has(chave))estatisticasDaBatalha.defesas.set(chave,{tipo:chave,dano:0,derrotados:0});
 return estatisticasDaBatalha.defesas.get(chave);
}
function registrarDanoNaBatalha(tipo,dano,derrotado) {
 if(!estatisticasDaBatalha||estatisticasDaBatalha.encerrada||!Number.isFinite(dano)||dano<=0)return;
 const registro=obterRegistroDeDefesaNaBatalha(tipo);
 registro.dano+=dano;if(derrotado)registro.derrotados++;
}
function mostrarEstatisticasDaBatalha() {
 const painel=document.getElementById('estatisticas-resultado');
 if(!painel||!estatisticasDaBatalha)return;
 estatisticasDaBatalha.encerrada=true;painel.hidden=false;painel.replaceChildren();painel.setAttribute('aria-label',localizar('Estatísticas da partida'));
 const registros=[...estatisticasDaBatalha.defesas.values()].sort((a,b)=>b.dano-a.dano||b.derrotados-a.derrotados||a.tipo.localeCompare(b.tipo));
 const numero=n=>new Intl.NumberFormat(idiomaAtual,{maximumFractionDigits:1}).format(n);
 const nome=r=>r.tipo==='outras'?localizar('Outras fontes'):obterNomeLocalizado(CONFIG.torre.tipos[r.tipo]);
 const elemento=(tag,texto)=>{const el=document.createElement(tag);el.textContent=texto;return el;};
 painel.append(elemento('h3',localizar('Estatísticas da partida')));
 const totalDano=registros.reduce((s,r)=>s+r.dano,0),totalMortes=registros.reduce((s,r)=>s+r.derrotados,0);
 painel.append(elemento('p',`${localizar('Dano causado')}: ${numero(totalDano)} · ${localizar('Inimigos derrotados')}: ${numero(totalMortes)}`));
 const destaque=registros.find(r=>r.tipo!=='outras'&&r.dano>0);
 if(destaque)painel.append(elemento('strong',localizar('Destaque em dano: {nome}',{nome:nome(destaque)})));
 if(!totalDano)painel.append(elemento('p',localizar('Ainda não houve dano nesta tentativa.')));
 if(registros.length){
  const tabela=document.createElement('table'),cabecalho=document.createElement('thead'),linha=document.createElement('tr'),corpo=document.createElement('tbody');
  for(const titulo of ['Defesa','Dano causado','Derrotados']){const th=elemento('th',localizar(titulo));th.scope='col';linha.append(th);}
  cabecalho.append(linha);
  for(const r of registros){const tr=document.createElement('tr'),th=elemento('th',nome(r));th.scope='row';tr.append(th,elemento('td',numero(r.dano)),elemento('td',numero(r.derrotados)));corpo.append(tr);}
  tabela.append(cabecalho,corpo);const rolagem=document.createElement('div');rolagem.className='estatisticas-tabela';rolagem.tabIndex=0;rolagem.setAttribute('aria-label',localizar('Estatísticas da partida'));rolagem.append(tabela);painel.append(rolagem);
 }
 painel.append(elemento('small',localizar('Agrupado por tipo de defesa, incluindo as vendidas ou destruídas. Conta apenas a vida retirada; apoio e lentidão não entram no destaque.')));
}
