const {test,expect}=require('@playwright/test');
test('36 imagens próprias, segredos ocultos e ícone na notificação',async({page},info)=>{
    const erros=[];page.on('pageerror',e=>erros.push(e.message));
    await page.goto('/');await page.locator('#botao-jogar-menu-inicial').click();
    await page.evaluate(()=>mostrarConquistas('comuns'));
    await expect(page.locator('.conquista-icone img')).toHaveCount(22);
    await expect.poll(()=>page.locator('.conquista-icone img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src')))).toEqual([]);
    await page.evaluate(()=>mostrarConquistas('ocultas'));
    await expect(page.locator('.conquista-icone img')).toHaveCount(0);
    await expect(page.locator('.conquista-icone')).toHaveText(Array(14).fill('?'));
    await page.evaluate(()=>{desbloquearConquista('frequencia09');mostrarConquistas('ocultas');});
    await expect(page.locator('.conquista-icone img')).toHaveCount(1);
    await expect(page.locator('.notificacao-progresso-icone img')).toHaveAttribute('src','assets/conquistas/frequencia09.svg');
    await page.setViewportSize({width:390,height:844});
    await expect.poll(()=>page.locator('.notificacao-progresso').evaluate(el=>el.getBoundingClientRect().right<=innerWidth)).toBe(true);
    await page.screenshot({path:info.outputPath('conquistas-celular.png')});
    await page.setViewportSize({width:1000,height:1000});
    await page.evaluate(()=>{
        const galeria=document.createElement('section');galeria.id='galeria-teste';
        galeria.style.cssText='position:absolute;inset:0 auto auto 0;z-index:999999;background:#182432;color:#edf1ec;padding:20px;display:grid;grid-template-columns:repeat(6,140px);gap:16px;font:12px sans-serif;text-align:center';
        for(const [id,c]of Object.entries(CONFIG.conquistas)){
            const item=document.createElement('div');item.innerHTML=criarImagemDaConquista(id);
            item.querySelector('img').style.cssText='width:96px;height:96px;margin:0 auto 8px;image-rendering:pixelated';
            const nome=document.createElement('div');nome.textContent=c.nome;item.append(nome);galeria.append(item);
        }
        document.body.append(galeria);
    });
    await expect.poll(()=>page.locator('#galeria-teste img').evaluateAll(imgs=>imgs.length===36&&imgs.every(i=>i.complete&&i.naturalWidth>0))).toBe(true);
    const caminhos=await page.locator('#galeria-teste img').evaluateAll(imgs=>imgs.map(i=>i.src));
    expect(new Set(caminhos).size).toBe(36);
    await page.locator('#galeria-teste').screenshot({path:info.outputPath('todos-os-icones.png')});
    await page.reload();
    expect(await page.evaluate(()=>conquistaEstaDesbloqueada('frequencia09'))).toBe(true);
    expect(erros).toEqual([]);
});
