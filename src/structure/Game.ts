
interface GameObject {
  name: string;
  position: number;
}

export class Game {
  objects: GameObject[];

  constructor(names: Omit<GameObject, "position">[]) {
    this.objects = names.map((x, i) => ({ ...x, position: i }));
  }

  /** returns winner GameObject, undefined if both object are the same */
  result(obj1: GameObject, obj2: GameObject) {

    if (obj1.position === obj2.position) return;

    return obj1.position > obj2.position ? obj1 : obj2;
  }
}
