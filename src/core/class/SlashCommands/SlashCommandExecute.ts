import {SlashCommandOption} from "@core/class/SlashCommands/SlashCommandOption";
import {emptyArray} from "@core/miscFunctions";
import {CommandInteraction} from "discord.js";


export interface CommandOptionSkeleton {
    name: string;
    description?: string;
    type: string;
    required?: boolean;
}

export class SlashCommandExecute {
    public commandOptionSkeletons: CommandOptionSkeleton[] = [];
    public action: (arg0: CommandInteraction, arg1: {}) => void;

    public execute(commandInteraction: CommandInteraction): void {
        this.action(commandInteraction, this.extractArgumentsFromInteraction(commandInteraction));
    }

    public createCommandOptions(): SlashCommandOption[] {
        if (emptyArray(this.commandOptionSkeletons)) {
            return [];
        }

        const commandOptions: SlashCommandOption[] = [];

        for (const commandOptionSkeleton of this.commandOptionSkeletons) {
            commandOptions.push(new SlashCommandOption(commandOptionSkeleton));
        }

        return commandOptions;
    }

    public extractArgumentsFromInteraction(commandInteraction: CommandInteraction) {
        if (emptyArray(this.commandOptionSkeletons)) {
            return [];
        }

        const functionArguments = {};

        for (const commandOption of this.createCommandOptions()) {
            functionArguments[commandOption.name] = commandOption.extractArgumentFromInteraction(commandInteraction);
        }

        return functionArguments;
    }
}