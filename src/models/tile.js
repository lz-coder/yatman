export default class TileModel {
  constructor(id, name, background, icon, creationDate, updatedDate) {
    this.id = id;
    this.name = name;
    this.background = background;
    this.icon = icon;
    this.selected = false;
    this.creationDate = creationDate;
    this.updatedDate = updatedDate;
  }

  set setSelected(value) {
    this.selected = value;
  }
}
