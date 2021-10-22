import {BotClient, BotClientOptions} from "@core/class/BotClient";
import {Intents} from "discord.js";

const {token} = require("../BotConfig.json");

const botClient = new BotClient(undefined, undefined, undefined, <BotClientOptions>{
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    appToken: token
});



botClient.login();