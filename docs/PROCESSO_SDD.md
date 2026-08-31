# Processo de desenvolvimento orientado por especificações

## Fluxo curto

1. Escrever ou confirmar o requisito usando o modelo em `ESPECIFICACAO.md`.
2. Identificar os valores envolvidos em `CONFIG` e as funções afetadas.
3. Implementar apenas o escopo definido.
4. Atualizar esta especificação se a regra permanente mudou.
5. Revisar manualmente o fluxo afetado no navegador.

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
