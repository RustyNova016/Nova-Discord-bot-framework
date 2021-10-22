import {isset} from "@core/class/miscFunctions";
import {Interaction} from "discord.js";

export class Event {
    public name: string;
    public triggerEvent: string;
    public once: boolean;

    public action: (...args) => void;

    public listener(...args): void {
        if (isset(this.action)) {
            try {
                this.action(...args);
            } catch (e) {
                console.error("Something went wrong while executing the event");
                throw e;
            }
        } else {
            throw new Error("Event action not set");
        }
    }
}

export class InteractionCreateEvent extends Event {
    constructor(action: (interaction: Interaction) => void) {
        super();
        this.action = action;
    }
    public override triggerEvent = "interactionCreate";

    public override action: (interaction: Interaction) => void;

    public override listener(interaction: Interaction): void {
        if (this.interactionCheck(interaction)) {
            if (isset(this.action)) {
                super.listener(interaction);
            } else {
                throw new Error("Interaction event action not set");
            }
        }
    }

    public interactionCheck(interaction: Interaction){
        return true
    }
}