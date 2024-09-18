export default class TileModel {
  constructor(name, background, icon) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.background = background;
    this.icon = icon;
    this.selected = false;
  }

  set setSelected(value) {
    this.selected = value;
  }
}