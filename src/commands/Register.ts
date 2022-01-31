import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Prompt } from "@jiman24/discordjs-prompt";
import { validateNumber } from "@jiman24/discordjs-utils";
import { Cat } from "../structure/Cat";

export default class extends Command {
  name = "register";
  description = "register new cat with attributes";
  disable = true;

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
    const accessories = await this.getAttribute(prompt, "Accessories");
    const image = await prompt.collect("Please upload an image for this angry cat");

    const cat = new Cat(id);
    cat.hat = hat;
    cat.mouth = mouth;
    cat.eyes = eyes;
    cat.weapon = weapon;
    cat.accessories = accessories;
    cat.imageUrl = image.attachments.first()!.url;

    cat.save();
    msg.channel.send("Saved successfully");

  }
}
