import {BotItemManager} from "@core/class/BotItemManager";
import {InteractionCreateEvent} from "@core/class/Events/Event";
import {SlashCommand} from "@core/class/SlashCommands/SlashCommand";
import {CommandInteraction, Interaction} from "discord.js";

export class SlashCommandManager extends BotItemManager {
    public items: SlashCommand[];

    public getCommandEvent(): InteractionCreateEvent {
        const interactionCreateEvent = new InteractionCreateEvent(this.executeCommand);
        interactionCreateEvent.interactionCheck = (interaction: Interaction) => {
            return interaction.isCommand();
        };
        return interactionCreateEvent;
    }

    public async executeCommand(commandInteraction: CommandInteraction) {
        for (const slashCommand of this.items) {
            if (slashCommand.isInteractionFromCommand(commandInteraction)) {
                try {
                    slashCommand.execute(commandInteraction);
                } catch (e) {
                    await commandInteraction.reply({
                        content: "There was an error while executing this command!",
                        ephemeral: true
                    });

                    throw e;
                }
                break;
            }
        }
    }

    protected fileContainItem(fileContent): boolean {
        return fileContent instanceof SlashCommand;
    }

    protected contentError() {
        throw new Error("Command file isn't a command!");
    }
}