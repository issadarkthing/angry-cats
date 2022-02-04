import { Command } from "@jiman24/commandment";
import { Message, PermissionResolvable } from "discord.js";
import { Prompt } from "@jiman24/discordjs-prompt";
import { Cat } from "../structure/Cat";
import { oneLine } from "common-tags";

export default class extends Command {
  name = "multiregister";
  description = "register new cat with attributes";
  permissions: PermissionResolvable[] = ["ADMINISTRATOR"];

  async exec(msg: Message) {
    const prompt = new Prompt(msg);

    await msg.channel.send("Registering new angry cat");

    const input = await prompt.ask(
      oneLine`Please register new cat by using this format
      \`UID,hat,mouth,eyes,weapon,surprise attack,surprise attack name\`. This
      also supports multiline`
    );
    
     
    const lines = input.split("\n");
    const itemsCount = 7;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const attributes = line.split(",");

      if (attributes.length !== itemsCount) {
        throw new Error(`Error on line ${line}: more or less than ${itemsCount} items given`);
      }

      for (let i = 1; i < attributes.length; i++) {
        const attribute = attributes[i];

        if (i === attributes.length - 1) {
          break;
        }

        if (Number.isNaN(Number(attribute))) {
          throw new Error(`Error on line ${line}: ${attribute} is not a number`);
        }
      }

      const cat = new Cat(attributes[0]);
      cat.hat = Number(attributes[1]);
      cat.mouth = Number(attributes[2]);
      cat.eyes = Number(attributes[3]);
      cat.weapon = Number(attributes[4]);
      cat.surpriseAttack = Number(attributes[5]);
      cat.surpriseAttackName = attributes[6];

      /* const collected = await prompt.collect(
        `Please upload an image for cat ${cat.id}`
      );

      const image = collected.attachments.first();

      if (!image) {
        throw new Error("no image provided");
      }

      cat.imageUrl = image.url; */

      cat.save();
    }

    msg.channel.send(`${lines.length} angry cats saved successfully!`);

  }
}
