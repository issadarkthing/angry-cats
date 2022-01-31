import { MessageEmbed } from "discord.js";
import { client } from "..";
import { MersenneTwister19937, Random } from "random-js";

export class Cat {
  hat = 0;
  mouth = 0;
  eyes = 0;
  weapon = 0;
  accessories = 0;
  imageUrl = "";
  readonly max = 20;
  readonly min = 1;

  constructor(public id: string) {
    const seed = this.createSeed(id);
    const randomizer = new Random(MersenneTwister19937.seedWithArray(seed));
    this.hat = randomizer.integer(1, 15);
    this.mouth = randomizer.integer(1, 11);
    this.eyes = randomizer.integer(1, 17);
    this.weapon = randomizer.integer(1, 15);
    this.accessories = randomizer.integer(1, 20);
  }

  private createSeed(id: string) {
    return id.split("").map(x => x.charCodeAt(0));
  }

  static fromID(id: string) {
    const cat = new Cat(id);
    const data = client.cats.get(id);

    Object.assign(cat, data);

    return cat;
  }

  show() {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .addField("ID", this.id)
      .addField("Hat", this.hat.toString(), true)
      .addField("Mouth", this.mouth.toString(), true)
      .addField("Eyes", this.eyes.toString(), true)
      .addField("Weapon", this.weapon.toString(), true)
      .addField("Accessories", this.accessories.toString(), true)

    if (this.imageUrl) {
      embed.setThumbnail(this.imageUrl);
    }


    return embed;
  }

  save() {
    client.cats.set(this.id, { ...this });
  }
}
