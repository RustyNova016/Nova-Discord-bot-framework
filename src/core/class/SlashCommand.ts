import {SlashCommandExecute} from "@core/class/SlashCommandExecute";
import {emptyArray, isset} from "@core/class/miscFunctions";
import {SubCommand} from "@core/class/SubCommand";
import {SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} from "@discordjs/builders";
import {CommandInteraction} from "discord.js";

interface SlashCommandObject {
    name: string;
    description?: string;
}

export class SlashCommand extends SlashCommandBuilder {
    public commandExecute: SlashCommandExecute;
    private subCommands: SubCommand[] = [];

    constructor(createOptions: SlashCommandObject = undefined) {
        super();

        if (isset(createOptions)) {
            this.buildFromObject(createOptions);
        }
    }

    public buildFromObject(slashCommandObject: SlashCommandObject): void {
        this.setName(slashCommandObject.name);

        if (isset(slashCommandObject.description)) {
            this.setDescription(slashCommandObject.description);
        }
    }

    /** Execute the command
     *
     * @param {CommandInteraction} commandInteraction
     */
    public execute(commandInteraction: CommandInteraction): void {
        if (!emptyArray(this.subCommands)) {
            for (const subCommand of this.subCommands) {
                if (subCommand.name == commandInteraction.options.getSubcommand()) {
                    //subCommand.execute(commandInteraction);
                }
            }
        } else if (isset(this.commandExecute)) {
            this.commandExecute.execute(commandInteraction);
        } else {
            throw new Error("No action have been set for this command!")
        }
    }

    /** Add a subcommand
     *
     * @param {SubCommand} subCommand
     * @returns {SlashCommandSubcommandsOnlyBuilder}
     */
    public override addSubcommand(subCommand: SubCommand): SlashCommandSubcommandsOnlyBuilder {
        this.subCommands.push(subCommand);
        return super.addSubcommand(subCommand);
    }

    public isInteractionFromCommand(commandInteraction: CommandInteraction){
        return commandInteraction.commandName === this.name;
    }
}