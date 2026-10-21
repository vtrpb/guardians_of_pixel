// Visuais e textos; valores de combate ficam em CONFIG.torre.tipos.
function criarVisualDoCanhaoBlindado(nivel){
 return Object.freeze({tipoVisual:'canhaoBlindado',corBase:['#657582','#536779','#635d83','#805b45'][nivel],corCanhao:['#d9b65c','#80d4df','#bf9eee','#f6d578'][nivel],corDetalhe:'#d4e2df',raioBase:27,nivelVisual:nivel});
}
function desenharArmamentoDoCanhaoBlindado(estilo){
 ctx.save();ctx.scale(.8,.8);desenharArmamentoDaIscaBlindada(estilo);ctx.restore();
 ctx.fillStyle='#26343c';ctx.fillRect(-15,-21,30,29);
 ctx.fillStyle=estilo.corBase;ctx.fillRect(-12,-18,24,24);
 ctx.fillStyle='#18252e';ctx.fillRect(-10,-43,20,38);
 ctx.fillStyle=estilo.corCanhao;ctx.fillRect(-7,-40,14,34);
 ctx.fillStyle=estilo.corDetalhe;ctx.fillRect(-7,-38,3,29);
 ctx.fillStyle='#15222a';ctx.fillRect(-11,-44,22,8);
 ctx.fillStyle=estilo.corCanhao;ctx.fillRect(-8,-43,16,3);
 for(let i=0;i<estilo.nivelVisual;i++){ctx.fillStyle=estilo.corCanhao;ctx.fillRect(-19,-8+i*6,5,3);ctx.fillRect(14,-8+i*6,5,3);}
}
for(const[pt,en,es]of[
 ['Formatura','Graduation','Graduación'],
 ['Complete todos os passos do tutorial.','Complete every step of the tutorial.','Completa todos los pasos del tutorial.'],
 ['Empréstimo da fase 1','Stage 1 loan','Préstamo de la fase 1'],
 ['Canhão Blindado','Armored Cannon','Cañón Blindado'],
 ['Atira somente em Sabotadores. Atrai inimigos atiradores e resiste a {tiros} tiros.','Fires only at Saboteurs. Draws enemy fire and withstands {tiros} shots.','Dispara solo a Saboteadores. Atrae a enemigos tiradores y resiste {tiros} disparos.']
]){TRADUCOES_FASE18.en[pt]=en;TRADUCOES_FASE18.es[pt]=es;}
