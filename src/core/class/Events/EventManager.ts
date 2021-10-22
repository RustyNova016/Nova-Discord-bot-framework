import {BotItemManager} from "@core/class/BotItemManager";
import {Event} from "@core/class/Events/Event";
import {SlashCommandManager} from "@core/class/SlashCommands/SlashCommandManager";

export class EventManager extends BotItemManager {
    public items: Event[] = [];

    public addCommands(slashCommandManager: SlashCommandManager) {
        this.items.push(slashCommandManager.getCommandEvent());
    }

    protected contentError(): void {
        throw new Error("Event file isn't an event!");
    }

    protected fileContainItem(fileContent): boolean {
        return fileContent instanceof Event;
    }
}