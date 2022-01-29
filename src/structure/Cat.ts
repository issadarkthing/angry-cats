import { client } from "..";


export class Cat {
  hat = 0;
  mouth = 0;
  eyes = 0;
  weapon = 0;
  accessories = 0;

  constructor(public id: string) {}

  save() {
    client.cats.set(this.id, { ...this });
  }
}
