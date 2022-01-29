import { CommandManager } from "@jiman24/commandment";
import { Client as DiscordClient } from "discord.js";
import Enmap from "enmap";

export class Client extends DiscordClient {
  players = new Enmap("Player");
  cats = new Enmap("Cat");
  commandManager = new CommandManager(process.env.PREFIX || "!");
}
