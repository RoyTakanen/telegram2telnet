# telegram2telnet
 Connect your telegram channel to telnet.

## Usage

0. Make sure you have Node.JS and NPM installed on your computer.
1. Clone this repository
```bash
git clone
```
2. Get your chat id. Run command `/chatid`. It will print the id in the terminal.
3. Configure settings.json
```json
{
  "telegram_token": "YOUR_TELEGRAM_TOKEN_HERE",
  "telnet_port": "12345",
  "chatId": "YOU_CHATID"
}
```
4. Start the bot with command
```
npm start
```

## Todo

1. Add support for nickname on telnet side.
2. Add date to messages
