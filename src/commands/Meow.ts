import { Command } from "@jiman24/commandment";
import { Message, User } from "discord.js";
import { Prompt } from "@jiman24/discordjs-prompt";
import { ButtonHandler } from "@jiman24/discordjs-button";
import { Player } from "../structure/Player";
import { Game } from "../structure/Game";

export default class extends Command {
  name = "meow";
  description = "battle with your angry cat";

  async exec(msg: Message) {
    const prompt = new Prompt(msg);
    const button = new ButtonHandler(msg, 
      `${msg.author.username} is now accepting for a battle`
    )
      .setMultiUser(2);


    let opponent: User | undefined;
    button.addButton("join", user => { 
      opponent = user;
      button.close();
    });

    await button.run();

    if (!opponent) {
      throw new Error("no one accepted the challenge");
    } else if (opponent.id === msg.author.id) {
      throw new Error("you cannot fight yourself");
    }

    const player1 = Player.fromID(msg.author.id);
    const player2 = Player.fromID(opponent.id);

    await msg.channel.send({ embeds: player1.cats.map(x => x.show()) });
    const cat1ID = await prompt.ask(
      `Please select your fighter ${msg.author} by copy paste angry cat id`
    );

    const cat1 = player1.cats.find(cat => cat.id === cat1ID);

    if (!cat1) {
      throw new Error("No cat found");
    }

    await msg.channel.send({ embeds: player2.cats.map(x => x.show()) });
    const cat2ID = await prompt.ask(
      `Please select your fighter ${opponent} by copy paste angry cat id`,
      { filter: (msg) => msg.author.id === opponent!.id }
    );

    const cat2 = player2.cats.find(cat => cat.id === cat2ID);

    if (!cat2) {
      throw new Error("No cat found");
    }

    const game = new Game(
      msg,
      {
        owner: msg.author,
        cat: cat1,
      },
      {
        owner: opponent,
        cat: cat2,
      }
    );

    const winner = await game.run();

    if (winner) {
      msg.channel.send(`${winner.owner.username} won the battle!`);
    } else {
      msg.channel.send(`It's a tie!`);
    }
  }
}
