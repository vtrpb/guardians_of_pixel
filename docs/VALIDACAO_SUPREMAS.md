# Validação das Torres Supremas

## Fluxos verificados

- Sete testes em `tests/e2e/supremas.spec.cjs`: lobby e layout de celular, empréstimo das seis defesas, derrota sem recompensa, vitória e persistência, falha de gravação com recuperação, seleção exclusiva e limite após venda, reinício, carga/pausa, três poderes, isolamento de slots, dados inválidos e bloqueio do pulso da campanha.
- Oito testes existentes de clássico, empréstimo da fase 1 e mochila passaram após a integração.
- Revisão visual das capturas do lobby em computador/celular e do botão de poder na partida. Cartões e poderes usam os desenhos do jogo.
- Conferência das traduções em inglês e espanhol. Reinício narrativo pelo botão da cama preservou a Cronarca conquistada e equipada, mesmo voltando o progresso à fase 1; sem erros de JavaScript nesse fluxo.

## Dificuldade

`scripts/simular-desafios-supremos.cjs` executa o combate real em um navegador isolado, com relógio acelerado e desenhos desativados. Constrói por eventos do canvas e compra melhorias com a renda da tentativa; não altera vida, dano, dinheiro ou desbloqueios para vencer.

- Contra o Tempo: vitória nas 15 waves com cobertura distribuída, controle glacial e melhorias. Formações anteriores com lacunas perderam nas primeiras waves.
- Maré Infinita: vitória nas 18 waves usando Esporos e Raios para os grupos e Obliterador para alvos resistentes. Formação sem dano em área perdeu cedo.
- Última Fortaleza: vitória nas 20 waves com dois Canhões Blindados na entrada, reposição das defesas danificadas, troca de alvos durante o cerco e venda dos suportes depois do último Sabotador para investir no combate aos dois chefes. Sem essa administração, as formações testadas perderam entre as waves 4 e 20.

A simulação comprova uma estratégia possível para cada desafio, não substitui o ajuste futuro com partidas de jogadores. Não houve desbloqueio no save real do usuário.

## Correção das verificações antigas

Os quatro testes apontados inicialmente foram corrigidos e passaram: Bomba Pesada, seleção de defesas, salvos e torres sem melhorias. A especificação da bomba foi corrigida para o posicionamento existente sobre o caminho. A seleção verifica os dois modos do botão Jogar e os limites das fases 1–18. Salvos verifica a aplicação da raiz e mantém a cobertura de migração, isolamento e restauração, incluindo Supremas. A verificação de melhorias diferencia o Lança-Chamas com escolhas das Supremas sem melhorias.

Na revisão dos fluxos, dois testes funcionais também estavam desatualizados: o Álbum deve apresentar o visual base mais cinco melhorias; o teste da bomba precisa concluir o diálogo inicial antes de construir. Ambos foram corrigidos sem alterar o jogo.

Passaram 20 testes funcionais selecionados: cinco de clássico, sete de Supremas, quatro de melhorias, três de saves/interface e um de posicionamento da bomba. Os quatro testes unitários corrigidos também passaram novamente.

A execução individual de todos os 63 arquivos unitários identificou 18 aprovados e 45 com outras falhas, fora das quatro verificações corrigidas. Há expectativas antigas de interface/documentação e contextos isolados que não carregam dependências atuais. Os diagnósticos estão em `artifacts/testes-unitarios/*.log`. A suíte unitária completa ainda não está aprovada; esses resultados não equivalem a 45 defeitos confirmados no jogo.

Atualização: a [revisão prioritária](REVISAO_TESTES_CRITICOS.md) corrigiu seis dessas verificações. O resultado atual é de 24 arquivos aprovados e 39 com falha.
