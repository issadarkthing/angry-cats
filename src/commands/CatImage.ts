import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Cat } from "../structure/Cat";
import { Prompt } from "@jiman24/discordjs-prompt";
import { Player } from "../structure/Player";

export default class extends Command {
  name = "catimage";
  description = "adds image to your angry cat";

  async exec(msg: Message, args: string[]) {
    const prompt = new Prompt(msg);
    const prefix = this.commandManager.prefix; 
    const code = args[0];

    if (!code) {
      throw new Error(
        `Please use \`${prefix}${this.name} <code>\``
      )
    }
     
    const cat = Cat.fromID(code);

    if (!cat) {
      throw new Error(
        `No cat found, please redeem the cat first using \`${prefix}redeem <code>\``
      )
    }

    const player = Player.fromID(msg.author.id);

    if (!player.cats.some(cat => cat.id === code)) {
      throw new Error(
        `Only owner of the cat can change the image`
      )
    }

    const image = await prompt.collect("Please upload angry cat image:");
    const imageUrl = image.attachments.first()?.url;

    if (!imageUrl) {
      throw new Error("No image uploaded");
    }

    cat.imageUrl = imageUrl;
    cat.save();

    msg.channel.send(`Successfully saved angry cat image`);

  }
}
