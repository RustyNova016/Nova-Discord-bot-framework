require('module-alias/register')
import {BotClient} from "@core/class/BotClient";
import {Intents} from "discord.js";

const {token, commandFolderPath, eventFolderPath} = require("../BotConfig.json");

const botClient = new BotClient(token, commandFolderPath, eventFolderPath, {
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});



botClient.login();