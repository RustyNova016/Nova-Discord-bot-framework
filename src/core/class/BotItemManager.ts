import * as fs from "fs";


export abstract class BotItemManager {
    public abstract items: any[];

    private static getFiles(pathToFolder: string): string[] {
        return fs.readdirSync(pathToFolder).filter(file => file.endsWith(".js"));
    }

    protected abstract fileContainItem(fileContent): boolean

    public addFromFolder(pathToFolder: string): void {
        const files = BotItemManager.getFiles(pathToFolder);

        for (const file of files) {
            const fileContent = require(`${pathToFolder}/${file}`);

            if (this.fileContainItem(fileContent)) {
                this.items.push(fileContent);
            } else {
                this.contentError();
            }
        }
    }

    protected abstract contentError(): void;
}