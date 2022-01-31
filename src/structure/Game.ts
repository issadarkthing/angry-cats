import { bold } from "@jiman24/discordjs-utils";
import { oneLine } from "common-tags";
import { Message, User } from "discord.js";
import { Cat } from "./Cat";

interface GameObject {
  owner: User;
  cat: Cat;
}

export class Game {
  constructor(
    private msg: Message,
    public g1: GameObject,
    public g2: GameObject,
  ) {}

  async run() {

    const attribs: (keyof Cat)[] = ["hat", "mouth", "eyes", "weapon", "accessories"];
    let g1Score = 0;
    let g2Score = 0;

    for (const attrib of attribs) {
      const g1Attrib = this.g1.cat[attrib];
      const g2Attrib = this.g2.cat[attrib];
      let roundWinner: null | GameObject = null;

      if (g1Attrib > g2Attrib) {
        g1Score++;
        roundWinner = this.g1;
      } else if (g2Attrib > g1Attrib) {
        g2Score++;
        roundWinner = this.g2;
      }

      if (!roundWinner) {
        this.msg.channel.send(`It's a tie for both!`);
      } else {
        const point = roundWinner.owner.id === this.g1.owner.id ? g1Score : g2Score;
        const ownerName = roundWinner.owner.username;
        this.msg.channel.send(
          `${bold(ownerName)}'s cat has better ${attrib} and has ${bold(point)} points!`
        )
      }
    }

    this.msg.channel.send(
      oneLine`Final score is ${bold(this.g1.owner.username)} ${bold(g1Score)} vs
      ${bold(this.g2.owner.username)} ${bold(g2Score)}`
    )

    if (g1Score > g2Score) {
      return this.g1;
    } else if (g2Score > g1Score) {
      return this.g2;
    } else {
      return null;
    }
  }
}
