# Gibot

[![bitHound Overall Score](https://www.bithound.io/github/guiconti/Gibot/badges/score.svg)](https://www.bithound.io/github/guiconti/Gibot)
[![bitHound Dependencies](https://www.bithound.io/github/guiconti/Gibot/badges/dependencies.svg)](https://www.bithound.io/github/guiconti/Gibot/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/guiconti/Gibot/badges/code.svg)](https://www.bithound.io/github/guiconti/Gibot)


Gibot is your personal assistant for every occasion, connect it in all your devices and let him make your life easier!

----
## 1. First Steps


As soon as you clone this project in your workspace you have to, first of all, create a archive named ‘.env’ which contains all the system variables used in the project. The variables are the following:

``` javascript
PORT='Port that will be used in project (if left blank, server will adopt 3101 by default)'
TELEGRAM_TOKEN='Your telegram bot token'
TELEGRAM_OWNER_ID='Bot’s owner’s ID to be used in restrict services'
TRELLO_KEY='Trello developer’s key'
TRELLO_TOKEN='Trello user’s token (or anyone you wish to get the info)'
NODE_ENV=' Which ambient the application is running (optional)'
```


You can adjust this variables inside the applications in case you don’t want to set them separately, although it’s not recommended.

## 2. Trello


The first APIs package that Gibot has available is Trello.
To use Trello’s functionalities via Gibot in Telegram always use /t or /trello followed by the desired command.


In the moment, Gibot can do two functions: *list* and *insert*.

### 2.1. List


This function returns a list with every card in a specific list in Trello.


You can use it in Gibot in two ways:

First is via your Telegram bot, sending it a text in the following format:

```
/t list/"Board’s Name"/"List’s Name"
```
This command lists all cards in the given list, each card separated by two line breaks.

Example:
![Example Telegram Listing](http://i.imgur.com/h1RYwkg.png)

The second way is by a direct call to the API:

```
GET /trello/"Board’s Name"/"List’s Name"/list
```
The answer will be a JSON with an array *msg* that contains every card in the given list.
In case of an error, the description of it will be inserted inside *msg*.

Example:

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

### 2.2. Insert

This function allows the user to insert a new card inside a specific list.

Insert can be done via Gibot in two ways:

You can do it via your Telegram bot, sending it a message in the following format:

```
/t insert/"Board's Name"/"List's Name"/"Card's Name"
```

Example:
![Example Telegram Insertion](https://i.imgur.com/utre2xb.png)

And you can do it via a direct call to the API

```
POST /trello/"Board's Name"/"List's Name"/insert
```

The POST's body contains:
```
name: Card's name to be inserted. STRING
description: New card's description. OPTIONAL STRING
```

This returns a JASON with only a array *msg* containing a success message if it works properly or a failure message in case of an error.

Example:
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

Another API package that Gibot makes available is Google Calendar.

To use its functionalities via Gibot in Telegram always use /g or /gmail followed by the command.

At the moment Gibot can execute the command *list*.

### 3.1. List

This function lists every event you may have in your calendar in a specific period of time.

#### Listing events via Telegram

To list your calendar's events in Telegram, Gibot accepts 3 types of input:

The first option returns every event of the current day.

```
/g list
```

The second option receives a quantity n of days and returns every event for the next n days.

```
/g list;"days"
```

And the last option receives an initial date and an end day, returning all the events for the given period.

```
/g list;"initial date";"end date"
```

The last options both return the answer in the same format.

Example:
![Example Google Calendar Listing](http://i.imgur.com/klbIMOO.png)

#### Event Listing via API

To list your Calendar's events via a direct API call, the command needs to be in the following format"

```
GET /gmail/list?days="days"&initialDate="initial date"&finalDate="end date"
```

All the three options of the query are optional. In case no value is given, API will return all the events of the current day.
If the days are given as well as the initial and end date, API will priorize the dates and return the events for that period.

Example:
```
GET /gmail/list?days=90
```

Answer
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

Gibot also helps you to control your house!

The following functionalities can interact with local devices you can use in your own house.
To use IoT functions use /i or /iot followed by the command.

At the moment Gibot can realize the function *photo*.

### 4.1. Photo

This function returns a picture of a specific local of your device. In this case, it's using a raspberry pi with a camera responsible of taking the picture and sending it to our bot.

#### Taking a photo via Telegram

To take a new photo it's quite simple, you just send the following command to your bot:

```
/i photo
```

Immediately the bot will send you a photo of your device. In this case the IoT device will take a picture at the exact moment it's asked.

Example:
![Example Telegram Photo](https://i.imgur.com/gXiRgFn.png)

#### Taking a photo via API

The photo module isn't part of Gibot. You can develop your own photo API inside Gibot and use it to access the desired camera. However, at the momento, this API will be in another application since it escapes Gibot's purpose.

## 5. Reddit

Gibot helps you to create your own news feed via Reddit. (Under development)
