import {CommandOptionSkeleton} from "@core/class/SlashCommandExecute";
import {isset} from "@core/class/miscFunctions";
import {SlashCommandStringOption} from "@discordjs/builders";
import {CommandInteraction} from "discord.js";

export class SlashCommandOption implements CommandOptionSkeleton {
    public type: string;
    public description: string;
    public name: string;
    public required: boolean = false;

    constructor(commandOptionSkeleton: CommandOptionSkeleton = undefined) {
        if (isset(commandOptionSkeleton)) {
            this.type = commandOptionSkeleton.type;
            this.description = commandOptionSkeleton.description;
            this.name = commandOptionSkeleton.name;
            this.required = commandOptionSkeleton.required;
        }
    }

    public exportCommandOptions() {
        this.checkIfReady();
        switch (this.type) {
            //TODO: Replace by a CommandOption type Map
            case "string":
                let slashCommandStringOption = new SlashCommandStringOption();
                slashCommandStringOption = this.addAtributeToOption(slashCommandStringOption);
                return slashCommandStringOption;
            default:
                throw new Error(`Type ${this.type} isn't supported`)
        }
    }

    private checkIfReady() {
        if (!isset(this.type)) {
            throw new Error("Option type not set");
        } else if (!isset(this.name)) {
            throw new Error("Option name not set");
        }
    }

    private addAtributeToOption(option) {
        option.setName(this.name);

        if (isset(this.description)) {
            option.setDescription(this.description);
        }

        option.required(this.required)

        return option
    }

    public extractArgumentFromInteraction(commandInteraction: CommandInteraction) {
        this.checkIfReady()

        //TODO: Replace by a CommandOption type Map
        switch (this.type) {
            case "string":
                return commandInteraction.options.getString(this.name);
            default:
                throw new Error(`Type ${this.type} isn't supported`)
        }
    }
}