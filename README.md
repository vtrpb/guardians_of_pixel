# Guardians of Pixel

**Guardians of Pixel** é um jogo tower defense feito com HTML, CSS e JavaScript puro. O jogo não possui dependências em tempo de execução; a automação de testes usa Playwright como dependência de desenvolvimento.

## Executar

Abra [index.htm](index.htm) no navegador.

## Testes

Execute `npm install` e depois `npm run test:e2e:install` uma vez para instalar o Chromium de testes.

- `npm run test:unit`: valida regras e estrutura sem abrir navegador.
- `npm run test:e2e`: abre o jogo em um servidor local e percorre jornadas reais no navegador.
- `npm test`: executa as duas suítes.

## Estrutura

- `index.htm`: estrutura da página e recursos do jogo.
- `styles.css`: layout e estilo da página.
- `game.js`: regras, estado e renderização do jogo.
- `docs/ESPECIFICACAO.md`: regras atuais que não devem ser alteradas por acidente.
- `docs/PROCESSO_SDD.md`: como pedir e implementar mudanças.
- `docs/ARQUITETURA.md`: convenções técnicas do projeto.
- `docs/CHECKOUT_APOIADOR.md`: contrato e checklist de segurança do checkout.

## Regra principal para mudanças

Antes de mudar uma mecânica, registre ou atualize a decisão em `docs/ESPECIFICACAO.md`.
