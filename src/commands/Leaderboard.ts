import { Command } from "@jiman24/commandment";
import { toNList } from "@jiman24/discordjs-utils";
import { stripIndents } from "common-tags";
import { Message, MessageEmbed } from "discord.js";
import Enmap from "enmap";
import { DateTime } from "luxon";
import { client } from "..";

export interface LeaderboardData {
  id: string;
  name: string;
  wins: number;
}

export default class extends Command {
  name = "leaderboard";
  description = "show weekly, monthly and yearly leaderboard";

  private createLeaderboard(type: string, leaderboardID: string, leaderboard: Enmap) {
    let data: LeaderboardData[] = leaderboard.get(leaderboardID) || [];
    data.sort((a, b) => b.wins - a.wins);

    data = data.slice(0, 10);

    const list = data.map(x => `${x.name} ${x.wins}`);
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${type} Leaderboard`)
      .setDescription(
        stripIndents`Name | Wins
        ${toNList(list)}
        `
      )
     
    return embed;
  }

  async exec(msg: Message) {

    const date = DateTime.now();
    const weekID = `${date.weekNumber}-${date.year}`;
    const monthID = `${date.month}-${date.year}`;
    const yearID = `${date.year}`;

    const weeklyLeaderboard = this.createLeaderboard("Weekly", weekID, client.weekly);
    const monthlyLeaderboard = this.createLeaderboard("Monthly", monthID, client.monthly);
    const yearlyLeaderboard = this.createLeaderboard("Yearly", yearID, client.yearly);

    msg.channel.send({ 
      embeds: [
        weeklyLeaderboard,
        monthlyLeaderboard,
        yearlyLeaderboard,
      ] 
    });
  }
}
