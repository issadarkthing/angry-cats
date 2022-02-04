import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { client } from "..";


export default class extends Command {
  name = "unregister";
  description = "unregister cat";


  async exec(msg: Message, args: string[]) {

    const code = args[0];

    if (!code) {
      throw new Error(`Please give cat id \`!unregister <UID>\``);
    } else if (!client.cats.has(code)) {
      throw new Error(`No cat with UID: ${code}`);
    }

    client.players.map(player => {
      player.cats = player.cats.filter((cat: string) => cat !== code);
      return player;
    });

    client.cats.delete(code);
    msg.channel.send(`Successfully unregistered cat with UID: ${code}`);
  }
}
