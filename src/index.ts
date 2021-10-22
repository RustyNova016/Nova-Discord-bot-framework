require('module-alias/register')
import {BotClient} from "@core/class/BotClient";
import {Intents} from "discord.js";

const {token} = require("../BotConfig.json");

const botClient = new BotClient(token, undefined, undefined, {
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});



botClient.login();