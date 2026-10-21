# Arquitetura e convenções

## Responsabilidades

| Arquivo | Responsabilidade |
| --- | --- |
| `index.htm` | Elementos da página e carregamento dos arquivos. |
| `styles.css` | Layout responsivo e aparência fora do canvas. |
| `game.js` | Estado, regras, input, atualização e renderização. |
| `modulos/` | Recursos do jogo separados por responsabilidade, carregados pelo HTML. |
| `estilos/` | Estilos dos recursos e telas, além da folha principal. |
| `assets/` e `sons/` | Imagens, ícones e áudio usados pelo jogo. |
| `tests/` | Testes e adaptadores compartilhados em `tests/apoio/`. |
| `scripts/` | Ferramentas de auditoria, geração de recursos e servidor local. |
| `traducoes-em-preparo/` | Traduções ainda fora do seletor. |

## Carregamento e arquivos locais

- `index.htm` mantém a ordem explícita dos scripts clássicos; mover um arquivo não altera essa ordem. Os caminhos de imagens nos módulos continuam relativos ao HTML; `url(...)` em CSS é relativo à folha de estilo.
- O núcleo `game.js` e `styles.css` permanecem na raiz para manter a entrada principal estável. Novos recursos devem entrar nos módulos existentes ou nas pastas correspondentes.
- `node scripts/verificar-recursos.cjs` confere os caminhos locais do HTML e das folhas de estilo.
- A auditoria e o teste de idiomas compartilham `tests/apoio/catalogos-idiomas.cjs`. As duas telas que exibem a fraqueza Suprema usam o mesmo conversor de percentual.
- `artifacts/`, `backups/`, `references/` e `guardians arquive/` são materiais locais ignorados pelo Git. A cópia anterior do jogo fica em `guardians arquive/versao-antiga-do-jogo/`; conceitos e recursos substituídos ficam no mesmo arquivo local. Nenhum teste depende desses materiais.
- Os relatórios de idiomas são gerados pelo código atual. O conferidor do alemão gera o relatório caso ele ainda não exista, permitindo usar um clone sem artefatos locais.

## Organização de `game.js`

1. Elementos da página.
2. `CONFIG`: valores de balanceamento imutáveis.
3. Dados do mapa e estado mutável.
4. Regras de waves, inimigos, torres e tiros.
5. Funções auxiliares.
6. Funções de desenho.
7. Loop principal.

## Princípios

- **DRY:** uma regra ou número de balanceamento possui uma única fonte de verdade em `CONFIG`.
- **Separação de responsabilidades:** cada função deve cuidar de uma tarefa clara.
- **Estado explícito:** dados que mudam durante a partida ficam agrupados na seção de estado.
- **Renderização sem efeitos:** funções `desenhar...` exibem o estado; regras e movimento ocorrem antes delas.
- **Mudanças pequenas:** não misture novos recursos com refatorações grandes na mesma alteração.
