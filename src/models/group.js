import TileModel from "./tile";

export default class GroupModel extends TileModel {
  constructor(
    name,
    background,
    icon,
    creationDate,
    updatedDate,
    id = crypto.randomUUID(),
  ) {
    super(id, name, background, icon, creationDate, updatedDate);
    this.items = [];
  }

  insertItem(item) {
    this.items.push(item);
  }
}
