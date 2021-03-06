import { Command } from "@jiman24/commandment";
import { Message, PermissionResolvable } from "discord.js";
import { Prompt } from "@jiman24/discordjs-prompt";
import { validateNumber } from "@jiman24/discordjs-utils";
import { Cat } from "../structure/Cat";

export default class extends Command {
  name = "register";
  description = "register new cat with attributes";
  permissions: PermissionResolvable[] = ["ADMINISTRATOR"];

  private async getAttribute(prompt: Prompt, attribute: string) {

    const attr = Number(await prompt.ask(
      `Please enter a value for ${attribute}:`
    ));

    validateNumber(attr);

    return attr;
  }

  async exec(msg: Message) {
    const prompt = new Prompt(msg);

    await msg.channel.send("Registering new angry cat");

    const id = await prompt.ask("Please enter id:");
    const hat = await this.getAttribute(prompt, "Hat");
    const mouth = await this.getAttribute(prompt, "Mouth");
    const eyes = await this.getAttribute(prompt, "Eyes");
    const weapon = await this.getAttribute(prompt, "Weapon");
    const surpriseAttack = await this.getAttribute(prompt, "Surprise Attack");
    const surpriseAttackName = await prompt.ask(
      `Please enter a name for the Surprise Attack:`
    );
    const image = await prompt.collect("Please upload an image for this angry cat:");

    const cat = new Cat(id);
    cat.hat = hat;
    cat.mouth = mouth;
    cat.eyes = eyes;
    cat.weapon = weapon;
    cat.surpriseAttack = surpriseAttack;
    cat.imageUrl = image.attachments.first()!.url;
    cat.surpriseAttackName = surpriseAttackName;

    cat.save();
    msg.channel.send("Saved successfully");

  }
}
