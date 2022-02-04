import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Cat } from "../structure/Cat";
import { Player } from "../structure/Player";
import { Prompt } from "@jiman24/discordjs-prompt";


export default class extends Command {
  name = "redeem";
  description = "claim your angry cat";

  async exec(msg: Message, args: string[]) {

    const code = args[0];

    if (!code) {
      throw new Error("no code given");
    }

    const prompt = new Prompt(msg);
    const name = await prompt.ask("Please give a name for your cat:");

    const cat = Cat.fromID(code);
    cat.name = name;
    cat.save();

    const player = Player.fromID(msg.author.id);
    player.cats.push(cat);

    player.save();
    msg.channel.send("Successfully redeemed");
    msg.channel.send({ embeds: [cat.show()] });
  }
}
