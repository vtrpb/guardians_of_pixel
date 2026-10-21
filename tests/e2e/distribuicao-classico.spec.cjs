const {test,expect}=require('@playwright/test');
test('Distribuição estável nos 35 mapas, mesmas decorações na prévia e arena, campanha e editor preservados',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('guardians-of-pixel-tutorial-concluido-v1','true'));
 await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
 await expect(page.locator('#tela-inicial-jogo')).toBeHidden();
 const resultado=await page.evaluate(()=>{
  const res=[];
  for(const mapa of obterMapasClassicos()){
   const extras=obterDecoracoesExtrasClassicas(mapa);
   const repetido=JSON.stringify(extras);posicoesExtrasClassicas.delete(mapa.numero);
   const estavel=repetido===JSON.stringify(obterDecoracoesExtrasClassicas(mapa));
   const separados=extras.every((p,i)=>extras.slice(i+1).every(q=>Math.hypot(p.x-q.x,p.y-q.y)>=CONFIG.decoracoesExtrasClassicas.separacao));
   const foraAgua=extras.every(p=>!mapa.agua||p.x+36<=mapa.agua.x||p.x-36>=mapa.agua.x+mapa.agua.largura||p.y+36<=mapa.agua.y||p.y-36>=mapa.agua.y+mapa.agua.altura);
   let mesmosTipos=true,limite=true,galeriaIgual=true,campanha=true,editor=true,exclusivoEquilibrado=true;
   if(!mapa.caminho){
    const original=decoracoesDoMapa[mapa.tema]||[],base=obterDecoracoesBaseClassicas(mapa);
    const caminhos=caminhosDoMapaClassico(mapa);
    const elegiveis=original.filter(d=>distanciaDosCaminhosClassicos(d.x,d.y,caminhos)>=CONFIG.decoracoesExtrasClassicas.distanciaCaminho);
    mesmosTipos=JSON.stringify([...new Set(base.map(d=>d.tipo))].sort())===JSON.stringify([...new Set(elegiveis.map(d=>d.tipo))].sort());
    limite=base.every(d=>base.filter(o=>o.tipo===d.tipo).length<=3);
    mapaPersonalizadoAtivo=null;campanha=JSON.stringify(obterDecoracoesVisiveisDoMapa(mapa.tema))===JSON.stringify(original);
    editor=CONFIG.editorDeFases.percentuaisDeDecoracoes.every((percentual,nivel)=>{
     mapaPersonalizadoAtivo={tema:mapa.tema,nivelDeDecoracoes:nivel};
     return JSON.stringify(obterDecoracoesVisiveisDoMapa(mapa.tema))===JSON.stringify(original.slice(0,Math.round(original.length*percentual)));
    });
    const livres=[{tipo:'arvore',x:150,y:100,escala:1}];
    mapaPersonalizadoAtivo={modoEdicao:'livre',decoracoesLivres:livres};
    editor=editor&&obterDecoracoesVisiveisDoMapa(mapa.tema)===livres;
    mapaPersonalizadoAtivo={classico:true,numeroClassico:mapa.numero,tema:mapa.tema,nivelDeDecoracoes:2};
    const arena=obterDecoracoesVisiveisDoMapa(mapa.tema),vistos=[];
    const obterOriginal=obterDecoracoesBaseClassicas;
    obterDecoracoesBaseClassicas=m=>{const ds=obterOriginal(m);vistos.push(...ds);return ds;};
    try{const tela=document.createElement('canvas');tela.width=1200;tela.height=700;desenharCenarioClassicoBase(tela.getContext('2d'),mapa);}
    finally{obterDecoracoesBaseClassicas=obterOriginal;}
    galeriaIgual=JSON.stringify(vistos)===JSON.stringify(arena);
   }else{
    const selecionarOriginal=selecionarDecoracoesEspalhadas,selecionados=[];
    selecionarDecoracoesEspalhadas=(p,n)=>{const ds=selecionarOriginal(p,n);selecionados.push(...ds);return ds;};
    try{
     const t=document.createElement('canvas');t.width=1200;t.height=700;const c=t.getContext('2d');
     if(['cerejeiras','florestaMorta'].includes(mapa.tema))desenharArvoresDasFlorestasClassicas(c,mapa);else desenharObjetosDosBiomasClassicos(c,mapa);
    }finally{selecionarDecoracoesEspalhadas=selecionarOriginal;}
    exclusivoEquilibrado=selecionados.length===4;
    if(mapa.agua)exclusivoEquilibrado=exclusivoEquilibrado&&selecionados.filter(p=>p.y>145&&p.y<550).length===2;
   }
   res.push({numero:mapa.numero,estavel,separados,foraAgua,mesmosTipos,limite,galeriaIgual,campanha,editor,exclusivoEquilibrado});
  }
  return res;
 });
 expect(resultado).toHaveLength(35);
 for(const r of resultado)for(const [chave,valor]of Object.entries(r))if(chave!=='numero')expect(valor,`mapa ${r.numero}: ${chave}`).toBe(true);
});
