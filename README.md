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

Essa funcionalidade fornece uma lista com todas as cards presentes em uma lista específica do Trello.

A opção de listar é disponibilizada no Gibot de 2 maneiras.

A primeira é pelo o seu bot cadastrado no Telegram enviando uma mensagem pra ele no formato

```
/t list/"Nome da board"/"Nome da list"
```

Esse comando lista todas as cards contidas na lista desejada, cada card separada com duas quebras de linha.

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

Essa funcionalidade permite que o usuário insira uma nova card dentro de uma lista específica.

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

## 3. Gmail

Outro pacote de APIs que o Gibot disponibiliza é o Google Calendar.
Para utilizar as funcionalidades do Calendar pelo Gibot no Telegram use sempre o prefixo /g ou /gmail seguido do comando.

No momento o Gibot consegue realizar a função de *listar*.

### 3.1. Listar

Essa funcionalidade lista todos os eventos que você possui em seu calendário em um período de tempo específico.

#### Listando os eventos pelo Telegram

Para listar os eventos do seu calendário pelo Telegram o Gibot aceita 3 tipos de input.

A primeira opção recebe apenas o comando e retorna todos os eventos do dia atual.

```
/g list
```

A segunda opção recebe uma quantidade de dias e verifica todos os eventos nos próximos *n* dias.

```
/g list;"dias"
```

Por fim a última opção recebe uma data início e uma data fim, verificando todos os eventos presentes entre estas datas.

```
/g list;"data início";"data fim"
```

Ambos os inputs retornam a resposta no mesmo modelo.

Exemplo:
![Exemplo Listagem Google Calendar](http://i.imgur.com/klbIMOO.png)

#### Listando os eventos pela API

Para listar os eventos do seu calendário por uma chamada direta a API precisamos realizar uma chamada da seguinte maneira:

```
GET /gmail/list?days="dias"&initialDate="dia início"&finalDate="dia fim"
```

Sendo que as 3 opções da query são opcionais. Caso nenhum valor seja passado a API retornará os eventos no dia de hoje.
Caso tanto os dias quanto as datas de início e fim sejam passadas a API priorizará as datas e trará os eventos dentro deste período.

Exemplo:
```
GET /gmail/list?days=90
```

Resposta
```
{
  "msg": [
    {
      "summary": "ENC: Credimob em 5 anos",
      "start": "2017-01-31T14:00:00-02:00",
      "end": "2017-01-31T16:30:00-02:00"
    },
    {
      "summary": "ENC: CrédImob no mundo",
      "start": "2017-02-01T10:00:00-02:00",
      "end": "2017-02-01T11:00:00-02:00"
    },
    {
      "summary": "ENC: Kaizen - Atendimento de Ocorrências Sistema OD",
      "start": "2017-02-02T09:00:00-02:00",
      "end": "2017-02-03T18:00:00-02:00"
    },
    {
      "summary": "ENC: Aquele forte e grande abraço. FLWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "start": "2017-02-03T17:30:00-02:00",
      "end": "2017-02-03T18:00:00-02:00"
    },
    {
      "summary": "CI Digital - Plano de Validação Implantação",
      "start": "2017-02-06T14:30:00-02:00",
      "end": "2017-02-06T15:30:00-02:00"
    }
  ]
}
```

## 4. IoT

O Gibot também ajuda você a controlar a sua casa!
As seguintes funcionalidades possuem alguma integração com aparelhos locais que você pode colocar na sua própria casa.
Para utilizar as funcionalidades do IoT pelo Gibot no Telegram use sempre o prefixo /i ou /iot seguido do comando.

No momento o Gibot consegue realizar a função de *foto*.

### 4.1. Foto

Essa funcionalidade retorna uma foto de um local específico do seu IoT. No caso será usado um raspberry pi com uma câmera  que será responsável por tirar a foto e enviar para o nosso bot.

#### Tirando uma foto pelo telegram

Para tirar uma nova foto é muito simples, basta enviar para o bot.

```
/i photo
```

Imediatamente o bot enviará uma foto do seu IoT. No caso deste teste o IoT irá tirar uma nova foto no exato momento que o pedido chegar.

Exemplo:
![Exemplo Foto Telegram](https://i.imgur.com/gXiRgFn.png)

#### Tirando uma foto pela API

O módulo de fotos está desprendido do Gibot. Você pode desenvolver a sua própria API de foto dentro do Gibot e fazer com que ela acesse a câmera que deseja manusear, entretanto, por hora, essa API ficará em uma outra aplicação pois possui um escopo diferente da proposta do Gibot.

## 5. Reddit

O Gibot disponibiliza uma maneira simples de criar o seu próprio feed de notícias pelo reddit.
(Em desenvolvimento)
