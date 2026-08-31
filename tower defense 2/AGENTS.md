# Instruções do projeto

## Fonte de verdade

Leia `docs/ESPECIFICACAO.md` antes de alterar mecânicas, valores de balanceamento ou interface do jogo.

## Regras de implementação

- Não mude comportamento existente sem um requisito explícito.
- Centralize valores de balanceamento em `CONFIG` dentro de `game.js`.
- Evite duplicação: extraia funções quando a mesma regra ou desenho aparecer mais de uma vez.
- Mantenha HTML, CSS e JavaScript separados.
- Use nomes em português, coerentes com o código atual.

## Critério de conclusão

Uma mudança só está pronta quando o código e a especificação foram atualizados, e o fluxo afetado foi revisado manualmente.
