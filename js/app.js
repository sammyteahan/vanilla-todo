/**
* Select items on the page
*/

var taskInput = document.getElementById('new-task');
var addButton = document.getElementsByTagName('button')[0]; //first button on page
var incompleteTasksHolder = document.getElementById('incomplete-tasks');; //ul of incomplete tasks
var completedTasks = document.getElementById('completed-tasks');; //completed tasks

/**
* Our event handlers
*/

//create the list item along with it's necessary elements
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement('li');
  var checkbox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';
  label.innerText = taskString;

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};


//Add a new task
var addTask = function() {
  console.log('new task added');
  var listItem = createNewTaskElement(taskInput.value);
  // append what returns from ^^^ to incomplete tasks
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};


//Edit an existing task
var editTask = function() {
  console.log('editing task');
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');

  var containsEditClass = listItem.classList.contains('editMode');

  if(containsEditClass) {
    label.innerText = editInput.value;
  }
  else {
    editInput.value = label.innerText;
  }

  listItem.classList.toggle('editMode');
};


//Delete an existing task
var deleteTask = function() {
  console.log('deleting task');
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};


//Mark a task as complete, append it and add correct events on the elements
var taskCompleted = function() {
  console.log('task complete');
  var listItem = this.parentNode;
  completedTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};


//Mark a task as incomplete, append it and add correct event handlers
var taskIncomplete = function() {
  console.log('task incomplete');
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//Where the magic happens (binding above functions to each list item)
var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
  var checkbox = taskListItem.querySelector('input[type=checkbox]')
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete'); //css3 selectors

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkboxEventHandler;
}

/**
* Wire up our events above
*/

addButton.addEventListener('click', addTask);


/**
* DOM Traversal
*/

// traversing over our incomplete tasks and binding them to appropriate checkbox
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

// same for completed tasks
for(var i = 0; i < completedTasks.children.length; i++) {
  bindTaskEvents(completedTasks.children[i], taskIncomplete);
}
