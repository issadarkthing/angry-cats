import { Command } from "@jiman24/commandment";
import { Message, User } from "discord.js";
import { Prompt } from "@jiman24/discordjs-prompt";
import { ButtonHandler } from "@jiman24/discordjs-button";
import { Player } from "../structure/Player";
import { Game } from "../structure/Game";
import { client } from "..";
import { DateTime } from "luxon";
import { LeaderboardData } from "./Leaderboard";
import { Cat } from "../structure/Cat";

export default class extends Command {
  name = "meow";
  description = "battle with your angry cat";

  private update(winnerID: string, winnerName: string, leaderboard: LeaderboardData[]) {

    const winner = leaderboard.find(x => x.id === winnerID);

    if (winner) {
      winner.wins++;
    } else {
      leaderboard.push({ id: winnerID, wins: 1, name: winnerName });
    }
  }

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

    if (player1.cats.length === 0) {
      throw new Error(`${msg.author} has no cats`);
    } else {
      await msg.channel.send({ embeds: player1.cats.map(x => x.show()) });
    }

    const cat1Name = await prompt.ask(
      `Choose your fighter ${msg.author}! Copy & Paste your Angry Cat name`
    );

    const cat1 = player1.cats.find(cat => cat.name === cat1Name);

    if (!cat1) {
      throw new Error("No cat found");
    }

    if (player2.cats.length === 0) {
      throw new Error(`${opponent} has no cats`);
    } else {
      await msg.channel.send({ embeds: player2.cats.map(x => x.show()) });
    }

    const cat2Name = await prompt.ask(
      `Choose your fighter ${opponent}! Copy & Paste your Angry Cat name`,
      { filter: (msg) => msg.author.id === opponent!.id }
    );

    const cat2 = player2.cats.find(cat => cat.name === cat2Name);

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


    await msg.channel.send(`Ladies & gentlemen, welcome to the main event of the evening!`);
    await msg.channel.send({ embeds: [cat1.show(), cat2.show()] });
    await msg.channel.send("Best out of 5 Wins");
    await msg.channel.send("Angry Cats, Ready? Fight!");
    await msg.channel.send("https://tenor.com/view/tekken-get-ready-fire-motivation-battle-gif-21762793");

    const winner = await game.run();

    if (winner) {

      const date = DateTime.now();

      const weekID = `${date.weekNumber}-${date.year}`;
      const weeklyPoints = client.weekly.get(weekID) || [];
      this.update(winner.owner.id, winner.owner.username, weeklyPoints);
      client.weekly.set(weekID, weeklyPoints);

      const monthID = `${date.month}-${date.year}`;
      const monthlyPoints = client.monthly.get(monthID) || [];
      this.update(winner.owner.id, winner.owner.username, monthlyPoints);
      client.monthly.set(monthID, monthlyPoints);

      const yearID = `${date.year}`;
      const yearlyPoints = client.yearly.get(yearID) || [];
      this.update(winner.owner.id, winner.owner.username, yearlyPoints);
      client.yearly.set(yearID, yearlyPoints);

    } else {
      msg.channel.send(`It's a tie!`);
    }

  }
}
