export default class TaskModel {
  constructor(name, desc, completed) {
    this.name = name;
    this.desc = desc;
    this.completed = completed;
    this.id = crypto.randomUUID();
    this.subtasks = [];
  }

  addSubtask(task) {
    if (!(task instanceof TaskModel))
      throw new Error("The subtask to add needs to be a TaskModel");
    this.subtasks.push(task);
  }

  removeSubtask(task) {
    const taskOnSubtasks = this.subtasks.indexOf(task);
    if (!taskOnSubtasks)
      throw new Error(
        `given task[${task} not finded in subtasks of [${this}]]`,
      );
    this.subtasks.splice(taskOnSubtasks, 1);
  }
}
