# Gibot

[![bitHound Overall Score](https://www.bithound.io/github/guiconti/Gibot/badges/score.svg)](https://www.bithound.io/github/guiconti/Gibot)
[![bitHound Dependencies](https://www.bithound.io/github/guiconti/Gibot/badges/dependencies.svg)](https://www.bithound.io/github/guiconti/Gibot/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/guiconti/Gibot/badges/code.svg)](https://www.bithound.io/github/guiconti/Gibot)

Gibot é o seu assistente pessoal para todas as horas, conecte ele em todos os seus dispositivos e deixe ele fazer a sua vida mais fácil!

----
## 1. Começando

Assim que realizar um clone desse projeto no seu ambiente antes de começar qualquer processo você deve primeiramente criar na raíz do seu projeto um arquivo chamado `.env` contendo todas as variáveis do sistema que são utilizados nesse projeto. As variáveis são:
``` javascript
PORT='Porta que será utilizada no projeto (caso não essa variável não seja inserida o servidor adotará 3101)'
TELEGRAM_TOKEN='Token do seu bot do telegram'
TELEGRAM_OWNER_ID='ID do dono do robô para ser utilizado em serviços restritos'
TRELLO_KEY='Chave de desenvolvedor do Trello'
TRELLO_TOKEN='Token do seu usuário (ou de quem você deseja acessar as informações) do Trello'
NODE_ENV='Qual o ambiente em que a aplicação está rodando no momento (opcional)'
```

Caso não deseje ajustar essas variáveis você pode alterar elas dentro das aplicações para o valor correspondente (não recomendado).

## 2. Trello

O primeiro pacote de APIs que o Gibot disponibiliza é o Trello.
Para utilizar as funcionalidades do Trello pelo Gibot no Telegram use sempre o prefixo /t ou /trello seguido do comando.

No momento o Gibot consegue realizar as funções de *listar e inserir*.

### 2.1. Listar

A opção de listar é disponibilizada no Gibot de 2 maneiras.

A primeira é pelo o seu bot cadastrado no Telegram enviando uma mensagem pra ele no formato

```
/t list/"Nome da board"/"Nome da list"
```

Esse comando lista todas as cards contidas na lista desejada, cada card separada com uma quebra de linha.

Exemplo:
![Exemplo Listagem Telegram](http://i.imgur.com/h1RYwkg.png)

A outra forma é uma chamada direta na API

```
GET /trello/"nome da board"/"nome da lista"/list
```

A resposta será dada em um JSON contendo apenas um array *msg* que contém todas as cards na lista solicitada.
Em caso de falha a descrição da falha é contida dentro de *msg*.

Exemplo:

```
GET /trello/gibimbot/backlog/list
```

```
{
  "msg": [
    "Abastecer com todas as conversas de um chat",
    "Multiplos usuarios",
    "Observar conversa do chat e abastecer",
    "Spotify",
    "Economia",
    "Bitcoin",
    "https://www.haykranen.nl/2014/12/02/howto-backup-your-telegram-chats/ ou https://github.com/psamim/telegram-cli-backup",
    "https://trace.risingstack.com"
  ]
}
```

### 2.2. Inserir

A opção de inserir é disponibilizada no Gibot de 2 maneiras.

A primeira é pelo o seu bot cadastrado no Telegram enviando uma mensagem pra ele no formato

```
/t insert/"Nome da board"/"Nome da list"/"Nome da card"
```

Esse comando insere uma nova card dentro da lista passada.

Exemplo:
![Exemplo Inserção Telegram](https://i.imgur.com/utre2xb.png)

A outra forma é uma chamada direta na API

```
POST /trello/"nome da board"/"nome da lista"/insert
```

Contendo no corpo do POST
```
name: Nome da card a ser inserida. STRING
description: Descrição da card a ser inserida. OPCIONAL STRING
```

A resposta será dada em um JSON contendo apenas um array *msg* que contém a mensagem de sucesso em caso de inserção realizada ou uma mensagem de falha caso a inserção não ocorra.

Exemplo:
```
POST /trello/gibimbot/backlog/list

{
  	"name": "Exemplo Github",
	"description": ""
}
```

```
{
  "msg": "Exemplo Github card created."
}
```