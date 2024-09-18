import TileModel from "./tile";

export default class ProjectModel extends TileModel {
  constructor(name, background, icon, creationDate, updatedDate, id = crypto.randomUUID()) {
    super(id, name, background, icon, creationDate, updatedDate);
  }
}