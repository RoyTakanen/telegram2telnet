const fs = require('fs');
const net = require('net');
const TelegramBot = require('node-telegram-bot-api');

const asetukset = JSON.parse(fs.readFileSync('settings.json'));

const token = asetukset.telegram_token;

const bot = new TelegramBot(token, {polling: true});

const server = net.createServer((socket) => {
  bot.sendMessage(asetukset.chatId, 'New telnet user has joined from IP ' + socket.remoteAddress);

  socket.on('end', function() {
    bot.sendMessage(asetukset.chatId, 'telnet user has left the channel. IP: ' + socket.remoteAddress)
  })

  socket.on('data', function(data) {
    bot.sendMessage(asetukset.chatId, 'Telnet message(' + socket.remoteAddress + '): \n' + data)
  })

  bot.on('message', function(msg) {
    if (msg.text != "/chatid") {
      socket.write('<' + msg.from.username + '> ' + msg.text + '\n')
    }
  })
});

bot.on('message', function(msg) {
  //Tuki Id:n lookupille
  if (msg.text == "/chatid") {
    console.log("Chat id is: " + msg.chat.id);
  }
});

//Hallinnoi errorit
server.on('error', function(err) {
  throw err;
});

bot.on('error', function(err) {
  throw err;
});

//Käynnistä palvelin
server.listen(asetukset.telnet_port,() => {
  console.log('Opened server on', server.address());
})
