export default class GroupModel {
  constructor(name, background, icon) {
    this.name = name;
    this.background = background;
    this.icon = icon;
    this.items = [];
  }
  
  insertItem(item) {
    this.items.push(item);
  }
}