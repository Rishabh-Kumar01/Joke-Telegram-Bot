import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import axios from "axios";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/joke/, async (option) => {
  const response = await axios.get(
    "https://official-joke-api.appspot.com/jokes/random"
  );

  console.log("Joke Response", response.data);

  const chatId = option.chat.id;
  const setup = response.data.setup;
  const punchline = response.data.punchline;

  bot.sendMessage(chatId, setup + " " + punchline);
});

bot.on("message", (option) => {
  console.log("Message Received", option);

  const chatId = option.chat.id;

  bot.sendMessage(
    chatId,
    "Hello, I'm a Joke Bot. Please type /joke to get a joke."
  );
});
