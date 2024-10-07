import TaskModel from "./task";
import TileModel from "./tile";

export default class ProjectModel extends TileModel {
  constructor(
    name,
    background,
    icon,
    creationDate,
    updatedDate,
    id = crypto.randomUUID(),
  ) {
    super(id, name, background, icon, creationDate, updatedDate);
    this.tasks = [];
  }

  set setTasks(val) {
    this.tasks = val;
  }

  addTask(task) {
    if (!(task instanceof TaskModel))
      throw new Error("The task to add need to be a TaskModel instance");
    this.tasks.push(task);
  }

  removeTask(task) {
    const taskInTasks = this.tasks.indexOf(task);
    if (!taskInTasks) throw new Error("Given task not founded");
    this.tasks.splice(taskInTasks, 1);
  }
}
