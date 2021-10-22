import {SlashCommand} from "@core/class/SlashCommand";
import * as fs from "fs";

export class SlashCommandManager {
    private slashCommands: SlashCommand[];

    public addSlashCommandFromFolder(pathToCommandFolder: string){
        const commandFiles = fs.readdirSync(pathToCommandFolder).filter(file => file.endsWith('.js'));

        for (const commandFile of commandFiles) {
            const command = require(`pathToCommandFolder/${commandFile}`);

            if (command instanceof SlashCommand) {
                this.slashCommands.push(command);
            } else {
                throw new Error("Command file isn't a command!")
            }
        }
    }
}