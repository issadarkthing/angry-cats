import { bold, random } from "@jiman24/discordjs-utils";
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

    const attribs: (keyof Cat)[] = ["hat", "mouth", "eyes", "weapon", "surpriseAttack"];
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

        let text = "";
        switch (attrib) {
          case "hat": 
            text = "It's a tie! Those are some cool cats in hats. ";
            break;
          case "mouth": 
            text = "Not even a twitch of their little kitty lips, it's a tie.";
            break;
          case "eyes": 
            text = "They are really staring each other down. Oh no! It's an Angry Cat standoff.";
            break;
          case "weapon": 
            text = "Kitty Kitty Bang Bang! This weapons showdown is deadlocked.";
            break;
          case "surpriseAttack": 
            text = "Two wildcats of power busted out their Surprise Attacks. But this stalemate is a draw.";
            break;
        }

        this.msg.channel.send(text);

      } else {
        const cat = roundWinner.cat;

        let text = "";
        switch (attrib) {
          case "hat": 
            text = `Are they fur-real with that hat? ${cat.name} gets ${bold(1)} point`;
            break;
          case "mouth": 
            text = `Fur-get about it. ${cat.name}'s sneer is all it takes. ${bold(1)} point`;
            break;
          case "eyes": 
            text = `That was a cat–astrophe. ${cat.name}'s menacing stare earns ${bold(1)} point!`;
            break;
          case "weapon": 
            text = `Is that weapon even legal? Here comes claw-enforcement. ${bold(1)} point for ${bold(1)}.`;
            break;
          case "surpriseAttack": 
            text = `${cat.name}'s will go down in hiss-tory for that Surprise Attack! ${bold(1)} point`;
            break;
        }

        this.msg.channel.send(text);
      }
    }

    let winner;

    if (g1Score > g2Score) {
      winner = this.g1;
    } else if (g2Score > g1Score) {
      winner = this.g2;
    } else {
      winner = null;
    }


    if (winner) {
      const loser = winner.cat.id !== this.g1.cat.id ? this.g1 : this.g2;
      await this.msg.channel.send("https://media0.giphy.com/media/KGYWp6CNdK8W8nSUsb/giphy.gif?cid=790b761112e640d3ce5e9cd000d7d8f58cef474994a73e33&rid=giphy.gif&ct=g");
      await this.msg.channel.send(`You’re a fur-midable opponent ${loser.cat.name}.`);
      await this.msg.channel.send(`The winner is ${winner.cat.name}`);
      await this.msg.channel.send({ embeds: [winner.cat.show()] });
      await this.msg.channel.send(`Final score is ${bold(this.g1.cat.name)} ${bold(g1Score)} vs ${bold(this.g2.cat.name)} ${bold(g2Score)}`);
    }

    return winner;
  }
}
