import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Weapon } from "../structure/Weapons";
import { random } from "@jiman24/discordjs-utils";

export default class extends Command {
  name = "register";
  description = "register new cat with attributes";

  async exec(msg: Message) {

    const weapon = new Weapon();
    const [obj1, obj2] = random.sample(weapon.objects, 2);
    const result = weapon.result(obj1, obj2);

    msg.channel.send(`${obj1.name} vs ${obj2.name}`);

    if (result) {
      msg.channel.send(`${result.name} wins!`);
    } else {
      msg.channel.send("It's a draw");
    }

  }
}
