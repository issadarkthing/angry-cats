import { client } from "..";


export class Cat {
  hat = 0;
  mouth = 0;
  eyes = 0;
  weapon = 0;
  accessories = 0;
  imageUrl = "";

  constructor(public id: string) {}

  static fromID(id: string) {
    const cat = new Cat(id);
    const data = client.cats.get(id);

    Object.assign(cat, data);

    return cat;
  }

  save() {
    client.cats.set(this.id, { ...this });
  }
}
