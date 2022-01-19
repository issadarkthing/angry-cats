import { Game } from "./Game";

export class Weapon extends Game {
  constructor() {
    super([
      new Knife(),
      new Gun(),
      new Bomb(),
    ])
  }
}

class Knife {
  id = "knife";
  name = "knife";
}

class Gun {
  id = "gun";
  name = "gun";
}

class Bomb {
  id = "bomb";
  name = "bomb"
}
