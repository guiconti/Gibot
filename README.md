# Gibot

[![bitHound Overall Score](https://www.bithound.io/github/guiconti/Gibot/badges/score.svg)](https://www.bithound.io/github/guiconti/Gibot)
[![bitHound Dependencies](https://www.bithound.io/github/guiconti/Gibot/badges/dependencies.svg)](https://www.bithound.io/github/guiconti/Gibot/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/guiconti/Gibot/badges/code.svg)](https://www.bithound.io/github/guiconti/Gibot)

Gibot é o seu assistente pessoal para todas as horas, conecte ele em todos os seus dispositivos e deixe ele fazer a sua vida mais fácil!

## 1. Começando

Assim que realizar um clone desse projeto no seu ambiente antes de começar qualquer processo você deve primeiramente criar na raíz do seu projeto um arquivo chamado `.env` contendo todas as variáveis do sistema que são utilizados nesse projeto. As variáveis são:
``` javascript
PORT='Porta que será utilizada no projeto (caso não essa variável não seja inserida o servidor adotará 3101)'
TELEGRAM_TOKEN='Token do seu bot do telegram'
TELEGRAM_OWNER_ID='ID do dono do robô para ser utilizado em serviços restritos'
TRELLO_KEY='Chave de desenvolvedor do Trello'
TRELLO_TOKEN='Token do seu usuário (ou de quem você deseja acessar as informações) do Trello'
TRELLO_PROJETO_BOARD_ID='Por hora indica o Id da Board de projetos mas será eliminado e pego automaticamente'
NODE_ENV='Qual o ambiente em que a aplicação está rodando no momento (opcional)'
```

Caso não deseje ajustar essas variáveis você pode alterar elas dentro das aplicações para o valor correspondente (não recomendado).

## 2. Trello

```
POST /trello/"nome da board"/"nome da lista"/insert
GET /trello/"nome da board"/"nome da lista"/list
```
