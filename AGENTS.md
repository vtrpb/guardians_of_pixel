# Instruções do projeto

## Fonte de verdade

Leia `docs/ESPECIFICACAO.md` antes de alterar mecânicas, valores de balanceamento ou interface do jogo.

## Regras de implementação

- Não mude comportamento existente sem um requisito explícito.
- Centralize valores de balanceamento em `CONFIG` dentro de `game.js`.
- Evite duplicação: extraia funções quando a mesma regra ou desenho aparecer mais de uma vez.
- Mantenha HTML, CSS e JavaScript separados.
- Use nomes em português, coerentes com o código atual.
- Só crie imagens ou capturas de atualizações e eventos quando o jogador pedir, ou durante uma revisão com várias correções de bugs na mesma parte do jogo. Para verificações comuns, revise o fluxo sem salvar imagens.

## Critério de conclusão

Uma mudança só está pronta quando o código e a especificação foram atualizados, e o fluxo afetado foi revisado manualmente.

## Uma correção por atualização

- A cada atualização do jogo (por exemplo, uma nova fase, torre ou melhoria), corrigir também pelo menos um erro pendente enquanto houver pendências conhecidas.
- A correção adicional deve resolver uma pendência da lista histórica de revisão. Corrigir apenas o novo problema solicitado não substitui esse compromisso. Informar a contagem verificada antes/depois, distinguindo falha de teste desatualizado de defeito do jogo.
- Preferir erros importantes ou relacionados ao fluxo alterado. Consultar `docs/REVISAO_TESTES_CRITICOS.md` e os diagnósticos em `artifacts/testes-unitarios/`.
- Pode ser um defeito do jogo ou uma falha de teste desatualizado. Identificar qual dos dois foi corrigido, preservar a cobertura e verificar a correção; não contar testes removidos, ignorados ou enfraquecidos como correção.
- Informar na entrega qual erro foi corrigido junto da atualização e atualizar o registro das pendências. Não inventar um erro quando não houver pendências.
- Sempre informar explicitamente ao usuário o estado do erro discutido: corrigido e verificado, alterado mas ainda não verificado, ou apenas identificado e ainda pendente. Explicar a causa não conta como corrigir; não deixar esse estado implícito, inclusive em respostas sem alterações no código.

## Tradução junto das atualizações

- A cada atualização do jogo, avançar também pelo menos um bloco revisável da tradução pendente, além da correção de erro exigida acima.
- Concluir um idioma por vez: terminar o alemão da Alemanha antes de avançar os rascunhos de russo e chinês simplificado.
- Conferir chaves, variáveis e sentido dos textos novos; não ativar um idioma incompleto no seletor.
- Registrar na entrega quantos textos estavam preparados antes e depois da atualização e quantos ainda faltam. Se todos os idiomas planejados estiverem completos, informar isso sem criar trabalho artificial.

## Lembrete solicitado pelo jogador

- Ao entregar cada próxima atualização, lembrar que o teste da Comunidade local com o amigo depende de atualizar o site e usar a mesma rede. O jogador planejou esse teste para o dia seguinte a 19/10/2026. Manter o lembrete até ele confirmar que testou; não afirmar que a rede entre os dois aparelhos já foi verificada.
