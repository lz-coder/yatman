### YATMAN - Yet Another Tasks Manager :)

A simple tasks manager based on around projects.

#### General spec:

The user must create a project where they can create their tasks.

A task must have a mandatory title and an optional description, sub-tasks can also be added.
A project must have a title, and may contain a description.

If the user wants to group projects, they can create a group.
A group must have a title, and may contain a description.

Groups can only be created on the main screen.
Projects can be created on the main screen and on a group screen.
Tasks can only be created within a project.

Then:
  - Groups are collections of projects.  
  - Projects are collections of tasks.  
  - Tasks are activities to be completed.  

The main and group screen are displayed in a tile based aproach, whereas the project screen displays the tasks on it in a list based model.

#### Implementation Spec:
- Can create Projects and/or groups on the main screen.
- Can create Projects inside a group.
- Can create tasks inside a project.
- Tasks can have subtasks.
- general local CRUD operations for Projects, Groups and Tasks.
- 


