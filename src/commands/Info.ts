import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Cat } from "../structure/Cat";

export default class extends Command {
  name = "info";
  disable = true;

  async exec(msg: Message, args: string[]) {

    const id = args[0];

    if (!id) {
      throw new Error("You need to provide the code `!info <code>`");
    }

    const cat = Cat.fromID(id);
    
    if (!cat) {
      throw new Error("No cat");
    }

    msg.channel.send({ embeds: [cat.show()] });
  }
}
