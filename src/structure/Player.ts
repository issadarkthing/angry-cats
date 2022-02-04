import { client } from "..";
import { Cat } from "./Cat";

export class Player {
  cats: Cat[] = [];

  constructor(
    public id: string,
  ) {}

  static fromID(id: string) {
    const player = new Player(id);
    const data = client.players.get(id);

    Object.assign(player, data);

    for (let i = 0; i < player.cats.length; i++) {
      const cat = new Cat((player.cats[i] as any));
      Object.assign(cat, client.cats.get(cat.id));
      player.cats[i] = cat;
    }

    return player;
  }

  save() {
    const { cats, ...data } = this;
    client.players.set(this.id, { ...data, cats: cats.map(x => x.id) });
  }
}

