import {EventManager} from "@core/class/Events/EventManager";
import {SlashCommandManager} from "@core/class/SlashCommands/SlashCommandManager";
import {Client, ClientOptions} from "discord.js";

export class BotClient extends Client {
    public appToken: string;
    public commandFolderPath: string;
    public eventFolderPath: string;

    constructor(appToken: string, commandFolderPath: string, eventFolderPath: string, options: ClientOptions) {
        super(options);
        this.appToken = appToken;
        this.commandFolderPath = commandFolderPath;
        this.eventFolderPath = eventFolderPath;

        this.loadItems()
    }

    override login(): Promise<string> {
        console.log("Login in...");
        const loginPromise = super.login(this.appToken);
        console.log("Logged in");
        return loginPromise;
    }

    public loadItems() {
        const eventManager = new EventManager();
        const slashCommandManager = new SlashCommandManager();

        eventManager.addFromFolder(this.eventFolderPath);
        slashCommandManager.addFromFolder(this.commandFolderPath)

        eventManager.addCommands(slashCommandManager);4
        this.addEvents(eventManager);
    }

    private addEvents(eventManager: EventManager): void {
        for (const event of eventManager.items) {
            if (event.once) {
                this.once(event.triggerEvent, event.listener);
            } else {
                this.on(event.triggerEvent, event.listener);
            }
        }
    }
}