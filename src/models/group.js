import TileModel from "./tile";

export default class GroupModel extends TileModel {
  constructor(name, background, icon) {
    super(name, background, icon);
    this.items = [];
  }
  
  insertItem(item) {
    this.items.push(item);
  }
}