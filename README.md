# Guardians of Pixel

**Guardians of Pixel** é um jogo tower defense feito com HTML, CSS e JavaScript puro. O jogo não possui dependências em tempo de execução; a automação de testes usa Playwright como dependência de desenvolvimento.

## Executar

Abra [index.htm](index.htm) no navegador.

### Comunidade na mesma rede

No computador que vai guardar os mapas, execute `node scripts/servidor-comunidade-local.cjs` nesta pasta e deixe o terminal aberto. Ele mostrará um endereço como `http://192.168.1.10:4174`. Os dois aparelhos precisam estar na mesma rede Wi-Fi ou LAN. Se o Windows perguntar, permita o acesso de rede privada. O servidor guarda os mapas em `dados/comunidade-local.json`; esse arquivo não deve ser apagado para manter as publicações.

Continue abrindo o jogo do jeito habitual, inclusive por `file://`, para preservar os saves do navegador. No Editor de fases, abra **Comunidade**, digite o endereço exibido e clique em **Conectar e atualizar**. Quem criar um mapa pode publicá-lo por **Meus mapas → Publicar e copiar código**. O outro jogador atualiza a lista da Comunidade e adiciona o mapa à biblioteca. Depois de importado, ele pode jogar mesmo com o servidor desligado. Publicar, buscar novos mapas ou retirar uma publicação exige que o servidor esteja aberto.

Se o jogo estiver em um site HTTPS e o navegador bloquear o acesso ao endereço HTTP da rede, abra o endereço do servidor diretamente em outra aba. Essa página permite copiar o código de cada mapa para colar em **Comunidade → Importar mapa** no jogo. A página do servidor não pede nem transfere saves. O limite é de 100 publicações no computador anfitrião e 20 mapas importados por navegador. O servidor é para a rede local, sem acesso pela internet.

O jogo anuncia [assets/guardians-of-pixel.ico](assets/guardians-of-pixel.ico) como ícone da aba. Ao arrastar o ícone da barra de endereço do Opera para a área de trabalho, o navegador pode usar esse ícone no atalho criado. Se o Opera continuar mostrando a própria marca, mova [Guardians of Pixel.lnk](Guardians%20of%20Pixel.lnk) da pasta do projeto para a área de trabalho. Esse atalho do Windows abre `index.htm` e usa o mesmo `.ico`; mantenha a pasta do jogo no mesmo local para preservar o destino. A arte editável está em [assets/guardians-of-pixel.svg](assets/guardians-of-pixel.svg); execute `node scripts/gerar-icone-jogo.cjs` para regenerar as versões de 32, 48 e 256 px. O atalho `Guardians of Pixel.url` já presente na área de trabalho usa `assets/guardians-of-pixel-atalho-2.ico`, com o mesmo desenho e um nome novo para renovar o ícone do Windows.

## Testes

Execute `npm install` e depois `npm run test:e2e:install` uma vez para instalar o Chromium de testes.

- `npm run test:unit`: valida regras e estrutura sem abrir navegador.
- `npm run test:e2e`: abre o jogo em um servidor local e percorre jornadas reais no navegador.
- `npm test`: executa as duas suítes.

A suíte unitária percorre todos os arquivos e retorna erro se qualquer um falhar. O resumo completo fica em `artifacts/testes-unitarios/resumo.json`, acompanhado dos diagnósticos individuais. A revisão prioritária e as limitações conhecidas estão em [docs/REVISAO_TESTES_CRITICOS.md](docs/REVISAO_TESTES_CRITICOS.md).

## Estrutura

- `index.htm`: estrutura da página e recursos do jogo.
- `styles.css`: layout e estilo da página.
- `game.js`: regras, estado e renderização do jogo.
- `modulos/`: 42 módulos do jogo organizados por responsabilidade.
- `estilos/`: 21 folhas de estilo das telas e recursos.
- `assets/` e `sons/`: recursos usados pelo jogo.
- `tests/` e `scripts/`: testes e ferramentas de desenvolvimento.
- `traducoes-em-preparo/`: traduções ainda em revisão.
- `docs/ESPECIFICACAO.md`: regras atuais que não devem ser alteradas por acidente.
- `docs/PROCESSO_SDD.md`: como pedir e implementar mudanças.
- `docs/ARQUITETURA.md`: convenções técnicas do projeto.
- `docs/CHECKOUT_APOIADOR.md`: contrato e checklist de segurança do checkout.

## Regra principal para mudanças

Antes de mudar uma mecânica, registre ou atualize a decisão em `docs/ESPECIFICACAO.md`.

## Materiais locais e Git

Capturas, relatórios gerados, backups, referências e versões anteriores ficam em `artifacts/`, `backups/`, `references/` e `guardians arquive/`, ignorados pelo Git. Retirar esses arquivos do rastreamento preserva as cópias no computador. O atalho `.lnk` também é local, pois contém caminhos deste computador.

Execute `npm run verificar:recursos` depois de reorganizar arquivos. Os testes usam apenas o código atual e não dependem da cópia histórica. Relatórios em `artifacts/` podem ser regenerados pelos scripts e testes.

Para enviar a versão preparada, use `git push origin main`. O histórico local foi recomposto a partir de `origin/main`, consolidando as mudanças sem incluir os ZIPs grandes dos commits locais anteriores. O backup completo desses commits está em `backups/git-antes-limpeza-d95367d.bundle`, ignorado pelo Git.

Um clone novo usa `npm ci` para instalar as dependências de teste. `.gitattributes` mantém os arquivos de código com finais de linha consistentes no Windows e nos demais sistemas.
