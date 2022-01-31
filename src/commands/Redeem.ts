import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { client } from "..";
import { Cat } from "../structure/Cat";
import { Player } from "../structure/Player";



export default class extends Command {
  name = "redeem";
  description = "claim your angry cat";

  async exec(msg: Message, args: string[]) {

    const code = args[0];

    if (!code) {
      throw new Error("no code given");
    }

    const catRedeemed = client.cats.has(code);

    if (catRedeemed) {
      throw new Error("this angry cat has been redeemed");
    }

    const cat = new Cat(code);
    cat.save();

    const player = Player.fromID(msg.author.id);
    player.cats.push(cat);

    player.save();
    msg.channel.send("Successfully redeemed");
  }
}
