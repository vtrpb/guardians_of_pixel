# Checkout seguro do Pacote Apoiador

O jogo está preparado para iniciar um checkout hospedado por um provedor de pagamentos, mas permanece em demonstração enquanto `CONFIG.pacoteApoiador.modoDemonstracao` for `true`. Nenhum segredo, preço ou direito de acesso deve ser colocado no navegador.

## Configuração do cliente

Quando o servidor estiver pronto:

1. Defina `modoDemonstracao: false`.
2. Preencha `checkout.endpointCriacaoDaSessao` com uma rota da mesma origem, por exemplo `/api/apoiador/checkout`.
3. Preencha `checkout.endpointConsultaDoDireito`, por exemplo `/api/apoiador/direito`.
4. Inclua em `checkout.origensPermitidas` somente as origens HTTPS usadas pelo checkout hospedado, por exemplo `https://checkout.provedor.com`.
5. Faça o servidor inserir um token imprevisível, com pelo menos 16 caracteres, em `<meta name="token-csrf-checkout" content="...">` para cada sessão autenticada.

O botão de compra permanece desabilitado se HTTPS, os dois endpoints, o token CSRF ou a lista de origens permitidas estiverem ausentes.

## Contrato do servidor

### `POST /api/apoiador/checkout`

- Exige uma sessão autenticada por cookie `Secure`, `HttpOnly` e `SameSite`.
- Valida `Origin` e o cabeçalho `X-CSRF-Token`.
- Aceita apenas `{ "pacote": "coracaoDePixel" }`.
- Obtém produto, moeda e preço de uma tabela mantida no servidor; nunca aceita esses valores do navegador.
- Cria uma sessão no provedor usando uma chave de idempotência por usuário e tentativa.
- Responde com `{ "urlDoCheckout": "https://checkout.provedor.com/..." }`.

### `GET /api/apoiador/direito`

- Exige a mesma sessão autenticada.
- Consulta o direito persistido no servidor.
- Responde com `{ "adquirido": true|false, "skinEquipada": true|false }`; `skinEquipada` pode ser omitido quando essa preferência for mantida somente no navegador.
- Usa `Cache-Control: no-store`.

O cliente ignora qualquer `adquirido` salvo no `localStorage` no modo real. O armazenamento local pode guardar somente a preferência visual da skin depois que o servidor confirmar o direito.

## Confirmação do pagamento

O retorno do navegador não libera o pacote. A confirmação deve acontecer por webhook:

1. Verifique a assinatura do webhook com o segredo fornecido pelo provedor.
2. Confirme no servidor o identificador da sessão, o produto esperado, a moeda, o valor integral e o estado pago.
3. Relacione a compra ao usuário registrado quando a sessão foi criada, nunca a um usuário informado pelo webhook ou pela página de retorno.
4. Grave o evento e o direito com chave única/idempotente para que reenvios não dupliquem compras.
5. Só então faça `GET /api/apoiador/direito` retornar `adquirido: true`.

## Checklist antes do lançamento

- Toda a aplicação e os endpoints usam HTTPS.
- Chaves secretas existem somente no servidor e no gerenciador de segredos.
- Logs não registram cookies, token CSRF, dados de cartão nem a URL completa da sessão.
- O provedor coleta os dados de pagamento em sua página hospedada; o jogo nunca recebe dados de cartão.
- Criação de sessão e webhooks possuem limitação de taxa, auditoria e idempotência.
- Cancelamento, reembolso e contestação atualizam o direito conforme a política publicada do jogo.
- Testes do ambiente de homologação cobrem pagamento aprovado, cancelado, recusado, webhook duplicado e retorno sem webhook.
