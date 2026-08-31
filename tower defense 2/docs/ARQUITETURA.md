# Arquitetura e convenções

## Responsabilidades

| Arquivo | Responsabilidade |
| --- | --- |
| `index.htm` | Elementos da página e carregamento dos arquivos. |
| `styles.css` | Layout responsivo e aparência fora do canvas. |
| `game.js` | Estado, regras, input, atualização e renderização. |

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
