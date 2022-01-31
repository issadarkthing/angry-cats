import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Player } from "../structure/Player";

export default class extends Command {
  name = "cats";
  aliases = ["cat"];

  async exec(msg: Message) {

    const player = Player.fromID(msg.author.id);
    const cats = player.cats.map(x => x.show());

    if (cats.length > 0) {
      msg.channel.send({ embeds: cats });
    } else {
      throw new Error("you do not own any angry cat");
    }

  }
}
