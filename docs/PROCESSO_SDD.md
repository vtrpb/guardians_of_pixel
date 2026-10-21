# Processo de desenvolvimento orientado por especificações

## Fluxo curto

1. Escrever ou confirmar o requisito usando o modelo em `ESPECIFICACAO.md`.
2. Identificar os valores envolvidos em `CONFIG` e as funções afetadas.
3. Implementar apenas o escopo definido.
4. Atualizar esta especificação se a regra permanente mudou.
5. Revisar manualmente o fluxo afetado no navegador.
6. Em cada atualização do jogo, corrigir também pelo menos um erro pendente, priorizando os importantes ou relacionados à mudança. Verificar a correção, atualizar o registro de pendências e informar o erro corrigido na entrega, conforme `AGENTS.md`.

## Prompt recomendado

Use este formato para pedidos futuros. Ele reduz perguntas extras e evita mudanças acidentais:

```text
Mudança: <nome curto>
Objetivo: <experiência desejada>
Regra: <valores e condições exatas>
Preservar: <o que não pode mudar>
Aceitação: <exemplo de entrada e resultado esperado>
```

## Exemplo

```text
Mudança: aumentar limite de torres
Objetivo: permitir uma estratégia mais ampla.
Regra: limite passa de 10 para 12.
Preservar: custo 150, dano 10, distância mínima 70 e waves.
Aceitação: a interface mostra Torres: 12/12 e bloqueia a 13ª torre.
```

## Quando não é necessário mudar a especificação

Correções internas, organização de arquivos, comentários e refatorações DRY que não alterem o jogo.

## Resultados de testes fora do OneDrive

O Playwright grava traces, capturas e diagnósticos no diretório temporário do Windows definido em `playwright.config.cjs`, separado por projeto. Não usar `test-results/` dentro da pasta sincronizada: o executor limpa automaticamente seu diretório de saída a cada rodada e isso pode gerar alertas de exclusão em massa no OneDrive. Capturas de testes devem usar `testInfo.outputPath()`. Não apagar a pasta antiga `test-results/` automaticamente; qualquer limpeza dela exige confirmação do jogador.
